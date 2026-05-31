// ده المكون الرئيسي للتطبيق - This is the main component of the app
// الحل الجذري للمشكلة: الاستيراد من ملف AuthContext.jsx وليس Object
import { AuthProvider } from './context/AuthContext'; 
// ✅ الإضافة هنا: استيراد مزود الإشعارات
import { NotificationProvider } from './context/NotificationContext'; 
// استيراد React - Importing React
import React from 'react';
// استيراد الأيقونات - Importing icons
import { Component } from 'lucide-react';
// استيراد مزود الثيم - Importing theme provider
import { ThemeProvider } from './context/ThemeContextProvider.jsx';
// استيراد هوك الثيم - Importing theme hook
import { useTheme } from './context/ThemeContextHook.js';

// استيراد مزود اللغة - Importing language provider
import { LanguageProvider } from './context/LanguageContext';
// استيراد مزود تخطيط الصفحة - Importing page layout provider
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// استيراد انيميشن - Importing animation
import { AnimatePresence, motion } from 'framer-motion';
// استيراد مزود تخطيط الصفحة - Importing page layout provider
import { PageLayoutProvider } from './components/PageLayout';
// استيراد مكون الحدود الخطأ - Importing error boundary component
import { ErrorBoundary } from './components/ErrorBoundary';
// استيراد مكونات الواجهة - Importing UI components
import Navbar from './components/Navbar';
// استيراد مكون الفوتر - Importing footer component
import Footer from './components/Footer';

// استيراد ملفات الستايل - Importing style files
import './styles/auth/AuthBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات المصادقة (تسجيل الدخول، التسجيل، إلخ) - CSS file for authentication pages (login, register, etc.)
import './styles/public/PublicBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS للصفحات العامة (الصفحة الرئيسية، من نحن، إلخ) - CSS file for public pages (home page, about us, etc.)
import './styles/client/ClientBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات العميل (لوحة التحكم، تقديم القضية، إلخ) - CSS file for client pages (dashboard, submit case, etc.)
import './styles/lawyer/LawyerBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات المحامي (لوحة التحكم، إدارة القضايا، إلخ) - CSS file for lawyer pages (dashboard, case management, etc.)
import './styles/admin/AdminBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات الإدارة (لوحة تحكم الإدارة، إدارة المستخدمين، إلخ) - CSS file for admin pages (admin dashboard, user management, etc.)
import './styles/case/CaseBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات القضايا (عرض القضايا، تفاصيل القضية، إلخ) - CSS file for case pages (case listing, case details, etc.)
import './styles/communication/CommunicationBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات التواصل (رسائل، شات، إلخ) - CSS file for communication pages (messages, chat, etc.)
import './styles/utility/UtilityBase.css'; // 🌟 إضافة جديدة للسيناريو: ملف CSS لصفحات الأدوات (الإعدادات، مركز المساعدة، إلخ) - CSS file for utility pages (settings, help center, etc.)

// استيراد الصفحات العامة - Importing public pages
const HomePage = React.lazy(() => import('./pages/HomePage')); // الصفحة الرئيسية - Home page
const AboutPage = React.lazy(() => import('./pages/AboutPage')); // 🌟 إضافة جديدة للسيناريو: صفحة من نحن - About Us page
const ContactPage = React.lazy(() => import('./pages/ContactPage')); // 🌟 إضافة جديدة للسيناريو: صفحة اتصل بنا - Contact Us page
const ServicesPage = React.lazy(() => import('./pages/ServicesPage')); // 🌟 إضافة جديدة للسيناريو: صفحة خدماتنا - Services page
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorksPage')); // 🌟 إضافة جديدة للسيناريو: صفحة كيف يعمل - How It Works page
const FindLawyerPage = React.lazy(() => import('./pages/Lawyer/FindLawyerPage'));// 🌟 إضافة جديدة للسيناريو: صفحة البحث عن محامي - Find a Lawyer page
const LawyersListPage = React.lazy(() => import('./pages/LawyersListPage')); // 🌟 إضافة جديدة للسيناريو: صفحة قائمة المحامين - Lawyers List page
const LawyerProfilePublicPage = React.lazy(() => import('./pages/LawyerProfilePublicPage')); // 🌟 إضافة جديدة للسيناريو: صفحة الملف الشخصي للمحامي (التي يراها العملاء) - Lawyer Profile page (public view)

// استيراد صفحات المصادقة - Importing authentication pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage')); // صفحة تسجيل الدخول - Login page
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage')); // صفحة التسجيل - Register page
const RegisterClientContinuePage = React.lazy(() => import('./pages/auth/RegisterClientContinuePage'));// 🌟 إضافة جديدة للسيناريو: صفحة متابعة تسجيل العميل - Client registration continuation page
const RegisterLawyerContinuePage = React.lazy(() => import('./pages/auth/RegisterLawyerContinuePage'));// 🌟 إضافة جديدة للسيناريو: صفحة متابعة تسجيل المحامي - Lawyer registration continuation page
const ForgotPasswordPage = React.lazy(() => import('./pages/auth/ForgotPasswordPage'));// صفحة نسيت كلمة المرور - Forgot password page
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));// صفحة إعادة تعيين كلمة المرور - Reset password page
const EmailVerificationPage = React.lazy(() => import('./pages/auth/EmailVerificationPage'));// صفحة التحقق من البريد الإلكتروني - Email verification page

// استيراد صفحات العميل - Importing client pages
const ClientDashboardPage = React.lazy(() => import('./pages/client/ClientDashboardPage'));// 🌟 إضافة جديدة للسيناريو: صفحة لوحة تحكم العميل الرئيسية (عرض ملخص القضايا، الإحصائيات، إلخ) - Client dashboard page (summary of cases, stats, etc.)
const ClientMyProfilePage = React.lazy(() => import('./pages/client/ClientMyProfilePage'));// 🌟 إضافة جديدة للسيناريو: صفحة ملف العميل الشخصي (تحتوي على معلومات الملف، الإحصائيات، إلخ) - Client profile page (personal info, stats, etc.)
const ClientEditProfilePage = React.lazy(() => import('./pages/client/ClientEditProfilePage'));// 🌟 إضافة جديدة للسيناريو: صفحة تعديل ملف العميل الشخصي (تعديل المعلومات، إلخ) - Client edit profile page (edit info, etc.)
const ClientSubmitCasePage = React.lazy(() => import('./pages/client/ClientSubmitCasePage'));// 🌟 إضافة جديدة للسيناريو: صفحة تقديم قضية جديدة من قبل العميل (نموذج تقديم القضية، اختيار نوع القضية، إلخ) - Client submit new case page (case submission form, select case type, etc.)
const ClientCasesPage = React.lazy(() => import('./pages/client/ClientCasesPage'));// 🌟 إضافة جديدة للسيناريو: صفحة عرض جميع قضايا العميل (عرض قائمة القضايا، حالة كل قضية، إلخ) - Client cases page (list of cases, status of each case, etc.)
const ClientCaseDetailsPage = React.lazy(() => import('./pages/client/ClientCaseDetailsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة تفاصيل القضية للعميل (عرض تفاصيل القضية، المستندات، الرسائل، إلخ) - Client case details page (case details, documents, messages, etc.)
const ClientUploadDocumentsPage = React.lazy(() => import('./pages/client/ClientUploadDocumentsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة رفع المستندات من قبل العميل (لإرفاق مستندات جديدة للقضية) - Client upload documents page (attach new documents to case)
const ClientMessagesPage = React.lazy(() => import('./pages/client/ClientMessagesPage'));// 🌟 إضافة جديدة للسيناريو: صفحة رسائل العميل مع المحامي (تواصل مباشر، عرض الرسائل، إلخ) - Client messages page (direct communication, view messages, etc.)
const ClientAppointmentsPage = React.lazy(() => import('./pages/client/ClientAppointmentsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة مواعيد العميل (عرض المواعيد، حجز مواعيد جديدة، إلخ) - Client appointments page (view appointments, book new appointments, etc.)
const ClientNotificationsPage = React.lazy(() => import('./pages/client/ClientNotificationsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إشعارات العميل (عرض الإشعارات، إدارة الإشعارات، إلخ) - Client notifications page (view notifications, manage notifications, etc.)
const ClientPaymentPage = React.lazy(() => import('./pages/client/ClientPaymentPage'));// 🌟 إضافة جديدة للسيناريو: صفحة دفع العميل (إجراء الدفع، عرض خيارات الدفع، إلخ) - Client payment page (make payment, view payment options, etc.)
const ClientPaymentsPage = React.lazy(() => import('./pages/client/ClientPaymentsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة سجل مدفوعات العميل (عرض جميع المدفوعات، حالة كل دفعة، إلخ) - Client payment history page (view all payments, status of each payment, etc.)
const ClientInvoicePage = React.lazy(() => import('./pages/client/ClientInvoicePage'));// 🌟 إضافة جديدة للسيناريو: صفحة عرض فاتورة العميل (عرض تفاصيل الفاتورة، تنزيل الفاتورة، إلخ) - Client invoice page (view invoice details, download invoice, etc.)
const NewCaseIntake = React.lazy(() => import('./pages/client/NewCaseIntake.jsx'));// 🌟 إضافة جديدة للسيناريو: صفحة استمارة تقديم القضية الجديدة (نموذج مفصل لجمع معلومات القضية من العميل) - New case intake form page (detailed form to collect case information from client)
const ClientFindLawyer = React.lazy(() => import('./pages/client/ClientFindLawyer'));// 🌟 إضافة جديدة للسيناريو: صفحة البحث عن محامي من قبل العميل (نموذج بحث متقدم، عرض نتائج البحث، إلخ) - Client find lawyer page (advanced search form, display search results, etc.)
// 🔴 التعديل هنا: إضافة استيراد صفحة المحفظة للعميل
const ClientWalletPage = React.lazy(() => import('./pages/client/ClientWalletPage'));

// استيراد صفحات المحامي - Importing lawyer pages
// 🌟 إضافة جديدة للسيناريو: صفحة لوحة تحكم المحامي الرئيسية (عرض ملخص القضايا، الإحصائيات، إلخ)
const LawyerDashboard = React.lazy(() => import('./pages/Lawyer/LawyerDashboardPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة ملف المحامي الشخصي في لوحة التحكم (تحتوي على معلومات الملف، الإحصائيات، إلخ)
const LawyerProfileDashboardPage = React.lazy(() => import('./pages/Lawyer/LawyerProfileDashboardPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة تعديل ملف المحامي الشخصي في لوحة التحكم (تعديل المعلومات، الخبرات، إلخ)
const LawyerEditProfilePage = React.lazy(() => import('./pages/Lawyer/LawyerEditProfilePage'));
// 🌟 إضافة جديدة للسيناريو: صفحة عرض القضايا المخصصة للمحامي في لوحة التحكم (عرض القضايا المعينة، حالة كل قضية، إلخ)
const LawyerAssignedCasesPage = React.lazy(() => import('./pages/Lawyer/LawyerAssignedCasesPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة تفاصيل القضية للمحامي في لوحة التحكم (عرض تفاصيل القضية، المستندات، الرسائل، إلخ)
const LawyerCaseDetailsPage = React.lazy(() => import('./pages/Lawyer/LawyerCaseDetailsPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة تحديث حالة القضية من قبل المحامي (تحديث الحالة، إضافة ملاحظات، إلخ)
const LawyerUpdateStatusPage = React.lazy(() => import('./pages/Lawyer/LawyerUpdateStatusPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة رفع المستندات من قبل المحامي (لإرفاق مستندات جديدة للقضية)
const LawyerUploadDocumentsPage = React.lazy(() => import('./pages/Lawyer/LawyerUploadDocumentsPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة رسائل المحامي مع العملاء (تواصل مباشر، عرض الرسائل، إلخ)
const LawyerClientMessagesPage = React.lazy(() => import('./pages/Lawyer/LawyerClientMessagesPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة إدارة مواعيد المحامي (عرض المواعيد، إدارة التوافر، إلخ)
const LawyerSchedulePage = React.lazy(() => import('./pages/Lawyer/LawyerSchedulePage'));
// 🌟 إضافة جديدة للسيناريو: صفحة تقويم المحامي (عرض المواعيد، إدارة التوافر، إلخ)
const LawyerCalendarPage = React.lazy(() => import('./pages/Lawyer/LawyerCalendarPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة إدارة طلبات المحامي (قبول/رفض الطلبات)
const LawyerManageRequestsPage = React.lazy(() => import('./pages/Lawyer/LawyerManageRequestsPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة إدارة أرباح المحامي
const LawyerEarningsPage = React.lazy(() => import('./pages/Lawyer/LawyerEarningsPage'));
// 🌟 إضافة جديدة للسيناريو: صفحة إدارة العروض المالية للمحامي
const LawyerOfferPage = React.lazy(() => import('./pages/Lawyer/LawyerOfferPage'));
// ✅ صفحة متابعة مدفوعات العميل للمحامي
const LawyerPaymentTrackingPage = React.lazy(() => import('./pages/Lawyer/LawyerPaymentTrackingPage'));
// ✅ استيراد صفحة إشعارات المحامي
const LawyerNotificationsPage = React.lazy(() => import('./pages/Lawyer/LawyerNotificationsPage'));
// ⚖️ استيراد صفحة جلسات المحكمة الجديدة
const CourtSessionsPage = React.lazy(() => import('./pages/Lawyer/CourtSessionsPage'));
// 💳 إضافة استيراد صفحة إكمال الأقساط للمحامي
//const LawyerSubscriptionPage = React.lazy(() => import('./pages/Lawyer/LawyerSubscriptionPage'));

// استيراد صفحات الإدارة - Importing admin pages
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage')); // 🌟 إضافة جديدة للسيناريو: صفحة لوحة تحكم الإدارة الرئيسية (عرض ملخص النظام، الإحصائيات، إلخ) - Admin dashboard page (system overview, stats, etc.)
const AdminManageUsersPage = React.lazy(() => import('./pages/admin/AdminManageUsersPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إدارة المستخدمين (عرض جميع المستخدمين، البحث، إلخ) - Admin manage users page (view all users, search, etc.)
const AdminCreateUserPage = React.lazy(() => import('./pages/admin/AdminCreateUserPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إنشاء مستخدم جديد (نموذج إنشاء المستخدم، اختيار الدور، إلخ) - Admin create new user page (user creation form, select role, etc.)
const AdminEditUserPage = React.lazy(() => import('./pages/admin/AdminEditUserPage'));// 🌟 إضافة جديدة للسيناريو: صفحة تعديل مستخدم (تعديل المعلومات، تغيير الدور، إلخ) - Admin edit user page (edit info, change role, etc.)
const AdminDeleteUserPage = React.lazy(() => import('./pages/admin/AdminDeleteUserPage'));// 🌟 إضافة جديدة للسيناريو: صفحة حذف مستخدم (تأكيد الحذف، إلخ) - Admin delete user page (confirm deletion, etc.)
const AdminManageLawyersPage = React.lazy(() => import('./pages/admin/AdminManageLawyersPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إدارة المحامين (عرض جميع المحامين، البحث، إلخ) - Admin manage lawyers page (view all lawyers, search, etc.)
const AdminApproveLawyersPage = React.lazy(() => import('./pages/admin/AdminApproveLawyersPage'));// 🌟 إضافة جديدة للسيناريو: صفحة الموافقة على المحامين الجدد (عرض طلبات المحامين، الموافقة/الرفض، إلخ) - Admin approve new lawyers page (view lawyer applications, approve/reject, etc.)
const AdminManageClientsPage = React.lazy(() => import('./pages/admin/AdminManageClientsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إدارة العملاء (عرض جميع العملاء، البحث، إلخ) - Admin manage clients page (view all clients, search, etc.)
const AdminManageCasesPage = React.lazy(() => import('./pages/admin/AdminManageCasesPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إدارة القضايا (عرض جميع القضايا، البحث، إلخ) - Admin manage cases page (view all cases, search, etc.)
const AdminEditCasePage = React.lazy(() => import('./pages/admin/AdminEditCasePage'));// 🌟 إضافة جديدة للسيناريو: صفحة تعديل قضية (تعديل تفاصيل القضية، إلخ) - Admin edit case page (edit case details, etc.)
const AdminCaseMonitoringPage = React.lazy(() => import('./pages/admin/AdminCaseMonitoringPage'));// 🌟 إضافة جديدة للسيناريو: صفحة مراقبة القضايا (عرض حالة القضايا، التنبيهات، إلخ) - Admin case monitoring page (view case statuses, alerts, etc.)
const AdminReportsPage = React.lazy(() => import('./pages/admin/AdminReportsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة التقارير (عرض تقارير النظام، تصدير التقارير، إلخ) - Admin reports page (view system reports, export reports, etc.)
const AdminSystemLogsPage = React.lazy(() => import('./pages/admin/AdminSystemLogsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة سجلات النظام (عرض سجلات النظام، البحث في السجلات، إلخ) - Admin system logs page (view system logs, search logs, etc.)
const AdminNotificationsPage = React.lazy(() => import('./pages/admin/AdminNotificationsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إشعارات الإدارة (عرض جميع الإشعارات، إدارة الإشعارات، إلخ) - Admin notifications page (view all notifications, manage notifications, etc.)
const AdminAiUsagePage = React.lazy(() => import('./pages/admin/AdminAiUsagePage'));// 🌟 إضافة جديدة للسيناريو: صفحة استخدام الذكاء الاصطناعي (عرض إحصائيات استخدام أدوات الذكاء الاصطناعي، إلخ) - Admin AI usage page (view AI tools usage stats, etc.)
const AdminFinancialOverview = React.lazy(() => import('./pages/admin/AdminFinancialOverviewPage'));// 🌟 إضافة جديدة للسيناريو: صفحة النظرة المالية للإدارة (عرض إحصائيات مالية، تقارير مالية، إلخ) - Admin financial overview page (view financial stats, financial reports, etc.)
const AdminInvoicesPage = React.lazy(() => import('./pages/admin/AdminInvoicesPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إدارة الفواتير (عرض جميع الفواتير، البحث في الفواتير، إلخ) - Admin invoices management page (view all invoices, search invoices, etc.)
const AdminInstallmentsPage = React.lazy(() => import('./pages/admin/AdminInstallmentsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة إدارة الأقساط (عرض جميع الأقساط، البحث في الأقساط، إلخ) - Admin installments management page (view all installments, search installments, etc.)
const AdminProfilePage = React.lazy(() => import('./pages/admin/AdminProfilePage')); // 🌟 إضافة جديدة للسيناريو: صفحة الملف الشخصي لمدير النظام

// استيراد صفحات القضايا - Importing case pages
const CaseAllPage = React.lazy(() => import('./pages/case/CaseAllPage'));// 🌟 إضافة جديدة للسيناريو: صفحة عرض جميع القضايا (عرض قائمة بجميع القضايا، مع إمكانية البحث والتصفية) - Case all page (list of all cases, with search and filter options)
const CaseCreatePage = React.lazy(() => import('./pages/case/CaseCreatePage'));// 🌟 إضافة جديدة للسيناريو: صفحة إنشاء قضية جديدة (نموذج لإنشاء قضية جديدة، اختيار نوع القضية، إلخ) - Case create page (form to create new case, select case type, etc.)
const CaseDetailsPage = React.lazy(() => import('./pages/case/CaseDetailsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة تفاصيل القضية (عرض تفاصيل القضية، المستندات، الرسائل، إلخ) - Case details page (case details, documents, messages, etc.)
const CaseTimelinePage = React.lazy(() => import('./pages/case/CaseTimelinePage'));// 🌟 إضافة جديدة للسيناريو: صفحة الجدول الزمني للقضية (عرض الجدول الزمني للأحداث المتعلقة بالقضية) - Case timeline page (view timeline of events related to the case)
const CaseDocumentsPage = React.lazy(() => import('./pages/case/CaseDocumentsPage'));// 🌟 إضافة جديدة للسيناريو: صفحة مستندات القضية (عرض جميع المستندات المتعلقة بالقضية، مع إمكانية رفع مستندات جديدة) - Case documents page (view all documents related to the case, with option to upload new documents)
const CaseStatusTrackingPage = React.lazy(() => import('./pages/case/CaseStatusTrackingPage'));// 🌟 إضافة جديدة للسيناريو: صفحة تتبع حالة القضية (عرض حالة القضية الحالية، مع تحديثات الحالة، إلخ) - Case status tracking page (view current case status, with status updates, etc.)

// استيراد صفحات التواصل - Importing communication pages
const MessagesInboxPage = React.lazy(() => import('./pages/communication/MessagesInboxPage')); // 🌟 إضافة جديدة للسيناريو: صفحة صندوق الوارد للرسائل (عرض جميع الرسائل الواردة، مع إمكانية الرد، إلخ) - Messages inbox page (view all incoming messages, with option to reply, etc.)
const ChatPage = React.lazy(() => import('./pages/communication/ChatPage.jsx'));// 🌟 إضافة جديدة للسيناريو: صفحة الشات (تواصل مباشر بين العميل والمحامي، عرض الرسائل، إلخ) - Chat page (direct communication between client and lawyer, view messages, etc.)
const SendMessagePage = React.lazy(() => import('./pages/communication/SendMessagePage'));// 🌟 إضافة جديدة للسيناريو: صفحة إرسال رسالة جديدة (نموذج لإرسال رسالة جديدة، اختيار المستلم، إلخ) - Send message page (form to send new message, select recipient, etc.)
const NotificationsCenterPage = React.lazy(() => import('./pages/communication/NotificationsCenterPage'));// 🌟 إضافة جديدة للسيناريو: صفحة مركز الإشعارات (عرض جميع الإشعارات، إدارة الإشعارات، إلخ) - Notifications center page (view all notifications, manage notifications, etc.)

// AI Tools
const AIToolsPage = React.lazy(() => import('./pages/AiTools/AIToolsPage')); // 🌟 إضافة جديدة للسيناريو: صفحة أدوات الذكاء الاصطناعي (عرض جميع أدوات الذكاء الاصطناعي المتاحة، مع وصف لكل أداة، إلخ) - AI tools page (view all available AI tools, with description for each tool, etc.)
const ResearchTool = React.lazy(() => import('./pages/AiTools/ResearchTool')); // 🌟 إضافة جديدة للسيناريو: صفحة أداة البحث (أداة بحث مدعومة بالذكاء الاصطناعي للبحث في القوانين، السوابق القضائية، إلخ) - Research tool page (AI-powered tool for researching laws, case precedents, etc.)
const DocumentDraftingTool = React.lazy(() => import('./pages/AiTools/DocumentDraftingTool')); // 🌟 إضافة جديدة للسيناريو: صفحة أداة صياغة المستندات (أداة مدعومة بالذكاء الاصطناعي لمساعدة المستخدمين في صياغة المستندات القانونية) - Document drafting tool page (AI-powered tool to assist users in drafting legal documents)
const ContractReviewTool = React.lazy(() => import('./pages/AiTools/ContractReviewTool')); // 🌟 إضافة جديدة للسيناريو: صفحة أداة مراجعة العقود (أداة مدعومة بالذكاء الاصطناعي لمساعدة المستخدمين في مراجعة العقود القانونية) - Contract review tool page (AI-powered tool to assist users in reviewing legal contracts)
const CaseOutcomePredictor = React.lazy(() => import('./pages/AiTools/CaseOutcomePredictor')); // 🌟 إضافة جديدة للسيناريو: صفحة أداة توقع نتائج القضايا (أداة مدعومة بالذكاء الاصطناعي لتحليل تفاصيل القضية وتوقع النتائج المحتملة) - Case outcome predictor page (AI-powered tool to analyze case details and predict potential outcomes)
const LegalChatbot = React.lazy(() => import('./pages/AiTools/LegalChatbot')); // 🌟 إضافة جديدة للسيناريو: صفحة أداة الشات بوت القانونية (شات بوت مدعوم بالذكاء الاصطناعي للإجابة على الأسئلة القانونية الشائعة، تقديم إرشادات قانونية، إلخ) - Legal chatbot page (AI-powered chatbot to answer common legal questions, provide legal guidance, etc.)

// 💬 استيراد صفحة الشات اللحظي الجديدة (المربوطة بـ Socket.io و MongoDB)
const LiveChatPage = React.lazy(() => import('./pages/communication/ChatPage.jsx')); // 🌟 إضافة جديدة للسيناريو: صفحة الشات اللحظي (تواصل مباشر بين العميل والمحامي، مع تخزين الرسائل في MongoDB وعرضها في الوقت الحقيقي باستخدام Socket.io) - Live chat page (real-time communication between client and lawyer, with messages stored in MongoDB and displayed in real-time using Socket.io)

// استيراد صفحات الأدوات - Importing utility pages
const SettingsPage = React.lazy(() => import('./pages/utility/SettingsPage')); // 🌟 إضافة جديدة للسيناريو: صفحة الإعدادات (إعدادات الحساب، إعدادات الإشعارات، إلخ) - Settings page (account settings, notification settings, etc.)
const HelpCenterPage = React.lazy(() => import('./pages/utility/HelpCenterPage')); // 🌟 إضافة جديدة للسيناريو: صفحة مركز المساعدة (أسئلة شائعة، دعم مباشر، إلخ) - Help center page (FAQs, live support, etc.)
const TermsPrivacyPage = React.lazy(() => import('./pages/utility/TermsPrivacyPage'));// 🌟 إضافة جديدة للسيناريو: صفحة الشروط والأحكام وسياسة الخصوصية (عرض الشروط والأحكام، سياسة الخصوصية، إلخ) - Terms and privacy page (display terms and conditions, privacy policy, etc.)
const NotFoundPage = React.lazy(() => import('./pages/utility/NotFoundPage')); // 🌟 إضافة جديدة للسيناريو: صفحة 404 - Not found page (displayed when user navigates to a non-existent route)

// ✅ ✅ إضافة استيراد صفحات الاشتراكات الجديدة هنا (بدون امتدادات وباسم الفولدر small)
const SubscriptionPlansPage = React.lazy(() => import('./pages/Subscription/SubscriptionPlansPage.jsx.jsx'));
const SubscriptionPaymentPage = React.lazy(() => import('./pages/Subscription/SubscriptionPaymentPage.jsx'));
const SubscriptionInvoicePage = React.lazy(() => import('./pages/Subscription/SubscriptionInvoicePage.jsx'));

// 🟢 🟢 استيراد صفحات باقات واشتراكات العملاء (تم تعديل المسار هنا ليتوافق مع الصورة)
const ClientSubscriptionPlansPage = React.lazy(() => import('./pages/Subscription/ClientSubscriptionPlansPage.jsx'));
const ClientSubscriptionPaymentPage = React.lazy(() => import('./pages/Subscription/ClientSubscriptionPaymentPage.jsx'));
const ClientSubscriptionInvoicePage = React.lazy(() => import('./pages/Subscription/ClientSubscriptionInvoicePage.jsx'));

// تعريف المتغيرات للانيميشن - Defining animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 }, // بداية الانيميشن - Animation start
  animate: { opacity: 1, y: 0, scale: 1 }, // حالة الانيميشن - Animation state
  exit: { opacity: 0, y: -20, scale: 0.98 }, // نهاية الانيميشن - Animation end
};

// مكون لتغليف الصفحات بالانيميشن - Component to wrap pages with animation
const PageWrapper = ({ children }) => (
  <motion.div 
    variants={pageVariants} // تطبيق المتغيرات - Applying variants
    initial="initial" // حالة البداية - Initial state
    animate="animate" // حالة الانيميشن - Animation state
    exit="exit" // حالة الخروج - Exit state
    transition={{ duration: 0.35, ease: 'easeInOut' }} // إعدادات الانتقال - Transition settings
    className="min-h-screen" // تأكد من أن الصفحة تأخذ ارتفاع كامل الشاشة - Ensure page takes full screen height
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
  { path: '/client/cases/new', Component: ClientSubmitCasePage }, // 🌟 سيناريو 1
  { path: '/client/cases', Component: ClientCasesPage },
  { path: '/client/cases/:caseId', Component: ClientCaseDetailsPage }, // 🌟 سيناريو 5
  { path: '/client/cases/:caseId/documents', Component: ClientUploadDocumentsPage },
  { path: '/client/messages', Component: ClientMessagesPage },
  { path: '/client/appointments', Component: ClientAppointmentsPage },
  { path: '/client/notifications', Component: ClientNotificationsPage },
  { path: '/client/payments/new', Component: ClientPaymentPage }, // دفع/تأكيد
  { path: '/client/payments', Component: ClientPaymentsPage }, // سجل المدفوعات
  { path: '/client/payments/:paymentId/invoice', Component: ClientInvoicePage }, // عرض الفاتورة
  { path: '/client/cases/intake', Component: NewCaseIntake }, // 🌟 سيناريو 6: صفحة استمارة تقديم القضية الجديدة (نموذج مفصل لجمع معلومات القضية من العميل) - New case intake form page (detailed form to collect case information from client)
  { path: '/client/wallet', Component: ClientWalletPage }, // 🟢 تم تفعيل المسار بمسح علامتي التعليق (//)
  { path: '/client/find-specialist', Component: ClientFindLawyer }, // 🌟 سيناريو 2
  // 🚀 مسارات اشتراكات العملاء
  { path: '/client/subscription-plans', Component: ClientSubscriptionPlansPage },
  { path: '/client/subscription/payment/:planId', Component: ClientSubscriptionPaymentPage },
  { path: '/client/subscription/invoice/:invoiceId', Component: ClientSubscriptionInvoicePage },

  // lawyer routes
  { path: '/lawyer/dashboard', Component: LawyerDashboard },
  { path: '/lawyer/profile', Component: LawyerProfileDashboardPage },
  { path: '/lawyer/profile/edit', Component: LawyerEditProfilePage },
  { path: '/lawyer/cases', Component: LawyerAssignedCasesPage },
  { path: '/lawyer/cases/:caseId', Component: LawyerCaseDetailsPage }, // 🌟 سيناريو 7 و 8
  { path: '/lawyer/cases/:caseId/status', Component: LawyerUpdateStatusPage },
  { path: '/lawyer/cases/:caseId/documents', Component: LawyerUploadDocumentsPage },
  { path: '/lawyer/messages', Component: LawyerClientMessagesPage }, // 🌟 سيناريو 9: صفحة رسائل المحامي مع العملاء (تواصل مباشر، عرض الرسائل، إلخ) - Lawyer messages page (direct communication, view messages, etc.)
  { path: '/lawyer/appointments', Component: LawyerSchedulePage }, // 🌟 سيناريو 10: صفحة إدارة مواعيد المحامي (عرض المواعيد، إدارة التوافر، إلخ) - Lawyer schedule page (view appointments, manage availability, etc.)
  { path: '/lawyer/calendar', Component: LawyerCalendarPage }, // 🌟 سيناريو 11: صفحة تقويم المحامي (عرض المواعيد، إدارة التوافر، إلخ) - Lawyer calendar page (view appointments, manage availability, etc.)
  { path: '/lawyer/requests', Component: LawyerManageRequestsPage },
  { path: '/lawyer/earnings', Component: LawyerEarningsPage },
  { path: '/lawyer/offers', Component: LawyerOfferPage }, // 🌟 سيناريو 3 و 4
  { path: '/lawyer/payments', Component: LawyerPaymentTrackingPage }, // ✅ مسار المدفوعات للمحامي
  { path: '/lawyer/notifications', Component: LawyerNotificationsPage }, // ✅ مسار إشعارات المحامي
  { path: '/lawyer/court-sessions', Component: CourtSessionsPage }, // ⚖️ مسار جلسات المحكمة الجديد
  //{ path: '/lawyer/subscription', Component: LawyerSubscriptionPage }, // 💳 مسار صفحة أقساط المحامي المضاف حديثاً
  
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
  { path: '/admin/cases/:caseId/edit', Component: AdminEditCasePage },
  { path: '/admin/cases/monitoring', Component: AdminCaseMonitoringPage },
  { path: '/admin/reports', Component: AdminReportsPage },
  { path: '/admin/logs', Component: AdminSystemLogsPage },
  { path: '/admin/notifications', Component: AdminNotificationsPage },
  { path: '/admin/ai-usage', Component: AdminAiUsagePage },
  { path: '/admin/ai-tools', Component: AIToolsPage },
  { path: '/admin/financial-overview', Component: AdminFinancialOverview },
  { path: '/admin/invoices', Component: AdminInvoicesPage },
  { path: '/admin/installments', Component: AdminInstallmentsPage },
  { path: '/admin/profile', Component: AdminProfilePage },

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

  // AI Tools
  { path: '/ai-tools', Component: AIToolsPage },
  { path: '/ai-tools/research', Component: ResearchTool },
  { path: '/ai-tools/document-drafting', Component: DocumentDraftingTool },
  { path: '/ai-tools/contract-review', Component: ContractReviewTool },
  { path: '/ai-tools/case-outcome-predictor', Component: CaseOutcomePredictor },
  { path: '/ai-tools/legal-chatbot', Component: LegalChatbot },

  // 💬 مسار الشات اللحظي الجديد (Socket.io + MongoDB)
  { path: '/chat', Component: LiveChatPage },

  // 🟢 🟢 مسارات أنظمة الاشتراكات والتقسيط والفواتير الجديدة
  { path: '/subscription-plans', Component: SubscriptionPlansPage },
  { path: '/subscription/payment/:planId', Component: SubscriptionPaymentPage },
  { path: '/subscription/invoice/:invoiceId', Component: SubscriptionInvoicePage }
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
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen ${mode === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-900'}`}>
      {!isAdminRoute && <Navbar />} {/* إخفاء الـ Navbar في صفحات الإدارة - Hide Navbar on admin pages */}
      <main className={`max-w-7xl mx-auto px-4 ${isAdminRoute ? 'pt-0' : 'pt-24'} min-h-screen`}>
        <React.Suspense fallback={<div className="text-center py-20 italic font-black uppercase tracking-widest animate-pulse">Loading Archive...</div>}>
          <AppRoutes /> 
        </React.Suspense>
      </main>
      {!isAdminRoute && <Footer />}
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
            {/* ✅ تم تغليف التطبيق بمزود الإشعارات هنا عشان يشتغل صح */}
            <NotificationProvider>
              <Router>
                <PageLayoutProvider>
                  <AppContent />
                </PageLayoutProvider>
              </Router>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
