// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGjKGBuX9r0HZt-gSw83-d14uU4GXrA5I",
  authDomain: "game-revew-app.firebaseapp.com",
  projectId: "game-revew-app",
  storageBucket: "game-revew-app.firebasestorage.app",
  messagingSenderId: "184989141270",
  appId: "1:184989141270:web:d86afeabb3c5dd25f26837"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);