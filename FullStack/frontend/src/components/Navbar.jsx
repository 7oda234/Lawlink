// مكون التنقل الرئيسي - Main navigation component
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ تصحيح المسارات: نقطتين عشان نخرج برا فولدر components ونوصل للـ context
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/useLanguage';

// ✅ تصحيح مسار اللوجو
import logoImage from '../Assets/logo/logo lawlink.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { mode, palette, toggleMode, setPalette, palettes } = useTheme();
  const { language, setLanguage, languages, t } = useLanguage();

  // كشف التمرير لتفعيل تأثير الزجاج
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // إغلاق القائمة المحمولة عند الضغط على رابط
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // 📍 روابط التنقل - تأكد أنها مطابقة للـ App.jsx
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.findLawyer'), path: '/find-lawyer' },
    { name: t('nav.howItWorks'), path: '/how-it-works' },
    { name: t('nav.about'), path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `${mode === 'dark' ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-md shadow-lg py-3` 
          : `${mode === 'dark' ? 'bg-slate-950' : 'bg-white'} py-5`
      } ${mode === 'dark' ? 'text-white' : 'text-slate-900'} border-b ${mode === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-wider hover:text-gray-300 transition group">
          <img src={logoImage} alt="LawLink" className="h-10 w-auto rounded-full bg-white/10 p-1" />
          <span>LAWLINK</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const paletteColors = {
              blue: '#3b82f6',
              yellow: '#f59e0b',
              green: '#10b981',
              purple: '#8b5cf6',
            };
            return (
              <Link 
                key={link.name}
                to={link.path}
                onClick={handleNavLinkClick}
                className={`relative transition-colors font-medium ${
                  isActive 
                    ? mode === 'dark' ? 'text-white' : 'text-slate-900' 
                    : mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: paletteColors[palette] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls */}
        <div className={`hidden md:flex items-center gap-3 text-sm ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {/* Language Selector */}
          <div className={`relative inline-flex items-center rounded-full border ${mode === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-gray-300 bg-gray-100/50'} px-3 py-2 shadow-sm shadow-slate-950/10 backdrop-blur-sm transition ${mode === 'dark' ? 'hover:border-slate-600' : 'hover:border-gray-400'} focus-within:${mode === 'dark' ? 'border-slate-500' : 'border-gray-500'}`}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`appearance-none min-w-[9rem] bg-transparent pr-8 text-sm font-semibold outline-none cursor-pointer ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className={mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}>
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className={`pointer-events-none absolute right-3 ${mode === 'dark' ? 'text-slate-400' : 'text-gray-600'}`} />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleMode}
            className={`inline-flex items-center justify-center rounded-full border ${mode === 'dark' ? 'border-slate-700 bg-slate-800/50 text-slate-100 hover:border-slate-600 hover:bg-slate-700/50' : 'border-gray-300 bg-gray-100/50 text-slate-700 hover:border-gray-400 hover:bg-gray-200/50'} p-2 shadow-sm shadow-slate-950/20 transition`}
          >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Palette Colors */}
          <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-500/30">
            {palettes.map((color) => (
              <button
                key={color}
                onClick={() => setPalette(color)}
                className={`w-4 h-4 rounded-full border-2 transition-all hover:scale-110 ${palette === color ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-slate-100 border-white' : `opacity-60 border-${color === 'blue' ? 'blue-500' : color === 'yellow' ? 'yellow-400' : color === 'green' ? 'emerald-500' : 'purple-500'} hover:opacity-100`} ${
                  color === 'blue' ? 'bg-blue-500' : color === 'yellow' ? 'bg-yellow-400' : color === 'green' ? 'bg-emerald-500' : 'bg-purple-500'
                }`}
                title={`${color.charAt(0).toUpperCase() + color.slice(1)} theme`}
              />
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex items-center gap-3 ml-2 pl-2 border-l border-slate-500/30">
            <Link to="/login" className={`flex items-center gap-2 font-medium transition ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-slate-900'}`}>
              <User size={18} /> {t('nav.login')}
            </Link>
            <Link 
              to="/register" 
              className={`px-5 py-2.5 rounded-lg font-bold hover:shadow-md transition ${
                palette === 'yellow' ? `bg-yellow-400 text-black hover:bg-yellow-500` :
                palette === 'green' ? `bg-emerald-500 text-white hover:bg-emerald-600` :
                palette === 'purple' ? `bg-purple-500 text-white hover:bg-purple-600` :
                `bg-blue-500 text-white hover:bg-blue-600`
              }`}
            >
              {t('nav.signUp')}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden font-medium transition ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-slate-900'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${mode === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'} border-t overflow-hidden`}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={handleNavLinkClick}
                  className={`text-lg font-medium transition ${
                    location.pathname === link.path 
                      ? `${palette === 'yellow' ? 'text-yellow-500' : palette === 'green' ? 'text-emerald-500' : palette === 'purple' ? 'text-purple-500' : 'text-blue-500'}`
                      : mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className={`h-px ${mode === 'dark' ? 'bg-slate-800' : 'bg-gray-300'} my-2`}></div>
              
              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between">
                <span className={`font-medium ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>Language:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`rounded px-3 py-1 text-sm font-semibold outline-none ${mode === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'bg-gray-100 text-slate-900 border-gray-300'} border`}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className={mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className={`font-medium ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>Theme:</span>
                <button
                  onClick={toggleMode}
                  className={`inline-flex items-center justify-center rounded-full border p-2 transition ${mode === 'dark' ? 'border-slate-700 bg-slate-800/50 text-slate-100 hover:bg-slate-700/50' : 'border-gray-300 bg-gray-100/50 text-slate-700 hover:bg-gray-200/50'}`}
                >
                  {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              {/* Mobile Palette Selector */}
              <div className="flex items-center justify-between">
                <span className={`font-medium ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>Color:</span>
                <div className="flex items-center gap-2">
                  {palettes.map((color) => (
                    <button
                      key={color}
                      onClick={() => setPalette(color)}
                      className={`w-5 h-5 rounded-full border-2 transition-all ${palette === color ? 'ring-2 ring-offset-2 ring-slate-400 border-white' : 'opacity-60 hover:opacity-100'} ${
                        color === 'blue' ? 'bg-blue-500' : color === 'yellow' ? 'bg-yellow-400' : color === 'green' ? 'bg-emerald-500' : 'bg-purple-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className={`h-px ${mode === 'dark' ? 'bg-slate-800' : 'bg-gray-300'} my-2`}></div>
              <Link to="/login" className={`flex items-center gap-2 text-lg font-medium ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-slate-900'}`}>
                <User size={20} /> {t('nav.login')}
              </Link>
              <Link 
                to="/register" 
                className={`text-center px-4 py-3 rounded-lg font-bold transition ${
                  palette === 'yellow' ? `bg-yellow-400 text-black hover:bg-yellow-500` :
                  palette === 'green' ? `bg-emerald-500 text-white hover:bg-emerald-600` :
                  palette === 'purple' ? `bg-purple-500 text-white hover:bg-purple-600` :
                  `bg-blue-500 text-white hover:bg-blue-600`
                }`}
              >
                {t('nav.signUp')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
