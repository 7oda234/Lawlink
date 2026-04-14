import React, { useState, useEffect } from 'react';
import LawyerCard from '../../components/LawyerCard';
import { Search, Filter, Briefcase, Star, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

const FindLawyerPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  
  const [allLawyers, setAllLawyers] = useState([]); 
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const isRTL = language === 'ar' || language === 'eg';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. جلب التخصصات الفريدة من الداتابيز
        const specsRes = await axios.get('http://localhost:5000/api/users/specializations');
        setSpecializations(specsRes.data.specializations || []);

        // 2. جلب كل المحامين بالبيانات الجديدة (Image, Verified, Experience)
        const res = await axios.get('http://localhost:5000/api/users/search?term=');
        
        const onlyLawyers = res.data.data
          .filter(user => user.role.toLowerCase() === 'lawyer') 
          .map((l) => ({
            ...l,
            // تحويل التخصصات المجمعة لمصفوفة
            specsArray: l.all_specializations ? l.all_specializations.split(',') : [],
            // 📸 ربط الصورة والخبرة والتوثيق من الداتابيز
            image: l.image_url || `https://ui-avatars.com/api/?name=${l.name}&background=random`,
            isVerified: l.verified === 1, 
            experience: l.years_experience || 0,
            rating: l.rating_avg || 4.5
          }));

        setAllLawyers(onlyLawyers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // الفلترة بناءً على البحث بالاسم أو اختيار التخصص
  const filteredLawyers = allLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || lawyer.specsArray.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const themeStyles = {
    card: mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-sm',
    textMain: mode === 'dark' ? 'text-white' : 'text-slate-950',
    input: mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-slate-900',
    sidebarBtn: (isActive) => isActive 
      ? 'bg-blue-600 text-white shadow-lg' 
      : `hover:bg-blue-50 dark:hover:bg-blue-900/20 ${mode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="animate-bounce font-black text-2xl">LawLink...</div>
    </div>
  );

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors duration-500 ${mode === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <main className="max-w-7xl mx-auto px-6">
        
        {/* 🔍 Search Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className={`flex items-center px-6 rounded-3xl border-2 transition-all focus-within:border-blue-500 ${themeStyles.input}`}>
            <Search className="text-blue-600" size={24} />
            <input 
              type="text" 
              placeholder={isRTL ? "ابحث عن محامٍ بالاسم..." : "Search by name..."}
              className="w-full py-5 px-4 bg-transparent outline-none font-bold text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* 🏛️ Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className={`p-6 rounded-3xl border sticky top-32 ${themeStyles.card}`}>
              <div className={`flex items-center gap-3 font-black text-xl mb-8 border-b pb-4 ${themeStyles.textMain}`}>
                <Filter size={22} className="text-blue-600" />
                <span>{isRTL ? 'التخصصات' : 'Specialties'}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-right p-4 rounded-2xl font-bold transition-all flex items-center justify-between ${themeStyles.sidebarBtn(activeCategory === 'all')}`}
                >
                  <span>{isRTL ? 'الكل' : 'All'}</span>
                </button>
                
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setActiveCategory(spec)}
                    className={`w-full text-right p-4 rounded-2xl font-bold transition-all flex items-center justify-between ${themeStyles.sidebarBtn(activeCategory === spec)}`}
                  >
                    <span>{spec}</span>
                    {activeCategory === spec && <CheckCircle size={18} />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ⚖️ Lawyers Grid */}
          <div className="lg:col-span-3">
            <h2 className={`text-2xl font-black mb-8 px-2 flex items-center gap-3 ${themeStyles.textMain}`}>
               <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">{filteredLawyers.length}</span>
               {isRTL ? 'محامٍ متاح للخدمة' : 'Lawyers Available'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredLawyers.map(lawyer => (
                <div key={lawyer.user_id} className="hover:scale-[1.02] transition-transform duration-300">
                   {/* 💡 كارت المحامي بيعرض الصور والتوثيق والخبرة */}
                   <LawyerCard lawyer={lawyer} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredLawyers.length === 0 && (
              <div className="text-center py-32">
                <Briefcase size={60} className="text-blue-600/30 mx-auto mb-6" />
                <p className={`text-2xl font-black ${themeStyles.textMain}`}>
                  {isRTL ? 'لا يوجد نتائج' : 'No matches found'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindLawyerPage;