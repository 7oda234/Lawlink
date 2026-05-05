import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { Sun, Moon, Globe, Bell, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'; 
import { useLanguage } from '../context/useLanguage'; 
import { useTheme } from '../context/ThemeContext'; 
import logoImage from '../Assets/logo/logo lawlink half.png'; 

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage(); 
  const { mode, toggleMode } = useTheme(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  const isRTL = language === 'ar' || language === 'eg'; 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const isLoggedIn = !!localStorage.getItem('token'); 

  // ✅ الجزء الجديد: جعل بيانات المستخدم State لتحديثها تلقائياً
  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || 'مستخدم',
    role: localStorage.getItem('userRole') || 'Client',
    image: localStorage.getItem('userImage') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    unreadNotifications: parseInt(localStorage.getItem('unreadNotifications')) || 0
  });

  // ✅ إضافة مستمع للأحداث (EventListener) لضمان تحديث الصورة والاسم فوراً عند التعديل
  useEffect(() => {
    const handleSync = () => {
      setUserData({
        name: localStorage.getItem('userName') || 'مستخدم',
        role: localStorage.getItem('userRole') || 'Client',
        image: localStorage.getItem('userImage') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        unreadNotifications: parseInt(localStorage.getItem('unreadNotifications')) || 0
      });
    };

    window.addEventListener('storage', handleSync); // يتنصت على التغييرات من صفحات التعديل
    handleSync(); // تحديث البيانات عند تغيير المسار (Navigate)

    return () => window.removeEventListener('storage', handleSync);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear(); 
    setIsMenuOpen(false); 
    navigate('/login'); 
  };

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';

  return (
    <nav dir={isRTL ? 'rtl' : 'ltr'} className={`fixed top-0 w-full z-[100] transition-all border-b ${
      mode === 'dark' ? 'bg-slate-950/90 border-white/5 text-white' : 'bg-white/90 border-gray-200 text-slate-900'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImage} alt="Logo" className="h-10" />
          <span className={`font-black text-2xl tracking-tighter italic ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            LAW<span className="text-yellow-500">LINK</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 font-bold">
          <Link to="/" className="hover:text-yellow-500 transition-colors">{t('nav.home', 'Home')}</Link>
          <Link to="/find-lawyer" className="hover:text-yellow-500 transition-colors">{t('nav.findLawyer', 'Find Lawyer')}</Link>
          <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how', 'How it Works')}</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          
          {isLoggedIn && (
            <Link to="/notifications" className="relative p-2 hover:bg-gray-500/10 rounded-full transition-colors group">
              <Bell size={22} className="group-hover:text-yellow-500 transition-colors" />
              {userData.unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-slate-950">
                  {userData.unreadNotifications}
                </span>
              )}
            </Link>
          )}

          <button onClick={toggleMode} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            {mode === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          <button onClick={() => setLanguage(language === 'en' ? 'eg' : 'en')} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            <Globe size={18} />
          </button>

          {!isLoggedIn ? (
            <Link to="/login" className="bg-yellow-500 !text-slate-950 px-6 py-2.5 rounded-full font-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all">
              {t('nav.signup', 'Join Now')}
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 p-1 pr-3 rtl:pr-1 rtl:pl-3 hover:bg-gray-500/10 rounded-full transition-all border border-transparent hover:border-yellow-500/30"
              >
                <img 
                  src={userData.image} 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500"
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} // ✅ حماية
                />
                <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className={`absolute top-14 ${isRTL ? 'left-0' : 'right-0'} w-56 p-2 rounded-2xl border shadow-2xl ${cardBg} animate-in fade-in zoom-in duration-200`}>
                  <div className="px-4 py-3 border-b border-gray-500/10 mb-2">
                    <p className="text-sm font-black truncate">{userData.name}</p>
                    <p className="text-[10px] uppercase font-bold text-yellow-500 tracking-widest">{userData.role}</p>
                  </div>
                  
                  <Link 
                    to={userData.role.toLowerCase() === 'lawyer' ? '/lawyer/profile' : '/client/profile'} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-all font-bold text-sm"
                  >
                    <User size={18} /> {isRTL ? 'الملف الشخصي' : 'My Profile'}
                  </Link>

                  <Link 
                    to={userData.role.toLowerCase() === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard'} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-500/10 transition-all font-bold text-sm"
                  >
                    <LayoutDashboard size={18} /> {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all font-bold text-sm mt-2 border-t border-gray-500/5 pt-4"
                  >
                    <LogOut size={18} /> {isRTL ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;