import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState, useEffect } from "react";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'


function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([])
  /* function to get all tasks from firestore in realtime */

   // function to get all tasks from firestore in realtime
   useEffect(() =>{
    const q = query(collection(db, 'todos'), orderBy('created','desc'));
    onSnapshot(q,(querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    <div className="title">
      <header>Todo App</header>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        {tasks.map((task) => (
          <TodoList
            id={task.id}
            key={task.id}
            completed = {task.data.completed}
            title={task.data.title}
            description={task.data.description}
          />
        ))}
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
  );
}

export default Title;
