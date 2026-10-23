import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyCjxaeG4627zsun5S62gIv8aIDzxpdg-dA",
  authDomain: "unimate-d309e.firebaseapp.com",
  projectId: "unimate-d309e",
  storageBucket: "unimate-d309e.firebasestorage.app",
  messagingSenderId: "150443752033",
  appId: "1:150443752033:web:33603e85a15ae6ad488820",
  measurementId: "G-CJHS4ELXPK"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();


export {
    app,
    auth,
    db,
    storage,
    provider,

    signInWithPopup,
    signOut,
    onAuthStateChanged,

    doc,
    setDoc,
    getDoc
};