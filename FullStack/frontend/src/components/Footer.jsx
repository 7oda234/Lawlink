import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';
import logoImage from '../Assets/logo/logo lawlink.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <footer className={`border-t ${mode === 'dark' ? 'border-slate-800 bg-slate-950 text-slate-200' : 'border-gray-200 bg-gray-50 text-slate-700'} px-6 py-12 transition`}>
        {/* 📋 القسم الأساسي - Main content grid section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* 🏢 معلومات عن الشركة - Company Information */}
          <div className={`col-span-1 md:col-span-2 ${isRTL ? 'text-right' : ''}`}>
            {/* 📍 الشعار - Logo section */}
            <div className="flex items-center gap-3 font-bold text-xl tracking-wider mb-4">
              <img src={logoImage} alt="LawLink" className={`h-10 w-auto rounded-full ${mode === 'dark' ? 'bg-white/10' : 'bg-slate-200'} p-1`} />
              <span className={mode === 'dark' ? 'text-white' : 'text-slate-900'}>LAWLINK</span>
            </div>
            {/* 📝 وصف الشركة - Company description */}
            <p className={`text-sm max-w-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Redefining legal access through intelligent technology. Secure, transparent, and comprehensive.
            </p>
          </div>
          
          {/* 🛠️ قسم الخدمات - Services Section */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className={`font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('footer.services', 'Services')}</h4>
            <ul className={`space-y-3 text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>Find a Lawyer</a></li>
              <li><a href="#" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>Corporate Law</a></li>
              <li><a href="#" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>Family Law</a></li>
              <li><a href="#" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>Criminal Defense</a></li>
            </ul>
          </div>

          {/* 🏛️ قسم الشركة - Company Section */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className={`font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('footer.company', 'Company')}</h4>
            <ul className={`space-y-3 text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><Link to="/about" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>{t('footer.about', 'About')}</Link></li>
              <li><Link to="/contact" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>{t('footer.contact', 'Contact')}</Link></li>
              <li><Link to="/help" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>{t('footer.help', 'Help')}</Link></li>
              <li><Link to="/terms" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>{t('footer.privacy', 'Privacy')}</Link></li>
            </ul>
          </div>
        </div>

        {/* 🔗 الخط السفلي - Bottom footer */}
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t ${mode === 'dark' ? 'border-gray-800' : 'border-gray-300'} text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {/* 📋 حقوق النشر - Copyright */}
          <p>© 2026 LawLink Inc. All rights reserved</p>
          
          {/* 📱 روابط السوشيال ميديا - Social Media Links */}
          <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''} mt-4 md:mt-0`}>
            <a href="#" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}><Facebook size={18} /></a>
            <a href="#" className={`transition ${mode === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
