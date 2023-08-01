import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDmwybthM3aKlbc-LU29mx64yprxf2XJ7c",
  authDomain: "tienda-pc-989d6.firebaseapp.com",
  projectId: "tienda-pc-989d6",
  storageBucket: "tienda-pc-989d6.appspot.com",
  messagingSenderId: "341529037743",
  appId: "1:341529037743:web:bd6ebd36c6ed65c7823d5a"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);