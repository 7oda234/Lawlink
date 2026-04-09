import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const PageControls = () => {
  const { language, setLanguage, languages, t } = useLanguage();
  const { mode, toggleMode } = useTheme();

  return (
    <div className="w-full border-b border-slate-200 bg-white/95 dark:bg-slate-950/95 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-4 py-3 flex flex-wrap items-center justify-end gap-3 shadow-sm shadow-slate-900/5">
      <div className="flex items-center gap-2">
        <label htmlFor="page-language-select" className="sr-only">{t('layout.language')}</label>
        <select
          id="page-language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-black focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-white"
          aria-label={t('layout.language')}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={toggleMode}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        aria-label={t('layout.mode')}
      >
        {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        <span className="hidden sm:inline">{t('layout.mode')} </span>
      </button>
    </div>
  );
};

export default PageControls;
