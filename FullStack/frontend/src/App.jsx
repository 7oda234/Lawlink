// ده المكون الرئيسي للتطبيق - This is the main component of the app

// الحل الجذري للمشكلة: الاستيراد من ملف AuthContext.jsx وليس Object
import { AuthProvider } from './context/AuthContext'; 

import React from 'react';

import { Component } from 'lucide-react';

import { ThemeProvider, useTheme } from './context/ThemeContext';

import { LanguageProvider } from './context/LanguageContext';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { PageLayoutProvider } from './components/PageLayout';

import { ErrorBoundary } from './components/ErrorBoundary';

import Navbar from './components/Navbar';

import Footer from './components/Footer';



// استيراد ملفات الستايل - Importing style files

import './styles/auth/AuthBase.css';

import './styles/public/PublicBase.css';

import './styles/client/ClientBase.css';

import './styles/lawyer/LawyerBase.css';

import './styles/admin/AdminBase.css';

import './styles/case/CaseBase.css';

import './styles/communication/CommunicationBase.css';

import './styles/utility/UtilityBase.css';


// import './styles/AboutUS.module.css';



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

const NewCaseIntake = React.lazy(() => import('./pages/client/NewCaseIntake'));

const ClientWalletPage = React.lazy(() => import('./pages/client/ClientWalletPage'));



// استيراد صفحات المحامي - Importing lawyer pages

const LawyerDashboard = React.lazy(() => import('./pages/Lawyer/LawyerDashboardPage'));

const LawyerProfileDashboardPage = React.lazy(() => import('./pages/Lawyer/LawyerProfileDashboardPage'));

const LawyerEditProfilePage = React.lazy(() => import('./pages/Lawyer/LawyerEditProfilePage'));

const LawyerAssignedCasesPage = React.lazy(() => import('./pages/Lawyer/LawyerAssignedCasesPage'));

const LawyerCaseDetailsPage = React.lazy(() => import('./pages/Lawyer/LawyerCaseDetailsPage'));

const LawyerUpdateStatusPage = React.lazy(() => import('./pages/Lawyer/LawyerUpdateStatusPage'));

const LawyerUploadDocumentsPage = React.lazy(() => import('./pages/Lawyer/LawyerUploadDocumentsPage'));

const LawyerClientMessagesPage = React.lazy(() => import('./pages/Lawyer/LawyerClientMessagesPage'));

const LawyerSchedulePage = React.lazy(() => import('./pages/Lawyer/LawyerSchedulePage'));

const LawyerCalendarPage = React.lazy(() => import('./pages/Lawyer/LawyerCalendarPage'));

const LawyerManageRequestsPage = React.lazy(() => import('./pages/Lawyer/LawyerManageRequestsPage'));

const LawyerEarningsPage = React.lazy(() => import('./pages/Lawyer/LawyerEarningsPage'));




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

const AdminFinancialOverview = React.lazy(() => import('./pages/admin/AdminFinancialOverviewPage'));



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

    transition={{ duration: 0.35, ease: 'easeInOut' }}

    className="min-h-screen"

  >

    {children}

  </motion.div>

);



// إعدادات الروتات - Route configuration

const routeConfig = [

  // صفحات عامة - Public pages

  { path: '/', Component: HomePage },

  { path: '/about', Component: AboutPage },

  { path: '/contact', Component: ContactPage },

  { path: '/services', Component: ServicesPage },

  { path: '/how-it-works', Component: HowItWorksPage },

  { path: '/find-lawyer', Component: FindLawyerPage },

  { path: '/lawyers', Component: LawyersListPage },

  { path: '/lawyers/:id', Component: LawyerProfilePublicPage },

// auth routes

  { path: '/login', Component: LoginPage },

  { path: '/register', Component: RegisterPage },

  { path: '/register/client/continue', Component: RegisterClientContinuePage },

  { path: '/register/lawyer/continue', Component: RegisterLawyerContinuePage },

  { path: '/forgot-password', Component: ForgotPasswordPage },

  { path: '/reset-password', Component: ResetPasswordPage },

  { path: '/verify-email', Component: EmailVerificationPage },

// client routes

  { path: '/client/dashboard', Component: ClientDashboardPage },

  { path: '/client/profile', Component: ClientMyProfilePage },

  { path: '/client/profile/edit', Component: ClientEditProfilePage },

  { path: '/client/cases/new', Component: ClientSubmitCasePage },

  { path: '/client/cases', Component: ClientCasesPage },

  { path: '/client/cases/:caseId', Component: ClientCaseDetailsPage },

  { path: '/client/cases/:caseId/documents', Component: ClientUploadDocumentsPage },

  { path: '/client/messages', Component: ClientMessagesPage },

  { path: '/client/appointments', Component: ClientAppointmentsPage },

  { path: '/client/notifications', Component: ClientNotificationsPage },

  { path: '/client/payment', Component: ClientPaymentPage },

  { path: '/client/cases/intake', Component: NewCaseIntake },

  { path: '/client/wallet', Component: ClientWalletPage },

// lawyer routes

  { path: '/lawyer/dashboard', Component: LawyerDashboard },

  { path: '/lawyer/profile', Component: LawyerProfileDashboardPage },

  { path: '/lawyer/profile/edit', Component: LawyerEditProfilePage },

  { path: '/lawyer/cases', Component: LawyerAssignedCasesPage },

  { path: '/lawyer/cases/:caseId', Component: LawyerCaseDetailsPage },

  { path: '/lawyer/cases/:caseId/status', Component: LawyerUpdateStatusPage },

  { path: '/lawyer/cases/:caseId/documents', Component: LawyerUploadDocumentsPage },

  { path: '/lawyer/messages', Component: LawyerClientMessagesPage },

  { path: '/lawyer/appointments', Component: LawyerSchedulePage },

  { path: '/lawyer/calendar', Component: LawyerCalendarPage },

  { path: '/lawyer/requests', Component: LawyerManageRequestsPage },

  {path: '/lawyer/earnings', Component: LawyerEarningsPage },

// admin routes

  { path: '/admin/dashboard', Component: AdminDashboardPage },

  { path: '/admin/users', Component: AdminManageUsersPage },

  { path: '/admin/users/new', Component: AdminCreateUserPage },

  { path: '/admin/users/:userId/edit', Component: AdminEditUserPage },

  { path: '/admin/users/:userId/delete', Component: AdminDeleteUserPage },

  { path: '/admin/lawyers', Component: AdminManageLawyersPage },

  { path: '/admin/lawyers/approve', Component: AdminApproveLawyersPage },

  { path: '/admin/clients', Component: AdminManageClientsPage },

  { path: '/admin/cases', Component: AdminManageCasesPage },

  { path: '/admin/cases/monitoring', Component: AdminCaseMonitoringPage },

  { path: '/admin/reports', Component: AdminReportsPage },

  { path: '/admin/logs', Component: AdminSystemLogsPage },

  { path: '/admin/financial-overview', Component: AdminFinancialOverview },

// case routes

  { path: '/cases', Component: CaseAllPage },

  { path: '/cases/new', Component: CaseCreatePage },

  { path: '/cases/:caseId', Component: CaseDetailsPage },

  { path: '/cases/:caseId/timeline', Component: CaseTimelinePage },

  { path: '/cases/:caseId/documents', Component: CaseDocumentsPage },

  { path: '/cases/:caseId/status', Component: CaseStatusTrackingPage },

// communication routes

  { path: '/messages/inbox', Component: MessagesInboxPage },

  { path: '/messages/chat', Component: ChatPage },

  { path: '/messages/send', Component: SendMessagePage },

  { path: '/notifications', Component: NotificationsCenterPage },

// utility routes

  { path: '/settings', Component: SettingsPage },

  { path: '/help', Component: HelpCenterPage },

{ path: '/privacy', Component: TermsPrivacyPage},

{ path: '/terms', Component: TermsPrivacyPage},

{ path: '*', Component: NotFoundPage },

];



// مكون الروتات - Routes component

const AppRoutes = () => {

  const location = useLocation();



  return (

    <AnimatePresence mode="wait">

      <Routes location={location} key={location.pathname}>

        {routeConfig.map(({ path, Component }) => (

          <Route

            key={path}

            path={path}

            element={

              <PageWrapper>

                <Component />

              </PageWrapper>

            }

          />

        ))}



        {/* روت للصفحات غير الموجودة - Route for not found pages */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFoundPage />
            </PageWrapper>
          }
        />

      </Routes>

    </AnimatePresence>

  );

};


// مكون المحتوى الرئيسي للتطبيق - Main content component for the app

const AppContent = () => {

  const { mode } = useTheme();



  return (

    <div className={`min-h-screen ${mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24 min-h-screen">

        <React.Suspense fallback={<div className="text-center py-20">Loading LawLink...</div>}>

          <AppRoutes />

        </React.Suspense>

      </main>

      <Footer />

    </div>

  );

};

// المكون الرئيسي للتطبيق - Main component of the app

function App() {

  return (

    <ErrorBoundary>

      <ThemeProvider>

        <LanguageProvider>

          <AuthProvider> 

            <Router>

              <PageLayoutProvider>

                <AppContent />

              </PageLayoutProvider>

            </Router>

          </AuthProvider>

        </LanguageProvider>

      </ThemeProvider>

    </ErrorBoundary>

  );

}



export default App;
