import React, { useState } from 'react';
// ✅ غيرنا VenusMars و MoneyBill لأسماء موجودة فعلاً في المكتبة
import { User, Mail, Phone, Calendar, Banknote, ShieldCheck, Camera, Save, ArrowLeft, UserCircle } from 'lucide-react';
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

  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    Phone_no1: '01223344556', 
    Date_of_Birth: '1998-10-10', 
    gender: 'ذكر', 
    income_level: '15000.00'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/client/profile');
  };

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card">
        <div className="flex items-center gap-6 mb-10 border-b border-slate-500/10 pb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-yellow-500/10 rounded-full transition-all">
             <ArrowLeft size={24} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <h1 className="client-h1 !mb-0">{isRTL ? 'تعديل البيانات' : 'Edit Profile'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="client-input-group">
            <label className="client-label flex items-center gap-2"><User size={14}/> الاسم الكامل</label>
            <input name="name" className="client-input" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="client-input-group">
              <label className="client-label flex items-center gap-2"><Calendar size={14}/> تاريخ الميلاد</label>
              <input name="Date_of_Birth" type="date" className="client-input" value={formData.Date_of_Birth} onChange={handleInputChange} />
            </div>
            <div className="client-input-group">
              <label className="client-label flex items-center gap-2">
                {/* ✅ استبدلنا VenusMars بـ UserCircle */}
                <UserCircle size={14}/> الجنس
              </label>
              <select name="gender" className="client-select" value={formData.gender} onChange={handleInputChange}>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>
          </div>

          <button type="submit" className="client-btn-primary mt-8">
            <Save size={20} /> {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ClientEditProfilePage;