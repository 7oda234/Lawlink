// ═══════════════════════════════════════════════════════════════════════════════════
// Forgot Password Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة استرجاع كلمة السر - Forgot Password flow
// Authentication page for password recovery.
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from '../../context/useLanguage';
import "../../styles/auth/AuthBase.css";
import AuthShell from '../../components/AuthShell';
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setMessage('A password reset link has been sent if the email exists.');
    setTimeout(() => navigate('/reset-password'), 1200);
  };

  // 📍 Return section starts here
  return (
    <AuthShell>
      <div className="auth-container">
      <div className="brand-sidebar">
        <div className="brand-content">
          <h1 className="brand-logo">LawLink</h1>
          <h2 className="welcome-text">Recover Access.</h2>
        </div>
      </div>
      <div className="form-section">
        <div className="auth-card">
          <h2 className="form-title">Reset Password</h2>
          <p className="form-subtitle">Enter your email to receive a reset link.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('auth.forgotPassword.email')}</label>
              <input
                type="email"
                className="law-input"
                placeholder={t('auth.forgotPassword.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-text">{error}</div>}
            {message && <div className="success-text">{message}</div>}
            <button type="submit" className="btn-law">{t('auth.forgotPassword.sendLink')}</button>
          </form>
          <p className="footer-link">
            <Link to="/login">{t('auth.forgotPassword.backToLogin')}</Link>
          </p>
        </div>
      </div>
    </div>    </AuthShell>  );
};

export default ForgotPasswordPage;
