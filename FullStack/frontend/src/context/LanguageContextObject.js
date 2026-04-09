import { createContext } from 'react';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  languages: [],
  t: (key, fallback) => fallback || key,
});
