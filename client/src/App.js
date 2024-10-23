import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/loginPage/LoginPage';
import SignUpPage from './components/signuppages/SignUpPage';
import ChatPreview from './components/chatpages/chatpage';
import Dashboard from './components/dashboardpages/dashboard';
import Document from './components/documents/document';
import ResourceVaultPreview from './components/resource-vault/resource-vault';
import VideoConferencingPreview from './components/videoConferencing/videoConferencing';

// Your firebaseConfig object should be defined here
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

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/chat" element={<ChatPreview />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/document" element={<Document />} />
              <Route path="/resource" element={<ResourceVaultPreview />} />
              <Route path="/video-conferencing" element={<VideoConferencingPreview />} />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;