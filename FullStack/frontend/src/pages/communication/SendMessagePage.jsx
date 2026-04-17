import React from 'react'; // استيراد ريأكت
import { useLanguage } from '../../context/useLanguage'; // للغة والترجمة
import { useTheme } from '../../context/ThemeContext'; // للثيم
import { Send, User } from 'lucide-react'; // الأيقونات
import '../../styles/communication/CommunicationBase.css'; // الستايل الموحد

const SendMessagePage = () => {
  const { language, t } = useLanguage(); // تفعيل الترجمة
  const { mode } = useTheme(); // تفعيل الثيم
  const isRTL = language === 'ar' || language === 'eg'; // تحديد الاتجاه

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'dark-mode' : ''}`}>
      <main className="max-w-3xl mx-auto px-6">
        {/* حاوية الفورم (Form Container) */}
        <div className="comm-chat-container p-10 shadow-2xl">
          <h1 className="text-3xl font-black mb-8">{t('page.send.title', isRTL ? 'إرسال رسالة قانونية' : 'Send Legal Message')}</h1>
          {/* فورم إرسال الرسالة للمحامي */}
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">{isRTL ? 'إلى المحامي' : 'To Lawyer'}</label>
              <div className="relative">
                <User size={18} className={`${isRTL ? 'right-4' : 'left-4'} absolute top-4 text-slate-500`} />
                <input className={`comm-input ${isRTL ? 'pr-12' : 'pl-12'}`} placeholder={isRTL ? 'اسم المحامي...' : 'Lawyer name...'} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-2">{isRTL ? 'نص الرسالة' : 'Message'}</label>
              {/* تيكست أريا كبيرة عشان الموكل يشرح استفساره */}
              <textarea rows={6} className="comm-input resize-none" placeholder={isRTL ? 'اشرح استفسارك هنا بالتفصيل...' : 'Explain your query...'} />
            </div>
            {/* زرار الإرسال بستايل الـ Primary Button بتاعنا */}
            <button type="button" className="comm-btn-primary w-full flex items-center justify-center gap-3">
              <Send size={20} /> {isRTL ? 'إرسال الآن' : 'Send Now'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SendMessagePage;
