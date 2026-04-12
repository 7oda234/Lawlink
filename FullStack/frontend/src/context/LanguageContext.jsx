// ═══════════════════════════════════════════════════════════════════════════════════
// 🌍 سياق اللغة - Language Context
// ═══════════════════════════════════════════════════════════════════════════════════
// هنا بنخزّن لغة التطبيق (English/Arabic/Egyptian) وبنوفّر ترجمة النصوص
// ─────────────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useMemo, useCallback } from 'react';
import { LanguageContext } from './LanguageContextObject';
import { translations } from './translations';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(() => {
    const savedLanguage = localStorage.getItem('lawlink-language');
    return savedLanguage || 'en';
  });

  // دالة الترجمة - Translation function
  const t = useCallback((key, fallback = '') => {
    const keys = key.split('.');
    let current = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k];
      } else {
        return fallback || key;
      }
    }
    return current || fallback || key;
  }, [language]);

  // اللغات المتاحة - Available languages
  const languages = useMemo(() => [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
    { code: 'eg', label: 'مصرى', dir: 'rtl' }
  ], []);

  // تأثير تغيير اللغة على اتجاه الصفحة
  useEffect(() => {
    const currentLang = languages.find(l => l.code === language);
    const dir = currentLang?.dir || 'ltr';
    
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem('lawlink-language', language);
  }, [language, languages]);

  // القيمة اللي بنوديها للـ children
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      languages,
      t
    }),
    [language, languages, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
