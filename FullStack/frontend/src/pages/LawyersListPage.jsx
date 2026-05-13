import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContextHook';

import { Search, Filter, Star, Briefcase, MapPin } from 'lucide-react';

const lawyers = [
  { id: 1, name: 'Robert M. Hughes', specialty: 'Corporate Law', rating: 4.9, cases: 180, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Amina El-Sayed', specialty: 'Family Law', rating: 4.8, cases: 117, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Marcus Thorne', specialty: 'Criminal Defense', rating: 5.0, cases: 236, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Sarah Jenkins', specialty: 'Real Estate Law', rating: 4.7, cases: 89, image: 'https://i.pravatar.cc/150?u=4' },
];

const LawyersListPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme(); // ✅ Used below to solve lint error
  const [query, setQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const isRTL = language === 'ar' || language === 'eg';

  // Dynamic Content Object to solve the translation problem
  const content = {
    searchPlaceholder: isRTL ? 'ابحث عن محامي...' : 'Search for a lawyer...',
    filtersLabel: isRTL ? 'تصفية النتائج' : 'Filters',
    practiceArea: isRTL ? 'مجال التخصص' : 'Practice Area',
    allSpecialties: isRTL ? 'كل التخصصات' : 'All Specialties',
    viewProfile: isRTL ? 'عرض الملف الشخصي' : 'View Profile',
    cases: isRTL ? 'قضية' : 'Cases',
    location: isRTL ? 'القاهرة' : 'Cairo'
  };

  const specialties = [
    { id: 'all', label: content.allSpecialties },
    { id: 'Corporate Law', label: isRTL ? 'قانون الشركات' : 'Corporate Law' },
    { id: 'Family Law', label: isRTL ? 'قانون الأسرة' : 'Family Law' },
    { id: 'Criminal Defense', label: isRTL ? 'الدفاع الجنائي' : 'Criminal Defense' },
    { id: 'Real Estate Law', label: isRTL ? 'قانون العقارات' : 'Real Estate Law' }
  ];

  const filtered = lawyers.filter((l) => {
    const matchesQuery = l.name.toLowerCase().includes(query.toLowerCase()) || 
                        l.specialty.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = selectedSpecialty === 'all' || l.specialty === selectedSpecialty;
    return matchesQuery && matchesFilter;
  });

  // ✅ Fix: Applying 'mode' to dynamic styles to clear the ESLint error
  const cardStyle = mode === 'dark' ? 'bg-slate-900 border-white/5 text-white' : 'bg-white border-gray-100 text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`max-w-7xl mx-auto py-10 px-6 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      
      {/* 🔍 Search Bar Section */}
      <div className="mb-12">
        <div className={`relative max-w-2xl mx-auto flex items-center shadow-xl rounded-[25px] overflow-hidden border transition-all focus-within:ring-2 focus-within:ring-yellow-500/20 group ${cardStyle}`}>
          <div className="px-6">
            <Search className="text-gray-400 group-focus-within:text-yellow-500" size={24} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.searchPlaceholder}
            className={`w-full py-5 px-6 bg-transparent border-none outline-none font-bold text-lg placeholder:text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 space-y-6">
          <div className={`${cardStyle} p-8 rounded-[35px] shadow-sm border`}>
            <div className="flex items-center gap-3 mb-8 font-black uppercase tracking-wider text-sm">
              <Filter size={20} className="text-yellow-500" />
              {content.filtersLabel}
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">{content.practiceArea}</p>
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`w-full px-5 py-3 rounded-xl text-sm font-bold transition-all ${isRTL ? 'text-right' : 'text-left'} ${
                    selectedSpecialty === spec.id 
                    ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20 scale-105' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Lawyers Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((l) => (
            <article key={l.id} className={`${cardStyle} group rounded-[35px] p-7 shadow-sm border transition-all hover:shadow-2xl hover:-translate-y-1`}>
              <div className="flex items-start gap-6">
                <img src={l.image} alt={l.name} className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-yellow-500/10" />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black leading-none">{l.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-500 text-slate-950 px-2 py-1 rounded-lg font-black text-xs">
                      <Star size={12} fill="currentColor" /> {l.rating}
                    </div>
                  </div>
                  
                  <p className="text-yellow-600 dark:text-yellow-500 font-black text-xs mb-4 uppercase tracking-widest">
                    {isRTL && l.specialty === 'Corporate Law' ? 'قانون الشركات' : 
                    isRTL && l.specialty === 'Family Law' ? 'قانون الأسرة' : l.specialty}
                  </p>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                      <Briefcase size={14} className="text-yellow-500" />
                      <span>{l.cases} {content.cases}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                      <MapPin size={14} className="text-yellow-500" />
                      <span>{content.location}</span>
                    </div>
                  </div>

                  <Link
                    to={`/lawyers/${l.id}`}
                    className="block w-full text-center py-3 bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-black rounded-2xl hover:bg-yellow-500 hover:!text-slate-950 transition-all shadow-md"
                  >
                    {content.viewProfile}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyersListPage;
