import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { FileText } from 'lucide-react';

const LawyerCaseDetailsPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';
  const [activeTab, setActiveTab] = useState('files');

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        <section className={`p-8 rounded-3xl border mb-8 ${cardBg} flex flex-col md:flex-row justify-between items-center gap-6`}>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center text-black font-black text-2xl">#1025</div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className={`text-2xl font-black ${textColor}`}>{isRTL ? 'قضية تعويضات - أحمد علي' : 'Compensation Case - Ahmed Ali'}</h1>
              <p className="text-slate-500">{t('page.lawyerCaseDetails.startDate', isRTL ? 'تاريخ البدء: 15 مارس 2026' : 'Start Date: March 15, 2026')}</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-all">
            {t('page.lawyerCaseDetails.updateBtn', isRTL ? 'تحديث الحالة' : 'Update Status')}
          </button>
        </section>

        <div className="flex border-b border-gray-500/20 mb-8 gap-8">
          {['files', 'notes', 'history'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-slate-500'}`}
            >
              {isRTL ? (tab === 'files' ? 'الملفات' : tab === 'notes' ? 'الملاحظات' : 'السجل') : tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={`p-10 rounded-3xl border min-h-[400px] ${cardBg}`}>
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1, 2].map(i => (
                 <div key={i} className="p-4 border border-dashed border-slate-700 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <FileText className="text-yellow-500" />
                     <span className={`font-bold ${textColor}`}>Document_{i}.pdf</span>
                   </div>
                   <button className="text-xs font-black uppercase text-yellow-500">{t('common.download', isRTL ? 'تحميل' : 'Download')}</button>
                 </div>
               ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LawyerCaseDetailsPage;
