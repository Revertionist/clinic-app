// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwXH9wBAHqCee9_QHulFc00E3tHQ5Wao0",
  authDomain: "clinic-app-3bd6a.firebaseapp.com",
  projectId: "clinic-app-3bd6a",
  storageBucket: "clinic-app-3bd6a.appspot.com",
  messagingSenderId: "959525326344",
  appId: "1:959525326344:web:c5dac6b133546cf0a78bbd",
  measurementId: "G-1N1EQFXP5G"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)