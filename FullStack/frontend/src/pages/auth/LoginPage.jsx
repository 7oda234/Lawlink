import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaGavel, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/useAuth';
import logo from '../../Assets/logo/logo canvas.png';

const LoginPage = () => {
  const [userType, setUserType] = useState('Client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password, userType);
    if (result.success) {
      navigate(userType === 'Lawyer' ? '/lawyer/dashboard' : '/client/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* هيدر اللوجو والكلام جنب بعض */}
        <div className="logo-header-inline">
          <img src={logo} alt="LawLink Logo" className="auth-logo-small" />
          <div className="header-text-group">
            <h2>Welcome Back</h2>
            <p>your Law Simplified</p>
          </div>
        </div>

        {/* التبديل بين محامي وعميل */}
        <div className="user-toggle">
          <button type="button" className={`toggle-btn ${userType === 'Client' ? 'active' : ''}`} onClick={() => setUserType('Client')}>
            <FaUser /> Client
          </button>
          <button type="button" className={`toggle-btn ${userType === 'Lawyer' ? 'active' : ''}`} onClick={() => setUserType('Lawyer')}>
            <FaGavel /> Lawyer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input type="email" className="law-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input type="password" className="law-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Checking..." : `Sign In as ${userType}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;