import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { Alert, AlertDescription } from '../custom-components/custom-components';


const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    try {
      // create user in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      // get firebase token
      const token = await userCredential.usergetIdToken();

      // send user data to backend
      const response = await fetch('http://localhost:8080/signup', {}

      )
    }
  }

}