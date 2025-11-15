import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg1qbrtqIV2k4R5dG_LL0U2JJvkkzJg-w",
  authDomain: "cafearoma-u4.firebaseapp.com",
  projectId: "cafearoma-u4",
  storageBucket: "cafearoma-u4.firebasestorage.app",
  messagingSenderId: "706944766295",
  appId: "1:706944766295:web:b9359672f37365e463ee12",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
