import { useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // تأكد من المسار صح

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
