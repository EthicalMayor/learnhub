// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { UserProvider } from './contexts/UserContext';
import LandingPage from './components/LandingPage/LandingPage'; 
import LoginPage from './components/loginPage/LoginPage';
import SignUpPage from './components/signuppages/SignUpPage';
import ChatPage from './components/chatpages/chatpage';
import Dashboard from './components/dashboardpages/dashboard';
import { AuthProvider } from './contexts/AuthContext';

 


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
  return  (
    <AuthProvider>
      <UserProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </UserProvider>
    </AuthProvider>
);
};

export default App;
