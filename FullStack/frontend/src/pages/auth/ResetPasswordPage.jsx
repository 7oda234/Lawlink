// ═══════════════════════════════════════════════════════════════════════════════════
// Reset Password Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة اعادة تعيين كلمة السر - Reset Password flow
// Authentication page for entering a new password.
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import "../../styles/auth/AuthBase.css";
import AuthShell from '../../components/AuthShell';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    navigate('/verify-email');
  };

  // 📍 Return section starts here
  return (
    <AuthShell>
      <div className="auth-container">
      <div className="brand-sidebar">
        <div className="brand-content">
          <h1 className="brand-logo">LawLink</h1>
          <h2 className="welcome-text">Security First.</h2>
        </div>
      </div>
      <div className="form-section">
        <div className="auth-card">
          <h2 className="form-title">{t('auth.resetPassword.title')}</h2>
          <p className="form-subtitle">{t('auth.resetPassword.subtitle')}</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('auth.resetPassword.newPassword')}</label>
              <input
                type="password"
                className="law-input"
                placeholder={t('auth.resetPassword.newPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('auth.resetPassword.confirmPassword')}</label>
              <input
                type="password"
                className="law-input"
                placeholder={t('auth.resetPassword.confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-text">{error}</div>}
            <button type="submit" className="btn-law">{t('auth.resetPassword.updatePassword')}</button>
          </form>
        </div>
      </div>
    </div>
    </AuthShell>
  );
};

export default ResetPasswordPage;
