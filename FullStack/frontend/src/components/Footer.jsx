import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';
import logoImage from '../Assets/logo/logo lawlink.png';

const Footer = () => {
  const {language } = useLanguage();
  const { mode } = useTheme();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className={`border-t px-6 py-12 transition-all ${
      mode === 'dark' ? 'border-slate-800 bg-slate-950 text-slate-200' : 'border-gray-200 bg-gray-50 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* القسم العلوي - Grid للنصوص واللوجو */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* عمود الشركة */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className={`font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-yellow-500 transition">{isRTL ? 'من نحن' : 'About'}</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-500 transition">{isRTL ? 'اتصل بنا' : 'Contact'}</Link></li>
              <li><Link to="/help" className="hover:text-yellow-500 transition">{isRTL ? 'مركز المساعدة' : 'Help'}</Link></li>
              <li><Link to="/privacy" className="hover:text-yellow-500 transition">{isRTL ? 'سياسة الخصوصية' : 'Privacy'}</Link></li>
            </ul>
          </div>

          {/* عمود الخدمات */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className={`font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'الخدمات' : 'Services'}
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/find-lawyer" className="hover:text-yellow-500 transition">{isRTL ? 'البحث عن محامي' : 'Find a Lawyer'}</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-yellow-500 transition">{isRTL ? 'قانون الشركات' : 'Corporate Law'}</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-yellow-500 transition">{isRTL ? 'قانون الأسرة' : 'Family Law'}</Link></li>
              <li><Link to="/find-lawyer" className="hover:text-yellow-500 transition">{isRTL ? 'الدفاع الجنائي' : 'Criminal Defense'}</Link></li>
            </ul>
          </div>

          {/* عمود اللوجو والوصف */}
          <div className={`flex flex-col ${isRTL ? 'md:items-start' : 'md:items-end'} items-center text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className={`text-2xl font-bold tracking-tighter ${mode === 'dark' ? 'text-white' : 'text-black'}`}>LAWLINK</span>
              <img src={logoImage} alt="Logo" className="h-10 w-10 object-contain" />
            </div>
            <p className={`text-sm max-w-[280px] leading-relaxed opacity-80 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'إعادة تعريف الوصول للخدمات القانونية من خلال التكنولوجيا الذكية. آمن، شفاف، وشامل.' 
                : 'Redefining legal access through intelligent technology. Secure, transparent, and comprehensive.'}
            </p>
          </div>
        </div>

        {/* الخط الفاصل والسوشيال ميديا */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
          mode === 'dark' ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-500'
        }`}>
          {/* أيقونات السوشيال ميديا - ترتيب مرن حسب اللغة */}
          <div className={`flex gap-6 ${isRTL ? 'md:order-last' : 'md:order-first'}`}>
            <a href="#" className="hover:text-blue-600 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition"><Linkedin size={20} /></a>
          </div>
          
          <p className="text-sm">
            {isRTL 
              ? 'جميع الحقوق محفوظة لشركة LawLink ٢٠٢٦ ©' 
              : 'LawLink Inc. All rights reserved 2026 ©'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
