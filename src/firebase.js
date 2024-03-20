// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGnAmhDuc0DNIJdEhbsp8WduLxIlLsaaw",
    authDomain: "vue-test-1fc5a.firebaseapp.com",
    projectId: "vue-test-1fc5a",
    storageBucket: "vue-test-1fc5a.appspot.com",
    messagingSenderId: "111643836536",
    appId: "1:111643836536:web:72143bd001cffc3c94ed8d",
    measurementId: "G-RT2N88RT67"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
