import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';
import logoImage from '../Assets/logo/logo lawlink.png';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { mode, toggleMode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

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
          <Link to="/" className="hover:text-yellow-500 transition-colors">{t('nav.home')}</Link>
          <Link to="/find-lawyer" className="hover:text-yellow-500 transition-colors">{t('nav.findLawyer')}</Link>
          <Link to="/how-it-works" className="hover:text-yellow-500 transition-colors">{t('nav.how')}</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleMode} className="p-2 hover:bg-gray-500/10 rounded-full transition-colors">
            {mode === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>
          <button onClick={() => setLanguage(language === 'en' ? 'eg' : 'en')} className="font-bold">
             <Globe size={18} />
          </button>

          <Link to="/login" className="bg-yellow-500 !text-slate-950 px-6 py-2.5 rounded-full font-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all">
            {t('nav.signup', 'Join Now')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;