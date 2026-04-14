import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Calendar as CalIcon, Gavel, Clock, MapPin } from 'lucide-react';

const LawyerCalendarPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  const hearings = [
    { id: 1, case: '1025', court: isRTL ? 'محكمة شمال القاهرة' : 'North Cairo Court', time: '09:00 AM', date: '2026-04-20', type: isRTL ? 'جلسة أولى' : 'First Hearing' },
    { id: 2, case: '1042', court: isRTL ? 'المحكمة الدستورية' : 'Supreme Court', time: '11:30 AM', date: '2026-04-22', type: isRTL ? 'حكم نهائي' : 'Final Judgment' },
  ];

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        <header className={`p-10 rounded-3xl border mb-10 shadow-sm ${cardBg} flex justify-between items-center`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className={`text-4xl font-black mb-2 ${textColor}`}>
              {t('page.lawyerCalendar.title', isRTL ? 'أجندة الجلسات' : 'Hearings Calendar')}
            </h1>
            <p className="text-slate-500">{t('page.lawyerCalendar.subtitle', isRTL ? 'متابعة مواعيد القضايا والجلسات القانونية.' : 'Track court dates and legal hearings.')}</p>
          </div>
          <CalIcon size={40} className="text-yellow-500 opacity-20" />
        </header>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:rtl:mr-5 before:rtl:ml-0 before:w-0.5 before:bg-yellow-500/20">
          {hearings.map((h) => (
            <div key={h.id} className="relative flex items-start gap-10">
              <div className="absolute left-0 rtl:right-0 w-10 h-10 bg-yellow-500 rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-950 z-10">
                <Gavel size={18} className="text-black" />
              </div>
              <div className={`p-8 rounded-3xl border shadow-sm w-full ${cardBg} ${isRTL ? 'mr-14' : 'ml-14'} transition-all hover:border-yellow-500`}>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <span className="text-xs font-black text-yellow-500 uppercase tracking-widest">{h.type}</span>
                    <h3 className={`text-xl font-black mt-1 ${textColor}`}>{isRTL ? 'قضية رقم' : 'Case #'} {h.case}</h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                      <Clock size={18} /> {h.time}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                      <MapPin size={18} /> {h.court}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LawyerCalendarPage;
