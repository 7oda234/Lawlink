import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../context/ThemeContextHook';

import styles from '../styles/AboutUS.module.css';

const AboutPage = () => {
  const translate = useTranslation();
  const { mode, palette } = useTheme();
  const isRTL = translate.dir === 'rtl';

  // Content directly from LawLink Final Project Document
  const content = {
    heroTitle: isRTL ? 'حول لاو-لينك' : 'About LawLink',
    heroSub: isRTL 
      ? 'سد الفجوة بين العملاء والمحامين من خلال حلول تقنية مبتكرة.' 
      : 'Bridging the gap between clients and lawyers through innovative digital solutions. [cite: 17, 43]',
    missionTitle: isRTL ? 'رسالتنا' : 'Our Mission',
    missionDesc: isRTL 
      ? 'تسهيل الوصول إلى خدمات قانونية موثوقة وشفافة للجميع.' 
      : 'To facilitate direct and transparent interaction between clients and lawyers, ensuring trust and convenience. [cite: 17]',
    visionTitle: isRTL ? 'رؤيتنا' : 'Our Vision',
    visionDesc: isRTL 
      ? 'أن نكون المنصة الرقمية الرائدة في التحول الرقمي للمهنة القانونية.' 
      : 'To promote digitalization in the legal profession to enhance efficiency and global availability. [cite: 31]',
    valuesTitle: isRTL ? 'قيمنا' : 'Our Values',
    valuesDesc: isRTL 
      ? 'النزاهة، الابتكار، والشفافية في كل استشارة.' 
      : 'Integrity, innovation, and transparency in every legal connection. [cite: 30, 43]',
    marketTitle: isRTL ? 'لماذا الآن؟' : 'Why Now?',
    egyptTitle: isRTL ? 'الفرصة الرقمية في مصر' : "Egypt's Digital Opportunity",
    internetStats: isRTL ? '96.3 مليون مستخدم للإنترنت في مصر' : '96.3M Internet users in Egypt (81.9% penetration). ',
    lawyerStats: isRTL ? 'مئات الآلاف من المحامين المسجلين' : 'Hundreds of thousands of registered lawyers ready for onboarding. ',
  };

  const getPaletteStyles = () => {
    const maps = {
      yellow: mode === 'dark' ? 'bg-yellow-950/40 border-yellow-700' : 'bg-yellow-50 border-yellow-200',
      green: mode === 'dark' ? 'bg-emerald-950/40 border-emerald-700' : 'bg-emerald-50 border-emerald-200',
      purple: mode === 'dark' ? 'bg-purple-950/40 border-purple-700' : 'bg-purple-50 border-purple-200',
      blue: mode === 'dark' ? 'bg-blue-950/40 border-blue-700' : 'bg-blue-50 border-blue-200',
    };
    return maps[palette] || maps.blue;
  };

  return (
    <div dir={translate.dir} className={`${translate.textAlign} ${styles.container} ${styles.premiumLegalTheme}`}>
      
      {/* HERO SECTION */}
      <section className={`rounded-2xl p-12 md:p-16 mb-12 shadow-lg text-white bg-gradient-to-r ${mode === 'dark' ? 'from-slate-950 to-slate-800' : 'from-slate-900 to-slate-800'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {content.heroTitle}
        </h1>
        <p className={`text-xl max-w-2xl ${mode === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
          {content.heroSub}
        </p>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: '🎯', title: content.missionTitle, desc: content.missionDesc },
          { icon: '🔮', title: content.visionTitle, desc: content.visionDesc },
          { icon: '⭐', title: content.valuesTitle, desc: content.valuesDesc }
        ].map((item, idx) => (
          <div key={idx} className={`${styles.card} p-8 border rounded-lg ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className={`${styles.iconWrapper} text-3xl mb-3`}>{item.icon}</div>
            <h3 className={`text-2xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {item.title}
            </h3>
            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className={`border rounded-xl p-8 md:p-12 mb-12 transition-all duration-500 ${getPaletteStyles()}`}>
        <h2 className={`text-3xl font-bold mb-8 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {content.marketTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={translate.textAlign}>
            <h3 className={`text-2xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {content.egyptTitle}
            </h3>
            <ul className={`space-y-4 text-lg ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-center gap-2">✓ {content.internetStats}</li>
              <li className="flex items-center gap-2">✓ {content.lawyerStats}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center shadow-md">
        <h2 className="text-3xl font-bold text-black mb-6">
          {isRTL ? 'هل أنت مستعد للتواصل؟' : 'Ready to Connect?'}
        </h2>
        <div className={`flex gap-4 justify-center flex-wrap ${translate.flexDir}`}>
          <Link to="/register" className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-transform hover:scale-105">
            {isRTL ? 'إنشاء حساب' : 'Sign Up'}
          </Link>
          <Link to="/how-it-works" className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-transform hover:scale-105">
            {isRTL ? 'كيف يعمل لاو-لينك' : 'How It Works'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
