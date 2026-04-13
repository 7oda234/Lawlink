import express from "express";
import * as casesController from "./cases.controller.js";

const router = express.Router();

// 1️⃣ إنشاء قضية جديدة (POST /api/cases)
router.post("/", casesController.handleCreateCase);

// 2️⃣ جلب كل القضايا النشطة (GET /api/cases)
router.get("/", casesController.handleGetCases);

// 3️⃣ إرسال عرض لمحامي (POST /api/cases/send-offer)
router.post("/send-offer", casesController.handleSendOffer);

// 4️⃣ رد المحامي بالموافقة أو الرفض (PUT /api/cases/respond)
router.put("/respond", casesController.handleOfferResponse);

// 5️⃣ مسح قضية (DELETE /api/cases/:id) 👈 ضيفنا السطر ده هنا
// الـ :id معناها إن أي رقم هتحطه في الـ URL هيتسحب كـ parameter
router.delete("/:id", casesController.handleDeleteCase); 

export default router;