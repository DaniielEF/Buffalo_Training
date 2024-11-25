
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDg2rxd8Fuj7mfRow7zXPAt2_cysiDPi7Y",
    authDomain: "buffaloapp-2d768.firebaseapp.com",
    projectId: "buffaloapp-2d768",
    storageBucket: "buffaloapp-2d768.firebasestorage.app",
    messagingSenderId: "505799790020",
    appId: "1:505799790020:web:e3c4fa457ae9fa11426891"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // Correo electronico;
export const googleProvider = new GoogleAuthProvider(); // Google autentication
export const facebookProvider = new FacebookAuthProvider(); // Faceook autenthication
export const Firestoredb = getFirestore()