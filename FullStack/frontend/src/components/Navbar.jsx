import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Globe, Bell, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useLanguage } from "../context/LanguageContextObject";
import { useTheme } from "../context/ThemeContext";
import logoImage from '../Assets/logo/logo lawlink half.png';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();
  const isRTL = language === 'ar' || language === 'eg';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔐 محاكاة حالة تسجيل الدخول - بنستخدم الأدمن هنا عشان نفتح كل الصلاحيات[cite: 1, 4]
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const user = {
    name: 'Mahmoud Admin', // اسم المستخدم اللي بيظهر في المنيو[cite: 4]
    role: 'Admin', // الدور هنا هو اللي بيحدد اللينكات هتروح فين (Admin/Lawyer/Client)[cite: 1, 4]
    image: 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg' 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // بنصفر حالة الدخول[cite: 4]
    setIsMenuOpen(false); // بنقفل المنيو[cite: 4]
    navigate('/login'); // بنرجع المستخدم لصفحة الدخول[cite: 4]
  };

  // تحديد خلفية المنيو المنسدلة بناءً على الثيم (فاتح ولا غامق)[cite: 4]
  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';

  return (
    <nav dir={isRTL ? 'rtl' : 'ltr'} className={`fixed top-0 w-full z-[100] transition-all border-b ${
      mode === 'dark' ? 'bg-slate-950/90 border-white/5 text-white' : 'bg-white/90 border-gray-200 text-slate-900'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo Section - شعار المنصة واسمها بتنسيق إيتاليك شيك[cite: 4] */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImage} alt="Logo" className="h-10" />
          <span className={`font-black text-2xl tracking-tighter italic ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            LAW<span className="text-yellow-500">LINK</span>
          </span>
        </Link>

        {/* Navigation Links - لينكات التصفح الأساسية في نص الناف بار[cite: 4] */}
        <div className="hidden md:flex gap-8 font-bold">
          <Link to="/" className="hover:text-yellow-500 transition-colors">{t('nav.home', 'Home')}</Link>
          <Link to="/find-lawyer" className="hover:text-yellow-500 transition-colors">{t('nav.findLawyer', 'Find Lawyer')}</Link>
          <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how', 'How it Works')}</Link>
        </div>

        {/* Actions Section - الجزء اللي فيه المود واللغة وصورة المستخدم[cite: 4] */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* زرار تبديل الوضع (ليل/نهار)[cite: 4] */}
          <button onClick={toggleMode} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            {mode === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {/* زرار تبديل اللغة[cite: 4] */}
          <button onClick={() => setLanguage(language === 'en' ? 'eg' : 'en')} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            <Globe size={18} />
          </button>

          {!isLoggedIn ? (
            <Link to="/login" className="bg-yellow-500 !text-slate-950 px-6 py-2.5 rounded-full font-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all">
              {t('nav.signup', 'Join Now')}
            </Link>
          ) : (
            <div className="relative">
              {/* زرار فتح القائمة المنسدلة اللي فيه صورة اليوزر[cite: 4] */}
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

              {/* القائمة المنسدلة - المنيو اللي بتفتح لما تدوس على صورتك[cite: 4] */}
              {isMenuOpen && (
                <div className={`absolute top-14 ${isRTL ? 'left-0' : 'right-0'} w-56 p-2 rounded-2xl border shadow-2xl ${cardBg} animate-in fade-in zoom-in duration-200`}>
                  
                  {/* رأس المنيو - فيه الاسم والدور الوظيفي[cite: 4] */}
                  <div className="px-4 py-3 border-b border-gray-500/10 mb-2">
                    <p className="text-sm font-black truncate">{user.name}</p>
                    <p className="text-[10px] uppercase font-bold text-yellow-500 tracking-widest">{user.role}</p>
                  </div>
                  
                  {/* لينك البروفايل - المسار بيتحدد أوتوماتيك حسب الرتبة (أدمن، محامي، ولا عميل)[cite: 4] */}
                  <Link 
                    to={
                      user.role === 'Admin' ? '/admin/profile' : 
                      user.role === 'Lawyer' ? '/lawyer/profile' : '/client/profile'
                    } 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-all font-bold text-sm"
                  >
                    <User size={18} /> {isRTL ? 'الملف الشخصي' : 'My Profile'}
                  </Link>

                  {/* لينك لوحة التحكم - أهم تعديل عشان يربط الأدمن بلوحته الخاصة[cite: 2, 4] */}
                  <Link 
                    to={
                      user.role === 'Admin' ? '/admin/dashboard' : 
                      user.role === 'Lawyer' ? '/lawyer/dashboard' : '/client/dashboard'
                    } 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-500/10 transition-all font-bold text-sm"
                  >
                    <LayoutDashboard size={18} /> {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>

                  {/* زرار تسجيل الخروج - بيمسح البيانات وبيرجعك لصفحة اللوج إن[cite: 4] */}
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
