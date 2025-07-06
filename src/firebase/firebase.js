// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <--- FALTA ESTO

const firebaseConfig = {
  apiKey: "AIzaSyCz5pVXuVHNgekDAoGsxGW_eweGjbxtYc4",
  authDomain: "minimarketweb-b78bd.firebaseapp.com",
  projectId: "minimarketweb-b78bd",
  storageBucket: "minimarketweb-b78bd.appspot.com",
  messagingSenderId: "1012253632140",
  appId: "1:1012253632140:web:6dff0731c1dddd20163da9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // <--- AGREGA ESTO
