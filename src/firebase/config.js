// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <--- Add this import

const firebaseConfig = {
  apiKey: "AIzaSyD9KMqU09Fh7ctcGl8JblGfKpEW-YdFQ3E",
  authDomain: "lawverse-ai.firebaseapp.com",
  projectId: "lawverse-ai",
  storageBucket: "lawverse-ai.firebasestorage.app",
  messagingSenderId: "359358144236",
  appId: "1:359358144236:web:3269e1ec0397177dd08fc9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // <--- Export auth here