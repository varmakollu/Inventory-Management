// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLAJKnUSkwFpFTzGdzdc48d-s83u6bWpw",
  authDomain: "inventory-management-b7c70.firebaseapp.com",
  projectId: "inventory-management-b7c70",
  storageBucket: "inventory-management-b7c70.appspot.com",
  messagingSenderId: "971348110251",
  appId: "1:971348110251:web:e4aa734565d137b985c0ee",
  measurementId: "G-72RVPZWDK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };