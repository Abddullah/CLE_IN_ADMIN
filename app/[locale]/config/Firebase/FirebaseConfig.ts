import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCGXaM4yjTxhq5TWNbU32W6BJ3vpKLggpc",
  authDomain: "puliziedicasa-7.firebaseapp.com",
  projectId:"puliziedicasa-7",
  storageBucket: "puliziedicasa-7.firebasestorage.app",
  messagingSenderId: "960910998663",
  appId: "1:960910998663:web:fec44c20c9c6bb959fcc22",
  measurementId: "G-R5R093RJKK"
};



export const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);