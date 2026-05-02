import { createContext, useContext } from 'react';

// إنشاء سياق اللغة بالقيمة الافتراضية null
export const LanguageContext = createContext(null);

/**
 * Hook مخصص لسهولة الوصول إلى سياق اللغة
 * تم فصله هنا لتجنب مشاكل Fast Refresh في Vite/React
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
