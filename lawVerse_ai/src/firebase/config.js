// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9KMqU09Fh7ctcGl8JblGfKpEW-YdFQ3E",
  authDomain: "lawverse-ai.firebaseapp.com",
  projectId: "lawverse-ai",
  storageBucket: "lawverse-ai.firebasestorage.app",
  messagingSenderId: "359358144236",
  appId: "1:359358144236:web:3269e1ec0397177dd08fc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service 
export const db = getFirestore(app); 
