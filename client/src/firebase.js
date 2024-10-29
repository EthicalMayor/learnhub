import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDLtenrAemyYuufFFAHNGVAfyPVrC4rgH4",
  authDomain: "learnhub7-f2e2e.firebaseapp.com",
  projectId: "learnhub7-f2e2e",
  storageBucket: "learnhub7-f2e2e.appspot.com",
  messagingSenderId: "505339151614",
  appId: "1:505339151614:web:26f3bb73b5abe0be5011af",
  measurementId: "G-KCKCQ56B8E"
};


let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); 
}

const auth = getAuth(app);

export { app, auth };
