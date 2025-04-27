// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUe5KvAwomNgSHhwjfjAy4N1YCuLQ6cyg",
  authDomain: "simsen-app.firebaseapp.com",
  projectId: "simsen-app",
  storageBucket: "simsen-app.firebasestorage.app",
  messagingSenderId: "862796273058",
  appId: "1:862796273058:web:a62219e911643cef2f0efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };