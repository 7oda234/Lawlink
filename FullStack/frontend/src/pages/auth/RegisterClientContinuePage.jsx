import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaPhone, FaCalendar, FaVenusMars, FaMoneyBill, FaArrowLeft, FaImage } from 'react-icons/fa';
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
    income: '',
    image: '' // إضافة حقل الصورة
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  // Safety check: Ensure the user completed steps 1 & 2
  useEffect(() => {
    const baseData = sessionStorage.getItem('reg_base');
    if (!baseData) {
      navigate('/register'); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.general) setErrors({});
  };

  // دالة لتحويل الصورة إلى Base64 لتخزينها في قاعدة البيانات
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
        role: 'Client', 
        Phone_no1: formData.phone1,
        Phone_no2: formData.phone2,
        gender: formData.gender,
        Date_of_Birth: formData.dateOfBirth,
        income_level: parseFloat(formData.income) || 0,
        image_url: formData.image || null // إرسال الصورة
      });

      if (result.success) {
        sessionStorage.removeItem('reg_base'); 
        navigate('/login');
      } else {
        setErrors({ general: "⚖️ هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول." });
      }
    } catch (err) {
      console.error("Registration API Error:", err); 
      setErrors({ general: '🔌 عذراً، تعذر الاتصال بالسيرفر. تأكد من تشغيل الـ Backend.' });
    } finally {
      setLoading(false);
    }
  };

  // Progress logic: Step 3 = 60%, Step 4 = 80%, Step 5 = 100%
  const progressPercent = step === 3 ? '60%' : step === 4 ? '80%' : '100%';

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LAW<span>LINK</span></h1>
              <h2 className="welcome-text">إكمال الملف الشخصي</h2>
              <p className="brand-tagline">خطوات بسيطة لنقدم لك أفضل الخدمات القانونية المصممة خصيصاً لك.</p>
            </div>
          </div>

          <div className="form-section">
            <div className="logo-container">
              <img src={logo} alt="LawLink Logo" />
            </div>
            
            <h2 className="form-title">إعداد حساب الموكل</h2>
            <p className="form-subtitle">يرجى تزويدنا ببيانات التواصل والبيانات الشخصية</p>

            <div className="progress-container">
              <div className="progress-fill" style={{ width: progressPercent }}></div>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              
              {step === 3 && (
                <div className="animate-fadeIn">
                  <div className="form-row">
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
                  <div className="form-group mt-4">
                    <label>الصورة الشخصية (اختياري)</label>
                    <div className="input-container">
                      <FaImage className="input-icon" />
                      <input type="file" accept="image/*" onChange={handleImageChange} className="law-input !pt-2" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="form-row animate-fadeIn">
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

              {step === 5 && (
                <div className="animate-fadeIn">
                  <div className="form-group">
                    <label>مستوى الدخل الشهري (EGP)</label>
                    <div className="input-container">
                      <FaMoneyBill className="input-icon" />
                      <input type="number" name="income" className="law-input" placeholder="مثال: 7000" value={formData.income} onChange={handleChange} required />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                    <span className="text-yellow-500 font-bold">ملاحظة:</span> نستخدم هذه البيانات لضمان تحديد أتعاب المحاماة بما يتناسب مع قدرتك المادية، لضمان العدالة وتكافؤ الفرص.
                  </p>
                </div>
              )}

              {errors.general && (
                <div className="error-text bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center mb-4 text-sm mt-4">
                  {errors.general}
                </div>
              )}

              <div className="flex gap-4 mt-8">
                {step > 3 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn-submit !bg-slate-800 !text-white flex-1">
                    السابق
                  </button>
                )}
                <button type="submit" className="btn-submit flex-[2]" disabled={loading}>
                  {loading ? 'جاري التحقق...' : step === 5 ? 'إتمام التسجيل' : 'المتابعة'} 
                  {step !== 5 && <FaArrowLeft className="inline ms-2 text-sm" />}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </AuthShell>
  );
};

export default RegisterClientContinuePage;
