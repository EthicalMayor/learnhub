import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import your Firebase auth
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/loginPage/LoginPage';
import SignUpPage from './components/signuppages/SignUpPage';
import ChatPreview from './components/chatpages/chatpage';
import Dashboard from './components/dashboardpages/dashboard';
import Document from './components/documents/document';
import ResourceVaultPreview from './components/resource-vault/resource-vault';
import VideoConferencingPreview from './components/videoConferencing/videoConferencing';
import TaskPreview from './components/taskPages/taskPreview';
import CalendarPreview from './components/calendarpages/calendarPreview';
import CollegeNews from './components/CollegesPages/collegeNews';
import CareerHunt from './components/CollegesPages/careerHunt';
import TheGeng from './components/gengpages/thegeng';
import JoinTheGeng from './components/gengpages/jointhegeng';
import { UserProvider } from './contexts/UserContext';

const App = () => {

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<div>Welcome to LearnHub!</div>} />
      </Routes>
    </Router>
  </UserProvider>
  );
};

export default App;
