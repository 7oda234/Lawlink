import React, { useState, useMemo } from 'react';
import LawyerCard from '../../components/LawyerCard';
import { Search, Filter, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';

const FindLawyerPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [minRating, setMinRating] = useState(0);
  
  const isRTL = language === 'ar' || language === 'eg';

  // 🏛️ Dummy Data
  const lawyers = useMemo(() => [
    { id: 1, name: "Robert M. Hughes", specialty: "Corporate Law", location: "Downtown Cairo", experience: 15, rating: 4.9, category: "corporate", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400" },
    { id: 2, name: "Amina El-Sayed", specialty: "Family Law", location: "Heliopolis, Cairo", experience: 8, rating: 4.8, category: "family", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" },
    { id: 3, name: "Khaled Mansour", specialty: "Criminal Defense", location: "Maadi, Cairo", experience: 22, rating: 5.0, category: "criminal", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
    { id: 4, name: "Sarah Jenkins", specialty: "Real Estate Law", location: "New Cairo", experience: 12, rating: 4.7, category: "realEstate", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" },
    { id: 5, name: "Youssef Zaki", specialty: "Intellectual Property", location: "Zamalek, Cairo", experience: 10, rating: 4.6, category: "intellectualProperty", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { id: 6, name: "Laila Hassan", specialty: "Corporate Law", location: "Alexandria", experience: 18, rating: 4.9, category: "corporate", image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?w=400" }
  ], []);

  const categories = [
    { id: 'all', label: isRTL ? 'الكل' : 'All' },
    { id: 'corporate', label: isRTL ? 'قانون الشركات' : 'Corporate Law' },
    { id: 'family', label: isRTL ? 'قانون الأسرة' : 'Family Law' },
    { id: 'criminal', label: isRTL ? 'الدفاع الجنائي' : 'Criminal Defense' },
    { id: 'realEstate', label: isRTL ? 'قانون العقارات' : 'Real Estate' },
    { id: 'intellectualProperty', label: isRTL ? 'الملكية الفكرية' : 'Intellectual Property' },
  ];

  // 🔍 Fixed Memoization - Added 'lawyers' to dependencies
  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || lawyer.category === activeCategory;
      const matchesRating = lawyer.rating >= minRating;
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [searchTerm, activeCategory, minRating, lawyers]);

  // ✅ Fixed Variable Naming (Unifying cardStyle and cardBg)
  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-200 text-slate-900';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-7xl mx-auto px-6">
        
        {/* Top Search Area */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className={`flex-1 flex items-center px-6 rounded-2xl border shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-500/20 ${cardBg}`}>
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={isRTL ? "ابحث بالاسم أو التخصص..." : "Search by name or specialty..."}
              className="w-full py-4 px-4 bg-transparent outline-none font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-yellow-500 text-black px-10 py-4 rounded-2xl font-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/10">
            {isRTL ? 'بحث' : 'Search'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className={`p-8 rounded-3xl border shadow-sm sticky top-32 ${cardBg}`}>
              <div className="flex items-center gap-2 font-black text-lg mb-8 border-b pb-4">
                <Filter size={20} className="text-yellow-500" />
                {isRTL ? 'تصفية النتائج' : 'Filter Results'}
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{isRTL ? 'مجال التخصص' : 'Practice Area'}</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-sm font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center ${
                        activeCategory === cat.id ? 'bg-yellow-500 text-black shadow-md' : 'hover:bg-gray-100 dark:hover:bg-white/5 opacity-70'
                      }`}
                    >
                      {cat.label}
                      {activeCategory === cat.id && <div className="w-2 h-2 bg-black rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{isRTL ? 'التقييم' : 'Minimum Rating'}</h4>
                <select 
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className={`w-full p-3 rounded-xl border outline-none bg-transparent font-bold ${mode === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}
                >
                  <option value="0">{isRTL ? 'أي تقييم' : 'Any Rating'}</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.8">4.8+ ⭐</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-black mb-4 px-2">
              {filteredLawyers.length} {isRTL ? 'محامي متاح' : 'Lawyers Found'}
            </h2>
            
            {filteredLawyers.map(lawyer => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}

            {filteredLawyers.length === 0 && (
              <div className="text-center py-20 opacity-40">
                <Briefcase size={60} className="mx-auto mb-4" />
                <p className="text-xl font-bold">{isRTL ? 'لا توجد نتائج مطابقة' : 'No lawyers match your search'}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// ✅ Fixed Export Name Typo
export default FindLawyerPage;
