import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';
import "../../styles/auth/AuthBase.css";
import AuthShell from '../../components/AuthShell';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }

    // محاكاة إرسال الرابط بنجاح
    setMessage('تم إرسال رابط استعادة كلمة المرور بنجاح.');
    
    // الانتقال لصفحة تعيين كلمة السر الجديدة بعد وقت قصير
    setTimeout(() => navigate('/reset-password'), 2000);
  };

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          {/* الجانب الجمالي (Sidebar) */}
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LAW<span>LINK</span></h1>
              <h2 className="welcome-text">استعادة الوصول</h2>
              <p className="brand-tagline">لا تقلق، سنساعدك في العودة إلى حسابك بأمان وسهولة من خلال خطوات بسيطة.</p>
            </div>
          </div>
          
          {/* قسم النموذج (Form Section) */}
          <div className="form-section">
            <h2 className="form-title">نسيت كلمة السر؟</h2>
            <p className="form-subtitle">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة سر جديدة.</p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <div className="input-container">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    className="law-input"
                    placeholder="example@lawlink.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* عرض رسائل الخطأ أو النجاح */}
              {error && <div className="error-text bg-red-500/10 p-3 rounded-lg text-center mb-4 text-sm">{error}</div>}
              {message && <div className="success-text bg-green-500/10 p-3 rounded-lg text-center mb-4 text-sm" style={{color: '#22c55e'}}>{message}</div>}
              
              <button type="submit" className="btn-submit">
                إرسال رابط الاستعادة
                <FaArrowRight className="ms-2 text-sm" style={{transform: 'rotate(180deg)'}} />
              </button>
            </form>
            
            <p className="footer-link text-center mt-6">
              <Link to="/login" className="text-gray-400 hover:text-yellow-500 transition">
                العودة لتسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
};

export default ForgotPasswordPage;
