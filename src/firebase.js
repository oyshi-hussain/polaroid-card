// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV7fm_NptO8eMEkcgfek74poAj2_oLI9I",
  authDomain: "polaroid-card-app.firebaseapp.com",
  projectId: "polaroid-card-app",
  storageBucket: "polaroid-card-app.firebasestorage.app",
  messagingSenderId: "439973740478",
  appId: "1:439973740478:web:822142d1fe5283fb2bc3ef",
  measurementId: "G-ZMVGCB20M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);