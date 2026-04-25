import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, VenusMars, MoneyBill, ShieldCheck, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; 

const ClientEditProfilePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  // State mapping to BackUp8.sql 'users' and 'client' tables
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    Phone_no1: '01223344556', // Sample from DB
    Phone_no2: '',
    Date_of_Birth: '1998-10-10', // Sample from DB
    gender: 'ذكر', // Sample from DB
    income_level: '15000.00', // Sample from DB
    image_url: localStorage.getItem('userImage') || ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulating loading data from the database
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      title: "Edit Profile",
      subtitle: "Update your personal and contact information securely.",
      btnSave: "Update Profile",
      btnBack: "Back to Profile",
      personal: "Identity Details",
      contact: "Communication",
      financial: "Economic Status",
      labels: {
        name: "Full Legal Name",
        email: "Primary Email",
        phone1: "Phone Number 1",
        phone2: "Phone Number 2",
        dob: "Date of Birth",
        gender: "Gender",
        income: "Monthly Income Level"
      }
    },
    eg: {
      title: "تعديل البيانات",
      subtitle: "تحديث معلوماتك الشخصية وبيانات التواصل بأمان.",
      btnSave: "تحديث الملف الشخصي",
      btnBack: "العودة للملف",
      personal: "بيانات الهوية",
      contact: "بيانات التواصل",
      financial: "الحالة الاقتصادية",
      labels: {
        name: "الاسم القانوني بالكامل",
        email: "البريد الإلكتروني الأساسي",
        phone1: "رقم الهاتف 1",
        phone2: "رقم الهاتف 2",
        dob: "تاريخ الميلاد",
        gender: "الجنس",
        income: "مستوى الدخل الشهري"
      }
    }
  };

  const t = content[language] || content['eg'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API PUT request to update 'users' and 'client' tables
    setTimeout(() => {
      setIsSaving(false);
      navigate('/client/profile');
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card !max-w-5xl">
        
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/client/profile')} className="p-3 bg-slate-900 text-white rounded-2xl border border-white/10 hover:bg-yellow-500 hover:text-slate-950 transition-all">
              <ArrowLeft size={20} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <div>
              <h1 className="client-h1 !mb-1 italic uppercase tracking-tighter">{t.title}</h1>
              <p className="client-subtitle !text-sm">{t.subtitle}</p>
            </div>
          </div>
          <div className="ai-icon-wrapper !mb-0 !w-16 !h-16">
            <User />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Column 1: Core Identity (users table) */}
            <div className="space-y-8">
              <h3 className="client-label flex items-center gap-2 !text-slate-400 opacity-60">
                 <ShieldCheck size={16} /> {t.personal}
              </h3>
              
              <div className="client-input-group">
                <label className="client-label !text-[10px]">{t.labels.name}</label>
                <input name="name" className="client-input" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="client-input-group">
                  <label className="client-label !text-[10px]">{t.labels.dob}</label>
                  <input name="Date_of_Birth" type="date" className="client-input" value={formData.Date_of_Birth} onChange={handleInputChange} />
                </div>
                <div className="client-input-group">
                  <label className="client-label !text-[10px]">{t.labels.gender}</label>
                  <select name="gender" className="client-select" value={formData.gender} onChange={handleInputChange}>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Column 2: Contact & Financial (users & client tables) */}
            <div className="space-y-8">
              <h3 className="client-label flex items-center gap-2 !text-slate-400 opacity-60">
                 <Phone size={16} /> {t.contact}
              </h3>

              <div className="client-input-group">
                <label className="client-label !text-[10px]">{t.labels.phone1}</label>
                <input name="Phone_no1" className="client-input" value={formData.Phone_no1} onChange={handleInputChange} maxLength="11" />
              </div>

              <div className="client-input-group">
                <label className="client-label !text-[10px]">{t.labels.phone2}</label>
                <input name="Phone_no2" className="client-input" value={formData.Phone_no2} onChange={handleInputChange} maxLength="11" placeholder="Secondary Phone" />
              </div>

              <h3 className="client-label flex items-center gap-2 !text-slate-400 opacity-60 pt-4">
                 <MoneyBill size={16} /> {t.financial}
              </h3>

              <div className="client-input-group">
                <label className="client-label !text-[10px]">{t.labels.income}</label>
                <input name="income_level" type="number" step="0.01" className="client-input" value={formData.income_level} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Submission Area */}
          <div className="pt-10 border-t border-slate-200 dark:border-white/5">
            <button type="submit" disabled={isSaving} className="client-btn-primary !w-full !py-5 italic text-xl">
              {isSaving ? <div className="spinner" /> : <><Save size={24} /> {t.btnSave}</>}
            </button>
          </div>
        </form>
      </main>

      <p className="mt-8 text-center client-banner-text !opacity-30">
        LawLink Secure Identity Management • Protected by AES-256 • BIS AASTMT 2026
      </p>
    </div>
  );
};

export default ClientEditProfilePage;
