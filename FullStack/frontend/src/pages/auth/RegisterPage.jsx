import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaLock, FaEnvelope, FaGavel, FaUser, FaArrowLeft } from 'react-icons/fa';
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
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'كلمات المرور غير متطابقة' });
        return;
      }
      sessionStorage.setItem('reg_base', JSON.stringify({ ...formData, userType }));
      navigate(userType === 'client' ? '/register/client/continue' : '/register/lawyer/continue');
    }
  };

  // Progress calculation (Step 1 = 20%, Step 2 = 40%)
  const progressPercent = step === 1 ? '20%' : '40%';

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LAW<span>LINK</span></h1>
              <h2 className="welcome-text">{step === 1 ? "خطوة البداية" : "تأمين الحساب"}</h2>
              <p className="brand-tagline">انضم إلى أكبر شبكة قانونية ذكية في مصر. قم بإنشاء حسابك الآن للبدء.</p>
            </div>
          </div>

          <div className="form-section">
            <div className="logo-container">
              <img src={logo} alt="LawLink Logo" />
            </div>
            
            <h2 className="form-title">إنشاء حساب جديد</h2>
            <p className="form-subtitle">أدخل بياناتك الأساسية للبدء في التسجيل</p>

            {/* Visual Progress Bar */}
            <div className="progress-container">
              <div className="progress-fill" style={{ width: progressPercent }}></div>
            </div>

            <div className="user-toggle">
              <button type="button" className={`toggle-btn ${userType === 'client' ? 'active' : ''}`} onClick={() => setUserType('client')}>
                <FaUser /> حساب موكل
              </button>
              <button type="button" className={`toggle-btn ${userType === 'lawyer' ? 'active' : ''}`} onClick={() => setUserType('lawyer')}>
                <FaGavel /> حساب محامي
              </button>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              {step === 1 ? (
                <div className="animate-fadeIn">
                  <div className="form-group">
                    <label>الاسم الكامل</label>
                    <div className="input-container">
                      <FaUser className="input-icon" />
                      <input type="text" name="fullName" className="law-input" placeholder="أدخل اسمك الثلاثي" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <div className="input-container">
                      <FaEnvelope className="input-icon" />
                      <input type="email" name="email" className="law-input" placeholder="example@lawlink.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="form-group">
                    <label>كلمة المرور</label>
                    <div className="input-container">
                      <FaLock className="input-icon" />
                      <input type="password" name="password" className="law-input" placeholder="********" value={formData.password} onChange={handleChange} required />
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>تأكيد كلمة المرور</label>
                    <div className="input-container">
                      <FaLock className="input-icon" />
                      <input type="password" name="confirmPassword" className="law-input" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className="btn-submit !bg-slate-800 !text-white flex-1">
                    السابق
                  </button>
                )}
                <button type="button" onClick={handleNext} className="btn-submit flex-[2]">
                  {step === 1 ? "المتابعة للأمان" : "المتابعة للبيانات الشخصية"} <FaArrowLeft className="inline ms-2 text-sm" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </AuthShell>
  );
};

export default RegisterPage;
