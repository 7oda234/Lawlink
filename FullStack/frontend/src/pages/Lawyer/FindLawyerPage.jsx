import React, { useState, useEffect } from 'react';
import LawyerCard from '../../components/LawyerCard';
import { Search, Filter, Briefcase, CheckCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContextHook';

import axios from 'axios';

const FindLawyerPage = () => {
  const { language, t } = useLanguage(); // ✅ تم استدعاء t للترجمة
  const { mode } = useTheme();
  
  // States الخاصة بالبيانات والفلترة
  const [allLawyers, setAllLawyers] = useState([]); 
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const isRTL = language === 'ar' || language === 'eg';

  // جلب البيانات من الباك إند
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. جلب التخصصات من جدول lawyer_specializations
        const specsRes = await axios.get('http://localhost:5000/api/users/specializations');
        setSpecializations(specsRes.data.specializations || []);

        // 2. جلب المحامين (Joining users and lawyer tables)
        const res = await axios.get('http://localhost:5000/api/users/search?term=');
        
        const onlyLawyers = res.data.data
          .filter(user => user.role.toLowerCase() === 'lawyer') 
          .map((l) => ({
            ...l,
            // تحويل التخصصات المجمعة لمصفوفة
            specsArray: l.all_specializations ? l.all_specializations.split(',') : [],
            image: l.image_url || `https://ui-avatars.com/api/?name=${l.name}&background=random`,
            isVerified: l.verified === 1, // عمود التوثيق
            experience: l.years_experience || 0, // سنوات الخبرة
            rating: l.rating_avg || 4.5 // متوسط التقييم
          }));

        setAllLawyers(onlyLawyers);
      } catch (error) {
        console.error("Database Connection Error:", error);
      } finally {
        setLoading(false); // ✅ إيقاف حالة التحميل
      }
    };
    fetchData();
  }, []);

  // منطق الفلترة اللحظي
  const filteredLawyers = allLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || lawyer.specsArray.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  // ستايلات الثيم (Dark/Light Mode)
  const themeStyles = {
    card: mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-sm',
    textMain: mode === 'dark' ? 'text-white' : 'text-slate-950',
    input: mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-slate-900',
    loadingBg: mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
  };

  // ✅ حل مشكلة "loading is never used" بإظهار Spinner احترافي
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeStyles.loadingBg}`}>
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-xl animate-pulse tracking-tighter italic">
            LAW<span className="text-yellow-500">LINK</span>...
          </p>
          <p className="text-slate-500 font-bold">
            {isRTL ? 'بندور لك على أشطر المحامين...' : 'Finding the best lawyers for you...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors duration-500 ${mode === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <main className="max-w-7xl mx-auto px-6">
        
        {/* 🔍 Search Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className={`flex items-center px-6 rounded-3xl border-2 transition-all focus-within:border-yellow-500 ${themeStyles.input}`}>
            <Search className="text-yellow-500" size={24} />
            <input 
              type="text" 
              placeholder={isRTL ? "ابحث عن محامٍ بالاسم..." : "Search by name..."}
              className="w-full py-5 px-4 bg-transparent outline-none font-bold text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* 🏛️ Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className={`p-6 rounded-3xl border sticky top-32 ${themeStyles.card}`}>
              <div className={`flex items-center gap-3 font-black text-xl mb-8 border-b pb-4 ${themeStyles.textMain}`}>
                <Filter size={22} className="text-yellow-500" />
                <span>{t('page.findLawyer.specialties', isRTL ? 'التخصصات' : 'Specialties')}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-right rtl:text-right p-4 rounded-2xl font-bold transition-all flex items-center justify-between ${
                    activeCategory === 'all' 
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                      : `hover:bg-gray-500/5 ${mode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`
                  }`}
                >
                  <span>{isRTL ? 'كل التخصصات' : 'All Specialties'}</span>
                </button>
                
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setActiveCategory(spec)}
                    className={`w-full text-right rtl:text-right p-4 rounded-2xl font-bold transition-all flex items-center justify-between ${
                      activeCategory === spec 
                        ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' 
                        : `hover:bg-gray-500/5 ${mode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`
                    }`}
                  >
                    <span>{spec}</span>
                    {activeCategory === spec && <CheckCircle size={18} />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ⚖️ Lawyers Grid Section */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8 px-2">
              <h2 className={`text-2xl font-black flex items-center gap-3 ${themeStyles.textMain}`}>
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm">{filteredLawyers.length}</span>
                {isRTL ? 'محامي متاح للخدمة' : 'Lawyers Available'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredLawyers.map(lawyer => (
                <div key={lawyer.user_id} className="hover:scale-[1.02] transition-transform duration-300">
                  {/* تأكد أن ملف المكون يبدأ بحرف كبير LawyerCard.jsx */}
                  <LawyerCard lawyer={lawyer} />
                </div>
              ))}
            </div>

            {/* Empty State - عند عدم وجود نتائج */}
            {filteredLawyers.length === 0 && (
              <div className="text-center py-32">
                <Briefcase size={60} className="text-yellow-500/30 mx-auto mb-6" />
                <p className={`text-2xl font-black ${themeStyles.textMain} mb-4`}>
                  {isRTL ? 'مفيش نتائج مطابقة للبحث' : 'No matches found'}
                </p>
                <button 
                  onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                  className="flex items-center gap-2 mx-auto bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20"
                >
                  <RotateCcw size={18} /> {isRTL ? 'إعادة ضبط البحث' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindLawyerPage;
