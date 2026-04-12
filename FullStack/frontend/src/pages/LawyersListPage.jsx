import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, Star, Briefcase, MapPin } from 'lucide-react';

const lawyers = [
  { id: 1, name: 'Robert M. Hughes', specialty: 'Corporate Law', rating: 4.9, cases: 180, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Amina El-Sayed', specialty: 'Family Law', rating: 4.8, cases: 117, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Marcus Thorne', specialty: 'Criminal Defense', rating: 5.0, cases: 236, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Sarah Jenkins', specialty: 'Real Estate Law', rating: 4.7, cases: 89, image: 'https://i.pravatar.cc/150?u=4' },
];

const LawyersListPage = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const isRTL = language === 'ar' || language === 'eg';

  const specialties = ['all', 'Corporate Law', 'Family Law', 'Criminal Defense', 'Real Estate Law'];

  const filtered = lawyers.filter((l) => {
    const matchesQuery = l.name.toLowerCase().includes(query.toLowerCase()) || 
                         l.specialty.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = selectedSpecialty === 'all' || l.specialty === selectedSpecialty;
    return matchesQuery && matchesFilter;
  });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="max-w-7xl mx-auto py-10 px-6">
      
      {/* 🔍 Search Bar Section - الشكل النهائي البروفيشنال */}
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto flex items-center bg-white dark:bg-slate-900 shadow-xl rounded-[25px] overflow-hidden border border-gray-100 dark:border-white/5 transition-all focus-within:ring-2 focus-within:ring-yellow-500/20 group">
          
          {/* ✅ الأيقونة في أقصى اليسار مع مسافة داخلية شيك */}
          <div className="px-6 flex items-center border-none">
            <Search className="text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={24} />
          </div>
          
          {/* ✅ الـ Input بدون حواف داخلية تماماً والنص أقصى اليمين */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('page.lawyersList.searchPlaceholder', 'Search for a lawyer...')}
            className="w-full py-5 px-6 bg-transparent border-none outline-none text-slate-900 dark:text-white font-bold text-lg placeholder:text-gray-500 text-right"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8 font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">
              <Filter size={20} className="text-yellow-500" />
              {t('page.findLawyer.filtersLabel', 'Filters')}
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">Practice Area</p>
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedSpecialty === spec 
                    ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/20 scale-105' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {spec === 'all' ? 'All Specialties' : spec}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Lawyers Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((l) => (
            <article key={l.id} className="group bg-white dark:bg-slate-900 rounded-[35px] p-7 shadow-sm border border-gray-100 dark:border-white/5 transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <img src={l.image} alt={l.name} className="w-28 h-28 rounded-2xl object-cover shadow-lg border-2 border-yellow-500/10 transition-transform group-hover:scale-105" />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{l.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-500 text-slate-950 px-2 py-1 rounded-lg font-black text-xs shadow-sm">
                      <Star size={12} fill="currentColor" /> {l.rating}
                    </div>
                  </div>
                  
                  <p className="text-yellow-600 dark:text-yellow-500 font-black text-xs mb-5 uppercase tracking-widest">{l.specialty}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs font-bold bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      <Briefcase size={14} className="text-yellow-500 shrink-0" />
                      <span>{l.cases} {t('page.lawyersList.casesHandledPrefix', 'Cases')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs font-bold bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      <MapPin size={14} className="text-yellow-500 shrink-0" />
                      <span>Cairo</span>
                    </div>
                  </div>

                  <Link
                    to={`/lawyers/${l.id}`}
                    className="block w-full text-center py-4 bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-black rounded-2xl hover:bg-yellow-500 hover:!text-slate-950 transition-all shadow-md active:scale-95"
                  >
                    {t('page.lawyersList.viewProfile', 'View Profile')}
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