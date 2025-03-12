import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // 🚀 For redirection
import "../styles/userTodo.css";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap styles
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

function User() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // 🚀 Initialize navigation

  // Listen for auth state changes and fetch user data
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
        const unsubscribeTasks = fetchUserTasks(user.uid); // Fetch only user's tasks
        return () => unsubscribeTasks(); // Cleanup tasks listener on unmount
      } else {
        setUserData(null);
        setTasks([]); // Clear tasks if logged out
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Function to fetch logged-in user's data
  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to get only the logged-in user's tasks
  const fetchUserTasks = (uid) => {
    const q = query(collection(db, "todos"), orderBy("created", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs
          .filter((doc) => doc.data().userId === uid) // 🔥 Filter tasks by userId
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
      );
    });

    return unsubscribe;
  };

  // 🚀 Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="title">
      {/* 🔥 Logout Button at Top Right */}
      <button className="btn btn-danger position-absolute top-0 end-0 m-3" onClick={handleLogout}>
        Logout
      </button>

      <header>Todos App</header>
      {userData && <h2 className="m-3">Welcome, {userData.name}!</h2>} {/* Display user name */}
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        {tasks.map((task) => (
          <TodoList
            id={task.id}
            key={task.id}
            completed={task.data.completed}
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

export default User;


