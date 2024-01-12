import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB82KyH78fCm9aANaQ-ADsxLTJ3s9mB1hM",
  authDomain: "tweetx-33f6b.firebaseapp.com",
  databaseURL: "https://tweetx-33f6b-default-rtdb.firebaseio.com",
  projectId: "tweetx-33f6b",
  storageBucket: "tweetx-33f6b.appspot.com",
  messagingSenderId: "205899139081",
  appId: "1:205899139081:web:f2c5cf94cadd5b78d490d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore();

export { auth, db, app }; // Exporting the app object might be helpful in troubleshooting

export default app;
