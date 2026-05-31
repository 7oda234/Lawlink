import React, { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Sparkles, LogOut, Settings, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContextHook';
import NotificationDropdown from './NotificationDropdown';
import dataService from '../services/DataService';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { authUser, isLoading: profileLoading } = useAuth();
  
  const profile = React.useMemo(() => {
    return {
      name: authUser?.name || localStorage.getItem('userName') || 'مدير النظام',
      email: authUser?.email || localStorage.getItem('userEmail') || 'admin@lawlink.com',
      authority_level: authUser?.authority_level || localStorage.getItem('authorityLevel'),
      image_url: authUser?.image_url || localStorage.getItem('userImage')
    };
  }, [authUser]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowProfileDropdown(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-white/95 dark:bg-[#0F111A]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-md">
      <div className="flex items-center justify-between w-full mx-auto h-20 px-6 lg:px-12">
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 border border-yellow-500/20 items-center justify-center shadow-lg shadow-yellow-500/20">
            <Sparkles className="text-white" size={22} />
          </div>
          <div className="flex flex-col justify-center">
            {/* <h3 className="text-[10px] font-extrabold text-yellow-600 dark:text-yellow-500/90 uppercase tracking-[0.3em]">Management</h3> */}
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none truncate max-w-xl">{title}</h1>
            {/* {description && <p className="text-xs mt-1.5 text-gray-500 dark:text-gray-400 line-clamp-1 hidden lg:block max-w-xl">{description}</p>} */}
          </div>
        </div>

        {/* Search input bar wrapper container completely removed from this segment */}

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <button onClick={toggleMode} className="p-2.5 text-gray-500 hover:text-yellow-600 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            {mode === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          <NotificationDropdown />
          
          <div className="w-px h-8 bg-gray-200 dark:bg-white/10 hidden sm:block mx-1"></div>
          
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-4 p-2 pr-4 rounded-xl transition-all text-right border dark:border-white/10"
            >
              <div className="hidden sm:block">
                <p className="text-sm font-black leading-tight whitespace-nowrap text-gray-900 dark:text-gray-100">
                  {profileLoading ? 'بيحمل...' : (profile?.name || 'مدير النظام')}
                </p>
                <p className="text-[11px] font-bold text-gray-500 dark:text-yellow-500/70 uppercase tracking-widest mt-1 whitespace-nowrap">
                  {profileLoading ? '' : getEgyptianRoleName(profile?.authority_level)}
                </p>
              </div>
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-700 font-black overflow-hidden shadow-sm shrink-0">
                  {profile?.image_url ? <img src={profile.image_url} alt="avatar" className="w-full h-full object-cover" /> : <span>{(profile?.name || 'A').charAt(0).toUpperCase()}</span>}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0F111A] rounded-full"></div>
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute top-full mt-2 right-0 left-auto w-64 bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-100 dark:border-white/5">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{profile?.name || 'مدير النظام'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{profile?.email || 'admin@lawlink.com'}</p>
                </div>
                <div className="py-2">
                  <button onClick={() => {setShowProfileDropdown(false); navigate('/admin/profile');}} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <User size={16} className="text-gray-400" />
                    الملف الشخصي
                  </button>
                  <button onClick={() => {setShowProfileDropdown(false); navigate('/admin/settings');}} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <Settings size={16} className="text-gray-400" />
                    الإعدادات
                  </button>
                </div>
                <div className="py-2 border-t border-gray-100 dark:border-white/5">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <LogOut size={16} />
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
