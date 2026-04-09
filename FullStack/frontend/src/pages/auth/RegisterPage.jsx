import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaLock, FaEnvelope, FaGavel, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/useAuth';
import { useLanguage } from '../../context/useLanguage';
import logo from '../../Assets/logo/logo canvas.png'; 
import AuthShell from '../../components/AuthShell';

/**
 * صفحة التسجيل - Register Page
 * بتدعم تسجيل كلينت أو لاير
 */
const RegisterPage = () => {
  // 👤 حالة نوع المستخدم - state to track which user type is selected (client or lawyer)
  const [userType, setUserType] = useState('client');

  // 📝 حالة البيانات الأساسية - basic registration data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // ⚠️ حالة الأخطاء - error states
  const [errors, setErrors] = useState({});

  // 🔄 حالة التحميل - loading state
  const [loading, setLoading] = useState(false);

  // 🧭 التنقل - navigation
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 🔐 سياق المصادقة - auth context
  const { register } = useAuth();

  // 📝 دالة تحديث البيانات - handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ✅ دالة التحقق من الصحة - validation function
  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'الاسم الكامل يجب أن يكون على الأقل حرفين';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 📝 دالة معالجة الإرسال - handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // إرسال البيانات الأساسية للتسجيل - Send basic registration data
      const result = await register({
        ...formData,
        userType
      });

      if (result.success) {
        // التنقل لصفحة الاستكمال حسب نوع المستخدم - Navigate to continue page based on user type
        if (userType === 'client') {
          navigate('/register/client/continue');
        } else {
          navigate('/register/lawyer/continue');
        }
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      setErrors({ general: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrapper الأساسي اللي بيعمل الخلفية الـ Dark
    <AuthShell>
      <div className="auth-wrapper">
      <div className="auth-container">
        {/* الجزء اللي على الشمال - Brand Sidebar */}
        <div className="brand-sidebar">
          <div className="brand-content">
            <h1 className="brand-logo">LawLink</h1>
            <h2 className="welcome-text">Join LawLink.</h2>
            <p className="brand-tagline">Redefining legal access through intelligent technology.</p>
          </div>
        </div>

        {/* الجزء اللي على اليمين - Form Section */}
          <div className="auth-card">
            <>
              <div className="logo-container">
                <img src={logo} alt="LawLink Logo" />
              </div>
              <h2 className="form-title">{t('auth.register.title')}</h2>
              <p className="form-subtitle">{t('auth.register.subtitle')}</p>

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

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{t('auth.register.fullName')}</label>
                  <div className="input-container">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="fullName"
                      className="law-input"
                      placeholder={t('auth.register.placeholderFullName')}
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>{t('auth.register.email')}</label>
                  <div className="input-container">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      className="law-input"
                      placeholder={t('auth.register.placeholderEmail')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>{t('auth.register.password')}</label>
                  <div className="input-container">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      name="password"
                      className="law-input"
                      placeholder={t('auth.register.placeholderPassword')}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* رسالة خطأ عامة - General error message */}
                {errors.general && <div className="error-text" style={{ textAlign: 'center', marginBottom: '15px' }}>{errors.general}</div>}

                {/* استخدمنا btn-submit عشان التنسيق يبان */}
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? t('auth.register.createAccountButton') : t('auth.register.createAccountButton')}
                </button>
              </form>

              <p className="footer-link">
                {t('auth.register.alreadyHaveAccount')} <Link to="/login">{t('auth.register.signIn')}</Link>
              </p>
            </>
          </div>
      </div>
    </div>
    </AuthShell>
  );
};

export default RegisterPage;
