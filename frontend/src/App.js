// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './components/LandingPage/LandingPage'; 
import LoginPage from './components/loginPage/LoginPage';
import SignUpPage from './components/signuppages/SignUpPage';
import './i18n'; // Importing your i18n setup here

const App = () => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  </GoogleOAuthProvider>
);

export default App;
