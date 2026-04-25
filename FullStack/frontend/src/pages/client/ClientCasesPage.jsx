import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle2, AlertCircle, Search, Filter, ArrowRight, Gavel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import "../../styles/client/ClientBase.css"; 

const ClientCasesPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  
  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Now used in filtering
  const [cases, setCases] = useState([]); // ✅ Now used in useEffect

  useEffect(() => {
    // Simulating fetching data from the 'cases' table for client_id 13
    const loadData = () => {
      const mockData = [
        { 
          case_id: 1, 
          title: 'قضية نزاع عقاري', 
          enTitle: 'Real Estate Dispute',
          category: 'Civil', 
          status: 'Ongoing', 
          created_at: '2026-04-13'
        },
        { 
          case_id: 2, 
          title: 'قضية تعويض حادث', 
          enTitle: 'Accident Compensation',
          category: 'Civil', 
          status: 'Pending', 
          created_at: '2026-04-14'
        }
      ];
      
      setCases(mockData); // ✅ setCases is now used
      setIsLoading(false);
    };

    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ searchTerm is now used to filter the list
  const filteredCases = cases.filter((c) => {
    const title = language === 'en' ? c.enTitle : c.title;
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const content = {
    en: {
      title: "My Cases",
      subtitle: "Track your legal proceedings and assigned lawyers.",
      searchPlaceholder: "Search cases by title...",
      newCase: "New Case"
    },
    eg: {
      title: "قضاياي",
      subtitle: "تابع سير قضاياك القانونية والمحامين المسؤولين.",
      searchPlaceholder: "ابحث عن قضية بالاسم...",
      newCase: "قضية جديدة"
    }
  };

  const t = content[language] || content['eg'];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Ongoing': return <Clock size={16} className="text-blue-500" />;
      case 'Closed': return <CheckCircle2 size={16} className="text-green-500" />;
      default: return <AlertCircle size={16} className="text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="client-h1 !mb-1 italic uppercase tracking-tighter">{t.title}</h1>
            <p className="client-subtitle">{t.subtitle}</p>
          </div>
          <Link to="/client/cases/new" className="client-btn-primary !w-auto !px-8 !py-3 italic">
            + {t.newCase}
          </Link>
        </div>

        <div className="client-card !p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className={`absolute top-3 ${isRTL ? 'right-4' : 'left-4'} opacity-30`} size={20} />
            <input 
              className={`client-input !py-3 !rounded-xl !text-sm ${isRTL ? 'pr-12' : 'pl-12'}`}
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // ✅ Updates the variable
            />
          </div>
          <button className="client-banner !w-auto !py-3 !px-6 !mt-0 flex items-center gap-2">
            <Filter size={18} /> <span className="text-[10px] font-black uppercase">Filter</span>
          </button>
        </div>

        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <div key={caseItem.case_id} className="client-card !p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-950 rounded-[1.5rem] border border-white/5 flex items-center justify-center shadow-lg transition-all">
                  <Gavel className="text-yellow-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black italic mb-1">
                    {language === 'en' ? caseItem.enTitle : caseItem.title}
                  </h3>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">ID: #{caseItem.case_id} • {caseItem.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between">
                <div className="flex flex-col items-center md:items-end">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(caseItem.status)}
                    <span className="text-[11px] font-black uppercase italic">{caseItem.status}</span>
                  </div>
                  <p className="text-[10px] font-bold opacity-30">{caseItem.created_at}</p>
                </div>
                <Link to={`/client/cases/${caseItem.case_id}`} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-yellow-500 hover:text-slate-950 transition-all">
                  <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClientCasesPage;
