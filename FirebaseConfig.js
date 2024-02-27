// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjG2wm23sh8wzYadE-L3pivlMuqNztk68",
  authDomain: "pickyourdog.firebaseapp.com",
  projectId: "pickyourdog",
  storageBucket: "pickyourdog.appspot.com",
  messagingSenderId: "180293030080",
  appId: "1:180293030080:web:98c936cd42c4ddbc781d25",
  measurementId: "G-SX0WHSR3NR"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
//const analytics = getAnalytics(app);