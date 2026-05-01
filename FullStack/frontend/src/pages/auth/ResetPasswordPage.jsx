import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
import "../../styles/auth/AuthBase.css";
import AuthShell from '../../components/AuthShell';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // التحقق من تطابق كلمة السر
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة.');
      return;
    }

    // التوجه لصفحة التأكيد بعد النجاح[cite: 9]
    navigate('/verify-email');
  };

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          {/* الجانب الجمالي (Sidebar) */}
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LAW<span>LINK</span></h1>
              <h2 className="welcome-text">الأمان أولاً</h2>
              <p className="brand-tagline">يرجى اختيار كلمة سر قوية وفريدة لحماية بياناتك القانونية وسجلاتك الشخصية.</p>
            </div>
          </div>

          {/* قسم النموذج (Form Section) */}
          <div className="form-section">
            <h2 className="form-title">إعادة تعيين كلمة السر</h2>
            <p className="form-subtitle">قم بإدخال كلمة السر الجديدة الخاصة بك للوصول إلى حسابك مرة أخرى.</p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>كلمة السر الجديدة</label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    className="law-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>تأكيد كلمة السر الجديدة</label>
                <div className="input-container">
                  <FaCheckCircle className="input-icon" />
                  <input
                    type="password"
                    className="law-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* عرض رسالة الخطأ إن وُجدت */}
              {error && (
                <div className="error-text bg-red-500/10 p-3 rounded-lg text-center mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <button type="submit" className="btn-submit">
                تحديث كلمة السر
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthShell>
  );
};

export default ResetPasswordPage;
