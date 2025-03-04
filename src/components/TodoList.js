import "../styles/todolist.css";
import { useState, useEffect } from "react";
import { doc, updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Todo from "./Todo";
import EditTodo from "./EditTodo";

function TodoList({ id, title, description, completed }) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  useEffect(() => {
    setChecked(completed); // Ensure component re-renders with correct Firestore data
  }, [completed]);

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update document in firestore */
  const handleCheckedChange = async () => {
    const todoDocRef = doc(db, "todos", id);
    try {
      const newChecked = !checked;
      await updateDoc(todoDocRef, { completed: newChecked });
      setChecked(newChecked); // Update state after Firestore update
    } catch (err) {
      alert(err);
    }
  };

  // function to delete a document from firestore
  const handelDelete = async() => {
    const todoDocRef = doc(db, 'todos', id)
    try {
      await deleteDoc(todoDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={`todoList ${checked && "todoList--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleCheckedChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
        ></label>
      </div>
      <div className="todoList__body">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="todoList__buttons">
          <div className="todoList__deleteNedit">
            <button
              className="todoList__editButton"
              onClick={() => setOpen({ ...open, edit: true })}
            >
              Edit
            </button>
            <button className="todoList__deleteButton" onClick={handelDelete}>Delete</button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>

      {open.view && (
        <Todo
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}

      {open.edit && (
        <EditTodo
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id}
        />
      )}
    </div>
  );
}

export default TodoList;
