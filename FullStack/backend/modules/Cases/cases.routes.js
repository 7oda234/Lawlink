import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs"; // مكتبة التعامل مع ملفات النظام
import * as casesController from "./cases.controller.js";

const router = express.Router();

// 📂 إعداد المجلد الذي سيتم حفظ الملفات فيه
const uploadDir = 'uploads/';

// 🛡️ صمام أمان: التحقق من وجود مجلد 'uploads'، وإذا لم يكن موجوداً، يقوم الكود بإنشائه تلقائياً لمنع تعطل السيرفر
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ⚙️ إعداد مكتبة Multer المسؤولة عن معالجة الـ FormData وحفظ الملفات
const storage = multer.diskStorage({
  // تحديد مسار الحفظ
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // تغيير اسم الملف لمنع تكرار الأسماء (يتم إضافة الطابع الزمني ورقم عشوائي قبل الامتداد الأصلي)
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ==========================================
// 🚀 تعريف المسارات (Routes) الخاصة بالقضايا
// ==========================================

// 1️⃣ إنشاء قضية جديدة (مرفق معها ملفات تحت اسم 'documents')
router.post("/", upload.array('documents'), casesController.handleCreateCase);

// 2️⃣ جلب جميع القضايا غير المحذوفة
router.get("/", casesController.handleGetCases);

// 3️⃣ إرسال عرض لقضية من العميل إلى المحامي
router.post("/send-offer", casesController.handleSendOffer);

// 4️⃣ رد المحامي على العرض (قبول مع تسعير / أو رفض)
router.put("/lawyer-respond", casesController.handleLawyerResponse);

// 5️⃣ رد العميل على تسعير المحامي (قبول / رفض)
router.put("/client-respond", casesController.handleClientResponse);

// 6️⃣ مسح قضية (تغيير حالة deleted_at)
router.delete("/:id", casesController.handleDeleteCase); 

// 7️⃣ جلب تفاصيل قضية محددة بناءً على الـ ID
router.get("/:id", casesController.handleGetCaseById);

// 8️⃣ تحديث بيانات أو حالة قضية محددة
router.patch("/:id", casesController.handleUpdateCase);

// 9️⃣ تأكيد دفع العميل للمحامي
router.put("/confirm-payment", casesController.handlePaymentConfirmation);

export default router;