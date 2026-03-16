import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AboutUs from './pages/AboutUs';
import './styles/index.css'; // Adjust path if needed
import './styles/AboutUs.css'; // Import About Us specific styles

function App() {
  return (
    <BrowserRouter>
    <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  {/* Change this to lowercase/no spaces */}
  <Route path="/about" element={<AboutUs />} /> 
</Routes>
    </BrowserRouter>
  );
}

export default App;