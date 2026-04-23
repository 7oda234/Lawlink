import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaPhone, FaIdCard, FaBriefcase, FaCalendar, FaVenusMars, FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/useAuth';
import AuthShell from '../../components/AuthShell';
import logo from '../../Assets/logo/logo canvas.png';

const RegisterLawyerContinuePage = () => {
  const [step, setStep] = useState(3);
  const [formData, setFormData] = useState({
    phone1: '', 
    gender: '', 
    dateOfBirth: '', 
    licenseNumber: '', 
    specialization: '',
    yearsExperience: '' // Added for experience field
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
    
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    const baseData = JSON.parse(sessionStorage.getItem('reg_base'));

    try {
      const result = await register({
        name: baseData.fullName,
        email: baseData.email,
        password: baseData.password,
        role: 'Lawyer',
        Phone_no1: formData.phone1,
        gender: formData.gender,
        Date_of_Birth: formData.dateOfBirth,
        license_number: formData.licenseNumber,
        specialization: formData.specialization,
        years_experience: parseInt(formData.yearsExperience) // Send as integer to match DB
      });

      if (result.success) {
        sessionStorage.removeItem('reg_base');
        navigate('/login');
      } else {
        setErrors({ general: "⚖️ هذا البريد الإلكتروني مسجل بالفعل كعضو في LawLink. يرجى تسجيل الدخول." });
      }
    } catch (err) {
      console.error("Registration Error:", err);
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
              <h2 className="welcome-text">البيانات المهنية</h2>
              <p className="brand-tagline">ساعد الموكلين في الوصول إليك عبر تخصصك القانوني.</p>
            </div>
          </div>

          <div className="form-section">
            <div className="auth-card">
              <div className="logo-container">
                <img src={logo} alt="LawLink Logo" />
              </div>
              
              <h2 className="form-title">المرحلة {step} من 5</h2>
              <p className="form-subtitle">يرجى إكمال البيانات المطلوبة لتفعيل حسابك المحامي</p>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* STEP 3: Contact & Gender */}
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

                {/* STEP 4: Experience & License */}
                {step === 4 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="form-group">
                      <label>رقم رخصة المزاولة (الكارنيه)</label>
                      <div className="input-container">
                        <FaIdCard className="input-icon" />
                        <input type="text" name="licenseNumber" className="law-input" placeholder="أدخل رقم الرخصة" value={formData.licenseNumber} onChange={handleChange} required />
                      </div>
                    </div>
                    {/* Added Years of Experience Field */}
                    <div className="form-group">
                      <label>سنوات الخبرة</label>
                      <div className="input-container">
                        <FaStar className="input-icon" />
                        <input 
                            type="number" 
                            name="yearsExperience" 
                            className="law-input" 
                            placeholder="مثال: 5" 
                            min="0"
                            max="60"
                            value={formData.yearsExperience} 
                            onChange={handleChange} 
                            required 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: Personal Info & Specialization */}
                {step === 5 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="form-group">
                      <label>تاريخ الميلاد</label>
                      <div className="input-container">
                        <FaCalendar className="input-icon" />
                        <input type="date" name="dateOfBirth" className="law-input" value={formData.dateOfBirth} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>التخصص القانوني</label>
                      <div className="input-container">
                        <FaBriefcase className="input-icon" />
                        <select name="specialization" className="law-input" value={formData.specialization} onChange={handleChange} required>
                          <option value="">اختر تخصصك الأساسي</option>
                          <option value="Civil Law">قانون مدني</option>
                          <option value="Criminal Law">قانون جنائي</option>
                          <option value="Family Law">قانون الأحوال الشخصية</option>
                          <option value="Corporate Law">قانون الشركات</option>
                          <option value="Intellectual Property">الملكية الفكرية</option>
                          <option value="Labor Law">قانون العمل</option>
                          <option value="Tax Law">قانون الضرائب</option>
                          <option value="International Law">القانون الدولي</option>
                          <option value="Other">أخرى</option>
                        </select>
                      </div>
                    </div>
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
                    {loading ? 'جاري الحفظ...' : (step === 5 ? 'إرسال للمراجعة ⚖️' : 'المتابعة')}
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

export default RegisterLawyerContinuePage;
