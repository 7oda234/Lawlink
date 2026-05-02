import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { LanguageContext } from './LanguageContextObject';
import { translations } from './translations';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // محاولة استعادة اللغة من المتصفح
    const savedLanguage = localStorage.getItem('app-language');
    return savedLanguage || 'en';
  });

  // دالة الترجمة المحسنة للتعامل مع المفاتيح المتداخلة
  const t = useCallback((key, fallback = '') => {
    if (!key) return fallback;
    
    const keys = key.split('.');
    let current = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // يعيد المفتاح نفسه إذا لم يعثر عليه ليتم تمييز النقص في الواجهة[cite: 15]
        return fallback || key; 
      }
    }
    
    // ضمان إرجاع نص فقط وليس كائناً[cite: 15]
    return typeof current === 'string' ? current : (fallback || key);
  }, [language]);

  const languages = useMemo(() => [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
    { code: 'eg', label: 'مصرى', dir: 'rtl' }
  ], []);

  // تحديث اتجاه الصفحة (RTL/LTR) واللغة في وسم HTML[cite: 15]
  useEffect(() => {
    const currentLang = languages.find(l => l.code === language);
    const dir = currentLang?.dir || 'ltr';
    
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem('app-language', language);
  }, [language, languages]);

  const value = useMemo(() => ({ language, setLanguage, languages, t }), [language, languages, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
