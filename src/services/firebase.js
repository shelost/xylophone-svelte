// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoPj5EY8JRI7MWotXlF-GvabDly9L9SgA",
  authDomain: "peyo-studio.firebaseapp.com",
  projectId: "peyo-studio",
  storageBucket: "peyo-studio.appspot.com",
  messagingSenderId: "244999926472",
  appId: "1:244999926472:web:2e6adff19fe233c13f2bfd",
  measurementId: "G-34NVNV4T48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);