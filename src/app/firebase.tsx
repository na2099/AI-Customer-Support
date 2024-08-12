import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics"; // Keep the analytics import from MM_chatbox-fix

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAn23-6scp0zD3DhCsl1Rrsj4TehuB5CIU",
  authDomain: "ai-customer-support-a4c36.firebaseapp.com",
  projectId: "ai-customer-support-a4c36",
  storageBucket: "ai-customer-support-a4c36.appspot.com",
  messagingSenderId: "581731855440",
  appId: "1:581731855440:web:96f616765955b0f026b555",
  measurementId: "G-E28GR7SMKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Conditionally initialize Analytics
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics not supported in this environment.");
    }
  });
}

export { auth, analytics };