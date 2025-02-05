import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToDo, deleteToDo, updateToDo } from "./features/ToDoUser/ToDoSlice";
import Modal from "react-modal";

function App() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  const todos = useSelector((state) => state.todo.value);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const [idCounter, setIdCounter] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  function HandleAddToDo() {
    const newId = `${idCounter}`;
    dispatch(addToDo({ id: newId, todo }));
    setIdCounter((prev) => prev + 1);
    setTodo("");
  }

  function HandleDeleteToDo(id) {
    dispatch(deleteToDo(id));
  }

  function HandleEditClick(id, currentTodo) {
    setEditId(id);
    setEditText(currentTodo);
    setIsOpen(true); // Open modal when edit button is clicked
  }

  function HandleUpdateToDo() {
    dispatch(updateToDo({ id: editId, newTodo: editText }));
    setEditId(null);
    setEditText("");
    setIsOpen(false); // Close modal after saving
  }

  function closeModal() {
    setIsOpen(false);
    setEditId(null);
    setEditText("");
  } 

  return (
    <div className="bg-slate-300">
      <input
        type="text"
        placeholder="Enter to do"
        value={todo}
        onChange={(e) => setTodo(e.target.value)} className="bg-slate-950" />
      <button onClick={HandleAddToDo}>Create To Do</button>

      <ul>
        {todos.map((item) => (
          <li key={item.id} className="flex">
            {item.id} - {item.todo}
            <button onClick={() => HandleDeleteToDo(item.id)}>Delete</button>
            <button onClick={() => HandleEditClick(item.id, item.todo)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Modal for Editing */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit To-Do"
      >
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={HandleUpdateToDo}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default App;

// import "./App.css";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addToDo, deleteToDo ,updateToDo} from "./features/ToDoUser/ToDoSlice";

// function App() {
//   const todos = useSelector((state) => state.todo.value);
//   const dispatch = useDispatch();
//   const [todo, setTodo] = useState("");
//   const [todou, setUTodo] = useState("");
//   const [idCounter, setIdCounter] = useState(1);
//   const [inputShow, setInputShow] = useState(false);

//   function HandleAddToDo() {
//     if (!todo.trim()) return; // Prevent adding empty items
//     const newId = `${idCounter}`;
//     dispatch(addToDo({ id: newId, todo }));
//     setIdCounter((prev) => prev + 1);
//     setTodo(""); // Clear input after adding
//   }

//   function HandleDeleteToDo(id) {
//     dispatch(deleteToDo(id)); // Pass only `id`
//   }
//   function HandleUpdateToDo(id,todou) {
//     dispatch(updateToDo({ id, newTodo: todou }));
//   }

//   return (
//     <>
//       <input
//         type="text"
//         placeholder="Enter to do"
//         value={todo}
//         onChange={(e) => setTodo(e.target.value)}
//       />
//       <button onClick={HandleAddToDo}>Create To Do</button>

//       <ul>
//         {todos.map((item) => (
//           <li key={item.id}>
//             {item.id} - {item.todo}
//             <button onClick={() => HandleDeleteToDo(item.id)}>Delete</button>
//             <button onClick={() => setInputShow(true)}>Edit</button>
//             {inputShow && 
//              <><input
//               type="text"
//               placeholder="Enter updated to do"
//               value={todou}
//               onChange={(e) => setUTodo(e.target.value)}
//             />
//             <button onClick={() => HandleUpdateToDo(item.id,todou)}>Update</button></>}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default App;
