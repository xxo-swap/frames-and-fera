// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6KU-HpZ4-c8z_dRVEZesGuhqBJhKC53M",
  authDomain: "frames-and-fera.firebaseapp.com",
  projectId: "frames-and-fera",
  storageBucket: "frames-and-fera.firebasestorage.app",
  messagingSenderId: "743579272903",
  appId: "1:743579272903:web:83509f4712693743d7a0e2",
  measurementId: "G-DV5V6SCCVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);