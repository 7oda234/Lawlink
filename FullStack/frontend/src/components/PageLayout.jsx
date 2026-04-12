// ═══════════════════════════════════════════════════════════════════════════════════
// 📱 مكون اللياوت - Page Layout Component
// ═══════════════════════════════════════════════════════════════════════════════════
// المكون الأساسي - Navbar + Footer + Hero Header
// بتحزر مع المظاهر (بار عرلو ورجل سفلي) لكޚ بالصفات
// Wrapper component that provides Navbar, Hero Header, and Footer to all pages
// Handles theme and layout persistence
// ─────────────────────────────────────────═════════════════════════════════════════

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // شريط الملاح - navigation bar component
import Footer from './Footer'; // التذييل بتاع الصفحة - footer component
import { useTheme } from '../context/ThemeContext'; // المظهر والألوان - theme colors and mode
import { useLanguage } from '../context/useLanguage';
import dataService from '../services/DataService'; // service لإدارة الAPI

export const PageLayoutContext = createContext({ persistent: false });

export const PageLayoutProvider = ({ persistent, children }) => (
  <PageLayoutContext.Provider value={{ persistent }}>{children}</PageLayoutContext.Provider>
);

export const usePageLayoutPersistence = () => useContext(PageLayoutContext);

const PageLayout = ({ title, subtitle, children, heroImage }) => {
  const { mode, palette } = useTheme();
  const { language, t } = useLanguage();
  const { persistent } = usePageLayoutPersistence();
  const showChrome = !persistent;
  const showHero = Boolean(title || subtitle || heroImage);
  const location = useLocation();
  const [summary, setSummary] = useState(null);

  const accentClass = palette === 'yellow' ? 'text-amber-400' : palette === 'green' ? 'text-emerald-400' : palette === 'purple' ? 'text-violet-400' : 'text-blue-400';

  // Define gradient colors based on palette and mode
  const heroBg = {
    blue: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))',
    yellow: 'linear-gradient(135deg, rgba(78,58,0,0.95), rgba(120,100,20,0.9))',
    green: 'linear-gradient(135deg, rgba(5,46,22,0.95), rgba(20,60,40,0.9))',
    purple: 'linear-gradient(135deg, rgba(44,14,83,0.95), rgba(60,20,100,0.9))'
  };

  useEffect(() => {
    let active = true;

    const loadSummary = async () => {
      try {
        if (location.pathname.startsWith('/client')) {
          const response = await dataService.cases.getUserCases();
          if (!active) return;
          setSummary({ label: 'Client Cases', value: response.data?.length ?? 'N/A', description: 'Cases assigned to the current client' });
          return;
        }

        if (location.pathname.startsWith('/lawyer')) {
          const response = await dataService.cases.getAll();
          if (!active) return;
          setSummary({ label: 'Active Cases', value: response.data?.length ?? 'N/A', description: 'Open matters for the lawyer network' });
          return;
        }

        if (location.pathname.startsWith('/cases')) {
          const response = await dataService.cases.getAll();
          if (!active) return;
          setSummary({ label: 'Total Cases', value: response.data?.length ?? 'N/A', description: 'All registered cases in the system' });
          return;
        }

        if (location.pathname.startsWith('/messages') || location.pathname === '/notifications') {
          const response = await dataService.communication.getNotifications();
          if (!active) return;
          setSummary({ label: 'Notifications', value: response.data?.length ?? 'N/A', description: 'Unread notifications and alerts' });
          return;
        }

        setSummary({ label: 'LawLink Ready', value: 'Live', description: 'Your workspace is prepared for action' });
      } catch {
        if (!active) return;
        setSummary({ label: 'Offline mode', value: 'Unavailable', description: 'API data cannot be loaded now' });
      }
    };

    loadSummary();
    return () => {
      active = false;
    };
  }, [location.pathname]);

  // 📍 Return section starts here
  return (
    <div className={`min-h-screen flex flex-col ${mode === 'dark' ? 'bg-slate-950 text-gray-100' : 'bg-gray-50 text-slate-900'}`}>
      {showChrome && <Navbar />}
      {showHero && (
        <header
          className={`relative overflow-hidden text-white`}
          style={{
            minHeight: '38vh',
            backgroundImage: heroImage
              ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`
              : heroBg[palette] || heroBg.blue,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${palette === 'yellow' ? 'from-black/80 via-yellow-900/40' : palette === 'green' ? 'from-black/80 via-emerald-900/40' : palette === 'purple' ? 'from-black/80 via-purple-900/40' : 'from-slate-950/80 via-slate-900/40'} to-transparent`} />
          <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300 mb-4">{t('layout.platform', 'LawLink')}</p>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${accentClass}`}>
              {title}
            </h1>
            {subtitle && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100/90">{subtitle}</p>}
            <div className="mt-8 inline-flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-2">{t('layout.mode', 'Theme')}: {mode === 'dark' ? 'Dark' : 'Light'}</span>
              <span className="rounded-full bg-white/10 px-3 py-2">{t('layout.palette', 'Color')}: {palette.charAt(0).toUpperCase() + palette.slice(1)}</span>
              <span className="rounded-full bg-white/10 px-3 py-2">{t('layout.language', 'Language')}: {language === 'en' ? 'English' : language === 'ar' ? 'العربية' : 'مصرى'}</span>
            </div>
          </div>
        </header>
      )}
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`rounded-[2rem] border shadow-2xl backdrop-blur-xl page-surface ${mode === 'dark' ? 'border-slate-700/80 bg-slate-800/40' : 'border-slate-200/80 bg-white/95'}`}>
            <div className="p-8 lg:p-12 space-y-10">
              {summary && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`rounded-3xl border p-6 shadow-sm ${mode === 'dark' ? 'border-slate-700/80 bg-slate-950/90' : 'border-slate-200/80 bg-white/95'}`}>
                    <p className={`text-sm uppercase tracking-[0.24em] ${mode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('layout.summary', 'Summary')}</p>
                    <p className={`mt-4 text-3xl font-semibold ${mode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{summary.value}</p>
                    <p className={`mt-2 text-sm ${mode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{summary.label}</p>
                  </div>
                  <div className={`md:col-span-2 rounded-3xl border p-6 shadow-sm ${mode === 'dark' ? 'border-slate-700/80 bg-slate-950/90' : 'border-slate-200/80 bg-white/95'}`}>
                    <p className={`text-sm uppercase tracking-[0.24em] ${mode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('layout.liveStatus', 'Status')}</p>
                    <p className={`mt-4 text-lg ${mode === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{summary.description}</p>
                    <div className={`mt-6 h-2 rounded-full ${mode === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} overflow-hidden`}>
                      <div className={`h-full w-full rounded-full bg-gradient-to-r ${palette === 'yellow' ? 'from-yellow-400 via-amber-400 to-orange-400' : palette === 'green' ? 'from-emerald-400 via-teal-400 to-cyan-400' : palette === 'purple' ? 'from-purple-400 via-violet-400 to-indigo-400' : 'from-blue-500 via-cyan-500 to-teal-400'}`} />
                    </div>
                  </div>
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </main>
      {showChrome && <Footer />}
    </div>
  );
};

export default PageLayout;
