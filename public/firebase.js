// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL,deleteObject } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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

const db = getFirestore();

export const storage = getStorage(app);

export const saveTask = (title, description, imageUrl, imageName) => addDoc(collection(db, 'tasks'), { title, description, imageUrl, imageName });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = async id => {
  const docTask = await getTask(id);
  deleteImageTask(docTask.data().imageName);
  deleteDoc(doc(db, 'tasks', id));
}

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  console.log(file);
  const storageRef = ref(storage, `imagenes/${file.name}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   document.querySelector('#progress').value = progress;
    },
    (error) => {
        
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        document.querySelector('#image').src = downloadURL;
        console.log('File available at', downloadURL);
        });
    }
    );

  }

  const deleteImageTask = imageName =>{
    // Create a reference to the file to delete
const desertRef = ref(storage, `images/${imageName}`);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  console.log('Todo esta bien')
}).catch((error) => {
  // Uh-oh, an error occurred!
  console.log('Algo fallo UnU')
});
  }