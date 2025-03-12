// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYb1ox1cEK8pMJn1m-FmSdxUlzb-B4f68",
  authDomain: "beautybooker-25c9d.firebaseapp.com",
  projectId: "beautybooker-25c9d",
  storageBucket: "beautybooker-25c9d.firebasestorage.app",
  messagingSenderId: "302900814653",
  appId: "1:302900814653:web:67f2034d5a26b733065b54",
  measurementId: "G-JR7WC4KXVG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


