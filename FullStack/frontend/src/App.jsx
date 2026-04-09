// ده المكون الرئيسي للتطبيق - This is the main component of the app
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import PageLayout, { PageLayoutProvider } from './components/PageLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

// استيراد ملفات الستايل - Importing style files
import './styles/auth/AuthBase.css';
import './styles/public/PublicBase.css';
import './styles/client/ClientBase.css';
import './styles/lawyer/LawyerBase.css';
import './styles/admin/AdminBase.css';
import './styles/case/CaseBase.css';
import './styles/communication/CommunicationBase.css';
import './styles/utility/UtilityBase.css';

// استيراد الصفحات العامة - Importing public pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorksPage'));
const FindLawyerPage = React.lazy(() => import('./pages/Lawyer/FindLawyerPage'));
const LawyersListPage = React.lazy(() => import('./pages/LawyersListPage'));
const LawyerProfilePublicPage = React.lazy(() => import('./pages/LawyerProfilePublicPage'));

// استيراد صفحات المصادقة - Importing authentication pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const RegisterClientContinuePage = React.lazy(() => import('./pages/auth/RegisterClientContinuePage'));
const RegisterLawyerContinuePage = React.lazy(() => import('./pages/auth/RegisterLawyerContinuePage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const EmailVerificationPage = React.lazy(() => import('./pages/auth/EmailVerificationPage'));

// استيراد صفحات العميل - Importing client pages
const ClientDashboardPage = React.lazy(() => import('./pages/client/ClientDashboardPage'));
const ClientMyProfilePage = React.lazy(() => import('./pages/client/ClientMyProfilePage'));
const ClientEditProfilePage = React.lazy(() => import('./pages/client/ClientEditProfilePage'));
const ClientSubmitCasePage = React.lazy(() => import('./pages/client/ClientSubmitCasePage'));
const ClientCasesPage = React.lazy(() => import('./pages/client/ClientCasesPage'));
const ClientCaseDetailsPage = React.lazy(() => import('./pages/client/ClientCaseDetailsPage'));
const ClientUploadDocumentsPage = React.lazy(() => import('./pages/client/ClientUploadDocumentsPage'));
const ClientMessagesPage = React.lazy(() => import('./pages/client/ClientMessagesPage'));
const ClientAppointmentsPage = React.lazy(() => import('./pages/client/ClientAppointmentsPage'));
const ClientNotificationsPage = React.lazy(() => import('./pages/client/ClientNotificationsPage'));
const ClientPaymentPage = React.lazy(() => import('./pages/client/ClientPaymentPage'));

// استيراد صفحات المحامي - Importing lawyer pages
const LawyerDashboardPage = React.lazy(() => import('./pages/lawyer/LawyerDashboardPage'));
const LawyerProfileDashboardPage = React.lazy(() => import('./pages/lawyer/LawyerProfileDashboardPage'));
const LawyerEditProfilePage = React.lazy(() => import('./pages/lawyer/LawyerEditProfilePage'));
const LawyerAssignedCasesPage = React.lazy(() => import('./pages/lawyer/LawyerAssignedCasesPage'));
const LawyerCaseDetailsPage = React.lazy(() => import('./pages/lawyer/LawyerCaseDetailsPage'));
const LawyerUpdateStatusPage = React.lazy(() => import('./pages/lawyer/LawyerUpdateStatusPage'));
const LawyerUploadDocumentsPage = React.lazy(() => import('./pages/lawyer/LawyerUploadDocumentsPage'));
const LawyerClientMessagesPage = React.lazy(() => import('./pages/lawyer/LawyerClientMessagesPage'));
const LawyerSchedulePage = React.lazy(() => import('./pages/lawyer/LawyerSchedulePage'));
const LawyerCalendarPage = React.lazy(() => import('./pages/lawyer/LawyerCalendarPage'));

// استيراد صفحات الإدارة - Importing admin pages
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminManageUsersPage = React.lazy(() => import('./pages/admin/AdminManageUsersPage'));
const AdminCreateUserPage = React.lazy(() => import('./pages/admin/AdminCreateUserPage'));
const AdminEditUserPage = React.lazy(() => import('./pages/admin/AdminEditUserPage'));
const AdminDeleteUserPage = React.lazy(() => import('./pages/admin/AdminDeleteUserPage'));
const AdminManageLawyersPage = React.lazy(() => import('./pages/admin/AdminManageLawyersPage'));
const AdminApproveLawyersPage = React.lazy(() => import('./pages/admin/AdminApproveLawyersPage'));
const AdminManageClientsPage = React.lazy(() => import('./pages/admin/AdminManageClientsPage'));
const AdminManageCasesPage = React.lazy(() => import('./pages/admin/AdminManageCasesPage'));
const AdminCaseMonitoringPage = React.lazy(() => import('./pages/admin/AdminCaseMonitoringPage'));
const AdminReportsPage = React.lazy(() => import('./pages/admin/AdminReportsPage'));
const AdminSystemLogsPage = React.lazy(() => import('./pages/admin/AdminSystemLogsPage'));

// استيراد صفحات القضايا - Importing case pages
const CaseAllPage = React.lazy(() => import('./pages/case/CaseAllPage'));
const CaseCreatePage = React.lazy(() => import('./pages/case/CaseCreatePage'));
const CaseDetailsPage = React.lazy(() => import('./pages/case/CaseDetailsPage'));
const CaseTimelinePage = React.lazy(() => import('./pages/case/CaseTimelinePage'));
const CaseDocumentsPage = React.lazy(() => import('./pages/case/CaseDocumentsPage'));
const CaseStatusTrackingPage = React.lazy(() => import('./pages/case/CaseStatusTrackingPage'));

// استيراد صفحات التواصل - Importing communication pages
const MessagesInboxPage = React.lazy(() => import('./pages/communication/MessagesInboxPage'));
const ChatPage = React.lazy(() => import('./pages/communication/ChatPage'));
const SendMessagePage = React.lazy(() => import('./pages/communication/SendMessagePage'));
const NotificationsCenterPage = React.lazy(() => import('./pages/communication/NotificationsCenterPage'));

// استيراد صفحات الأدوات - Importing utility pages
const SettingsPage = React.lazy(() => import('./pages/utility/SettingsPage'));
const HelpCenterPage = React.lazy(() => import('./pages/utility/HelpCenterPage'));
const TermsPrivacyPage = React.lazy(() => import('./pages/utility/TermsPrivacyPage'));
const NotFoundPage = React.lazy(() => import('./pages/utility/NotFoundPage'));

// تعريف المتغيرات للانيميشن - Defining animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

// مكون لتغليف الصفحات بالانيميشن - Component to wrap pages with animation
const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

// إعدادات الروتات - Route configuration
const heroImages = {
  home: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
  about: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1600&q=80',
  services: 'https://images.unsplash.com/photo-1551836022-8b02916d5b16?auto=format&fit=crop&w=1600&q=80',
  client: 'https://images.unsplash.com/photo-1521790945508-bf2a36314e85?auto=format&fit=crop&w=1600&q=80',
  lawyer: 'https://images.unsplash.com/photo-1522413231904-edd75d1d86ec?auto=format&fit=crop&w=1600&q=80',
  cases: 'https://images.unsplash.com/photo-1551033406-611cf9a36c9e?auto=format&fit=crop&w=1600&q=80',
  communication: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
  admin: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=80',
  utility: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
};

const routeConfig = [
  { path: '/', Component: HomePage, meta: { titleKey: 'route.home.title', subtitleKey: 'route.home.subtitle', heroImage: heroImages.home } },
  { path: '/about', Component: AboutPage, meta: { titleKey: 'route.about.title', subtitleKey: 'route.about.subtitle', heroImage: heroImages.about } },
  { path: '/contact', Component: ContactPage, meta: { titleKey: 'route.contact.title', subtitleKey: 'route.contact.subtitle', heroImage: heroImages.services } },
  { path: '/services', Component: ServicesPage, meta: { titleKey: 'route.services.title', subtitleKey: 'route.services.subtitle', heroImage: heroImages.services } },
  { path: '/how-it-works', Component: HowItWorksPage, meta: { titleKey: 'route.howItWorks.title', subtitleKey: 'route.howItWorks.subtitle', heroImage: heroImages.home } },
  { path: '/find-lawyer', Component: FindLawyerPage, meta: { titleKey: 'route.findLawyer.title', subtitleKey: 'route.findLawyer.subtitle', heroImage: heroImages.lawyer } },
  { path: '/lawyers', Component: LawyersListPage, meta: { titleKey: 'route.lawyers.title', subtitleKey: 'route.lawyers.subtitle', heroImage: heroImages.lawyer } },
  { path: '/lawyers/:id', Component: LawyerProfilePublicPage, meta: { titleKey: 'route.lawyerProfile.title', subtitleKey: 'route.lawyerProfile.subtitle', heroImage: heroImages.lawyer } },

  { path: '/login', Component: LoginPage, skipLayout: true },
  { path: '/register', Component: RegisterPage, skipLayout: true },
  { path: '/register/client/continue', Component: RegisterClientContinuePage, skipLayout: true },
  { path: '/register/lawyer/continue', Component: RegisterLawyerContinuePage, skipLayout: true },
  { path: '/forgot-password', Component: ForgotPasswordPage, skipLayout: true },
  { path: '/reset-password', Component: ResetPasswordPage, skipLayout: true },
  { path: '/verify-email', Component: EmailVerificationPage, skipLayout: true },

  { path: '/client/dashboard', Component: ClientDashboardPage, meta: { titleKey: 'route.clientDashboard.title', subtitleKey: 'route.clientDashboard.subtitle', heroImage: heroImages.client } },
  { path: '/client/profile', Component: ClientMyProfilePage, meta: { titleKey: 'route.clientProfile.title', subtitleKey: 'route.clientProfile.subtitle', heroImage: heroImages.client } },
  { path: '/client/profile/edit', Component: ClientEditProfilePage, meta: { titleKey: 'route.clientEditProfile.title', subtitleKey: 'route.clientEditProfile.subtitle', heroImage: heroImages.client } },
  { path: '/client/cases/new', Component: ClientSubmitCasePage, meta: { titleKey: 'route.clientSubmitCase.title', subtitleKey: 'route.clientSubmitCase.subtitle', heroImage: heroImages.client } },
  { path: '/client/cases', Component: ClientCasesPage, meta: { titleKey: 'route.clientCases.title', subtitleKey: 'route.clientCases.subtitle', heroImage: heroImages.client } },
  { path: '/client/cases/:caseId', Component: ClientCaseDetailsPage, meta: { titleKey: 'route.clientCaseDetails.title', subtitleKey: 'route.clientCaseDetails.subtitle', heroImage: heroImages.client } },
  { path: '/client/cases/:caseId/documents', Component: ClientUploadDocumentsPage, meta: { titleKey: 'route.clientUploadDocuments.title', subtitleKey: 'route.clientUploadDocuments.subtitle', heroImage: heroImages.client } },
  { path: '/client/messages', Component: ClientMessagesPage, meta: { titleKey: 'route.clientMessages.title', subtitleKey: 'route.clientMessages.subtitle', heroImage: heroImages.communication } },
  { path: '/client/appointments', Component: ClientAppointmentsPage, meta: { titleKey: 'route.clientAppointments.title', subtitleKey: 'route.clientAppointments.subtitle', heroImage: heroImages.client } },
  { path: '/client/notifications', Component: ClientNotificationsPage, meta: { titleKey: 'route.clientNotifications.title', subtitleKey: 'route.clientNotifications.subtitle', heroImage: heroImages.communication } },
  { path: '/client/payment', Component: ClientPaymentPage, meta: { titleKey: 'route.clientPayment.title', subtitleKey: 'route.clientPayment.subtitle', heroImage: heroImages.client } },

  { path: '/lawyer/dashboard', Component: LawyerDashboardPage, meta: { titleKey: 'route.lawyerDashboard.title', subtitleKey: 'route.lawyerDashboard.subtitle', heroImage: heroImages.lawyer } },
  { path: '/lawyer/profile', Component: LawyerProfileDashboardPage, meta: { titleKey: 'route.lawyerProfileDashboard.title', subtitleKey: 'route.lawyerProfileDashboard.subtitle', heroImage: heroImages.lawyer } },
  { path: '/lawyer/profile/edit', Component: LawyerEditProfilePage, meta: { titleKey: 'route.lawyerEditProfile.title', subtitleKey: 'route.lawyerEditProfile.subtitle', heroImage: heroImages.lawyer } },
  { path: '/lawyer/cases', Component: LawyerAssignedCasesPage, meta: { titleKey: 'route.lawyerCases.title', subtitleKey: 'route.lawyerCases.subtitle', heroImage: heroImages.cases } },
  { path: '/lawyer/cases/:caseId', Component: LawyerCaseDetailsPage, meta: { titleKey: 'route.lawyerCaseDetails.title', subtitleKey: 'route.lawyerCaseDetails.subtitle', heroImage: heroImages.cases } },
  { path: '/lawyer/cases/:caseId/status', Component: LawyerUpdateStatusPage, meta: { titleKey: 'route.lawyerUpdateStatus.title', subtitleKey: 'route.lawyerUpdateStatus.subtitle', heroImage: heroImages.cases } },
  { path: '/lawyer/cases/:caseId/documents', Component: LawyerUploadDocumentsPage, meta: { titleKey: 'route.lawyerUploadDocuments.title', subtitleKey: 'route.lawyerUploadDocuments.subtitle', heroImage: heroImages.cases } },
  { path: '/lawyer/messages', Component: LawyerClientMessagesPage, meta: { titleKey: 'route.lawyerMessages.title', subtitleKey: 'route.lawyerMessages.subtitle', heroImage: heroImages.communication } },
  { path: '/lawyer/appointments', Component: LawyerSchedulePage, meta: { titleKey: 'route.lawyerAppointments.title', subtitleKey: 'route.lawyerAppointments.subtitle', heroImage: heroImages.lawyer } },
  { path: '/lawyer/calendar', Component: LawyerCalendarPage, meta: { titleKey: 'route.lawyerCalendar.title', subtitleKey: 'route.lawyerCalendar.subtitle', heroImage: heroImages.lawyer } },

  { path: '/admin/dashboard', Component: AdminDashboardPage, meta: { titleKey: 'route.adminDashboard.title', subtitleKey: 'route.adminDashboard.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/users', Component: AdminManageUsersPage, meta: { titleKey: 'route.adminManageUsers.title', subtitleKey: 'route.adminManageUsers.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/users/new', Component: AdminCreateUserPage, meta: { titleKey: 'route.adminCreateUser.title', subtitleKey: 'route.adminCreateUser.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/users/:userId/edit', Component: AdminEditUserPage, meta: { titleKey: 'route.adminEditUser.title', subtitleKey: 'route.adminEditUser.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/users/:userId/delete', Component: AdminDeleteUserPage, meta: { titleKey: 'route.adminDeleteUser.title', subtitleKey: 'route.adminDeleteUser.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/lawyers', Component: AdminManageLawyersPage, meta: { titleKey: 'route.adminManageLawyers.title', subtitleKey: 'route.adminManageLawyers.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/lawyers/approve', Component: AdminApproveLawyersPage, meta: { titleKey: 'route.adminApproveLawyers.title', subtitleKey: 'route.adminApproveLawyers.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/clients', Component: AdminManageClientsPage, meta: { titleKey: 'route.adminManageClients.title', subtitleKey: 'route.adminManageClients.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/cases', Component: AdminManageCasesPage, meta: { titleKey: 'route.adminManageCases.title', subtitleKey: 'route.adminManageCases.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/cases/monitoring', Component: AdminCaseMonitoringPage, meta: { titleKey: 'route.adminCaseMonitoring.title', subtitleKey: 'route.adminCaseMonitoring.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/reports', Component: AdminReportsPage, meta: { titleKey: 'route.adminReports.title', subtitleKey: 'route.adminReports.subtitle', heroImage: heroImages.admin } },
  { path: '/admin/logs', Component: AdminSystemLogsPage, meta: { titleKey: 'route.adminLogs.title', subtitleKey: 'route.adminLogs.subtitle', heroImage: heroImages.admin } },

  { path: '/cases', Component: CaseAllPage, meta: { titleKey: 'route.caseAll.title', subtitleKey: 'route.caseAll.subtitle', heroImage: heroImages.cases } },
  { path: '/cases/new', Component: CaseCreatePage, meta: { titleKey: 'route.caseCreate.title', subtitleKey: 'route.caseCreate.subtitle', heroImage: heroImages.cases } },
  { path: '/cases/:caseId', Component: CaseDetailsPage, meta: { titleKey: 'route.caseDetails.title', subtitleKey: 'route.caseDetails.subtitle', heroImage: heroImages.cases } },
  { path: '/cases/:caseId/timeline', Component: CaseTimelinePage, meta: { titleKey: 'route.caseTimeline.title', subtitleKey: 'route.caseTimeline.subtitle', heroImage: heroImages.cases } },
  { path: '/cases/:caseId/documents', Component: CaseDocumentsPage, meta: { titleKey: 'route.caseDocuments.title', subtitleKey: 'route.caseDocuments.subtitle', heroImage: heroImages.cases } },
  { path: '/cases/:caseId/status', Component: CaseStatusTrackingPage, meta: { titleKey: 'route.caseStatusTracking.title', subtitleKey: 'route.caseStatusTracking.subtitle', heroImage: heroImages.cases } },

  { path: '/messages/inbox', Component: MessagesInboxPage, meta: { titleKey: 'route.messagesInbox.title', subtitleKey: 'route.messagesInbox.subtitle', heroImage: heroImages.communication } },
  { path: '/messages/chat', Component: ChatPage, meta: { titleKey: 'route.chat.title', subtitleKey: 'route.chat.subtitle', heroImage: heroImages.communication } },
  { path: '/messages/send', Component: SendMessagePage, meta: { titleKey: 'route.sendMessage.title', subtitleKey: 'route.sendMessage.subtitle', heroImage: heroImages.communication } },
  { path: '/notifications', Component: NotificationsCenterPage, meta: { titleKey: 'route.notifications.title', subtitleKey: 'route.notifications.subtitle', heroImage: heroImages.communication } },

  { path: '/settings', Component: SettingsPage, meta: { titleKey: 'route.settings.title', subtitleKey: 'route.settings.subtitle', heroImage: heroImages.utility } },
  { path: '/help', Component: HelpCenterPage, meta: { titleKey: 'route.help.title', subtitleKey: 'route.help.subtitle', heroImage: heroImages.utility } },
  { path: '/terms', Component: TermsPrivacyPage, meta: { titleKey: 'route.terms.title', subtitleKey: 'route.terms.subtitle', heroImage: heroImages.utility } },
];

// مكون الروتات - Routes component
const AppRoutes = () => {
  const location = useLocation();
  const { t } = useLanguage();

  // 📍 Return section starts here
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routeConfig.map(({ path, Component, meta, skipLayout }) => {
          const title = meta?.titleKey ? t(meta.titleKey) : meta?.title;
          const subtitle = meta?.subtitleKey ? t(meta.subtitleKey) : meta?.subtitle;
          return (
            <Route
              key={path}
              path={path}
              element={
                <PageWrapper>
                  {skipLayout ? (
                    <Component />
                  ) : (
                    <PageLayout title={title} subtitle={subtitle} heroImage={meta?.heroImage}>
                      <Component />
                    </PageLayout>
                  )}
                </PageWrapper>
              }
            />
          );
        })}

        {/* روت للصفحات غير الموجودة - Route for not found pages */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <PageLayout title={t('route.notFound.title')} subtitle={t('route.notFound.subtitle')} heroImage={heroImages.utility}>
                <NotFoundPage />
              </PageLayout>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// المكون الرئيسي للتطبيق - Main App component
function App() {
  // 📍 Return section starts here
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <PageLayoutProvider persistent={false}>
              <div className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-gray-100">
                <ErrorBoundary>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading... 🌀</div>}>
                    <AppRoutes />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </PageLayoutProvider>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
