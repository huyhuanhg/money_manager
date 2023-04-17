// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

console.log('firebaseConfig :>> ', firebaseConfig);
console.log('process.env.FIREBASE_API_KEY :>> ', process.env.REACT_APP_FIREBASE_API_KEY);
console.log('process.env.FIREBASE_AUTH_DOMAIN :>> ', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log('process.env.FIREBASE_PROJECT_ID :>> ', process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log('process.env.FIREBASE_STORAGE_BUCKET :>> ', process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
console.log('process.env.FIREBASE_MESSAGING_SENDER_ID :>> ', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log('process.env.FIREBASE_APP_ID :>> ', process.env.REACT_APP_FIREBASE_APP_ID);

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
