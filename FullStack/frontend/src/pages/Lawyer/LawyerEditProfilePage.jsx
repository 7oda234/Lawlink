import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { User, Save, Camera, Lock, Phone, Star, Mail, Hash, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const LawyerEditProfilePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    Phone_no1: '',
    Phone_no2: '',
    license_number: '', 
    years_experience: 0,
    specializations: '', 
    image_url: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
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
            license_number: data.license_number || '',
            years_experience: data.years_experience || 0,
            specializations: data.specialization || '', 
            image_url: data.image_url || '',
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image_url: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      
      if (response.data.success) {
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('userImage', formData.image_url);
        window.dispatchEvent(new Event('storage'));

        setStatusMsg({ 
          type: 'success', 
          text: isRTL ? 'تم حفظ التعديلات بنجاح' : 'Profile updated successfully!' 
        });
      }
    } catch (err) {
      setStatusMsg({ 
        type: 'error', 
        text: isRTL ? 'حدث خطأ أثناء الحفظ، حاول مرة أخرى' : 'Error saving changes' 
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
    }
  };

  const cardBg = mode === 'dark' ? 'bg-slate-900/50 border-gray-500/10' : 'bg-white border-gray-200';
  const inputClass = `w-full p-4 rounded-xl border transition-all outline-none font-bold text-sm ${
    mode === 'dark' 
      ? 'bg-slate-950/50 border-gray-500/20 focus:border-yellow-500/50 text-white' 
      : 'bg-gray-50 border-gray-200 focus:border-yellow-500 text-slate-900'
  }`;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-10">
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <User className="text-yellow-500" size={32} />
            {isRTL ? 'تعديل الملف الشخصي' : 'Edit Profile'}
          </h1>
          <p className="text-slate-500 font-bold">
            {isRTL ? 'قم بتحديث بياناتك المهنية والشخصية' : 'Update your professional and personal information'}
          </p>
        </div>
      </div>

      {statusMsg.text && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
          statusMsg.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
          <span className="font-bold text-sm">{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <section className={`p-8 rounded-3xl border ${cardBg} relative overflow-hidden`}>
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-yellow-500/20 overflow-hidden bg-slate-800">
                {formData.image_url ? (
                  <img 
                    src={formData.image_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }} // ✅ حماية الصورة
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <User size={48} />
                  </div>
                )}
              </div>
              <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-yellow-500 p-3 rounded-full text-black hover:scale-110 transition-transform shadow-lg">
                <Camera size={20} />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
        </section>

        <section className={`p-8 rounded-3xl border ${cardBg}`}>
          <h2 className="text-xl font-black mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-yellow-500 rounded-full" />
            {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-right">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><User size={14}/> {isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
              <input name="name" value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Mail size={14}/> {isRTL ? 'البريد الإلكتروني' : 'Email Address'}</label>
              <input name="email" value={formData.email} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Phone size={14}/> {isRTL ? 'رقم الهاتف 1' : 'Phone Number 1'}</label>
              <input name="Phone_no1" value={formData.Phone_no1} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Phone size={14}/> {isRTL ? 'رقم الهاتف 2 (اختياري)' : 'Phone Number 2 (Optional)'}</label>
              <input name="Phone_no2" value={formData.Phone_no2} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-2 text-right md:col-span-2">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Lock size={14}/> {isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </section>

        <section className={`p-8 rounded-3xl border ${cardBg}`}>
          <h2 className="text-xl font-black mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-yellow-500 rounded-full" />
            {isRTL ? 'البيانات المهنية' : 'Professional Details'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-right">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Hash size={14}/> {isRTL ? 'رقم القيد / الرخصة' : 'License Number'}</label>
              <input name="license_number" value={formData.license_number} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Briefcase size={14}/> {isRTL ? 'سنوات الخبرة' : 'Experience Years'}</label>
              <input type="number" name="years_experience" value={formData.years_experience} onChange={handleChange} className={inputClass} />
            </div>
            <div className="space-y-2 text-right md:col-span-2">
              <label className="text-xs font-black text-slate-500 uppercase flex items-center gap-2"><Star size={14}/> {isRTL ? 'التخصصات (افصل بينها بـ و أو فاصلة)' : 'Specialties (separate with and or comma)'}</label>
              <input name="specializations" value={formData.specializations} onChange={handleChange} placeholder="جنائي، مدني، تجاري" className={inputClass} />
            </div>
          </div>
        </section>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
          <Save size={22} /> {loading ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ التعديلات' : 'Save Changes')}
        </button>
      </form>
    </div>
  );
};

export default LawyerEditProfilePage;