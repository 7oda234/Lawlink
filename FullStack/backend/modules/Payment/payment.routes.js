import express from "express";
import * as paymentsController from "./payment.controller.js";
const router = express.Router();

router.post("/visa-checkout", paymentsController.handleVisaPayment);
router.post("/withdraw", paymentsController.handleWalletWithdrawal);
router.get("/wallet/:userId", paymentsController.getWalletInfo);
router.post("/refund", paymentsController.handleRefund);

// مسار الفاتورة الجديد[cite: 1]
router.get("/invoice/:paymentId", paymentsController.getInvoice);

export default router;