import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaGavel, FaUser } from 'react-icons/fa';
import '../../styles/auth/Login.css';

// Ensure this path is correct based on your folder structure
import logo from '../../assets/logo/logo.png';

const LoginPage = () => {
  const [userType, setUserType] = useState('client'); // 'client' or 'lawyer'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      role: userType
    };

    console.log('Submitting Login:', payload);
    
    // Professional Tip: Implement a loading state here to disable 
    // the submit button while the API call is in progress.
    try {
      // const response = await axios.post('/api/auth/login', payload);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        {/* Logo Section */}
        <div className="logo-container">
          <img src={logo} alt="LawLink Logo" />
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
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                id="email"
                name="email"
                type="email" 
                className="law-input" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                id="password"
                name="password"
                type="password" 
                className="law-input" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                required 
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input 
                name="rememberMe"
                type="checkbox" 
                checked={formData.rememberMe}
                onChange={handleInputChange}
              /> Remember me
            </label>
            <Link to="/forgot-password" id="forgot-link">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn-submit">
            Sign In as {userType.charAt(0).toUpperCase() + userType.slice(1)} →
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
