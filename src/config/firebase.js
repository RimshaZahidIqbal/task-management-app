import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyC1f01DjN8jSHWxbfvLerzi9RnaCeKBLVY",
    authDomain: "fem-hack-2025-task-manager.firebaseapp.com",
    projectId: "fem-hack-2025-task-manager",
    storageBucket: "fem-hack-2025-task-manager.firebasestorage.app",
    messagingSenderId: "17044373844",
    appId: "1:17044373844:web:f19c731f8fe1c6c9a2c8c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);
