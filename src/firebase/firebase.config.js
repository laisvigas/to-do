import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKRFbnTYtTODWLZTHE8ESubpACNhlHGWc",
  authDomain: "to-do-xx.firebaseapp.com",
  databaseURL: "https://to-do-xx-default-rtdb.firebaseio.com",
  projectId: "to-do-xx",
  storageBucket: "to-do-xx.firebasestorage.app",
  messagingSenderId: "840356730541",
  appId: "1:840356730541:web:7e8c91b8628ed49f0a9824"
};

const app = initializeApp(firebaseConfig);