// استيراد الأدوات اللي بنحتاجها من مكتبات رياكت الخارجية
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { Sun, Moon, Globe, Bell, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'; 
import { useLanguage } from '../context/useLanguage'; 
import { useTheme } from '../context/ThemeContextHook';
import axios from 'axios'; 
import logoImage from '../Assets/logo/logo lawlink half.png'; 
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage(); 
  const { mode, toggleMode } = useTheme(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  const isRTL = language === 'ar' || language === 'eg'; 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const isLoggedIn = !!localStorage.getItem('token'); 

  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || 'مستخدم',
    role: localStorage.getItem('userRole') || 'Client',
    image: localStorage.getItem('userImage') || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    unreadNotifications: parseInt(localStorage.getItem('unreadNotifications')) || 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const unread = parseInt(localStorage.getItem('unreadNotifications')) || 0;

      if (!userId || userId === 'undefined' || userId === 'null' || !token) {
        setUserData(prev => ({ ...prev, unreadNotifications: unread }));
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success || response.data.ok) {
          const data = response.data.data || response.data.user || response.data;
          
          let finalImage = data.image_url;
          if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('data:image')) {
            finalImage = `http://localhost:5000${finalImage.startsWith('/') ? '' : '/'}${finalImage}`;
          }

          setUserData(prev => ({
            ...prev,
            name: data.name || prev.name,
            role: data.role || prev.role,
            image: finalImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            unreadNotifications: unread
          }));

          if (finalImage) localStorage.setItem('userImage', finalImage);
        }
      } catch (err) {
        console.error("❌ خطأ في جلب بيانات الـ Navbar:", err);
      }
    };

    fetchUserData();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setIsMenuOpen(false); 
    navigate('/login'); 
  };

  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const notificationPath = userData.role.toLowerCase() === 'lawyer' ? '/lawyer/notifications' : '/client/notifications';

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

        {/* الجزء ده بيعرض اللينكات حسب حالة المستخدم ونوعه */}
        <div className="hidden md:flex gap-8 font-bold">
          
          {/* الحالة 1: المحامي (Dashboard + How it Works) */}
          {isLoggedIn && userData.role.toLowerCase() === 'lawyer' && (
            <>
              <Link to="/lawyer/dashboard" className="hover:text-yellow-500 transition-colors">{t('nav.dashboard', 'Dashboard')}</Link>
              <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how', 'How it Works')}</Link>
            </>
          )}

          {/* الحالة 2: العميل (Dashboard + Find Lawyer + How it Works) */}
          {isLoggedIn && userData.role.toLowerCase() === 'client' && (
            <>
              <Link to="/client/dashboard" className="hover:text-yellow-500 transition-colors">{t('nav.dashboard', 'Dashboard')}</Link>
              <Link to="/find-lawyer" className="hover:text-yellow-500 transition-colors">{t('nav.findLawyer', 'Find Lawyer')}</Link>
              <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how', 'How it Works')}</Link>
            </>
          )}

          {/* الحالة 3: الزوار (Home + Find Lawyer + How it Works) */}
          {!isLoggedIn && (
            <>
              <Link to="/" className="hover:text-yellow-500 transition-colors">{t('nav.home', 'Home')}</Link>
              <Link to="/find-lawyer" className="hover:text-yellow-500 transition-colors">{t('nav.findLawyer', 'Find Lawyer')}</Link>
              <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how', 'How it Works')}</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {isLoggedIn && <NotificationDropdown notificationPath={notificationPath} />}

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
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
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
