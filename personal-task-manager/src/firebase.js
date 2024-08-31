// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjR-dKqtLpRfeRsN1vozBU_6I0HRytVB4",
  authDomain: "personal-task-manager-d526b.firebaseapp.com",
  projectId: "personal-task-manager-d526b",
  storageBucket: "personal-task-manager-d526b.appspot.com",
  messagingSenderId: "209187173706",
  appId: "1:209187173706:web:b7537ec2dc8b3f7afa7db3",
  measurementId: "G-ZHJ80YNCD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth



