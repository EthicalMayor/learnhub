import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Firestore for 'db'
import { getStorage } from 'firebase/storage'; // Firebase Storage for 'storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLtenrAemyYuufFFAHNGVAfyPVrC4rgH4",
  authDomain: "learnhub7-f2e2e.firebaseapp.com",
  projectId: "learnhub7-f2e2e",
  storageBucket: "learnhub7-f2e2e.appspot.com",
  messagingSenderId: "505339151614",
  appId: "1:505339151614:web:26f3bb73b5abe0be5011af",
  measurementId: "G-KCKCQ56B8E"
};

// Initialize Firebase App
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

// Export Firebase services
export { app, auth, db, storage };
