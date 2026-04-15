import React, { useState, useRef } from 'react'; // ✅ ضفنا useRef للتحكم في الصورة
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { User, Save, Camera, Hash, Briefcase, Mail, Phone, Calendar } from 'lucide-react';

const LawyerEditProfilePage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  
  // ريفرنس للتحكم في فتح اختيار الملفات عند الضغط على الكاميرا
  const fileInputRef = useRef(null);

  // State البيانات (مستوحاة من Schema قاعدة البيانات BackUp8.sql)
  const [formData, setFormData] = useState({
    name: 'محمود خالد', // من عمود name في جدول users
    email: 'mahmoud.test@aast.edu', // من عمود email في جدول users
    phone: '01001122334', // من عمود Phone_no1 في جدول users
    license_number: 'AAST-2026', // من عمود license_number في جدول lawyer
    years_experience: 12, // من عمود years_experience في جدول lawyer
    bio: 'محامي متخصص في القانون الجنائي والإداري.',
    profileImage: null, // للتعامل مع رفع الصورة الشخصية (image_url)
  });

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';
  const inputBg = mode === 'dark' ? 'bg-slate-800/50' : 'bg-gray-50';

  // معالجة تغيير النصوص
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // معالجة رفع ومعاينة الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-4xl mx-auto px-6">
        
        {/* هيدر الصفحة مع الصورة التفاعلية */}
        <header className={`p-10 rounded-3xl border mb-8 shadow-sm ${cardBg} flex flex-col md:flex-row items-center gap-8`}>
          <div 
            className="relative group cursor-pointer" 
            onClick={() => fileInputRef.current.click()}
          >
            <div className="w-32 h-32 bg-slate-700 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-yellow-500/50 shadow-xl transition-all group-hover:border-yellow-500">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera size={40} className="text-slate-500 group-hover:text-yellow-500 transition-colors" />
              )}
              {/* Overlay يظهر عند الوقوف بالماوس */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-black uppercase">{isRTL ? 'تغيير الصورة' : 'Change Photo'}</span>
              </div>
            </div>
          </div>

          {/* Input مخفي يتم تفعيله برمجياً */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />

          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className={`text-4xl font-black mb-2 ${textColor}`}>
              {t('page.lawyerEditProfile.title', isRTL ? 'تعديل البيانات المهنية' : 'Edit Professional Profile')}
            </h1>
            <p className="text-slate-500 text-lg">
              {t('page.lawyerEditProfile.subtitle', isRTL ? 'تأكد من دقة رقم الكارنيه وسنوات الخبرة.' : 'Ensure your license number and experience are accurate.')}
            </p>
          </div>
        </header>

        {/* نموذج البيانات */}
        <form className={`p-10 rounded-3xl border shadow-sm ${cardBg} space-y-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* الاسم الكامل */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                <User size={14} className="text-yellow-500" />
                {t('common.fullName', isRTL ? 'الاسم بالكامل' : 'Full Name')}
              </label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full ${inputBg} border border-gray-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-all ${textColor}`} 
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                <Mail size={14} className="text-yellow-500" />
                {t('common.email', isRTL ? 'البريد الإلكتروني' : 'Email')}
              </label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${inputBg} border border-gray-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-all ${textColor}`} 
              />
            </div>

            {/* رقم الكارنيه (License) */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                <Hash size={14} className="text-yellow-500" />
                {t('page.lawyerEditProfile.license', isRTL ? 'رقم القيد / الكارنيه' : 'License Number')}
              </label>
              <input 
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                className={`w-full ${inputBg} border border-gray-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-all ${textColor}`} 
              />
            </div>

            {/* سنوات الخبرة */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                <Briefcase size={14} className="text-yellow-500" />
                {t('page.lawyerEditProfile.experience', isRTL ? 'سنوات الخبرة' : 'Years of Experience')}
              </label>
              <input 
                name="years_experience"
                type="number"
                value={formData.years_experience}
                onChange={handleChange}
                className={`w-full ${inputBg} border border-gray-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-all ${textColor}`} 
              />
            </div>

            {/* رقم الهاتف (Phone_no1) */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                <Phone size={14} className="text-yellow-500" />
                {t('common.phone', isRTL ? 'رقم الهاتف' : 'Phone Number')}
              </label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full ${inputBg} border border-gray-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-all ${textColor}`} 
              />
            </div>
          </div>

          {/* النبذة المهنية */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-500">
              {t('page.lawyerEditProfile.bio', isRTL ? 'النبذة المهنية (تظهر للعملاء)' : 'Professional Bio (Visible to Clients)')}
            </label>
            <textarea 
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className={`w-full ${inputBg} border border-gray-500/10 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500 transition-all resize-none ${textColor}`} 
            />
          </div>

          {/* أزرار الحفظ */}
          <div className="pt-8 border-t border-gray-500/10 flex flex-col md:flex-row gap-4">
            <button 
              type="button"
              className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 shadow-xl shadow-yellow-500/10 transition-all active:scale-95"
            >
              <Save size={22} /> 
              {t('page.lawyerEditProfile.saveBtn', isRTL ? 'حفظ وتحديث البيانات' : 'Save & Update Profile')}
            </button>
            <button 
              type="button"
              className={`px-8 py-5 rounded-2xl font-black border border-gray-500/20 hover:bg-red-500 hover:text-white transition-all ${textColor}`}
            >
              {isRTL ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </form>

        {/* تنبيه الأمان */}
        <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500">
            <Calendar size={20} />
          </div>
          <p className="text-sm text-slate-500 font-bold">
            {isRTL 
              ? 'تنويه: أي تغيير في بيانات القيد المهني قد يتطلب إعادة مراجعة الحساب من قبل الإدارة.' 
              : 'Note: Any changes to professional credentials may require account re-verification by admin.'}
          </p>
        </div>
      </main>
    </div>
  );
};

export default LawyerEditProfilePage;
