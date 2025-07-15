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



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCBBLy6HdzM68jp7JjriH0exMphZ1wpv1o",
//   authDomain: "mern-estate2-5ef35.firebaseapp.com",
//   projectId: "mern-estate2-5ef35",
//   storageBucket: "mern-estate2-5ef35.firebasestorage.app",
//   messagingSenderId: "287958712067",
//   appId: "1:287958712067:web:7ee69ffa9651be1e97f336",
//   measurementId: "G-VTQ2044CSP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);