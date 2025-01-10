import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage.jsx'; // Import the ProfilePage component
import HomePage from './components/HomePage.jsx'; // Replace 'App' with the actual home component

const MainApp = () => {
  return (
    <Router>
      <Routes>
        {/* The homepage route */}
        <Route path="/" element={<HomePage />} />

        {/* The profile route */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
