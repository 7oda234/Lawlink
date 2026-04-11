import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext'; 
import { LanguageProvider } from './context/LanguageContext';
import { useLanguage } from './context/useLanguage';
import PageLayout, { PageLayoutProvider } from './components/PageLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

// استيراد الستايلات - تأكد من وجود الملفات في هذه المسارات
import './styles/auth/AuthBase.css';
import './styles/public/PublicBase.css';
import './styles/client/ClientBase.css';
import './styles/lawyer/LawyerBase.css';
import './styles/admin/AdminBase.css';
import './styles/case/CaseBase.css';
import './styles/communication/CommunicationBase.css';
import './styles/utility/UtilityBase.css';

// 🛡️ مكون حماية الروتات (ProtectedRoute)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = localStorage.getItem('user');

  if (!userData || userData === "undefined" || userData === "null") {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);
    if (user && user.role === 'admin') return children; 

    const userRole = user?.role?.toLowerCase();
    const rolesArray = (allowedRoles || []).map(r => r.toLowerCase());

    if (!rolesArray.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (error) {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

// --- 📂 استيراد الصفحات (Lazy Loading) ---
// تأكد من مطابقة أسماء الملفات داخل الفولدرات
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));

// 💡 تعديل المسارات لضمان عمل الـ Vite (لو اسم الملف عندك مختلف غيره هنا)
const ClientDashboardPage = React.lazy(() => import('./pages/client/ClientDashboardPage'));
const LawyerDashboardPage = React.lazy(() => import('./pages/lawyer/LawyerDashboardPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage'));

const NotFoundPage = React.lazy(() => import('./pages/utility/NotFoundPage'));

// إعدادات الانيميشن
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const PageWrapper = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
    {children}
  </motion.div>
);

// 📍 قائمة الروتات مع الكومنتات التوضيحية لكل مسار
const routeConfig = [
  { 
    path: '/',                 // رابط "الرئيسية"
    Component: HomePage, 
    meta: { title: "LawLink Platform", subtitle: "Connecting lawyers and clients." } 
  },
  { 
    path: '/login',            // رابط "دخول"
    Component: LoginPage, 
    skipLayout: true 
  },
  { 
    path: '/register',         // رابط "سجّل"
    Component: RegisterPage, 
    skipLayout: true 
  },

  // 🔐 صفحات العميل (Protected)
  { 
    path: '/client/dashboard', // رابط لوحة تحكم العميل
    Component: ClientDashboardPage, 
    allowedRoles: ['client'], 
    meta: { title: "Client Portal" } 
  },

  // 🔐 صفحات المحامي (Protected)
  { 
    path: '/lawyer/dashboard', // رابط لوحة تحكم المحامي
    Component: LawyerDashboardPage, 
    allowedRoles: ['lawyer'], 
    meta: { title: "Lawyer Portal" } 
  },

  // 🔐 صفحات الإدارة (Protected)
  { 
    path: '/admin/dashboard', // رابط لوحة تحكم الإدارة
    Component: AdminDashboardPage, 
    allowedRoles: ['admin'], 
    meta: { title: "Admin Center" } 
  },
];

const AppRoutes = () => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routeConfig.map(({ path, Component, allowedRoles, skipLayout, meta }) => {
          const title = meta?.titleKey ? t(meta.titleKey) : (meta?.title || "LawLink");
          
          const element = (
            <PageWrapper>
              {skipLayout ? (
                <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
                  <Component />
                </Suspense>
              ) : (
                <PageLayout title={title} subtitle={meta?.subtitle || ""} heroImage={meta?.heroImage}>
                  <Suspense fallback={<div className="p-20 text-center">Loading Page...</div>}>
                    <Component />
                  </Suspense>
                </PageLayout>
              )}
            </PageWrapper>
          );

          return (
            <Route
              key={path}
              path={path}
              element={
                allowedRoles ? (
                  <ProtectedRoute allowedRoles={allowedRoles}>{element}</ProtectedRoute>
                ) : (
                  element
                )
              }
            />
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <PageLayoutProvider persistent={false}>
              <div className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-slate-950">
                <ErrorBoundary>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-xl">LawLink Loading... ⚖️</div>}>
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