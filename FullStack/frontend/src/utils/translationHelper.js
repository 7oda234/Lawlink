// ═══════════════════════════════════════════════════════════════════════════════════
// Translation Helper Utility
// ═══════════════════════════════════════════════════════════════════════════════════
// Global translation helper to translate any word/phrase without context in every component
// Provides easy access to translations across the entire app

// All translation keys organized by category
export const TRANSLATION_KEYS = {
  // Navigation
  NAV_HOME: 'nav.home',
  NAV_FIND_LAWYER: 'nav.findLawyer',
  NAV_HOW_IT_WORKS: 'nav.howItWorks',
  NAV_ABOUT: 'nav.about',
  NAV_LOGIN: 'nav.login',
  NAV_SIGNUP: 'nav.signUp',
  NAV_CREATE_ACCOUNT: 'nav.createAccount',
  NAV_SERVICES: 'nav.services',
  NAV_CONTACT: 'nav.contact',

  // Layout/Common
  LAYOUT_PLATFORM: 'layout.platform',
  LAYOUT_MODE: 'layout.mode',
  LAYOUT_LANGUAGE: 'layout.language',
  LAYOUT_SAVE_CHANGES: 'layout.saveChanges',
  LAYOUT_CHANGES_SAVED: 'layout.changesSaved',
  LAYOUT_QUICK_LINKS: 'layout.quickLinks',
  LAYOUT_HELPFUL_LINKS: 'layout.helpfulLinks',
  LAYOUT_SUPPORT_TEAM_READY: 'layout.supportTeamReady',
  LAYOUT_CONTACT_SUPPORT: 'layout.contactSupport',
  LAYOUT_CONTACT_DESCRIPTION: 'layout.contactDescription',
  LAYOUT_SERVICES_DESCRIPTION: 'layout.servicesDescription',
  LAYOUT_ABOUT_DESCRIPTION: 'layout.aboutDescription',
  LAYOUT_HOW_IT_WORKS_DESC: 'layout.howItWorksDescription',
  LAYOUT_EMAIL_NOTIFICATIONS: 'layout.emailNotifications',
  LAYOUT_EMAIL_NOTIFICATIONS_DESC: 'layout.emailNotificationsDesc',
  LAYOUT_YOU_AGREE_TO: 'layout.youAgreeTo',

  // Footer
  FOOTER_SERVICES: 'footer.services',
  FOOTER_COMPANY: 'footer.company',
  FOOTER_ABOUT: 'footer.about',
  FOOTER_CONTACT: 'footer.contact',
  FOOTER_HELP: 'footer.help',
  FOOTER_PRIVACY: 'footer.privacy',
  FOOTER_COPYRIGHT: 'footer.copyright',

  // Home Page
  PAGE_HOME_HERO_TITLE: 'page.home.heroTitle',
  PAGE_HOME_HERO_SUBTITLE: 'page.home.heroSubtitle',
  PAGE_HOME_FEATURE_1_CTA: 'page.home.feature1Cta',
  PAGE_HOME_FEATURE_2_CTA: 'page.home.feature2Cta',
  PAGE_HOME_WHY_TITLE: 'page.home.whyTitle',
  PAGE_HOME_BENEFIT_VERIFIED: 'page.home.benefitVerified',
  PAGE_HOME_BENEFIT_VERIFIED_COPY: 'page.home.benefitVerifiedCopy',
  PAGE_HOME_BENEFIT_SECURITY: 'page.home.benefitSecurity',
  PAGE_HOME_BENEFIT_SECURITY_COPY: 'page.home.benefitSecurityCopy',
  PAGE_HOME_BENEFIT_EASY: 'page.home.benefitEasy',
  PAGE_HOME_BENEFIT_EASY_COPY: 'page.home.benefitEasyCopy',

  // About Page
  PAGE_ABOUT_HERO_TITLE: 'page.about.heroTitle',
  PAGE_ABOUT_HERO_SUBTITLE: 'page.about.heroSubtitle',
  PAGE_ABOUT_MISSION_TITLE: 'page.about.missionTitle',
  PAGE_ABOUT_VISION_TITLE: 'page.about.visionTitle',
  PAGE_ABOUT_VALUES_TITLE: 'page.about.valuesTitle',
  PAGE_ABOUT_LEGAL_COMPLIANCE: 'page.termsPrivacy.legalCompliance',
  PAGE_ABOUT_WHY_WINS: 'page.about.whyWins',
  PAGE_ABOUT_LOCALIZED: 'page.about.localized',
  PAGE_ABOUT_VERIFICATION: 'page.about.verification',

  // Contact Page
  PAGE_CONTACT_HERO_TITLE: 'page.contact.heroTitle',
  PAGE_CONTACT_HERO_SUBTITLE: 'page.contact.heroSubtitle',
  PAGE_CONTACT_OFFICE_TITLE: 'page.contact.officeTitle',
  PAGE_CONTACT_EMAIL_LABEL: 'page.contact.emailLabel',
  PAGE_CONTACT_FORM_NAME: 'page.contact.formName',
  PAGE_CONTACT_FORM_EMAIL: 'page.contact.formEmail',
  PAGE_CONTACT_FORM_SUBJECT: 'page.contact.formSubject',
  PAGE_CONTACT_FORM_MESSAGE: 'page.contact.formMessage',
  PAGE_CONTACT_FORM_BUTTON: 'page.contact.formButton',

  // Services Page
  PAGE_SERVICES_INTRO_TITLE: 'page.services.introTitle',
  PAGE_SERVICES_CREATE_ACCOUNT: 'page.services.createAccount',
  PAGE_SERVICES_SERVICE_1_TITLE: 'page.services.service1Title',
  PAGE_SERVICES_SERVICE_2_TITLE: 'page.services.service2Title',

  // How It Works Page
  PAGE_HOW_IT_WORKS_HEADING: 'page.howItWorks.heading',
  PAGE_HOW_IT_WORKS_DESCRIPTION: 'page.howItWorks.description',
  PAGE_HOW_IT_WORKS_STEPS_TITLE: 'page.howItWorks.stepsTitle',
  PAGE_HOW_IT_WORKS_STEP_1: 'page.howItWorks.step1',
  PAGE_HOW_IT_WORKS_STEP_2: 'page.howItWorks.step2',
  PAGE_HOW_IT_WORKS_STEP_3: 'page.howItWorks.step3',

  // Help Center Page
  PAGE_HELP_CENTER_TITLE: 'page.helpCenter.title',
  PAGE_HELP_CENTER_SUBTITLE: 'page.helpCenter.subtitle',
  PAGE_HELP_CENTER_GETTING_STARTED: 'page.helpCenter.gettingStarted',
  PAGE_HELP_CENTER_FINDING_LAWYERS: 'page.helpCenter.findingLawyers',
  PAGE_HELP_CENTER_COMMUNICATION: 'page.helpCenter.communication',
  PAGE_HELP_CENTER_PAYMENTS: 'page.helpCenter.payments',
  PAGE_HELP_CENTER_CASES: 'page.helpCenter.cases',
  PAGE_HELP_CENTER_ACCOUNT_SETTINGS: 'page.helpCenter.accountSettings',
  PAGE_HELP_CENTER_STILL_NEED_HELP: 'page.helpCenter.stillNeedHelp',
  PAGE_HELP_CENTER_VISIT_HELP_CENTER: 'page.helpCenter.visitHelpCenter',
  PAGE_HELP_CENTER_CONTACT_SUPPORT: 'page.helpCenter.contactSupport',

  // Terms & Privacy Page
  PAGE_TERMS_PRIVACY_TITLE: 'page.termsPrivacy.title',
  PAGE_TERMS_PRIVACY_SUBTITLE: 'page.termsPrivacy.subtitle',
  PAGE_TERMS_PRIVACY_TERMS_OF_SERVICE: 'page.termsPrivacy.termsOfService',
  PAGE_TERMS_PRIVACY_PRIVACY_POLICY: 'page.termsPrivacy.privacyPolicy',
  PAGE_TERMS_PRIVACY_LEGAL_COMPLIANCE: 'page.termsPrivacy.legalCompliance',
  PAGE_TERMS_PRIVACY_ACCEPTANCE_OF_TERMS: 'page.termsPrivacy.acceptanceOfTerms',
  PAGE_TERMS_PRIVACY_USER_RESPONSIBILITIES: 'page.termsPrivacy.userResponsibilities',
  PAGE_TERMS_PRIVACY_ACCURATE_INFO: 'page.termsPrivacy.accurateInfo',
  PAGE_TERMS_PRIVACY_PASSWORD_CONFIDENTIAL: 'page.termsPrivacy.passwordConfidential',
  PAGE_TERMS_PRIVACY_NOT_ILLEGAL: 'page.termsPrivacy.notIllegal',
  PAGE_TERMS_PRIVACY_NOT_INTERFERE: 'page.termsPrivacy.notInterfere',
  PAGE_TERMS_PRIVACY_COMPLY_LAWS: 'page.termsPrivacy.complyLaws',

  // Settings Page
  PAGE_SETTINGS_TITLE: 'page.settings.title',
  PAGE_SETTINGS_SUBTITLE: 'page.settings.subtitle',
  PAGE_SETTINGS_ACCOUNT: 'page.settings.account',
  PAGE_SETTINGS_SECURITY: 'page.settings.security',
  PAGE_SETTINGS_NOTIFICATIONS: 'page.settings.notifications',
  PAGE_SETTINGS_PRIVACY: 'page.settings.privacy',
  PAGE_SETTINGS_BILLING: 'page.settings.billing',
  PAGE_SETTINGS_ACCOUNT_INFORMATION: 'page.settings.accountInformation',
  PAGE_SETTINGS_SECURITY_SETTINGS: 'page.settings.securitySettings',
  PAGE_SETTINGS_NOTIFICATION_PREFERENCES: 'page.settings.notificationPreferences',

  // Not Found Page
  PAGE_NOT_FOUND_TITLE: 'page.notFound.title',
  PAGE_NOT_FOUND_MESSAGE: 'page.notFound.message',
  PAGE_NOT_FOUND_BACK_TO_HOME: 'page.notFound.backToHome',
  PAGE_NOT_FOUND_REPORT_ISSUE: 'page.notFound.reportIssue',
};

/**
 * Get translation key constant by name (supports autocomplete)
 * Usage: getTranslationKey('HOME_HERO_TITLE', t)
 */
export const getTranslationKey = (keyName, fallback = '') => {
  return {
    keyName,
    fallback,
  };
};

/**
 * Check if text contains any translation keys
 * Useful for debugging missing translations
 */
export const validateTranslationKey = (key) => {
  if (!key || typeof key !== 'string') return false;
  return key.includes('.');
};

/**
 * React Hook - Simpler alternative to useLanguage for basic translation needs
 * Usage: const { translate, language } = useSimpleTranslation();
 */
export const useSimpleTranslation = () => {
  // Note: This will be imported from context in actual implementation
  // For now, it's a placeholder - actual implementation uses the context hook
  return {
    translate: (key, fallback) => fallback || key,
    language: 'en',
    isRTL: false,
  };
};

/**
 * Create a translation object with multiple keys
 * Useful for forms or repeated text blocks
 */
export const createTranslationGroup = (namespace, keys) => {
  return keys.reduce((acc, key) => {
    acc[key] = `${namespace}.${key}`;
    return acc;
  }, {});
};

/**
 * Get all translation keys for a specific namespace
 * Useful for listing all available translations for a page
 */
export const getNamespaceKeys = (namespace) => {
  return Object.entries(TRANSLATION_KEYS)
    .filter(([key]) => key.includes(namespace.toUpperCase()))
    .map(([key, value]) => ({ key, value }));
};

export default TRANSLATION_KEYS;
