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
    <footer className={`border-t px-6 py-12 transition-all ${
      mode === 'dark' ? 'border-slate-800 bg-slate-950 text-slate-200' : 'border-gray-200 bg-gray-50 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* القسم العلوي - Grid للنصوص واللوجو */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* عمود الشركة */}
          <div>
            <h4 className={`font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t('footer.company', 'Company')}
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-blue-500 transition">{t('footer.about', 'About')}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition">{t('footer.contact', 'Contact')}</Link></li>
              <li><Link to="/help" className="hover:text-blue-500 transition">{t('footer.help', 'Help')}</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-500 transition">{t('footer.privacy', 'Privacy')}</Link></li>
            </ul>
          </div>

          {/* عمود الخدمات */}
          <div>
            <h4 className={`font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t('footer.services', 'Services')}
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/find-lawyer" className="hover:text-blue-500 transition">Find a Lawyer</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-blue-500 transition">Corporate Law</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-blue-500 transition">Family Law</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-blue-500 transition">Criminal Defense</Link></li>
            </ul>
          </div>

          {/* عمود اللوجو والوصف */}
          <div className={`flex flex-col ${isRTL ? 'md:items-start' : 'md:items-end'} items-center text-center md:text-right`}>
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`text-2xl font-bold tracking-tighter ${mode === 'dark' ? 'text-white' : 'text-black'}`}>LAWLINK</span>
              <img src={logoImage} alt="Logo" className="h-10 w-10 object-contain" />
            </div>
            <p className="text-sm max-w-[250px] leading-relaxed opacity-80">
              Redefining legal access through intelligent technology. Secure, transparent, and comprehensive.
            </p>
          </div>
        </div>

        {/* الخط الفاصل والسوشيال ميديا */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
          mode === 'dark' ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-500'
        }`}>
          <div className="flex gap-6 order-2 md:order-1">
            <a href="#" className="hover:text-blue-600 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition"><Linkedin size={20} /></a>
          </div>
          
          <p className="text-sm order-1 md:order-2">
            LawLink Inc. All rights reserved 2026 ©
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
