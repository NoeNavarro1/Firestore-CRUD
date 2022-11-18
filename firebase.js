// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,  
  deleteDoc,
  onSnapshot,
  doc,
  getDoc 
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5TDivq-zgMxKeVZHyb6ImC31Iw3Ex6RA",
  authDomain: "fir-javascript-crud-5d4a0.firebaseapp.com",
  projectId: "fir-javascript-crud-5d4a0",
  storageBucket: "fir-javascript-crud-5d4a0.appspot.com",
  messagingSenderId: "113558324185",
  appId: "1:113558324185:web:86f7b4340dac82446dcfc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description) => 
    addDoc(collection(db,"tasks"),{title,description});

export const getTasks = () => getDocs(collection(db,'tasks')) 

export const onGetTasks =  (callback) => onSnapshot(collection(db,'tasks'),callback)

export const deleteTasks = id => deleteDoc(doc(db,'tasks',id))

export const getTask = id => getDoc(doc(db,'tasks',id)) 
