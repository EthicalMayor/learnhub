// src/services/authService.js

import { 
    auth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile
  } from '../firebase';
  
  // Helper to get ID token
  const getIdToken = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  };
  
  // Handle Google Sign In
  export const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Get Firebase ID token
      const idToken = await user.getIdToken();
      
      // Send token to backend for verification
      const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate with backend');
      }
  
      return user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };
  
  // Handle Email/Password Sign Up
  export const signUpWithEmail = async (userData) => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
  
      // Update profile with user's name
      await updateProfile(userCredential.user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });
  
      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();
  
      // Send user data to backend
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          dob: userData.dob
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user in backend');
      }
  
      return userCredential.user;
    } catch (error) {
      console.error('Email sign up error:', error);
      throw error;
    }
  };
  
  // Handle Email/Password Sign In
  export const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();
  
      // Verify with backend
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ email })
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate with backend');
      }
  
      return userCredential.user;
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };
  
  // Sign Out
  export const signOut = async () => {
    try {
      await auth.signOut();
      // Clear any local storage or state management here
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };