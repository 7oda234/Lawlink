import React, { useState } from 'react';
// ✅ غيرنا MoneyBill لـ Banknote عشان ميعملش Error
import { User, Mail, Phone, Banknote, ShieldCheck, Edit3 } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import "../../styles/client/ClientBase.css"; 

const ClientMyProfilePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  // بيانات من التخزين المحلي
  const [profileData] = useState({
    name: localStorage.getItem('userName') || 'محمود خالد',
    email: localStorage.getItem('userEmail') || 'client@lawlink.com',
    image_url: localStorage.getItem('userImage') || '',
    phone: '01223344556',
    income: '15000'
  });

  return (
    // ✅ التأكد من إضافة الكلاسات اللي في ملف الـ CSS بتاعك
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card">
        
        {/* هيدر الملف الشخصي */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-slate-500/10 pb-10">
          <div className="relative">
            <img 
              src={profileData.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
              alt="Avatar" 
              className="w-32 h-32 rounded-[2rem] object-cover border-4 border-yellow-500 shadow-xl"
            />
          </div>
          <div className="flex-1 text-center md:text-right">
            <h1 className="client-h1">{profileData.name}</h1>
            <p className="client-subtitle mb-6 opacity-60 uppercase text-xs tracking-widest">LawLink Client Profile</p>
            <Link to="/client/profile/edit" className="client-btn-primary !w-auto !inline-flex !px-8 !py-3 !text-sm">
              <Edit3 size={16} /> {isRTL ? 'تعديل البيانات' : 'Edit Profile'}
            </Link>
          </div>
        </div>

        {/* شبكة البيانات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="client-input-group">
            <label className="client-label flex items-center gap-2"><User size={14}/> الاسم</label>
            <div className="client-input opacity-80">{profileData.name}</div>
          </div>
          <div className="client-input-group">
            <label className="client-label flex items-center gap-2"><Mail size={14}/> الإيميل</label>
            <div className="client-input opacity-80">{profileData.email}</div>
          </div>
          <div className="client-input-group">
            <label className="client-label flex items-center gap-2"><Phone size={14}/> الهاتف</label>
            <div className="client-input opacity-80">{profileData.phone}</div>
          </div>
          <div className="client-input-group">
            <label className="client-label flex items-center gap-2"><Banknote size={14}/> الدخل</label>
            <div className="client-input opacity-80 font-bold text-yellow-500">{profileData.income} EGP</div>
          </div>
        </div>

        {/* بانر الأمان */}
        <div className="client-banner mt-10">
          <ShieldCheck className="text-yellow-500" size={20} />
          <span className="client-banner-text">Protected by LawLink Identity Management</span>
        </div>
      </main>
    </div>
  );
};

export default ClientMyProfilePage;