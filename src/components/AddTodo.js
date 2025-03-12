import Modal from "./Modal";
import { useState } from "react";
import "../styles/addTodo.css";
import { db, auth } from "../firebase"; // Import auth to get current user
import { collection, addDoc, Timestamp } from "firebase/firestore";

/* Function to add a new task to Firestore */
function AddTodo({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the currently logged-in user
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to add a task.");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        title: title.trim(), // Trim spaces to avoid empty tasks
        description: description.trim(),
        completed: false,
        userId: user.uid, // 🔥 Add userId field
        created: Timestamp.now(), // 🔥 Ensure a valid timestamp
      });

      setTitle(""); // Clear input fields after adding task
      setDescription("");
      onClose(); // Close modal after adding task
    } catch (err) {
      alert("Error adding task: " + err.message);
    }
  };

  return (
    <Modal modalLable="Add Todo" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTodo" name="addTodo">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          value={description}
          required
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTodo;
