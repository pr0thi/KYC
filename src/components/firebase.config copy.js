// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADWnIZGSUGA-LJw8kBH8jRVbp6XWu-4Lk",
  authDomain: "sc-hackathon-c2f47.firebaseapp.com",
  projectId: "sc-hackathon-c2f47",
  storageBucket: "sc-hackathon-c2f47.appspot.com",
  messagingSenderId: "710977460064",
  appId: "1:710977460064:web:6f51a2c85cb9421dfa7005",
  measurementId: "G-KZ8GVWF9LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);