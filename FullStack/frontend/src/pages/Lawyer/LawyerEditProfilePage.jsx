import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Save, Camera } from 'lucide-react';

const LawyerEditProfilePage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-4xl mx-auto px-6">
        <header className={`p-10 rounded-3xl border mb-8 shadow-sm ${cardBg} flex flex-col md:flex-row items-center gap-8`}>
           <div className="relative group cursor-pointer">
             <div className="w-24 h-24 bg-slate-700 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-yellow-500/50">
               <Camera size={30} className="text-slate-500" />
             </div>
           </div>
           <div className={isRTL ? 'text-right' : 'text-left'}>
             <h1 className={`text-3xl font-black ${textColor}`}>{t('page.lawyerEditProfile.title', isRTL ? 'إعدادات الملف الشخصي' : 'Profile Settings')}</h1>
             <p className="text-slate-500">{t('page.lawyerEditProfile.subtitle', isRTL ? 'تحديث بياناتك المهنية وخبراتك.' : 'Update your professional data and experience.')}</p>
           </div>
        </header>

        <form className={`p-10 rounded-3xl border shadow-sm ${cardBg} space-y-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">{t('common.fullName', isRTL ? 'الاسم بالكامل' : 'Full Name')}</label>
              <input className={`w-full bg-gray-500/5 border border-gray-500/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 transition-all ${textColor}`} defaultValue="Mahmoud Mohamed" />
            </div>
          </div>
          <div className="pt-6 border-t border-gray-500/10">
            <button className="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 shadow-lg transition-all">
              <Save size={20} /> {t('page.lawyerEditProfile.saveBtn', isRTL ? 'حفظ التعديلات' : 'Save Changes')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LawyerEditProfilePage;
