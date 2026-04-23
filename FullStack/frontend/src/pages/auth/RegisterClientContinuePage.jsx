import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaPhone, FaCalendar, FaVenusMars, FaMoneyBill } from 'react-icons/fa';
import { useAuth } from '../../context/useAuth';
import AuthShell from '../../components/AuthShell';
import logo from '../../Assets/logo/logo canvas.png';

const RegisterClientContinuePage = () => {
  const [step, setStep] = useState(3);
  const [formData, setFormData] = useState({
    phone1: '', 
    phone2: '',
    dateOfBirth: '', 
    gender: '', 
    income: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.general) setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Progress through internal steps (3 and 4)
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    // Step 5: Final API Submission
    setLoading(true);
    
    // Retrieve base data (Name, Email, Password) saved from RegisterPage.jsx
    const baseData = JSON.parse(sessionStorage.getItem('reg_base'));
    
    try {
      const result = await register({
        name: baseData.fullName,
        email: baseData.email,
        password: baseData.password,
        role: 'Client', // Matches database ENUM
        Phone_no1: formData.phone1,
        Phone_no2: formData.phone2,
        gender: formData.gender,
        Date_of_Birth: formData.dateOfBirth,
        income_level: formData.income
      });

      if (result.success) {
        sessionStorage.removeItem('reg_base'); // Clear temporary storage
        navigate('/login');
      } else {
        // Professional error message for existing users
        setErrors({ general: "⚖️ هذا البريد الإلكتروني مسجل بالفعل كعضو في LawLink. يرجى تسجيل الدخول." });
      }
    } catch (err) {
      console.error("Client Registration Error:", err);
      setErrors({ general: '🔌 عذراً، تعذر الاتصال بالسيرفر. تأكد من تشغيل الـ Backend.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LawLink</h1>
              <h2 className="welcome-text">إكمال الملف الشخصي</h2>
              <p className="brand-tagline">خطوات بسيطة لنقدم لك أفضل الخدمات القانونية الذكية.</p>
            </div>
          </div>

          <div className="form-section">
            <div className="auth-card">
              <div className="logo-container">
                <img src={logo} alt="LawLink Logo" />
              </div>
              
              <h2 className="form-title">المرحلة {step} من 5</h2>
              <p className="form-subtitle">يرجى تزويدنا ببيانات التواصل والبيانات الشخصية</p>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* STEP 3: Contact Details */}
                {step === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="form-group">
                      <label>رقم الهاتف الأساسي</label>
                      <div className="input-container">
                        <FaPhone className="input-icon" />
                        <input type="tel" name="phone1" className="law-input" placeholder="01xxxxxxxxx" value={formData.phone1} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>رقم الهاتف الإضافي (اختياري)</label>
                      <div className="input-container">
                        <FaPhone className="input-icon" />
                        <input type="tel" name="phone2" className="law-input" placeholder="01xxxxxxxxx" value={formData.phone2} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Personal Details */}
                {step === 4 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="form-group">
                      <label>تاريخ الميلاد</label>
                      <div className="input-container">
                        <FaCalendar className="input-icon" />
                        <input type="date" name="dateOfBirth" className="law-input" value={formData.dateOfBirth} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>الجنس</label>
                      <div className="input-container">
                        <FaVenusMars className="input-icon" />
                        <select name="gender" className="law-input" value={formData.gender} onChange={handleChange} required>
                          <option value="">اختر الجنس</option>
                          <option value="ذكر">ذكر</option>
                          <option value="أنثى">أنثى</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Financial Info */}
                {step === 5 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="form-group">
                      <label>مستوى الدخل الشهري (EGP)</label>
                      <div className="input-container">
                        <FaMoneyBill className="input-icon" />
                        <input 
                          type="number" 
                          name="income" 
                          className="law-input" 
                          placeholder="مثال: 7000" 
                          value={formData.income} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 px-2 leading-relaxed">
                      نستخدم هذه البيانات لتحديد أتعاب القضايا بما يتناسب مع حالتك المادية وفقاً لسياسة LawLink.
                    </p>
                  </div>
                )}

                {errors.general && (
                  <div className="error-text bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center mb-4">
                    {errors.general}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  {step > 3 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn-submit !bg-slate-800 !text-white flex-1">
                      السابق
                    </button>
                  )}
                  <button type="submit" className="btn-submit flex-[2]" disabled={loading}>
                    {loading ? 'جاري التحقق...' : (step === 5 ? 'إتمام التسجيل ⚖️' : 'المتابعة')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthShell>
  );
};

export default RegisterClientContinuePage;
