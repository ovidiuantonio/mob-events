import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "mob-events.firebaseapp.com",
  databaseURL:
    "https://mob-events-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mob-events",
  storageBucket: "mob-events.appspot.com",
  messagingSenderId: "243216311576",
  appId: "1:243216311576:web:ee0961d8732d7b8fe6aa6d",
  measurementId: "G-S1HM9RTSET",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
