// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth"; // Import Firebase Auth

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);

// Export Firebase app instance for usage in other files
export default app;
