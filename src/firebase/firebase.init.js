// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPaeCm1gEch5seQnYeHvBXFHdfvq-kQ_0",
  authDomain: "task-maneger-c2611.firebaseapp.com",
  projectId: "task-maneger-c2611",
  storageBucket: "task-maneger-c2611.firebasestorage.app",
  messagingSenderId: "773510727338",
  appId: "1:773510727338:web:8c3ebcf6b35a5c130bf2d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;