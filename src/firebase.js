// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "bdbdg-referee.firebaseapp.com",
  projectId: "bdbdg-referee",
  storageBucket: "bdbdg-referee.appspot.com",
  messagingSenderId: "383215282065",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-YEEGYK625K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
