export const translations = {
  en: {
    nav: { 
      home: "Home", 
      findLawyer: "Find Lawyer", 
      how: "How it Works", 
      about: "About Us", 
      login: "Login", 
      signup: "Join Now" 
    },
    common: { 
      male: "Male", 
      female: "Female", 
      error_loading: "Error loading data." 
    },
    roles: { 
      client: "Client", 
      lawyer: "Lawyer", 
      admin: "Admin" 
    },
    admin: {
      sidebar: {
        title: "Admin Panel", 
        dashboard: "Dashboard", 
        usersSection: "User Management", 
        manageUsers: "Manage Users", 
        createUser: "Create User", 
        editUser: "Edit User", 
        deleteUser: "Delete User", 
        manageClients: "Manage Clients", 
        lawyersSection: "Lawyers Management", 
        manageLawyers: "Manage Lawyers", 
        approveLawyers: "Approve Lawyers", 
        casesSection: "Cases Management", 
        manageCases: "Manage Cases", 
        monitorCases: "Monitor Cases", 
        systemSection: "System", 
        financialOverview: "Financial Overview", // FIXED
        reports: "Reports", 
        logs: "Logs"
      },
      financial: { // Added for the new page content[cite: 2]
        title: "Financial Intelligence",
        description: "Monitor system-wide revenue streams and transaction integrity.",
        revenue: "Net Revenue",
        transactions: "Volume",
        settlements: "Settlements",
        ledgerTitle: "Audit Ledger",
        date: "Date",
        event: "Event",
        amount: "Amount",
        status: "Status"
      },
      createUser: {
        title: "Create New User", 
        description: "Create new accounts and enter all custom data.", 
        sections: { core: "Core Information", roles: "Roles & Permissions" }, 
        fields: { name: "Full Name", email: "Email Address", password: "Password", gender: "Gender", role: "Account Type" }, 
        placeholders: { name: "Enter full name..." }, 
        actions: { submit: "Create Account", cancel: "Cancel", saving: "Saving..." }, 
        status: { loading: "Creating user...", success: "User created successfully!", error: "Error adding user." }
      }
    },
    page: {
      home: {
        heroTitle: "Find Your Trusted Lawyer with LawLink",
        heroSubtitle: "The easiest way to connect with verified legal professionals.",
        findBtn: "Find a Lawyer",
        whyTitle: "Why Choose Us?",
        benefitVerified: "Verified Lawyers",
        benefitVerifiedCopy: "All our lawyers undergo a strict verification process.",
        benefitEasy: "Easy to Use",
        benefitEasyCopy: "Book consultations and manage cases seamlessly.",
        benefitPricing: "Transparent Pricing",
        benefitPricingCopy: "Know the costs upfront with no hidden fees.",
        clientTitle: "For Clients",
        clientCopy: "Find the right legal representation for your case today.",
        lawyerTitle: "For Lawyers",
        lawyerCopy: "Join our network and expand your practice."
      }
    }
  },
  ar: {
    nav: { 
      home: "الرئيسية", 
      findLawyer: "البحث عن محامي", 
      how: "كيف يعمل", 
      about: "من نحن", 
      login: "دخول", 
      signup: "انضم الآن" 
    },
    common: { 
      male: "ذكر", 
      female: "أنثى", 
      error_loading: "فشل في تحميل البيانات." 
    },
    roles: { 
      client: "عميل", 
      lawyer: "محامي", 
      admin: "مدير" 
    },
    admin: {
      sidebar: {
        title: "لوحة التحكم", 
        dashboard: "لوحة القيادة", 
        usersSection: "إدارة المستخدمين", 
        manageUsers: "إدارة المستخدمين", 
        createUser: "إضافة مستخدم", 
        editUser: "تعديل مستخدم", 
        deleteUser: "حذف مستخدم", 
        manageClients: "إدارة العملاء", 
        lawyersSection: "إدارة المحامين", 
        manageLawyers: "إدارة المحامين", 
        approveLawyers: "اعتماد المحامين", 
        casesSection: "إدارة القضايا", 
        manageCases: "إدارة القضايا", 
        monitorCases: "مراقبة القضايا", 
        systemSection: "النظام", 
        financialOverview: "نظرة عامة مالية", // FIXED
        reports: "التقارير", 
        logs: "السجلات"
      },
      financial: { // Added for the new page content[cite: 2]
        title: "الذكاء المالي",
        description: "مراقبة تدفقات الإيرادات وسلامة المعاملات على مستوى النظام.",
        revenue: "صافي الإيرادات",
        transactions: "حجم العمليات",
        settlements: "التسويات",
        ledgerTitle: "سجل التدقيق",
        date: "التاريخ",
        event: "الحدث",
        amount: "المبلغ",
        status: "الحالة"
      },
      createUser: {
        title: "إضافة مستخدم جديد", 
        description: "قم بإنشاء حسابات جديدة وإدخال كافة البيانات المخصصة.", 
        sections: { core: "البيانات الأساسية", roles: "الصلاحيات" }, 
        fields: { name: "الاسم الكامل", email: "البريد الإلكتروني", password: "كلمة المرور", gender: "النوع", role: "نوع الحساب" }, 
        placeholders: { name: "الاسم ثلاثي أو رباعي" }, 
        actions: { submit: "إنشاء الحساب", cancel: "إلغاء", saving: "جاري الحفظ..." }
      }
    },
    page: {
      home: {
        heroTitle: "ابحث عن محاميك الموثوق مع LawLink",
        heroSubtitle: "أسهل طريقة للتواصل مع نخبة من المحامين المعتمدين.",
        findBtn: "ابحث عن محامي",
        whyTitle: "لماذا تختار منصتنا؟",
        benefitVerified: "محامون معتمدون",
        benefitVerifiedCopy: "جميع المحامين لدينا يمرون بعملية تحقق صارمة.",
        benefitEasy: "سهولة الاستخدام",
        benefitEasyCopy: "احجز استشاراتك وتابع قضاياك بكل سهولة.",
        benefitPricing: "أسعار واضحة",
        benefitPricingCopy: "تعرف على التكاليف مسبقاً بدون أي رسوم خفية.",
        clientTitle: "للعملاء",
        clientCopy: "ابحث عن التمثيل القانوني المناسب لقضيتك اليوم.",
        lawyerTitle: "للمحامين",
        lawyerCopy: "انضم لشبكتنا وقم بتوسيع نطاق عملك."
      }
    }
  },
  eg: {
    nav: { 
      home: "الرئيسية", 
      findLawyer: "دور على محامي", 
      how: "إزاي شغال", 
      about: "عننا", 
      login: "دخول", 
      signup: "سجل" 
    },
    common: { 
      male: "راجل", 
      female: "ست", 
      error_loading: "في مشكلة في التحميل." 
    },
    roles: { 
      client: "عميل", 
      lawyer: "محامي", 
      admin: "مدير" 
    },
    admin: {
      sidebar: {
        title: "لوحة التحكم", 
        dashboard: "لوحة القيادة", 
        usersSection: "المستخدمين", 
        manageUsers: "كل المستخدمين", 
        createUser: "زود مستخدم", 
        editUser: "عدل مستخدم", 
        deleteUser: "امسح مستخدم", 
        manageClients: "العملاء", 
        lawyersSection: "المحامين", 
        manageLawyers: "كل المحامين", 
        approveLawyers: "قبول المحامين", 
        casesSection: "القضايا", 
        manageCases: "إدارة القضايا", 
        monitorCases: "متابعة القضايا", 
        systemSection: "النظام", 
        financialOverview: "الحسابات والفلوس", // FIXED
        reports: "التقارير", 
        logs: "السجلات"
      },
      financial: { // Added for the new page content[cite: 2]
        title: "نظرة على الخزنة",
        description: "متابعة كل الفلوس اللي داخلة واللي خارجة من السيستم.",
        revenue: "إجمالي الفلوس",
        transactions: "عدد العمليات",
        settlements: "التسويات",
        ledgerTitle: "سجل العمليات",
        date: "التاريخ",
        event: "إيه اللي حصل",
        amount: "المبلغ",
        status: "الحالة"
      },
      createUser: {
        title: "زود مستخدم جديد", 
        description: "اعمل حسابات جديدة ودخل كل البيانات اللي محتاجها.", 
        sections: { core: "البيانات الأساسية", roles: "الصلاحيات" }, 
        fields: { name: "الاسم بالكامل", email: "الإيميل", password: "الباسورد", gender: "النوع", role: "نوع الحساب" }, 
        placeholders: { name: "اكتب الاسم هنا..." }, 
        actions: { submit: "اعمل الحساب", cancel: "فكس", saving: "بنحفظ..." }
      }
    },
    page: {
      home: {
        heroTitle: "دور على محاميك الموثوق في LawLink",
        heroSubtitle: "أسهل طريق عشان توصل لمحامين شاطرين ومعتمدين.",
        findBtn: "دور على محامي",
        whyTitle: "ليه تختارنا؟",
        benefitVerified: "محامين مضمونين",
        benefitVerifiedCopy: "كل المحامين اللي معانا متراجعين كويس جداً.",
        benefitEasy: "سهولة في الاستخدام",
        benefitEasyCopy: "احجز استشارتك وتابع ورقك من غير لفة.",
        benefitPricing: "أسعار على النور",
        benefitPricingCopy: "هتعرف هتدفع كام بالظبط من غير مفاجآت.",
        clientTitle: "للعملاء",
        clientCopy: "دور على المحامي اللي هيخلص لك قضيتك دلوقتي.",
        lawyerTitle: "للمحامين",
        lawyerCopy: "انضم لينا وكبر شغلك."
      }
    }
  }
};
