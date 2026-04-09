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
import PageControls from './PageControls';
import { useTheme } from '../context/ThemeContext'; // المظهر والألوان - theme colors and mode
import { useLanguage } from '../context/LanguageContext';
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
      } catch (error) {
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
    <div className={`min-h-screen flex flex-col bg-page ${mode === 'dark' ? 'text-gray-100' : 'text-slate-900'}`}>
      {showChrome && <PageControls />}
      {showChrome && <Navbar />}
      {showHero && (
        <header
          className="relative overflow-hidden text-white"
          style={{
            minHeight: '38vh',
            backgroundImage: heroImage
              ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`
              : 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-transparent" />
          <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300 mb-4">{t('layout.platform')}</p>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${accentClass}`}>
              {title}
            </h1>
            {subtitle && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-100/90">{subtitle}</p>}
            <div className="mt-8 inline-flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-2">{t('layout.mode')}: {mode}</span>
              <span className="rounded-full bg-white/10 px-3 py-2">{t('layout.palette')}: {palette}</span>
              <span className="rounded-full bg-white/10 px-3 py-2">{t('layout.language')}: {language === 'en' ? 'English' : language === 'ar' ? 'العربية' : 'مصرى'}</span>
            </div>
          </div>
        </header>
      )}
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-[2rem] border shadow-2xl shadow-slate-900/10 backdrop-blur-xl page-surface border-slate-200/80 dark:border-slate-700/80">
            <div className="p-8 lg:p-12 space-y-10">
              {summary && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/90">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{t('layout.summary')}</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{summary.value}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{summary.label}</p>
                  </div>
                  <div className="md:col-span-2 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/90">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{t('layout.liveStatus')}</p>
                    <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">{summary.description}</p>
                    <div className="mt-6 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400" />
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
