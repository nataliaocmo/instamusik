// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyhbSt8zJYE-hLf_QC_wiSYkiFO7IHLGw",
  authDomain: "instamusik-5b8c5.firebaseapp.com",
  projectId: "instamusik-5b8c5",
  storageBucket: "instamusik-5b8c5.appspot.com",
  messagingSenderId: "1040917309519",
  appId: "1:1040917309519:web:990a57675afcff86ffa23a",
  measurementId: "G-TPF2ELCVHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);
