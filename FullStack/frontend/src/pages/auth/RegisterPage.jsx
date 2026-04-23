import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaLock, FaEnvelope, FaGavel, FaUser, FaArrowRight } from 'react-icons/fa';
// import { useLanguage } from '../../context/useLanguage';
import logo from '../../Assets/logo/logo lawlink transparent.png'; 
import AuthShell from '../../components/AuthShell';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('client');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2) {
      if (formData.password.length < 8) {
        setErrors({ password: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' });
        return;
      }
      // Save progress to session and move to specific pages
      sessionStorage.setItem('reg_base', JSON.stringify({ ...formData, userType }));
      navigate(userType === 'client' ? '/register/client/continue' : '/register/lawyer/continue');
    }
  };

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LawLink</h1>
              <h2 className="welcome-text">{step === 1 ? "خطوة البداية" : "تأمين الحساب"}</h2>
              <p className="brand-tagline">انضم إلى أكبر شبكة قانونية ذكية في مصر.</p>
            </div>
          </div>

          <div className="form-section">
            <div className="auth-card">
              <div className="logo-container">
                <img src={logo} alt="LawLink Logo" />
              </div>
              
              <div className="user-toggle mb-6">
                <button type="button" className={`toggle-btn ${userType === 'client' ? 'active' : ''}`} onClick={() => setUserType('client')}>
                  <FaUser /> Client
                </button>
                <button type="button" className={`toggle-btn ${userType === 'lawyer' ? 'active' : ''}`} onClick={() => setUserType('lawyer')}>
                  <FaGavel /> Lawyer
                </button>
              </div>

              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                  <>
                    <div className="form-group">
                      <label>الاسم الكامل</label>
                      <input type="text" name="fullName" className="law-input" placeholder="أدخل اسمك الثلاثي" onChange={handleChange} required />
                      {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                      <label>البريد الإلكتروني</label>
                      <input type="email" name="email" className="law-input" placeholder="example@lawlink.com" onChange={handleChange} required />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>كلمة المرور</label>
                      <input type="password" name="password" className="law-input" placeholder="********" onChange={handleChange} required />
                      {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                      <label>تأكيد كلمة المرور</label>
                      <input type="password" name="confirmPassword" className="law-input" placeholder="********" onChange={handleChange} required />
                    </div>
                  </>
                )}

                <button type="button" onClick={handleNext} className="btn-submit">
                  {step === 1 ? "المتابعة للأمان" : "المتابعة للبيانات الشخصية"} <FaArrowRight className="inline ms-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthShell>
  );
};

export default RegisterPage;
