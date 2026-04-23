import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { Sun, Moon, Globe, Bell, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'; 
import { useLanguage } from '../context/useLanguage'; 
import { useTheme } from '../context/ThemeContext'; 
import logoImage from '../Assets/logo/logo lawlink half.png'; 

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage(); 
  const { mode, toggleMode } = useTheme(); 
  const navigate = useNavigate(); 
  
  // 1️⃣ الحل السحري: بنستدعي الـ Hook عشان يجبر الناف بار يتحدث مع كل انتقال، من غير ما نخزنه في متغير!
  useLocation(); 
  
  const isRTL = language === 'ar' || language === 'eg'; 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // 2️⃣ بنقرأ حالة تسجيل الدخول مباشرة من المتصفح كمتغير ثابت
  const isLoggedIn = !!localStorage.getItem('token'); 

  // بنقرأ بيانات اليوزر بنفس الطريقة
  const user = {
    name: localStorage.getItem('userName') || 'User', 
    role: localStorage.getItem('userRole') || 'Client', 
    image: localStorage.getItem('userImage') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png', 
    unreadNotifications: parseInt(localStorage.getItem('unreadNotifications')) || 0  // افتراضي
  };

//   // جوه دالة handleLogin بعد استلام التوكن
// localStorage.setItem('token', token);
localStorage.setItem('userRole', user.role);
localStorage.setItem('userName', user.name);
localStorage.setItem('userImage', user.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png');
localStorage.setItem('unreadNotifications', user.unreadNotifications || 0); 
// ✅ تخزين عدد التنبيهات غير المقروءة
localStorage.setItem('unreadNotifications', user.unread_notifications || 0);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    // بنمسح الداتا من المتصفح
    localStorage.removeItem('token'); 
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('userName'); 
    localStorage.removeItem('userImage'); 
    localStorage.removeItem('unreadNotifications');

    setIsMenuOpen(false); // بنقفل القائمة
    navigate('/login'); // بنوجهه للوجن
  };

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';

  return (
    <nav dir={isRTL ? 'rtl' : 'ltr'} className={`fixed top-0 w-full z-[100] transition-all border-b ${
      mode === 'dark' ? 'bg-slate-950/90 border-white/5 text-white' : 'bg-white/90 border-gray-200 text-slate-900'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* اللوجو */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImage} alt="Logo" className="h-10" />
          <span className={`font-black text-2xl tracking-tighter italic ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            LAW<span className="text-yellow-500">LINK</span>
          </span>
        </Link>

        {/* روابط التنقل الأساسية */}
        <div className="hidden md:flex gap-8 font-bold">
          <Link to="/" className="hover:text-yellow-500 transition-colors">{t('nav.home', 'Home')}</Link>
          <Link to="/find-lawyer" className="hover:text-yellow-500 transition-colors">{t('nav.findLawyer', 'Find Lawyer')}</Link>
          <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how', 'How it Works')}</Link>
        </div>

        {/* قسم الأزرار */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* التنبيهات (تظهر فقط لو مسجل دخول) */}
          {isLoggedIn && (
            <Link to="/notifications" className="relative p-2 hover:bg-gray-500/10 rounded-full transition-colors group">
              <Bell size={22} className="group-hover:text-yellow-500 transition-colors" />
              {user.unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-slate-950">
                  {user.unreadNotifications}
                </span>
              )}
            </Link>
          )}

          {/* تبديل الثيم */}
          <button onClick={toggleMode} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            {mode === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {/* تبديل اللغة */}
          <button onClick={() => setLanguage(language === 'en' ? 'eg' : 'en')} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            <Globe size={18} />
          </button>

          {/* التحقق من حالة الدخول لعرض الأزرار */}
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
                  src={user.image} 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500"
                />
                <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* القائمة المنسدلة */}
              {isMenuOpen && (
                <div className={`absolute top-14 ${isRTL ? 'left-0' : 'right-0'} w-56 p-2 rounded-2xl border shadow-2xl ${cardBg} animate-in fade-in zoom-in duration-200`}>
                  <div className="px-4 py-3 border-b border-gray-500/10 mb-2">
                    <p className="text-sm font-black truncate">{user.name}</p>
                    <p className="text-[10px] uppercase font-bold text-yellow-500 tracking-widest">{user.role}</p>
                  </div>
                  
                  <Link 
                    to={user.role === 'Lawyer' ? '/lawyer/profile' : '/client/profile'} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-all font-bold text-sm"
                  >
                    <User size={18} /> {isRTL ? 'الملف الشخصي' : 'My Profile'}
                  </Link>

                  <Link 
                    to={user.role === 'Lawyer' ? '/lawyer/dashboard' : '/client/dashboard'} 
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
