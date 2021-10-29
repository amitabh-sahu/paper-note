import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, setDoc, deleteDoc, doc, query, orderBy, serverTimestamp, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARC-d0PCMpyUom4OSxRWU6RtQhtLDcaZo",
  authDomain: "paper-note.firebaseapp.com",
  projectId: "paper-note",
  storageBucket: "paper-note.appspot.com",
  messagingSenderId: "909472949462",
  appId: "1:909472949462:web:bf87e675717656fa401577",
  measurementId: "G-56W12JFH59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('persistance failed');
  }
  else if (err.code === 'unimplemented') {
    console.log('persistance is not available');
  }
});

export { auth, provider, signOut, signInWithPopup, onAuthStateChanged };
export { db, collection, onSnapshot, addDoc, setDoc, deleteDoc, doc, query, orderBy, serverTimestamp };