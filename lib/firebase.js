// app/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAL4OywNF9-Vl3HfawdSYRGlHWQ7tfPNlQ",
  authDomain: "instagramboardapp.firebaseapp.com",
  projectId: "instagramboardapp",
  storageBucket: "instagramboardapp.firebasestorage.app",
  messagingSenderId: "393822639071",
  appId: "1:393822639071:web:8324c350875b85dc856a6a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { auth };
