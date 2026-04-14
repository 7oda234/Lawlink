import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { Briefcase, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LawyerAssignedCasesPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  const [filter, setFilter] = useState('all');

  const cases = [
    { id: '1025', client: 'Ahmed Ali', type: 'Corporate', status: 'active', date: '2026-04-10' },
    { id: '1028', client: 'Sara Hassan', type: 'Family', status: 'pending', date: '2026-04-12' },
    { id: '1030', client: 'John Doe', type: 'Criminal', status: 'closed', date: '2026-03-25' },
  ];

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        <section className={`p-8 rounded-3xl border mb-10 shadow-sm ${cardBg}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className={`text-4xl font-black mb-2 ${textColor}`}>
                {t('page.lawyerCases.title', isRTL ? 'القضايا المسندة' : 'Assigned Cases')}
              </h1>
              <p className="text-slate-500">{t('page.lawyerCases.subtitle', isRTL ? 'إدارة القضايا الحالية وتحديث حالاتها.' : 'Manage current cases and update their status.')}</p>
            </div>
            <div className="flex gap-2 bg-gray-500/10 p-1 rounded-2xl">
              {['all', 'active', 'pending'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === tab ? 'bg-yellow-500 text-black shadow-lg' : 'text-slate-500 hover:text-yellow-500'}`}
                >
                  {isRTL ? (tab === 'all' ? 'الكل' : tab === 'active' ? 'نشط' : 'معلق') : tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4">
          {cases.filter(c => filter === 'all' || c.status === filter).map((c) => (
            <div key={c.id} className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-yellow-500/50 ${cardBg}`}>
              <div className="flex items-center gap-4 w-full">
                <div className="p-4 bg-yellow-500/10 text-yellow-500 rounded-2xl">
                  <Briefcase size={24} />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className={`font-black text-lg ${textColor}`}>#{c.id} - {c.client}</h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{c.type} Law</p>
                </div>
              </div>
              <div className="flex items-center gap-8 w-full md:w-auto">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">{isRTL ? 'التاريخ' : 'Date'}</p>
                  <p className={`text-sm font-bold ${textColor}`}>{c.date}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${
                  c.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                  c.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-500/10 text-gray-500'
                }`}>
                  {isRTL ? (c.status === 'active' ? 'نشط' : 'معلق') : c.status}
                </span>
                <Link to={`/lawyer/cases/${c.id}`} className="p-3 bg-slate-500/5 hover:bg-yellow-500 hover:text-black rounded-xl transition-all">
                  <ArrowRightLeft className={isRTL ? 'rotate-180' : ''} size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LawyerAssignedCasesPage;
