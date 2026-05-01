import express from "express";
import * as casesController from "./cases.controller.js";

const router = express.Router();

// 1️⃣ إنشاء قضية جديدة (POST /api/cases) - [كود قديم]
router.post("/", casesController.handleCreateCase);

// 2️⃣ جلب كل القضايا النشطة (GET /api/cases) - [كود قديم]
router.get("/", casesController.handleGetCases);

// 3️⃣ العميل يرسل القضية لمحامي - [تم التحديث ليتناسب مع الدورة الجديدة]
router.post("/send-offer", casesController.handleSendOffer);

// 4️⃣ المحامي يوافق (ويحدد الفلوس) أو يرفض - [كود جديد]
router.put("/lawyer-respond", casesController.handleLawyerResponse);

// 5️⃣ العميل يوافق على الفلوس (ننتظر الدفع) أو يرفض - [كود جديد]
router.put("/client-respond", casesController.handleClientResponse);

// 6️⃣ مسح قضية (DELETE /api/cases/:id) - [كود قديم]
router.delete("/:id", casesController.handleDeleteCase); 

export default router;