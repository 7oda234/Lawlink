import express from "express";
import * as courtSessionsController from "./Court.controller.js";

const router = express.Router();

// جلب جميع جلسات القضية
router.get("/case/:caseId", courtSessionsController.handleGetSessionsByCaseId);

// 👈 جلب قرار المحكمة النهائي أو الأحدث لقضية معينة
router.get("/decision/:caseId", courtSessionsController.handleGetCaseDecision);

// جلب القضايا الجارية
router.post("/ongoing-cases", courtSessionsController.handleGetOngoingCases);

// إضافة جلسة
router.post("/create", courtSessionsController.handleCreateSession);

// تعديل جلسة
router.put("/edit", courtSessionsController.handleEditSession);

// إنهاء جلسة بقرار
router.put("/update-result", courtSessionsController.handleUpdateResult);

export default router;