import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MoneyBill, ShieldCheck, Camera, Save } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; 

const ClientMyProfilePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  // State mapped to users and client tables from BackUp8.sql
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    Phone_no1: '',
    Phone_no2: '',
    Date_of_Birth: '',
    gender: '',
    income_level: '',
    image_url: localStorage.getItem('userImage') || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Simulating a fetch for user_id 13 from the database
    const timer = setTimeout(() => {
      setProfileData({
        name: 'أحمد العميل التجريبي',
        email: 'ahmed.client@lawlink.com',
        Phone_no1: '01223344556',
        Phone_no2: '',
        Date_of_Birth: '1998-10-10',
        gender: 'ذكر',
        income_level: '15000.00',
        image_url: ''
      });
      setIsLoading(false); 
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      title: "My Profile",
      personal: "Personal Info",
      contact: "Contact Info",
      financial: "Financial Profile",
      labels: {
        name: "Full Name",
        email: "Email Address",
        phone1: "Primary Phone",
        income: "Monthly Income"
      }
    },
    eg: {
      title: "الملف الشخصي",
      personal: "المعلومات الشخصية",
      contact: "بيانات التواصل",
      financial: "البيانات المالية",
      labels: {
        name: "الاسم بالكامل",
        email: "البريد الإلكتروني",
        phone1: "رقم الهاتف الأساسي",
        income: "الدخل الشهري"
      }
    }
  };

  const t = content[language] || content['eg'];

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card !max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="relative">
            <img 
              src={profileData.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
              alt="Avatar" 
              className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-yellow-500 shadow-xl"
            />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h1 className="client-h1 !mb-1 italic">{profileData.name}</h1>
            <p className="client-subtitle mb-4 italic uppercase tracking-widest !text-xs opacity-60">LawLink Client Profile</p>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="client-btn-primary !w-auto !px-8 !py-2.5 !text-sm italic"
            >
              {isEditing ? <><Save size={16} className="inline mx-1"/> Save Changes</> : "Edit Profile"}
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-6">
            <h3 className="client-label flex items-center gap-2 !text-slate-400">
               <User size={16} /> {t.personal}
            </h3>
            <div className="client-input-group">
              <label className="client-label !text-[10px]">{t.labels.name}</label>
              <input name="name" disabled={!isEditing} className="client-input" value={profileData.name} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="client-label flex items-center gap-2 !text-slate-400">
               <ShieldCheck size={16} /> {t.contact}
            </h3>
            <div className="client-input-group">
              <label className="client-label !text-[10px]">{t.labels.phone1}</label>
              <input name="Phone_no1" disabled={!isEditing} className="client-input" value={profileData.Phone_no1} onChange={handleInputChange} />
            </div>
            <div className="client-input-group">
              <label className="client-label !text-[10px]">{t.labels.income}</label>
              <div className="relative">
                <MoneyBill className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} opacity-30`} size={18} />
                <input name="income_level" type="number" disabled={!isEditing} className={`client-input ${isRTL ? 'pr-12' : 'pl-12'}`} value={profileData.income_level} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ClientMyProfilePage;
