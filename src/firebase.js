import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, setDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
export { db, collection, onSnapshot, addDoc, setDoc, deleteDoc, doc, query, orderBy, serverTimestamp };