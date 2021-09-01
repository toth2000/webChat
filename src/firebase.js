// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCmSxRTmvHf-NWVRevGb5F5j4ifZTuE9Y",
  authDomain: "webchat-72740.firebaseapp.com",
  databaseURL:
    "https://webchat-72740-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webchat-72740",
  storageBucket: "webchat-72740.appspot.com",
  messagingSenderId: "837698544528",
  appId: "1:837698544528:web:c70e0549c7908fb763c915",
  measurementId: "G-L4ZBY6WBC3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const database = getDatabase();
//   "https://webchat-72740-default-rtdb.asia-southeast1.firebasedatabase.app"
