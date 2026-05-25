import express from "express";
import * as installmentController from "./installment.controller.js";

const router = express.Router();

// Get all installments for a given case
router.get("/case/:caseId", installmentController.getInstallmentsByCase);

// 👇 الراوت الجديد لجلب أقساط الاشتراك الخاصة بالمحامي
router.get("/subscription/:userId", installmentController.getSubscriptionInstallments);

// 🔴 الراوت لإنشاء خطة تقسيط قضية
router.post("/case/:caseId/create-plan", installmentController.generateInstallments);

// Pay an installment by installment id
router.post("/:id/pay", installmentController.payInstallment);

export default router;