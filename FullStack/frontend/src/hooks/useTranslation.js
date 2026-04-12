// ═══════════════════════════════════════════════════════════════════════════════════
// Enhanced Translation Hook
// ═══════════════════════════════════════════════════════════════════════════════════
// Simpler wrapper around useLanguage for easier translation access
// Automatically handles RTL detection and provides helper functions

import { useLanguage } from '../context/useLanguage';
import { TRANSLATION_KEYS } from '../utils/translationHelper';

/**
 * Enhanced translation hook with automatic RTL detection
 * Usage:
 *   const translate = useTranslation();
 *   translate.text('HOME_HERO_TITLE')  // Returns translated text
 *   translate.key('HOME_HERO_TITLE')   // Returns translation key
 *   translate.rtl                       // Returns true if RTL language
 */
export const useTranslation = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return {
    // Translate using predefined keys from TRANSLATION_KEYS constant
    text: (keyConstant, fallback = '') => {
      const keyValue = TRANSLATION_KEYS[keyConstant];
      if (!keyValue) {
        console.warn(`Translation key not found: ${keyConstant}`);
        return fallback || keyConstant;
      }
      return t(keyValue, fallback);
    },

    // Get the translation key name (useful for debugging)
    key: (keyConstant) => {
      return TRANSLATION_KEYS[keyConstant] || keyConstant;
    },

    // Direct translation using dot notation (original method)
    translate: (dotNotationKey, fallback = '') => {
      return t(dotNotationKey, fallback);
    },

    // RTL helper
    rtl: isRTL,
    
    // Language helper
    language,

    // CSS class helper for RTL
    rtlClass: (rtlValue = '', ltrValue = '') => {
      return isRTL ? rtlValue : ltrValue;
    },

    // Conditional text based on language
    textByLanguage: (enText, arText, egText) => {
      if (language === 'ar') return arText;
      if (language === 'eg') return egText;
      return enText;
    },

    // Helper to apply RTL direction to element
    dir: isRTL ? 'rtl' : 'ltr',

    // Helper for text alignment CSS
    textAlign: isRTL ? 'text-right' : 'text-left',

    // Helper for flexbox direction
    flexDir: isRTL ? 'flex-row-reverse' : 'flex-row',
  };
};

export default useTranslation;
