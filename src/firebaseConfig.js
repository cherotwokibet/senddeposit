// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// const firebaseConfig = {
//   apiKey: "AIzaSyAQG_2xXVSjLm42Ag2mfNWnTFunw4a910Y",
//   authDomain: "senddeposit.firebaseapp.com",
//   databaseURL: "https://senddeposit-default-rtdb.firebaseio.com",
//   projectId: "senddeposit",
//   storageBucket: "senddeposit.appspot.com",
//   messagingSenderId: "63026505055",
//   appId: "1:63026505055:web:74b7d9a426c51c3cd042ea",
//   measurementId: "G-9TXPZPKLP0"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBuXV16BbqFzEQ8FWMoHjdrSFFBFPBfSBk",
  authDomain: "cashapp-54c92.firebaseapp.com",
  projectId: "cashapp-54c92",
  storageBucket: "cashapp-54c92.appspot.com",
  messagingSenderId: "519200272541",
  appId: "1:519200272541:web:cc0ffde2a2fc0fd536a474"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export { auth, db, app }

