import React, { useEffect, useRef, useState } from 'react';
import { Search, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContextHook';
import NotificationDropdown from './NotificationDropdown';
import dataService from '../services/DataService';
import { useAuth } from '../context/useAuth';

// دالة الترجمة للرتبة عشان تطلع بشكل شيك ومفهوم للمدير
const getEgyptianRoleName = (level) => {
  switch(Number(level)) {
    case 5: return 'سوبر أدمن (Level 5)';
    case 4: return 'مدير عمليات (Level 4)';
    case 3: return 'مسئول مراجعة (Level 3)';
    case 2: return 'دعم فني (Level 2)';
    case 1: return 'محلل بيانات (Level 1)';
    default: return 'مدير نظام';
  }
};

const AdminHeader = ({ title = "Management", description }) => {
  const { mode, toggleMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchRef = useRef(null);

  // 🛡️ بنسحب بيانات المدير من الكونتيكست الموحد
  const { authUser, isLoading: profileLoading } = useAuth();
  const profile = authUser;

  // فتح وقفل البحث بالكيبورد (اختصار Ctrl+K)
  useEffect(() => {
    const onKeyDown = (e) => {
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      if (isCtrlK) {
        e.preventDefault();
        setShowDropdown(true);
        searchRef.current?.querySelector('input')?.focus();
      }
      if (e.key === 'Escape') {
        setShowDropdown(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // قفل القائمة المنبثقة لو ضغطت في أي حتة براها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // دالة البحث الشاملة في النظام
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const query = value.trim();
    if (!query || query.length < 3) {
      setIsSearching(false);
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    setShowDropdown(true);
    try {
      const res = await dataService.admin.searchGlobal(query);
      const data = res?.data ?? res;
      setSearchResults(Array.isArray(data) ? data : []);
    } catch  {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    // الهيدر الرئيسي بياخد عرض الشاشة بالكامل
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-gray-50/90 dark:bg-[#0F111A]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm">
      {/* 🚀 التعديل هنا: 
        شيلنا max-w-7xl وخليناها w-full مع px-4 lg:px-8 عشان الهيدر يفرش بعرض الشاشة وياخد مساحته 
      */}
      <div className="flex items-center justify-between w-full mx-auto h-16 px-4 lg:px-8">
        
        {/* الجزء الخاص باللوجو والعنوان (شمال/يمين حسب اللغة) */}
        {/* ضفنا shrink-0 عشان نمنع الجزء ده إنه يتزنق أو يصغر */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-500/20 items-center justify-center shadow-lg shadow-yellow-500/20">
            <Sparkles className="text-white" size={18} />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[9px] font-extrabold text-yellow-600 dark:text-yellow-500/90 uppercase tracking-[0.25em]">Management</h3>
            {/* كبرنا مساحة الـ truncate عشان العنوان ميتخنقش */}
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none truncate max-w-[150px] sm:max-w-md">{title}</h1>
            {description && <p className="text-[11px] mt-1 text-gray-500 dark:text-gray-400 line-clamp-1 hidden lg:block max-w-xs">{description}</p>}
          </div>
        </div>

        {/* شريط البحث */}
        {/* 🚀 التعديل هنا: 
          كبرنا الـ max-w من max-w-lg لـ max-w-2xl وضفنا flex-1 عشان البحث ياخد المساحة الفاضية في النص براحته 
        */}
        <div className="relative w-full max-w-2xl mx-8 hidden md:block group flex-1" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className={`absolute left-4 transition-colors duration-300 ${isSearching ? 'text-yellow-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'}`} size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.length > 1 && setShowDropdown(true)}
              placeholder="البحث العام السريع..." 
              className="w-full bg-white dark:bg-[#161922] border border-gray-300 dark:border-white/10 rounded-xl py-2.5 pl-11 pr-16 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-500/10 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* القائمة المنبثقة لنتائج البحث */}
          {showDropdown && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-gray-500">جاري البحث...</div>
              ) : searchResults.length > 0 ? (
                <ul className="py-2">
                  {searchResults.map((result, idx) => (
                    <li key={idx} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                      {result?.text || result?.title || result?.name || 'نتيجة بحث'}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">لا توجد نتائج مطابقة</div>
              )}
            </div>
          )}
        </div>

        {/* الجزء الخاص ببيانات المستخدم والأيقونات */}
        {/* ضفنا shrink-0 هنا برضو عشان الأيقونات والاسم ميضغطوش على بعض */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button onClick={toggleMode} className="p-2 text-gray-500 hover:text-yellow-600 rounded-xl">
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <NotificationDropdown />
          
          <div className="w-px h-8 bg-gray-200 dark:bg-white/10 hidden sm:block mx-1"></div>
          
          <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-right">
            {/* 🚀 التعديل هنا: 
              ضفنا whitespace-nowrap لكل الـ text عشان الكلمات متتفصلش وتنزل على السطر اللي تحته زي الصورة 
            */}
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight whitespace-nowrap text-gray-900 dark:text-gray-100">
                {profileLoading ? 'بيحمل...' : (profile?.name || 'مدير النظام')}
              </p>
              <p className="text-[10px] font-bold text-gray-500 dark:text-yellow-500/70 uppercase tracking-widest mt-0.5 whitespace-nowrap">
                {profileLoading ? '' : getEgyptianRoleName(profile?.authority_level)}
              </p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-700 font-black overflow-hidden shadow-sm shrink-0">
                {profile?.image_url ? <img src={profile.image_url} alt="avatar" className="w-full h-full object-cover" /> : <span>{(profile?.name || 'A').charAt(0).toUpperCase()}</span>}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#0F111A] rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
