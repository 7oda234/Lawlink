// بنستورد مكتبة إكسبريس عشان نعمل بوابات الـ API بتاعتنا
import express from 'express';
// بنستورد الكنترولر اللي فيه الدوال اللي بتجيب الداتا
import * as adminController from './admin.controller.js';

// بنعمل نسخة من الـ Router عشان نحط عليها المسارات
const router = express.Router();

// 🛡️ الميدل وير ده هو "العسكري" اللي واقف على الباب بيشوف رتبتك (مستواك الإداري)
export const requireAdminLevel = (requiredLevel) => {
  return (req, res, next) => {
    // بنجيب رتبة المدير من بياناته اللي جاية مع التوكن، لو مفيش بنعتبره عسكري نفر (مستوى 1)
    // ملحوظة: لازم تتأكد إن التوكن بتاعك بيفك الـ authority_level ويحطه في req.user
    const userLevel = parseInt(req.user?.authority_level || 1, 10);

    // لو رتبته أصغر من المطلوب للصفحة دي، بنقوله ارجع مكانك ومنديلوش داتا
    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `غير مصرح! محتاج تكون مدير مستوى ${requiredLevel} على الأقل عشان تدخل هنا يا ريس.`,
      });
    }
    // لو رتبته تسمح، بنفتحله الباب يكمل شغل وتتنفذ الدالة
    next();
  };
};

// ==========================================
// المستوى الأول (Level 1): مراجع / محلل (بيشوف إحصائيات بس)
// ==========================================
// أي حد مستوى 1 وطالع يقدر يشوف الداش بورد
router.get('/full-dashboard', requireAdminLevel(1), adminController.getFullDashboard);
// يقدر يشوف التقارير والتحليلات
router.get('/reports-analytics', requireAdminLevel(1), adminController.getReportsAnalytics);
// يقدر يشوف سجلات النظام العادية
router.get('/system-logs', requireAdminLevel(1), adminController.getSystemLogs);
// يقدر يراقب القضايا بشكل سطحي
router.get('/cases-monitoring', requireAdminLevel(1), adminController.getCaseMonitoring);
// يقدر يشوف استهلاك الذكاء الاصطناعي
router.get('/ai-usage', requireAdminLevel(1), adminController.getAIUsageLogs);
// طبعاً يقدر يشوف البروفايل بتاعه
router.get('/profile', requireAdminLevel(1), adminController.getAdminProfile);

// ==========================================
// المستوى التاني (Level 2): خدمة العملاء والدعم (بيتعامل مع الناس)
// ==========================================
// يقدر يعرض لستة المستخدمين كلهم
router.get('/users', requireAdminLevel(2), adminController.getUsers);
// يقدر يعرض لستة العملاء
router.get('/clients', requireAdminLevel(2), adminController.getClients);
// يقدر يشوف تفاصيل القضايا
router.get('/cases', requireAdminLevel(2), adminController.getCases);
// يقدر يشوف المستندات والجلسات والرسايل عشان يرد على شكاوي الناس
router.get('/documents', requireAdminLevel(2), adminController.getAdminDocuments);
router.get('/hearings', requireAdminLevel(2), adminController.getAdminHearings);
router.get('/messages', requireAdminLevel(2), adminController.getAdminMessages);

// ==========================================
// المستوى التالت (Level 3): الامتثال والمراجعة القانونية (حساس شوية)
// ==========================================
// يقدر يشوف المحامين المعتمدين
router.get('/lawyers', requireAdminLevel(3), adminController.getLawyers);
// يقدر يشوف طلبات المحامين المعلقة
router.get('/lawyers/pending', requireAdminLevel(3), adminController.getPendingLawyers);
// 🛡️ يقدر يعتمد المحامين أو يرفضهم (أكشن مهم جداً)
router.post('/lawyers/approve', requireAdminLevel(3), adminController.approveLawyer);
router.patch('/lawyers/:userId/verify', requireAdminLevel(3), adminController.verifyLawyer);

// ==========================================
// المستوى الرابع (Level 4): مدير العمليات (بتاع الفلوس)
// ==========================================
// ده الوحيد اللي بيشوف حركة الفلوس، الإيرادات، والفواتير
router.get('/financial-logs', requireAdminLevel(4), adminController.getFinancialLogs);

// ==========================================
// المستوى الخامس (Level 5): سوبر أدمن (الكل في الكل)
// ==========================================
// يقدر يشوف كل حاجة وكمان سجلات صلاحيات المديرين التانيين الكبيرة
router.get('/logs', requireAdminLevel(5), adminController.getAdminLogs);

// بنصدر الروتر عشان نستخدمه في الملف الرئيسي للباك إند (app.js أو server.js)
export default router;
