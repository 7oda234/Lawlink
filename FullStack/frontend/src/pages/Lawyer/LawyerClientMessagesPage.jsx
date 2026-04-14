import React from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Send, User, Search } from 'lucide-react';

const LawyerClientMessagesPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6 h-[700px] flex gap-6">
        <aside className={`w-80 rounded-3xl border overflow-hidden hidden md:block ${cardBg}`}>
          <div className="p-6 border-b border-gray-500/10">
            <h3 className={`font-black text-lg mb-4 ${textColor}`}>
              {t('page.lawyerMessages.title', isRTL ? 'المحادثات' : 'Messages')}
            </h3>
            <div className="relative">
              <Search className={`${isRTL ? 'right-3' : 'left-3'} absolute top-2.5 text-slate-500`} size={18} />
              <input className={`w-full bg-gray-500/5 rounded-xl py-2 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm outline-none ${textColor}`} placeholder={isRTL ? 'بحث...' : 'Search...'} />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-120px)]">
            {[1, 2].map(i => (
              <div key={i} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-yellow-500/5 border-b border-gray-500/5 ${i === 1 ? 'bg-yellow-500/10' : ''}`}>
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center"><User size={20} className="text-white" /></div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className={`text-sm font-bold ${textColor}`}>Client Name {i}</p>
                  <p className="text-xs text-slate-500 truncate w-32">{isRTL ? 'آخر رسالة من الموكل...' : 'Latest message...'}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className={`flex-1 rounded-3xl border flex flex-col overflow-hidden ${cardBg}`}>
           <div className="p-6 border-b border-gray-500/10 flex justify-between items-center">
             <h3 className={`font-black ${textColor}`}>Client Name 1</h3>
             <span className="text-xs bg-green-500/20 text-green-500 px-3 py-1 rounded-full font-bold uppercase">{isRTL ? 'متصل' : 'Online'}</span>
           </div>
           <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className={`max-w-[70%] p-4 rounded-2xl bg-yellow-500/10 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                <p className={`text-sm ${textColor}`}>Hello Lawyer, any updates on my case?</p>
              </div>
           </div>
           <div className="p-6 border-t border-gray-500/10 flex gap-4">
              <input className={`flex-1 bg-gray-500/5 rounded-xl px-6 py-3 outline-none ${textColor}`} placeholder={t('page.lawyerMessages.placeholder', isRTL ? 'اكتب رسالتك...' : 'Type message...')} />
              <button className="p-4 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition-all"><Send size={20} /></button>
           </div>
        </section>
      </main>
    </div>
  );
};

export default LawyerClientMessagesPage;
