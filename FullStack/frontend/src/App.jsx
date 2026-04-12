import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

// تحميل الصفحات بالأسماء الصحيحة اللي في الصور
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage'; 
import LawyerDashboard from './pages/Lawyer/LawyerDashboardPage';
import LawyersListPage from './pages/LawyersListPage'; // تأكد من مكانه في فولدر pages
import HowItWorksPage from './pages/HowItWorksPage'; // تأكد من مكانه في فولدر pages

const AppContent = () => {
  const { mode } = useTheme();

  return (
    <div className={`min-h-screen ${mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* ✅ الربط مع الملفات الحقيقية اللي عندك */}
            <Route path="/find-lawyer" element={<LawyersListPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            
            <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
            
            <Route path="*" element={<div className="text-center py-20">404 - Not Found</div>} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
            <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;