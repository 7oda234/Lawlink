import express from "express";
import * as paymentsController from "./payment.controller.js";
const router = express.Router();

router.post("/visa-checkout", paymentsController.handleVisaPayment);
router.get("/wallet/:userId", paymentsController.getWalletInfo);
router.post("/withdraw", paymentsController.handleWalletWithdrawal);
router.get("/invoice/:paymentId", paymentsController.getInvoice);
router.get("/history/lawyer/:lawyerId", paymentsController.getLawyerPaymentHistory);

// 👇 السطر اللي كان ناقص عشان يجيب داتا العميل ويحل الـ 404
router.get("/history/client/:clientId", paymentsController.getClientPaymentHistory);

// Finance alias used by AdminInvoicesPage
// Note: this router is mounted under /api/payments in app.controller.js
// so the effective paths are /api/payments/finance/invoices/:paymentId
router.get("/finance/invoices/:paymentId", paymentsController.getInvoice);
router.get("/finance/invoices/:paymentId/download", paymentsController.downloadInvoice);
export default router;