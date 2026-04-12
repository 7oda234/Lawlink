// ═══════════════════════════════════════════════════════════════════════════════════
// BEFORE vs AFTER: Translation Pattern Comparison
// ═══════════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NOTE: The code below is for comparison purposes. 
 * To resolve "Redeclaration" errors, examples are wrapped in distinct blocks.
 */

// ═══════════════════════════════════════════════════════════════════════════════════
// 1. THE OLD PATTERN (useLanguage)
// ═══════════════════════════════════════════════════════════════════════════════════
import { useLanguage } from '../context/useLanguage';

export const NotFoundPageOld = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('page.notFound.title', 'Page Not Found')}</h1>
      <div className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Link to="/">{t('page.notFound.backToHome', 'Back')}</Link>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════════
// 2. THE NEW PATTERN (useTranslation)
// ═══════════════════════════════════════════════════════════════════════════════════
import { useTranslation } from '../../hooks/useTranslation';

export const NotFoundPageNew = () => {
  const translate = useTranslation();

  return (
    <div className={translate.textAlign}>
      <h1>{translate.text('PAGE_NOT_FOUND_TITLE')}</h1>
      <div className={`flex ${translate.flexDir}`}>
        <Link to="/">{translate.text('PAGE_NOT_FOUND_BACK_TO_HOME')}</Link>
      </div>
    </div>
  );
};

/*
═══════════════════════════════════════════════════════════════════════════════════
QUICK SNIPPET COMPARISON (Logic Fixed)
═══════════════════════════════════════════════════════════════════════════════════

BEFORE (Manual):
<div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'}`}></div>

AFTER (Automatic):
<div className={`min-h-screen ${translate.textAlign}`}></div>

*/

// ═══════════════════════════════════════════════════════════════════════════════════
// MIGRATION CHECKSHEET
// ═══════════════════════════════════════════════════════════════════════════════════
/*
  Step 1: Change import to ../../hooks/useTranslation
  Step 2: Change hook to const translate = useTranslation();
  Step 3: Replace {isRTL ? 'text-right' : 'text-left'} with {translate.textAlign}
  Step 4: Replace {isRTL ? 'flex-row-reverse' : ''} with {translate.flexDir}
  Step 5: Replace t('key', 'fallback') with translate.text('CONSTANT_KEY')
*/

export default null;
