import React from 'react';
import { useLanguage } from '../context/useLanguage';
import { useTranslation } from '../hooks/useTranslation';
import { TRANSLATION_KEYS } from '../utils/translationHelper';

// ═══════════════════════════════════════════════════════════════════════════════════
// Translation Usage Guide
// ═══════════════════════════════════════════════════════════════════════════════════

/*
═══════════════════════════════════════════════════════════════════════════════════
METHOD 1: Using Original useLanguage Hook
═══════════════════════════════════════════════════════════════════════════════════
*/
export const MyComponentMethod1 = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('page.home.heroTitle', 'Your Legal Partner Made Easy')}</h1>
      <button>{t('nav.findLawyer', 'Find a Lawyer')}</button>
    </div>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════════
METHOD 2: Using Enhanced Translation Hook (RECOMMENDED)
═══════════════════════════════════════════════════════════════════════════════════
*/
export const MyComponentMethod2 = () => {
  const translate = useTranslation();

  return (
    <div className={translate.textAlign}>
      <h1>{translate.text('PAGE_HOME_HERO_TITLE')}</h1>
      
      <div className={`flex gap-4 ${translate.flexDir}`}>
        <span>Item 1</span>
        <span>Item 2</span>
      </div>

      <p>{translate.textByLanguage('English', 'عربي', 'مصري')}</p>
    </div>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════════
METHOD 3: Organizing Large Pages
═══════════════════════════════════════════════════════════════════════════════════
*/
export const HomePageExample = () => {
  const translate = useTranslation();

  const pageText = {
    hero: {
      title: translate.text('PAGE_HOME_HERO_TITLE'),
      cta: translate.text('PAGE_HOME_FEATURE_1_CTA'),
    }
  };

  return (
    <div className={translate.textAlign}>
      <h1>{pageText.hero.title}</h1>
      <button>{pageText.hero.cta}</button>
    </div>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════════
METHOD 4: Using Translation Helper Constants Directly
═══════════════════════════════════════════════════════════════════════════════════
*/
export const MyFormExample = () => {
  const translate = useTranslation();
  
  const formConfig = {
    name: TRANSLATION_KEYS.PAGE_CONTACT_FORM_NAME,
    email: TRANSLATION_KEYS.PAGE_CONTACT_FORM_EMAIL,
  };

  return (
    <form>
      <input placeholder={translate.translate(formConfig.name)} />
      <input placeholder={translate.translate(formConfig.email)} />
    </form>
  );
};


/*
═══════════════════════════════════════════════════════════════════════════════════
QUICK REFERENCE: Available Translation Key Constants
═══════════════════════════════════════════════════════════════════════════════════

Navigation:
  PAGE_HOME_HERO_TITLE
  NAV_FIND_LAWYER
  NAV_ABOUT
  NAV_SERVICES
  NAV_CONTACT

Home Page:
  PAGE_HOME_HERO_TITLE
  PAGE_HOME_HERO_SUBTITLE
  PAGE_HOME_FEATURE_1_CTA
  PAGE_HOME_WHY_TITLE
  PAGE_HOME_BENEFIT_VERIFIED
  PAGE_HOME_BENEFIT_SECURITY

About Page:
  PAGE_ABOUT_HERO_TITLE
  PAGE_ABOUT_MISSION_TITLE
  PAGE_ABOUT_VISION_TITLE
  PAGE_ABOUT_VALUES_TITLE
  PAGE_ABOUT_WHY_WINS

Services Page:
  PAGE_SERVICES_INTRO_TITLE
  PAGE_SERVICES_SERVICE_1_TITLE

Contact Page:
  PAGE_CONTACT_HERO_TITLE
  PAGE_CONTACT_OFFICE_TITLE
  PAGE_CONTACT_FORM_NAME
  PAGE_CONTACT_FORM_EMAIL
  PAGE_CONTACT_FORM_MESSAGE

Help Center:
  PAGE_HELP_CENTER_TITLE
  PAGE_HELP_CENTER_SUBTITLE
  PAGE_HELP_CENTER_GETTING_STARTED

Terms & Privacy:
  PAGE_TERMS_PRIVACY_TITLE
  PAGE_TERMS_PRIVACY_TERMS_OF_SERVICE
  PAGE_TERMS_PRIVACY_PRIVACY_POLICY

Settings:
  PAGE_SETTINGS_TITLE
  PAGE_SETTINGS_ACCOUNT
  PAGE_SETTINGS_SECURITY

Not Found:
  PAGE_NOT_FOUND_TITLE
  PAGE_NOT_FOUND_MESSAGE

═══════════════════════════════════════════════════════════════════════════════════
TIPS FOR TRANSLATING:
═══════════════════════════════════════════════════════════════════════════════════

1. Always use translate.text() with TRANSLATION_KEYS constants for:
   ✓ Autocomplete support in your IDE
   ✓ Type safety
   ✓ Easier error detection
   ✓ Better code maintainability

2. Use translate.rtl or translate.textAlign for RTL styling:
   ✓ translate.rtl → true/false
   ✓ translate.textAlign → 'text-right' or 'text-left'
   ✓ translate.flexDir → 'flex-row-reverse' or 'flex-row'

3. For dynamic text, keep translate function available:
   const translate = useTranslation();
   <h1>{translate.translate('any.dot.notation.key', 'fallback')}</h1>

4. Never hardcode text that should be translated:
   ✗ <p>This is English only</p>
   ✓ <p>{translate.text('PAGE_HOME_HERO_TITLE')}</p>

5. All 3 languages (English, Arabic, Egyptian) are automatic:
   - Just use the translation key
   - Language switching updates everything automatically
   - No need to check language manually

═══════════════════════════════════════════════════════════════════════════════════
TROUBLESHOOTING:
═══════════════════════════════════════════════════════════════════════════════════

"Translation key not found" warning?
→ Check you're using correct constant name from TRANSLATION_KEYS
→ Or use dot notation: translate.translate('page.home.heroTitle')

Text not updating when language changes?
→ Make sure you're inside a component using useTranslation() hook
→ Hooks must be at top level of component

RTL styling not applying?
→ Use translate.rtl or translate.textAlign instead of hardcoding
→ Check document dir attribute is set (it's automatic)

Missing translation?
→ Add the key to LanguageContext.jsx in translations object
→ Add to TRANSLATION_KEYS constant in translationHelper.js
→ Use fallback text in translate() function
*/

// Export nothing - this is documentation
// ... (Rest of your documentation constants/tips below stay the same)

export default null;
