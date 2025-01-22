import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEjHqPRocVJFUfsIwNa2moWW31wIh-pBQ",
  authDomain: "meditracker-reactnative.firebaseapp.com",
  projectId: "meditracker-reactnative",
  storageBucket: "meditracker-reactnative.appspot.com", // Fixed the storage bucket name
  messagingSenderId: "304824233339",
  appId: "1:304824233339:web:77b8ddac3bc2434fe4e1de",
  measurementId: "G-N9VXQQEPYY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore DB
export const db = getFirestore(app);
