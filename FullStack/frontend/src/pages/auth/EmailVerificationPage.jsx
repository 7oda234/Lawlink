// ═══════════════════════════════════════════════════════════════════════════════════
// ✉️ تعرف البريد الإلكتروني - Email Verification Page  
// ═══════════════════════════════════════════════════════════════════════════════════
// المستخدم بخِ وارد رمز التياقق ذات الرسله للبريد
// User verifies their email using a code sent to their mailbox
// ────────────────────────────────────────═════════════════════════════════════════

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import AuthShell from '../../components/AuthShell';

const EmailVerificationPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleInbox = () => {
    navigate('/login');
  };

  const handleResend = () => {
    setMessage('Verification link resent. Please check your email.');
  };

  // 📍 Return section starts here
  return (
    <AuthShell>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.emailVerification.title')}</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          {t('auth.emailVerification.description')}
        </p>
        
        <button type="button" onClick={handleInbox} className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mb-4 transition">
          {t('auth.emailVerification.goToInbox')}
        </button>
        {message && <div className="success-text mb-4">{message}</div>}
        <p className="text-sm text-gray-500 mt-4">
          {t('auth.emailVerification.didntReceive')} <button type="button" className="text-black font-bold hover:underline" onClick={handleResend}>{t('auth.emailVerification.resendLink')}</button>
        </p>
      </div>
    </div>
    </AuthShell>
  );
};

export default EmailVerificationPage;
