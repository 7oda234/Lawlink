import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Phone, Calendar, Banknote, Save, 
  ArrowLeft, UserCircle, Camera, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import "../../styles/client/ClientBase.css"; 

const ClientEditProfilePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    Phone_no1: '', 
    Phone_no2: '',
    Date_of_Birth: '', 
    gender: 'ذكر', 
    income_level: '',
    image_url: ''
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        if (response.data.success) {
          const data = response.data.data;
          setFormData({
            name: data.name || '',
            email: data.email || '',
            password: '', 
            Phone_no1: data.Phone_no1 || '',
            Phone_no2: data.Phone_no2 || '',
            Date_of_Birth: data.Date_of_Birth ? data.Date_of_Birth.split('T')[0] : '',
            gender: data.gender || 'ذكر',
            income_level: data.income_level || '',
            image_url: data.image_url || ''
          });
        }
      } catch (err) {
        console.error("Error fetching client data:", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchClientData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      
      if (res.data.success) {
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userImage', formData.image_url);
        localStorage.setItem('userEmail', formData.email);

        window.dispatchEvent(new Event('storage'));

        setStatusMsg({ 
          type: 'success', 
          text: isRTL ? 'تم حفظ البيانات وتحديث الملف الشخصي' : 'Profile updated successfully' 
        });

        setTimeout(() => navigate('/client/profile'), 1500);
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: isRTL ? 'فشل التحديث' : 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="loader">Loading...</div>;

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="client-card">
        <div className="flex items-center gap-6 mb-10 border-b border-slate-500/10 pb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-yellow-500/10 rounded-full transition-all">
             <ArrowLeft size={24} className={isRTL ? 'rotate-180' : ''} />
          </button>
          <h1 className="client-h1 !mb-0">{isRTL ? 'تعديل الملف الشخصي' : 'Edit Profile'}</h1>
        </div>

        {statusMsg.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            statusMsg.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
            <span className="text-sm font-bold">{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <img 
                src={formData.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                className="w-24 h-24 rounded-3xl object-cover border-4 border-yellow-500 shadow-lg"
                alt="Profile"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }} // ✅ حماية الصورة
              />
              <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="client-input-group">
               <label className="client-label flex items-center gap-2"><User size={14}/> {isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
               <input name="name" className="client-input" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="client-input-group">
               <label className="client-label flex items-center gap-2"><Mail size={14}/> {isRTL ? 'البريد الإلكتروني' : 'Email Address'}</label>
               <input name="email" type="email" className="client-input" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="client-input-group">
               <label className="client-label flex items-center gap-2"><Phone size={14}/> {isRTL ? 'رقم الهاتف الأساسي' : 'Primary Phone'}</label>
               <input name="Phone_no1" className="client-input" value={formData.Phone_no1} onChange={handleInputChange} />
            </div>
            <div className="client-input-group">
               <label className="client-label flex items-center gap-2"><Phone size={14}/> {isRTL ? 'رقم الهاتف الإضافي' : 'Secondary Phone'}</label>
               <input name="Phone_no2" className="client-input" value={formData.Phone_no2} onChange={handleInputChange} />
            </div>
            <div className="client-input-group">
              <label className="client-label flex items-center gap-2"><Calendar size={14}/> {isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</label>
              <input name="Date_of_Birth" type="date" className="client-input" value={formData.Date_of_Birth} onChange={handleInputChange} />
            </div>
            <div className="client-input-group">
              <label className="client-label flex items-center gap-2"><Banknote size={14}/> {isRTL ? 'الدخل الشهري' : 'Monthly Income'}</label>
              <input name="income_level" type="number" className="client-input" value={formData.income_level} onChange={handleInputChange} />
            </div>
            <div className="client-input-group">
              <label className="client-label flex items-center gap-2"><UserCircle size={14}/> {isRTL ? 'الجنس' : 'Gender'}</label>
              <select name="gender" className="client-select" value={formData.gender} onChange={handleInputChange}>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="client-btn-primary mt-8">
            <Save size={20} /> {loading ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ كافة التغييرات' : 'Save Changes')}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ClientEditProfilePage;