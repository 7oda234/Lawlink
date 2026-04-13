import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/AboutUS.module.css';

const AboutPage = () => {
  const translate = useTranslation();
  const { mode, palette } = useTheme();

  // Dynamic palette styles based on user settings
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
          {translate.text('PAGE_ABOUT_HERO_TITLE')}
        </h1>
        <p className={`text-xl max-w-2xl ${mode === 'dark' ? 'text-gray-300' : 'text-gray-200'}`}>
          {translate.translate('page.about.heroSubtitle', 'Bridging the gap between clients and lawyers through technology.')}
        </p>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: '🎯', titleKey: 'PAGE_ABOUT_MISSION_TITLE', descKey: 'page.about.missionCopy' },
          { icon: '🔮', titleKey: 'PAGE_ABOUT_VISION_TITLE', descKey: 'page.about.visionCopy' },
          { icon: '⭐', titleKey: 'PAGE_ABOUT_VALUES_TITLE', descKey: 'page.about.valuesCopy' }
        ].map((item, idx) => (
          <div key={idx} className={`${styles.card} p-8 border rounded-lg ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className={`${styles.iconWrapper} text-3xl mb-3`}>{item.icon}</div>
            <h3 className={`text-2xl font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {translate.text(item.titleKey)}
            </h3>
            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {translate.translate(item.descKey)}
            </p>
          </div>
        ))}
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className={`border rounded-xl p-8 md:p-12 mb-12 transition-all duration-500 ${getPaletteStyles()}`}>
        <h2 className={`text-3xl font-bold mb-8 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {translate.translate('page.about.whyNow', 'Why Now?')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={translate.textAlign}>
            <h3 className={`text-2xl font-bold mb-4 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {translate.translate('page.about.egyptOpportunity', "Egypt's Digital Opportunity")}
            </h3>
            <ul className={`space-y-2 text-lg ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>✓ {translate.translate('page.about.internetUsers', '96.3M Internet Users')}</li>
              <li>✓ {translate.translate('page.about.lawyersSupply', '300,000+ Lawyers')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center shadow-md">
        <h2 className="text-3xl font-bold text-black mb-6">
          {translate.translate('page.about.ctaTitle', 'Ready to Connect?')}
        </h2>
        <div className={`flex gap-4 justify-center flex-wrap ${translate.flexDir}`}>
          <Link to="/register" className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-transform hover:scale-105">
            {translate.text('SIGN UP')}
          </Link>
          <Link to="/how-it-works" className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-transform hover:scale-105">
            {translate.text('NAV_HOW_IT_WORKS')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
