// ════════════════════════════════════════════════════════════════════════
// 🔐 صفحة تسجيل الدخول - Login Page
// ════════════════════════════════════════════════════════════════════════
// الصفحة ديت للدخول للتطبيق سواء كعميل أو محامي
// Users can sign in as either a Client or a Lawyer
// ────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaGavel, FaUser } from 'react-icons/fa';  // 🎨 استيراد icons - importing icons
import '../../styles/auth/AuthBase.css';  // 🎨 استيراد ستايلات المصادقة - auth styles
import { useAuth } from '../../context/useAuth';
import { useLanguage } from '../../context/useLanguage';
import logo from '../../Assets/logo/logo canvas.png';  // 📦 استيراد شعار الشركة - company logo
import AuthShell from '../../components/AuthShell';

const LoginPage = () => {
  // 👤 حالة نوع المستخدم - يمكن يكون 'client' أو 'lawyer'
  // state to track which user type is selected (client or lawyer)
  const [userType, setUserType] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (userType === 'client') {
        navigate('/client/dashboard');
      } else {
        navigate('/lawyer/dashboard');
      }
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  // 📍 Return section starts here
  return (
    <AuthShell>
      <div className="auth-wrapper">
      <div className="auth-card">
        {/* Logo Section */}
<div className="logo-container">
  <img src={logo} alt="LawLink Logo" />
</div>

        <h2 className="form-title">{t('auth.login.title')}</h2>
        <p className="form-subtitle">{t('auth.login.subtitle')}</p>

        {/* User Type Toggle */}
        <div className="user-toggle">
          <button 
            type="button"
            className={`toggle-btn ${userType === 'client' ? 'active' : ''}`}
            onClick={() => setUserType('client')}
          >
            <FaUser /> {t('auth.login.clientPortal')}
          </button>
          <button 
            type="button"
            className={`toggle-btn ${userType === 'lawyer' ? 'active' : ''}`}
            onClick={() => setUserType('lawyer')}
          >
            <FaGavel /> {t('auth.login.lawyerPortal')}
          </button>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('auth.login.email')}</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                className="law-input" 
                placeholder={t('auth.login.email')} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('auth.login.password')}</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                className="law-input" 
                placeholder={t('auth.login.password')} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> {t('auth.login.remember')}
            </label>
            <Link to="/forgot-password" id="forgot-link">{t('auth.login.forgotPassword')}</Link>
          </div>

          {error && <div className="error-text" style={{ textAlign: 'center', marginBottom: '12px' }}>{error}</div>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? t('auth.login.signInAsClient') : userType === 'client' ? t('auth.login.signInAsClient') : t('auth.login.signInAsLawyer')}
          </button>
        </form>

        <p className="footer-link">
          {t('auth.login.noAccount')} <Link to="/register">{t('auth.login.createAccount')}</Link>
        </p>
      </div>
    </div>
    </AuthShell>
  );
};

export default LoginPage;
