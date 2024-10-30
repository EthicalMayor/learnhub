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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User signed in:', user);
      } else {
        console.log('No user signed in');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <UserProvider>
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
        <Route path="/task" element={<TaskPreview />} />
        <Route path="/calendar" element={<CalendarPreview />} />
        <Route path="/college-news" element={<CollegeNews />} />
        <Route path="/career-hunt" element={<CareerHunt />} />
        <Route path="/the-geng" element={<TheGeng />} />
        <Route path="/join-the-geng" element={<JoinTheGeng />} />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
