// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAn23-6scp0zD3DhCsl1Rrsj4TehuB5CIU",
  authDomain: "ai-customer-support-a4c36.firebaseapp.com",
  projectId: "ai-customer-support-a4c36",
  storageBucket: "ai-customer-support-a4c36.appspot.com",
  messagingSenderId: "581731855440",
  appId: "1:581731855440:web:96f616765955b0f026b555",
  measurementId: "G-E28GR7SMKL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };