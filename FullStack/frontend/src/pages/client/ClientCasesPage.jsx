import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 👈 استيراد axios عشان نكلم الباك إند
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
  const [searchTerm, setSearchTerm] = useState(""); 
  const [cases, setCases] = useState([]); 

  // 1. جلب ID العميل من اللوكال ستورج
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // 2. دالة جلب البيانات الحقيقية من قاعدة البيانات
    const fetchCases = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/cases`);
        
        // فلترة القضايا الخاصة بالعميل فقط، واستبعاد القضايا المحذوفة
        const myCases = res.data.cases.filter(c => 
            c.client_id === parseInt(userId) && c.deleted_at === null
        );

        // ترتيب القضايا من الأحدث للأقدم
        myCases.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setCases(myCases);
      } catch (err) {
        console.error("Error fetching client cases:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [userId]);

  // دالة الفلترة في شريط البحث
  const filteredCases = cases.filter((c) => {
    const title = c.title || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const content = {
    en: {
      title: "My Cases",
      subtitle: "Track your legal proceedings and assigned lawyers.",
      searchPlaceholder: "Search cases by title...",
      newCase: "New Case",
      empty: "No cases found."
    },
    eg: {
      title: "قضاياي",
      subtitle: "تابع سير قضاياك القانونية والمحامين المسؤولين.",
      searchPlaceholder: "ابحث عن قضية بالاسم...",
      newCase: "قضية جديدة",
      empty: "لا توجد قضايا حتى الآن."
    }
  };

  const t = content[language] || content['eg'];

  // دالة لتنسيق شكل التاريخ
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // بيرجع التاريخ بالشكل YYYY-MM-DD
  };

  // دالة لاختيار الأيقونة المناسبة لحالة القضية
  const getStatusIcon = (status) => {
    const lowerStatus = status ? status.toLowerCase() : '';
    if (lowerStatus === 'ongoing' || lowerStatus === 'in_progress') {
      return <Clock size={16} className="text-blue-500" />;
    } else if (lowerStatus === 'closed' || lowerStatus === 'resolved') {
      return <CheckCircle2 size={16} className="text-green-500" />;
    } else {
      // للحالات Pending أو Awaiting_Client_Approval
      return <AlertCircle size={16} className="text-yellow-500" />; 
    }
  };

  // دالة لتنظيف شكل الحالة للمستخدم
  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    return status.replace(/_/g, ' ').toUpperCase();
  };

  if (isLoading) {
    return (
      <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'} flex items-center justify-center min-h-screen`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'} min-h-screen pt-24 pb-12`} dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="client-h1 !mb-1 italic uppercase tracking-tighter">{t.title}</h1>
            <p className="client-subtitle">{t.subtitle}</p>
          </div>
          <Link to="/client/cases/new" className="client-btn-primary !w-auto !px-8 !py-3 italic shadow-lg shadow-yellow-500/20">
            + {t.newCase}
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="client-card !p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className={`absolute top-3 ${isRTL ? 'right-4' : 'left-4'} opacity-30`} size={20} />
            <input 
              className={`client-input !py-3 !rounded-xl !text-sm ${isRTL ? 'pr-12' : 'pl-12'} w-full bg-transparent outline-none`}
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <button className="client-banner !w-auto !py-3 !px-6 !mt-0 flex items-center gap-2 hover:border-yellow-500/50 transition-all">
            <Filter size={18} className="text-yellow-500" /> 
            <span className="text-[10px] font-black uppercase">Filter</span>
          </button>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <div key={caseItem.case_id} className={`client-card !p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-yellow-500/50 transition-all group ${caseItem.status === 'Awaiting_Client_Approval' ? 'border-yellow-500/40 bg-yellow-500/5' : ''}`}>
                
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`w-14 h-14 rounded-[1.5rem] border flex items-center justify-center shadow-lg transition-all shrink-0 ${caseItem.status === 'Awaiting_Client_Approval' ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-slate-950 border-white/5 text-yellow-500'}`}>
                    <Gavel size={24} className={caseItem.status === 'Awaiting_Client_Approval' ? "animate-pulse" : ""} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black italic mb-1 truncate max-w-[250px] sm:max-w-md">
                          {caseItem.title}
                        </h3>
                        {caseItem.status === 'Awaiting_Client_Approval' && (
                          <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded italic animate-pulse whitespace-nowrap">
                            OFFER RECEIVED
                          </span>
                        )}
                    </div>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest flex items-center gap-2">
                        ID: #{caseItem.case_id} 
                        <span className="w-1 h-1 bg-white/20 rounded-full inline-block"></span> 
                        {caseItem.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between border-t border-white/5 pt-4 md:border-0 md:pt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(caseItem.status)}
                      <span className={`text-[11px] font-black uppercase italic ${caseItem.status === 'Awaiting_Client_Approval' ? 'text-yellow-500' : ''}`}>
                        {formatStatus(caseItem.status)}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold opacity-30">{formatDate(caseItem.created_at)}</p>
                  </div>
                  <Link to={`/client/cases/${caseItem.case_id}`} className={`p-3 rounded-2xl transition-all shadow-lg shrink-0 ${caseItem.status === 'Awaiting_Client_Approval' ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-slate-100 dark:bg-white/5 hover:bg-yellow-500 hover:text-slate-950'}`}>
                    <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                  </Link>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 client-card border-dashed border-white/10">
               <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
               <p className="font-black italic text-lg opacity-50 uppercase tracking-widest">{t.empty}</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default ClientCasesPage;