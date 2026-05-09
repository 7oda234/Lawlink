import express from "express";
import multer from "multer";
import path from "path";
import * as casesController from "./cases.controller.js";

const router = express.Router();

// 📂 إعداد Multer لحفظ الملفات المرفوعة في فولدر uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // ⚠️ تأكد إنك عامل فولدر اسمه uploads جوا فولدر الباك إند عندك
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 1️⃣ إنشاء قضية جديدة (POST /api/cases) - مع استقبال ملفات تحت اسم 'documents'
router.post("/", upload.array('documents'), casesController.handleCreateCase);

// 2️⃣ جلب كل القضايا (GET /api/cases)
router.get("/", casesController.handleGetCases);

// 3️⃣ العميل يرسل القضية لمحامي
router.post("/send-offer", casesController.handleSendOffer);

// 4️⃣ المحامي يوافق أو يرفض
router.put("/lawyer-respond", casesController.handleLawyerResponse);

// 5️⃣ العميل يوافق على الفلوس أو يرفض
router.put("/client-respond", casesController.handleClientResponse);

// 6️⃣ مسح قضية (DELETE /api/cases/:id)
router.delete("/:id", casesController.handleDeleteCase); 

// 🔍 جلب تفاصيل قضية واحدة (GET /api/cases/:id)
router.get("/:id", casesController.handleGetCaseById);

// 7️⃣ تحديث بيانات قضية (PATCH /api/cases/:id)
router.patch("/:id", casesController.handleUpdateCase);

// 8️⃣ تأكيد الدفع (PUT /api/cases/confirm-payment)
router.put("/confirm-payment", casesController.handlePaymentConfirmation);

export default router;
