// ═══════════════════════════════════════════════════════════════════════════════════
// Terms & Privacy Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة مساعدة/ادوات لTerms Privacy Page - utility section
// Legal terms, privacy policy, and compliance information
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

const TermsPrivacyPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <>
      {/* HERO */}
      <section className={`bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('page.termsPrivacy.title', 'Legal & Privacy')}</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          {t('page.termsPrivacy.subtitle', 'Our terms of service, privacy policy, and legal information.')}
        </p>
      </section>

      {/* TAB NAVIGATION */}
      <div className={`flex gap-4 mb-8 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-6 py-3 font-bold transition border-b-2 text-black ${
            activeTab === 'terms'
              ? 'border-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          {t('page.termsPrivacy.termsOfService', 'Terms of Service')}
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-6 py-3 font-bold transition border-b-2 text-black ${
            activeTab === 'privacy'
              ? 'border-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          {t('page.termsPrivacy.privacyPolicy', 'Privacy Policy')}
        </button>
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-6 py-3 font-bold transition border-b-2 text-black ${
            activeTab === 'legal'
              ? 'border-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          {t('page.termsPrivacy.legalCompliance', 'Legal Compliance')}
        </button>
      </div>

      {/* TERMS OF SERVICE */}
      {activeTab === 'terms' && (
        <section className={`bg-white border border-gray-200 rounded-xl p-8 md:p-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className={`text-3xl font-bold text-black mb-6 ${isRTL ? 'text-right' : ''}`}>{t('page.termsPrivacy.termsOfService', 'Terms of Service')}</h2>
          
          <div className="space-y-8 text-gray-700">
            <div>
              <h3 className={`text-xl font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>{t('page.termsPrivacy.acceptanceOfTerms', 'Acceptance of Terms')}</h3>
              <p className={isRTL ? 'text-right' : ''}>
                {t('page.termsPrivacy.acceptanceCopy', 'By accessing and using LawLink, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.')}
              </p>
            </div>

            <div>
              <h3 className={`text-xl font-bold text-black mb-3 ${isRTL ? 'text-right' : ''}`}>{t('page.termsPrivacy.userResponsibilities', 'User Responsibilities')}</h3>
              <p className={`mb-3 ${isRTL ? 'text-right' : ''}`}>{t('layout.youAgreeTo', 'You agree to:')}</p>
              <ul className={`list-disc list-inside space-y-2 ml-4 ${isRTL ? 'list-right text-right mr-4 ml-0' : ''}`}>
                <li>{t('page.termsPrivacy.accurateInfo', 'Provide accurate and complete information')}</li>
                <li>{t('page.termsPrivacy.passwordConfidential', 'Maintain the confidentiality of your password')}</li>
                <li>{t('page.termsPrivacy.notIllegal', 'Not use the service for illegal or unauthorized purposes')}</li>
                <li>{t('page.termsPrivacy.notInterfere', 'Not interfere with or disrupt the service')}</li>
                <li>{t('page.termsPrivacy.complyLaws', 'Comply with all applicable laws and regulations')}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">3. Intellectual Property Rights</h3>
              <p>
                All content, features, and functionality (including but not limited to all information, software, text, displays, 
                images, video, and audio) are the exclusive property of LawLink and are protected by copyright and other laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">4. Disclaimer of Warranties</h3>
              <p>
                LawLink is provided on an "AS IS" basis. We make no warranties, expressed or implied, regarding the service. 
                We do not guarantee any specific results from using LawLink.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">5. Limitation of Liability</h3>
              <p>
                LawLink shall not be liable for any damages arising from your use or inability to use the service, including 
                but not limited to direct, indirect, incidental, special, or consequential damages.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">6. Termination</h3>
              <p>
                We reserve the right to suspend or terminate your account at any time and for any reason, without notice or liability. 
                You may terminate your account at any time through your account settings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">7. Governing Law</h3>
              <p>
                These terms are governed by and construed in accordance with the laws of Egypt, without regard to its conflict 
                of law provisions. You agree to submit to the exclusive jurisdiction of the Egyptian courts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">8. Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Your continued use constitutes acceptance of the modified terms.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <section className="bg-white border border-gray-200 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-black mb-6">Privacy Policy</h2>
          
          <div className="space-y-8 text-gray-700">
            <div>
              <h3 className="text-xl font-bold text-black mb-3">1. Information We Collect</h3>
              <p className="mb-3">We collect information you provide directly, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (name, email, phone)</li>
                <li>Profile information (address, photo, credentials)</li>
                <li>Communication data (messages, documents)</li>
                <li>Payment information (via secure gateways)</li>
                <li>Usage data (pages visited, time spent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">2. How We Use Your Information</h3>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Process payments and transactions</li>
                <li>Send notifications and updates</li>
                <li>Verify identity and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">3. Data Security</h3>
              <p>
                We implement industry-standard security measures including SSL encryption, password hashing, and secure cloud hosting. 
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">4. Data Retention</h3>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. 
                You can request deletion of your data, subject to legal retention requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">5. Third-Party Sharing</h3>
              <p>
                We do not sell your personal information. We only share information with third parties when necessary to provide 
                services (e.g., payment processors, hosting providers) under strict confidentiality agreements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">6. Your Rights</h3>
              <p className="mb-3">Under Egypt's Personal Data Protection Law, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct or update your information</li>
                <li>Delete your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request restriction of processing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">7. Cookies</h3>
              <p>
                We use cookies to enhance your experience. You can disable cookies in your browser settings, but this may affect 
                certain functionality of the service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">8. Contact Us</h3>
              <p>
                If you have privacy concerns or wish to exercise your rights, contact us at privacy@lawlink.com. 
                We will respond within 30 days.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* LEGAL COMPLIANCE */}
      {activeTab === 'legal' && (
        <section className="bg-white border border-gray-200 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-black mb-6">Legal Compliance</h2>
          
          <div className="space-y-8 text-gray-700">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-3">📜 Egyptian Legal Profession Law</h3>
              <p>
                LawLink complies with Law No. 17 of 1983 regulating the legal profession in Egypt. 
                All lawyers on our platform are verified with the Egyptian Bar Association before activation.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-3">🔐 Personal Data Protection Law</h3>
              <p>
                We fully comply with Law No. 151 of 2020 on Personal Data Protection. All personal data is collected, processed, 
                and stored securely with your explicit consent.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-3">💳 E-Commerce Law</h3>
              <p>
                LawLink operates under Egypt's E-Commerce and Electronic Transactions Law No. 15 of 2004. 
                All online transactions are legal and binding.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-3">🏢 Company Registration</h3>
              <p>
                LawLink is registered as a technology and digital services company. We are not a law firm. 
                Lawyers provide services independently through our platform.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-3">⚖️ Liability & Disclaimers</h3>
              <p>
                LawLink is not responsible for legal outcomes. Lawyers bear full responsibility for provided services. 
                All disputes are governed by Egyptian law.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">Payment Processing</h3>
              <p>
                We use licensed Egyptian payment gateways (Paymob, Fawry) for secure transactions. 
                All payments are encrypted and comply with PCI standards.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">Intellectual Property</h3>
              <p>
                LawLink, its logo, and all related trademarks are protected under Egyptian Copyright and IP Law. 
                Unauthorized use or reproduction is prohibited.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">Dispute Resolution</h3>
              <p>
                Any disputes arising from LawLink services are subject to Egyptian legal jurisdiction. 
                We encourage use of mediation before litigation.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-black mb-4">Questions About Our Policies?</h3>
        <p className="text-gray-600 mb-6">
          If you have concerns about our terms, privacy practices, or legal compliance, 
          please reach out to our legal team.
        </p>
        <a href="mailto:legal@lawlink.com" className="inline-block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition">
          Contact Legal Team
        </a>
      </section>
    </>
  );
};

export default TermsPrivacyPage;
