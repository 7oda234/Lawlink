import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaPhone, FaIdCard, FaBriefcase, FaCalendar, FaVenusMars, FaStar, FaArrowLeft, FaImage, FaMapMarkerAlt } from 'react-icons/fa'; // 👈 تم إضافة أيقونة الموقع
import { useAuth } from '../../context/useAuth';
import AuthShell from '../../components/AuthShell';
import logo from '../../Assets/logo/logo canvas.png';

const RegisterLawyerContinuePage = () => {
  const [step, setStep] = useState(3);
  const [formData, setFormData] = useState({
    phone1: '', 
    phone2: '', 
    gender: '', 
    dateOfBirth: '', 
    licenseNumber: '', 
    specialization: '',
    yearsExperience: '',
    image: '',
    officeAddress: '' // 🚀✅ تم إضافة حقل عنوان المكتب في الـ State
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

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
      const payload = {
        name: baseData.fullName,
        email: baseData.email,
        password: baseData.password,
        role: 'Lawyer',
        Phone_no1: formData.phone1,
        Phone_no2: formData.phone2, 
        gender: formData.gender,
        Date_of_Birth: formData.dateOfBirth,
        
        licenseNumber: formData.licenseNumber,
        specialization: formData.specialization,
        
        license_number: formData.licenseNumber,
        specializations: [formData.specialization],
        
        years_experience: parseInt(formData.yearsExperience) || 0,
        image_url: formData.image || null,
        office_address: formData.officeAddress // 🚀✅ إرسال عنوان المكتب للـ Backend
      };

      const result = await register(payload);

      if (result.success) {
        sessionStorage.removeItem('reg_base');
        navigate('/login');
      } else {
        setErrors({ general: `⚖️ خطأ: ${result.error || "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول."}` });
      }
      
    } catch (err) {
      console.error("Registration API Error:", err); 
      setErrors({ general: '🔌 عذراً، تعذر الاتصال بالسيرفر. تأكد من تشغيل الـ Backend.' });
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = step === 3 ? '60%' : step === 4 ? '80%' : '100%';

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container">
          
          <div className="brand-sidebar">
            <div className="brand-content">
              <h1 className="brand-logo">LAW<span>LINK</span></h1>
              <h2 className="welcome-text">البيانات المهنية</h2>
              <p className="brand-tagline">أثبت هويتك القانونية وساعد الموكلين في الوصول إليك بسهولة واحترافية عبر تخصصك.</p>
            </div>
          </div>

          <div className="form-section">
            <div className="logo-container">
              <img src={logo} alt="LawLink Logo" />
            </div>
            
            <h2 className="form-title">إعداد حساب المحامي</h2>
            <p className="form-subtitle">أكمل التوثيق المهني لتفعيل حسابك واستقبال القضايا</p>

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
                  <div className="form-row mt-4">
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
                    <div className="form-group">
                      <label>الصورة الشخصية (اختياري)</label>
                      <div className="input-container">
                        <FaImage className="input-icon" />
                        <input type="file" accept="image/*" onChange={handleImageChange} className="law-input !pt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fadeIn">
                  <div className="form-row">
                    <div className="form-group">
                      <label>رقم رخصة المزاولة (الكارنيه)</label>
                      <div className="input-container">
                        <FaIdCard className="input-icon" />
                        <input type="text" name="licenseNumber" className="law-input" placeholder="أدخل رقم الكارنيه" value={formData.licenseNumber} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>سنوات الخبرة</label>
                      <div className="input-container">
                        <FaStar className="input-icon" />
                        <input type="number" name="yearsExperience" className="law-input" placeholder="مثال: 5" min="0" max="60" value={formData.yearsExperience} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                  {/* 🚀✅ إضافة حقل عنوان المكتب في سطر منفصل ليعطي مساحة للكتابة */}
                  <div className="form-group mt-4">
                    <label>عنوان المكتب</label>
                    <div className="input-container">
                      <FaMapMarkerAlt className="input-icon" />
                      <input type="text" name="officeAddress" className="law-input" placeholder="مثال: القاهرة، مدينة نصر، شارع مكرم عبيد" value={formData.officeAddress} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="form-row animate-fadeIn">
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
                        <option value="">اختر التخصص الأساسي</option>
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
                  {loading ? 'جاري الحفظ...' : step === 5 ? 'إرسال للمراجعة' : 'المتابعة'}
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

export default RegisterLawyerContinuePage;