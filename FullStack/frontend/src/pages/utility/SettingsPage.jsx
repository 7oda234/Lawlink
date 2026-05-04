// ═══════════════════════════════════════════════════════════════════════════════════
// Settings Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة مساعدة/ادوات لSettings Page - utility section
// User settings and account preferences management
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';

const SettingsPage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [activeTab, setActiveTab] = useState('account');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <>
      {/* HERO */}
      <section className={`bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl p-12 md:p-16 mb-12 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('page.settings.title', 'Account Settings')}</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          {t('page.settings.subtitle', 'Manage your account, privacy, and notification preferences.')}
        </p>
      </section>

      {/* SUCCESS MESSAGE */}
      {saveSuccess && (
        <div className={`mb-8 p-4 bg-green-50 border border-green-200 rounded-lg ${isRTL ? 'text-right' : ''}`}>
          <p className="text-green-700 font-bold">✓ {t('layout.changesSaved', 'Changes saved successfully!')}</p>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* SIDEBAR NAVIGATION */}
        <div className="md:col-span-1">
          <nav className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${isRTL ? 'text-right' : ''}`}>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-6 py-4 border-b border-gray-200 font-bold transition text-black ${
                activeTab === 'account'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-50'
              } ${isRTL ? 'text-right' : ''}`}
            >
              👤 {t('page.settings.account', 'Account')}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-6 py-4 border-b border-gray-200 font-bold transition text-black ${
                activeTab === 'security'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-50'
              } ${isRTL ? 'text-right' : ''}`}
            >
              🔒 {t('page.settings.security', 'Security')}
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-6 py-4 border-b border-gray-200 font-bold transition text-black ${
                activeTab === 'notifications'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-50'
              } ${isRTL ? 'text-right' : ''}`}
            >
              🔔 {t('page.settings.notifications', 'Notifications')}
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full text-left px-6 py-4 border-b border-gray-200 font-bold transition text-black ${
                activeTab === 'privacy'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-50'
              } ${isRTL ? 'text-right' : ''}`}
            >
              👁️ {t('page.settings.privacy', 'Privacy')}
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full text-left px-6 py-4 font-bold transition text-black ${
                activeTab === 'billing'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-50'
              } ${isRTL ? 'text-right' : ''}`}
            >
              💳 {t('page.settings.billing', 'Billing')}
            </button>
          </nav>
        </div>

        {/* SETTINGS CONTENT */}
        <div className="md:col-span-3 space-y-6">
          {/* ACCOUNT SETTINGS */}
          {activeTab === 'account' && (
            <div className={`bg-white border border-gray-200 rounded-xl p-8 shadow-sm ${isRTL ? 'text-right' : ''}`}>
              <h2 className={`text-2xl font-bold text-black mb-6 ${isRTL ? 'text-right' : ''}`}>{t('page.settings.accountInformation', 'Account Information')}</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-bold text-black mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    defaultValue="John Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    defaultValue="john@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+20 (100) 123-4567"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    defaultValue="Cairo, Egypt"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className={`border-t border-gray-200 pt-6 ${isRTL ? 'text-right' : ''}`}>
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
                  >
                    {t('layout.saveChanges', 'Save Changes')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === 'security' && (
            <div className={`bg-white border border-gray-200 rounded-xl p-8 shadow-sm ${isRTL ? 'text-right' : ''}`}>
              <h2 className={`text-2xl font-bold text-black mb-6 ${isRTL ? 'text-right' : ''}`}>{t('page.settings.securitySettings', 'Security Settings')}</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-black mb-3">Password</h3>
                  <p className="text-gray-600 mb-4">Last changed 3 months ago</p>
                  <button className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition">
                    Change Password
                  </button>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-black mb-3">Two-Factor Authentication</h3>
                  <p className="text-gray-600 mb-4">Add extra security to your account</p>
                  <button className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition">
                    Enable 2FA
                  </button>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-black mb-3">Login History</h3>
                  <p className="text-gray-600 mb-4">See where you've been signing in from</p>
                  <button className="px-6 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition">
                    View Login History
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black mb-3">Active Sessions</h3>
                  <p className="text-gray-600 mb-4">Manage devices accessing your account</p>
                  <button className="px-6 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition">
                    Manage Sessions
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {activeTab === 'notifications' && (
            <div className={`bg-white border border-gray-200 rounded-xl p-8 shadow-sm ${isRTL ? 'text-right' : ''}`}>
              <h2 className={`text-2xl font-bold text-black mb-6 ${isRTL ? 'text-right' : ''}`}>{t('page.settings.notificationPreferences', 'Notification Preferences')}</h2>
              
              <div className="space-y-4">
                <label className={`flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="font-bold text-black">{t('layout.emailNotifications', 'Email Notifications')}</p>
                    <p className="text-gray-600 text-sm">{t('layout.emailNotificationsDesc', 'Get updates about your cases and messages')}</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <div>
                    <p className="font-bold text-black">SMS Notifications</p>
                    <p className="text-gray-600 text-sm">Receive important alerts via SMS</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <div>
                    <p className="font-bold text-black">Push Notifications</p>
                    <p className="text-gray-600 text-sm">Get instant alerts on your device</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <div>
                    <p className="font-bold text-black">Marketing Emails</p>
                    <p className="text-gray-600 text-sm">Receive news and feature updates</p>
                  </div>
                </label>

                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY SETTINGS */}
          {activeTab === 'privacy' && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">Profile Visibility</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="radio" name="visibility" defaultChecked className="w-4 h-4" />
                      <span className="text-black font-bold">Public - Visible to all users</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="visibility" className="w-4 h-4" />
                      <span className="text-black font-bold">Friends Only - Visible to connections</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="visibility" className="w-4 h-4" />
                      <span className="text-black font-bold">Private - Only visible to you</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-3">Data Collection</h3>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-bold text-black">Allow Analytics</p>
                      <p className="text-gray-600 text-sm">Help us improve by collecting usage data</p>
                    </div>
                  </label>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* BILLING SETTINGS */}
          {activeTab === 'billing' && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Billing & Subscription</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-black mb-2">Current Plan</h3>
                  <p className="text-3xl font-bold text-black mb-2">Free Tier</p>
                  <p className="text-gray-600 mb-4">Basic features included</p>
                  <button className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition">
                    Upgrade to Pro
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-3">Payment Method</h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="text-black font-bold mb-2">Visa Card ending in 4242</p>
                    <p className="text-gray-600 text-sm">Expires 12/2025</p>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition">
                    Update Payment Method
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-3">Billing History</h3>
                  <button className="px-6 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition">
                    View Invoice History
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DANGER ZONE */}
      <section className="mt-12 bg-red-50 border border-red-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ Danger Zone</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-red-200 rounded-lg">
            <h3 className="font-bold text-black mb-2">Deactivate Account</h3>
            <p className="text-gray-600 text-sm mb-4">Temporarily disable your account</p>
            <button className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
              Deactivate
            </button>
          </div>
          <div className="p-4 border border-red-200 rounded-lg">
            <h3 className="font-bold text-black mb-2">Delete Account</h3>
            <p className="text-gray-600 text-sm mb-4">Permanently delete your account and data</p>
            <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
              Delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SettingsPage;
