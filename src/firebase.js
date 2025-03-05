import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBrXSb4HJiSBDq4suVdEIbayVQ_to2cyc8",
  authDomain: "todo-app-a18a5.firebaseapp.com",
  projectId: "todo-app-a18a5",
  storageBucket: "todo-app-a18a5.firebasestorage.app",
  messagingSenderId: "567002913122",
  appId: "1:567002913122:web:455805f2b1d18369dc343b",
  measurementId: "G-ZPX4F9LN69"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()

export {db, auth}