// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate1-6f32c.firebaseapp.com",
  projectId: "mern-estate1-6f32c",
  storageBucket: "mern-estate1-6f32c.firebasestorage.app",
  messagingSenderId: "2046937447",
  appId: "1:2046937447:web:f48bcced41f588c439c7c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);