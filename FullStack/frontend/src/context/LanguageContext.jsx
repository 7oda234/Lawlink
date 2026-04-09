// ═══════════════════════════════════════════════════════════════════════════════════
// 🌐 سياق اللغة - Language Context
// ═══════════════════════════════════════════════════════════════════════════════════
// هنا بنخزّن إعدادات اللغة (English/Arabic) ونصوص التطبيق المترجمة
// ويمكن نوصّل المعلومات دي لأي مكون في التطبيق من غير ما نعدي البيانات
// ─────────────────────────────────────────────────────────────────────────────────────

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// 🔧 إنشاء السياق الأساسي - Create the initial context object
const LanguageContext = createContext({
  language: 'en', // اللغة الحالية - Current language
  direction: 'ltr', // اتجاه النص - Text direction
  toggleLanguage: () => {}, // دالة تغيير اللغة - Toggle language function
  t: (key) => key, // دالة الترجمة - Translation function
});

// 📚 قاموس النصوص المترجمة - Translation dictionary
const translations = {
  // اللغة الإنجليزية - English
  en: {
    // التنقل - Navigation
    nav: {
      home: 'Home',
      findLawyer: 'Find a Lawyer',
      howItWorks: 'How it Works',
      about: 'About Us',
      contact: 'Contact',
      services: 'Services',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      profile: 'Profile',
      logout: 'Logout',
    },

    // شريط التنقل - Navbar
    navbar: {
      home: 'Home',
      findLawyer: 'Find a Lawyer',
      howItWorks: 'How it Works',
      about: 'About Us',
      login: 'Login',
      signUp: 'Sign Up',
    },

    // الصفحات الرئيسية - Main pages
    home: {
      title: 'Welcome to LawLink',
      subtitle: 'Find the best lawyers, manage cases, and communicate securely with your legal team.',
      searchLawyersTitle: 'Search Top-Rated Lawyers',
      searchLawyersDesc: 'Use filters by practice area, location, and rating to connect with trusted legal professionals.',
      findLawyer: 'Find a Lawyer',
      manageCasesTitle: 'Manage Cases with Confidence',
      manageCasesDesc: 'Track milestones, upload documents, and keep your practitioner aligned with one dashboard.',
      viewCases: 'View My Cases',
      whyLawLink: 'Why LawLink?',
      verifiedAttorneys: 'Verified Attorneys',
      verifiedAttorneysDesc: 'Only vetted professionals with proven track records are featured.',
      endToEndProtection: 'End-to-End Protection',
      endToEndProtectionDesc: 'Secure document upload, messaging, and workflow transparency from start to finish.',
      smartMonitoring: 'Smart Case Monitoring',
      smartMonitoringDesc: 'Automated updates and milestones keep you ahead of deadlines.',
      testimonials: 'Testimonials',
      testimonial1: 'LawLink made it easy for me to find a corporate lawyer with rapid onboarding and great communication.',
      testimonial1Author: '– Sarah K., Startup Founder',
      testimonial2: 'I can review case documents and status updates from my phone. The security and clarity have been outstanding.',
      testimonial2Author: '– Ahmed T., Client',
    },

    // المصادقة - Authentication
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone Number',
      address: 'Address',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember Me',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      resetPassword: 'Reset Password',
      sendResetLink: 'Send Reset Link',
      backToLogin: 'Back to Login',
    },

    // لوحة التحكم - Dashboard
    dashboard: {
      welcome: 'Welcome back',
      totalCases: 'Total Cases',
      activeCases: 'Active Cases',
      totalPayments: 'Total Payments',
      pendingMessages: 'Pending Messages',
      recentCases: 'Recent Cases',
      quickActions: 'Quick Actions',
      viewAllCases: 'View All Cases',
      messages: 'Messages',
      payments: 'Payments',
    },

    // القضايا - Cases
    cases: {
      myCases: 'My Cases',
      allCases: 'All Cases',
      createCase: 'Create New Case',
      caseDetails: 'Case Details',
      caseTitle: 'Case Title',
      caseType: 'Case Type',
      caseDescription: 'Case Description',
      caseStatus: 'Case Status',
      assignedLawyer: 'Assigned Lawyer',
      createdDate: 'Created Date',
      lastUpdate: 'Last Update',
      documents: 'Documents',
      timeline: 'Timeline',
      messages: 'Messages',
      active: 'Active',
      pending: 'Pending',
      closed: 'Closed',
      rejected: 'Rejected',
    },

    // المحامين - Lawyers
    lawyers: {
      findLawyer: 'Find a Lawyer',
      lawyerProfile: 'Lawyer Profile',
      lawyersList: 'Lawyers List',
      specialization: 'Specialization',
      experience: 'Experience',
      rating: 'Rating',
      reviews: 'Reviews',
      contactLawyer: 'Contact Lawyer',
      bookAppointment: 'Book Appointment',
      years: 'years',
    },

    // التواصل - Communication
    communication: {
      chat: 'Chat',
      messages: 'Messages',
      inbox: 'Inbox',
      sendMessage: 'Send Message',
      notifications: 'Notifications',
      newMessage: 'New Message',
      messagePlaceholder: 'Type your message here...',
      send: 'Send',
    },

    // الأزرار العامة - Common buttons
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      submit: 'Submit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      upload: 'Upload',
      download: 'Download',
    },

    // الرسائل العامة - Common messages
    messages: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      noData: 'No data available',
      confirmDelete: 'Are you sure you want to delete this?',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email',
      passwordMismatch: 'Passwords do not match',
    },

    // المظهر - Theme
    theme: {
      light: 'Light',
      dark: 'Dark',
      toggleTheme: 'Toggle Theme',
      changePalette: 'Change Color Palette',
    },

    // اللغة - Language
    language: {
      english: 'English',
      arabic: 'العربية',
      toggleLanguage: 'تغيير اللغة',
    },
  },

  // اللغة العربية - Arabic
  ar: {
    // التنقل - Navigation
    nav: {
      home: 'الرئيسية',
      findLawyer: 'البحث عن محامي',
      howItWorks: 'كيف يعمل',
      about: 'من نحن',
      contact: 'اتصل بنا',
      services: 'الخدمات',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
    },

    // شريط التنقل - Navbar
    navbar: {
      home: 'الرئيسية',
      findLawyer: 'البحث عن محامي',
      howItWorks: 'كيف يعمل',
      about: 'من نحن',
      login: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
    },

    // الصفحات الرئيسية - Main pages
    home: {
      title: 'مرحباً بك في LawLink',
      subtitle: 'ابحث عن أفضل المحامين، أدر حالاتك، وتواصل بأمان مع فريقك القانوني.',
      searchLawyersTitle: 'البحث عن محامين ذوي تقييم عالي',
      searchLawyersDesc: 'استخدم عوامل التصفية حسب مجال الممارسة، الموقع، والتقييم للتواصل مع محترفين قانونيين موثوقين.',
      findLawyer: 'البحث عن محامي',
      manageCasesTitle: 'أدر حالاتك بثقة',
      manageCasesDesc: 'تتبع المعالم، ارفع المستندات، واحتفظ بمحاميك متماشياً مع لوحة تحكم واحدة.',
      viewCases: 'عرض حالاتي',
      whyLawLink: 'لماذا LawLink؟',
      verifiedAttorneys: 'محامون موثقون',
      verifiedAttorneysDesc: 'يتم عرض المحترفين المختبرين فقط ذوي السجلات المثبتة.',
      endToEndProtection: 'حماية شاملة',
      endToEndProtectionDesc: 'رفع آمن للمستندات، مراسلة، وشفافية سير العمل من البداية إلى النهاية.',
      smartMonitoring: 'مراقبة ذكية للحالات',
      smartMonitoringDesc: 'تحديثات آلية ومعالم تحافظ على تقدمك أمام المواعيد النهائية.',
      testimonials: 'آراء العملاء',
      testimonial1: 'LawLink جعل من السهل عليّ العثور على محامي شركات مع تسجيل دخول سريع وتواصل رائع.',
      testimonial1Author: '– سارة ك.، مؤسسة شركة ناشئة',
      testimonial2: 'يمكنني مراجعة مستندات الحالات وتحديثات الحالة من هاتفي. الأمان والوضوح كانا استثنائيين.',
      testimonial2Author: '– أحمد ت.، عميل',
    },

    // المصادقة - Authentication
    auth: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      phone: 'رقم الهاتف',
      address: 'العنوان',
      forgotPassword: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني',
      loginButton: 'دخول',
      registerButton: 'إنشاء الحساب',
      resetPassword: 'إعادة تعيين كلمة المرور',
      sendResetLink: 'إرسال رابط إعادة التعيين',
      backToLogin: 'العودة لتسجيل الدخول',
    },

    // لوحة التحكم - Dashboard
    dashboard: {
      welcome: 'مرحباً بعودتك',
      totalCases: 'إجمالي القضايا',
      activeCases: 'القضايا النشطة',
      totalPayments: 'إجمالي المدفوعات',
      pendingMessages: 'الرسائل المعلقة',
      recentCases: 'القضايا الأخيرة',
      quickActions: 'الإجراءات السريعة',
      viewAllCases: 'عرض جميع القضايا',
      messages: 'الرسائل',
      payments: 'المدفوعات',
    },

    // القضايا - Cases
    cases: {
      myCases: 'قضاياي',
      allCases: 'جميع القضايا',
      createCase: 'إنشاء قضية جديدة',
      caseDetails: 'تفاصيل القضية',
      caseTitle: 'عنوان القضية',
      caseType: 'نوع القضية',
      caseDescription: 'وصف القضية',
      caseStatus: 'حالة القضية',
      assignedLawyer: 'المحامي المسؤول',
      createdDate: 'تاريخ الإنشاء',
      lastUpdate: 'آخر تحديث',
      documents: 'الملفات',
      timeline: 'الخط الزمني',
      messages: 'الرسائل',
      active: 'نشط',
      pending: 'قيد الانتظار',
      closed: 'مغلق',
      rejected: 'مرفوض',
    },

    // المحامين - Lawyers
    lawyers: {
      findLawyer: 'البحث عن محامي',
      lawyerProfile: 'ملف المحامي',
      lawyersList: 'قائمة المحامين',
      specialization: 'التخصص',
      experience: 'الخبرة',
      rating: 'التقييم',
      reviews: 'المراجعات',
      contactLawyer: 'تواصل مع المحامي',
      bookAppointment: 'حجز موعد',
      years: 'سنوات',
    },

    // التواصل - Communication
    communication: {
      chat: 'الدردشة',
      messages: 'الرسائل',
      inbox: 'الصندوق الوارد',
      sendMessage: 'إرسال رسالة',
      notifications: 'الإشعارات',
      newMessage: 'رسالة جديدة',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      send: 'إرسال',
    },

    // الأزرار العامة - Common buttons
    buttons: {
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      submit: 'إرسال',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      search: 'بحث',
      filter: 'تصفية',
      clear: 'مسح',
      upload: 'رفع',
      download: 'تحميل',
    },

    // الرسائل العامة - Common messages
    messages: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'نجح',
      noData: 'لا توجد بيانات',
      confirmDelete: 'هل أنت متأكد من الحذف؟',
      requiredField: 'هذا الحقل مطلوب',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
      passwordMismatch: 'كلمات المرور غير متطابقة',
    },

    // المظهر - Theme
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      toggleTheme: 'تغيير المظهر',
      changePalette: 'تغيير لوحة الألوان',
    },

    // اللغة - Language
    language: {
      english: 'English',
      arabic: 'العربية',
      toggleLanguage: 'تغيير اللغة',
    },
  },
};

// 🎯 مزود اللغة - Language Provider Component
// بيوفّر إعدادات اللغة ونصوص التطبيق المترجمة لكل مكونات التطبيق
export const LanguageProvider = ({ children }) => {
  // 🌐 حالة اللغة الحالية - Current language state
  // بنشتغل من الـ localStorage عشان نخزّن الاختيار الأخير للـ user
  const [language, setLanguage] = useState(() => localStorage.getItem('lawlink-language') || 'en');

  // 📝 اتجاه النص حسب اللغة - Text direction based on language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // 💾 حفظ تغييرات اللغة - Save language changes
  // لما تتغيّر اللغة، بنحدّث الـ document direction وبنخزّن في localStorage
  useEffect(() => {
    // 📄 بنضيف أو بنشيل 'rtl' class من الـ HTML element
    document.documentElement.dir = direction;
    document.documentElement.lang = language;

    // 💾 بنخزّن الاختيار في الـ localStorage عشان لما يفتح الـ user التطبيق ثاني، ييجي معاه الإعداد
    localStorage.setItem('lawlink-language', language);
  }, [language, direction]); // هذا dependents array يقول: بنشتغل دالة دي لما language أو direction يتغيروا

  // 🔄 دالة تغيير اللغة - Toggle between English and Arabic
  // بتحول من en لـ ar والعكس
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // 🔍 دالة الترجمة - Translation function
  // بتاخد مفتاح النص وترجعه باللغة المختارة
  const t = useMemo(() => (key) => {
    // تقسيم المفتاح للأقسام - Split key into sections
    const keys = key.split('.');
    let value = translations[language];

    // البحث في الأقسام - Navigate through sections
    for (const k of keys) {
      value = value?.[k];
    }

    // لو ملقناش النص، نرجع المفتاح الأصلي - Return original key if not found
    return value || key;
  }, [language]);

  // 📦 إنشاء القيمة اللي بنوديها للـ children - Create context value
  // useMemo بتتأكد إننا ما بننشئ object جديد في كل render، عشان performance
  const value = useMemo(
    () => ({
      language, // اللغة الحالية
      direction, // اتجاه النص
      toggleLanguage, // دالة تغيير اللغة
      t, // دالة الترجمة
      isRTL: direction === 'rtl', // هل النص من اليمين لليسار؟
      isArabic: language === 'ar', // هل اللغة العربية؟
    }),
    [language, direction, t], // dependencies: لما دول يتغيروا بس بننشئ object جديد
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// 🪝 Hook مخصص للوصول للغة - Custom hook to access language
// أي مكون بيحتاج يستخدم اللغة يـ import ده واستدعيه
export const useLanguage = () => useContext(LanguageContext);
