import React from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/ThemeContext';

const PageControls = () => {
  const { language, setLanguage, languages, t } = useLanguage();
  const { mode, toggleMode } = useTheme();

  return (
    <div className="w-full border-b border-slate-200 bg-white/95 dark:bg-slate-950/95 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-4 py-3 flex flex-wrap items-center justify-end gap-3 shadow-sm shadow-slate-900/5">
      <div className="relative inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-2 shadow-sm transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900">
        <label htmlFor="page-language-select" className="sr-only">{t('layout.language')}</label>
        <select
          id="page-language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="appearance-none bg-transparent pr-8 text-sm font-semibold text-slate-900 outline-none dark:text-slate-100"
          aria-label={t('layout.language')}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {lang.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 text-slate-500 dark:text-slate-300" />
      </div>
      <button
        type="button"
        onClick={toggleMode}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
        aria-label={t('layout.mode')}
      >
        {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        <span className="hidden sm:inline">{t('layout.mode')}</span>
      </button>
    </div>
  );
};

export default PageControls;
