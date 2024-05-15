// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYLyja0r21fUHXc16p2eDTphgBsOjyHn4",
  authDomain: "fir-backend-c2b2d.firebaseapp.com",
  projectId: "fir-backend-c2b2d",
  storageBucket: "fir-backend-c2b2d.appspot.com",
  messagingSenderId: "261917479732",
  appId: "1:261917479732:web:a7fd19a6d42ee2b4cecb61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleAuthenticationProvider = new GoogleAuthProvider();