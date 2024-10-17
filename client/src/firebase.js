import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUX8J6huZEovXGgAClrjmoeAs_DoVCHGQ",
  authDomain: "learnhub-4b1aa.firebaseapp.com",
  projectId: "learnhub-4b1aa",
  storageBucket: "learnhub-4b1aa.appspot.com",
  messagingSenderId: "334725354818",
  appId: "1:334725354818:web:e1977fc6dd5803c3be24db"

};

// Initialize Firebase
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export {
    auth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile
  };