import React, { useEffect, useRef, useState } from 'react';
import { Search, Sun, Moon, Sparkles } from 'lucide-react';

import { useTheme } from '../context/ThemeContextHook';
import NotificationDropdown from './NotificationDropdown';
import dataService from '../services/DataService';

const AdminHeader = ({ title = "Management", description }) => {
  // --- Theme & State ---
  const { mode, toggleMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef(null);

  // --- Search Logic ---
  useEffect(() => {
    const onKeyDown = (e) => {
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      if (isCtrlK) {
        e.preventDefault();
        setShowDropdown(true);
        const input = searchRef.current?.querySelector('input');
        input?.focus();
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadMe = async () => {
      try {
        setProfileLoading(true);
        const res = await dataService.admin.getMe();
        const user = res?.user ?? res;
        if (!cancelled) setProfile(user || {});
      } catch (e) {
        console.error('Failed to load admin profile:', e);
        if (!cancelled) setProfile({});
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };
    loadMe();
    return () => { cancelled = true; };
  }, []);

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
    } catch (err) {
      console.error('Admin global search failed:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 p-4 w-full transition-colors duration-300 bg-gray-50/90 dark:bg-[#0F111A]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        {/* 1. Branding & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-500/20 items-center justify-center shadow-lg shadow-yellow-500/20">
            <Sparkles className="text-white" size={18} />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[9px] font-extrabold text-yellow-600 dark:text-yellow-500/90 uppercase tracking-[0.25em]">
              Management
            </h3>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none truncate max-w-[120px] sm:max-w-xs">
              {title}
            </h1>
            {description && (
              <p className="text-[11px] mt-1 text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[260px]">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* 2. Global Search Bar */}
        <div className="relative w-full max-w-lg mx-4 hidden md:block group" ref={searchRef}>
          <div className="relative flex items-center">
            <Search 
              className={`absolute left-4 transition-colors duration-300 ${
                isSearching ? 'text-yellow-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'
              }`} 
              size={18} 
            />
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.length > 1 && setShowDropdown(true)}
              placeholder="البحث عن القضايا، المحامين، أو العملاء..." 
              className="w-full bg-white dark:bg-[#161922] border border-gray-300 dark:border-white/10 focus:border-yellow-500 dark:focus:border-yellow-500/50 rounded-xl py-2.5 pl-11 pr-16 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-500/10 transition-all text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-inner"
            />
            
            {/* Keyboard Shortcut Hint */}
            <div className="absolute right-3 flex items-center">
              <kbd className="flex items-center justify-center px-2 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md text-[10px] font-medium text-gray-500 dark:text-gray-400 font-sans shadow-sm">
                Ctrl+K
              </kbd>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  جاري البحث...
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <ul className="py-2">
                  {searchResults.map((result, idx) => (
                    <li key={result?.id ?? result?.case_id ?? result?._id ?? idx}>
                      <button
                        type="button"
                        className="w-full px-4 py-3 flex items-center gap-3 text-right hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                        onClick={() => {
                          // best-effort: if backend returns a case_id we can navigate
                          const caseId = result?.case_id ?? result?.caseId;
                          if (caseId) {
                            window.location.href = `/admin/cases/${caseId}/edit`;
                          }
                          setShowDropdown(false);
                        }}
                      >
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-500/10 transition-colors">
                          <span className="text-[10px] font-black">{result?.type ? String(result.type).slice(0,1).toUpperCase() : '•'}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                          {result?.text || result?.title || result?.name || result?.client_name || result?.lawyer_name || 'Result'}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  لا توجد نتائج مطابقة لـ "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleMode}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all"
            aria-label="Toggle Theme"
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <NotificationDropdown />
          
          {/* Divider */}
          <div className="w-px h-8 bg-gray-200 dark:bg-white/10 hidden sm:block mx-1"></div>
          
          {/* Profile Dropdown */}
          <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-right">
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {profileLoading ? 'Loading...' : (profile?.name || 'Admin')}
              </p>
              <p className="text-[10px] font-bold text-gray-500 dark:text-yellow-500/70 uppercase tracking-widest mt-0.5">
                {profileLoading ? '' : (profile?.role || 'System Controller')}
              </p>
            </div>

            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-600/50 flex items-center justify-center text-yellow-700 dark:text-yellow-500 font-black text-sm shadow-sm overflow-hidden">
                {profileLoading ? (
                  <span>...</span>
                ) : profile?.image_url ? (
                  <img src={profile.image_url} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>
                    {(profile?.name || 'Admin')
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((x) => x[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
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
