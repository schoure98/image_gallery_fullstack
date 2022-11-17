import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCdGz4vZzNzam-MboDEN3fQ-tN1gDH8Kcw",
    authDomain: "digital-souvenir.firebaseapp.com",
    projectId: "digital-souvenir",
    storageBucket: "digital-souvenir.appspot.com",
    messagingSenderId: "716973546584",
    appId: "1:716973546584:web:c8e5f81f7ff5efa0ffbe2d",
    measurementId: "G-83L06NYZ9Z"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);