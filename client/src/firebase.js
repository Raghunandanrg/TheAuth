// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c3f43.firebaseapp.com",
  projectId: "mern-auth-c3f43",
  storageBucket: "mern-auth-c3f43.appspot.com",
  messagingSenderId: "618937198963",
  appId: "1:618937198963:web:e66d87d4e00f0286ddbd06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);