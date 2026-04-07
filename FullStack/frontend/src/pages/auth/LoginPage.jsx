import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaGavel, FaUser } from 'react-icons/fa'; 
import '../../styles/auth/AuthBase.css';
import logo from '../../Assets/logo/logo canvas.png';

// Importing assets 
import logo from "../../../assets/logo.png";

const LoginPage = () => {
  // State to toggle between Client and Lawyer
const [userType, setUserType] = useState('client'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${userType}`);
    // Future: Add your Axios/Fetch call to Node.js here
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Logo Section */}
// 1. DELETE the import logo line entirely
// 2. In your JSX, just use the direct path:

<div className="logo-container">
  <img src="/logo.png" alt="LawLink Logo" />
</div>

        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Select account type to continue to LawLink</p>

        {/* User Type Toggle */}
        <div className="user-toggle">
          <button 
            type="button"
            className={`toggle-btn ${userType === 'client' ? 'active' : ''}`}
            onClick={() => setUserType('client')}
          >
            <FaUser /> Client Portal
          </button>
          <button 
            type="button"
            className={`toggle-btn ${userType === 'lawyer' ? 'active' : ''}`}
            onClick={() => setUserType('lawyer')}
          >
            <FaGavel /> Lawyer Portal
          </button>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                className="law-input" 
                placeholder="name@example.com" 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                className="law-input" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" id="forgot-link">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn-submit">
            Sign In as {userType === 'client' ? 'Client' : 'Lawyer'} →
          </button>
        </form>

        <p className="footer-link">
          New to LawLink? <Link to="/register">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
