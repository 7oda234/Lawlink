import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import logoImage from '../Assets/logo/logo lawlink.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-900/70 bg-slate-950 text-slate-200 px-6 py-12">
        {/* 📋 القسم الأساسي - Main content grid section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* 🏢 معلومات عن الشركة - Company Information */}
          <div className="col-span-1 md:col-span-2">
            {/* 📍 الشعار - Logo section */}
            <div className="flex items-center gap-3 font-bold text-xl tracking-wider mb-4">
              <img src={logoImage} alt="LawLink" className="h-10 w-auto rounded-full bg-white/10 p-1" />
              <span>LAWLINK</span>
            </div>
            {/* 📝 وصف الشركة - Company description */}
            <p className="text-sm text-gray-400 max-w-xs">
              Redefining legal access through intelligent technology. Secure, transparent, and comprehensive.
            </p>
          </div>
          
          {/* 🛠️ قسم الخدمات - Services Section */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Find a Lawyer</a></li>
              <li><a href="#" className="hover:text-white">Corporate Law</a></li>
              <li><a href="#" className="hover:text-white">Family Law</a></li>
              <li><a href="#" className="hover:text-white">Criminal Defense</a></li>
            </ul>
          </div>

          {/* 🏛️ قسم الشركة - Company Section */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">{t('footer.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-white">{t('footer.contact')}</Link></li>
              <li><Link to="/help" className="hover:text-white">{t('footer.help')}</Link></li>
              <li><Link to="/terms" className="hover:text-white">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        {/* 🔗 الخط السفلي - Bottom footer */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-400">
          {/* 📋 حقوق النشر - Copyright */}
          <p>© 2026 LawLink Inc. All rights reserved</p>
          
          {/* 📱 روابط السوشيال ميديا - Social Media Links */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
