import * as paymentsService from "./payment.service.js";
import { someFunction } from '../Notification/notification.service.js'; // 👈 استيراد الإشعارات

export const handleVisaPayment = async (req, res) => {
  try {
    const { initialPaidAmount, clientId, caseId } = req.body;
    
    // 1. جلب ID المحامي
    const lawyerId = await paymentsService.getLawyerIdByCase(caseId);
    
    // 2. تسجيل العملية في جدول payment
    const paymentId = await paymentsService.createPaymentEntry(initialPaidAmount, clientId, caseId);
    
    // 3. إضافة رصيد لمحفظة المحامي
    await paymentsService.addMoneyToWallet(lawyerId, initialPaidAmount);
    
    // 4. تغيير حالة القضية لـ Ongoing
    await paymentsService.activateCase(caseId);

    // 5. إصدار الفاتورة تلقائياً
    const invoice = await paymentsService.createInvoice(paymentId);

    // 🔔 إشعار للمحامي بوصول الفلوس وبدء القضية
    if (lawyerId) {
      await notificationService.createNotification(lawyerId, `تم إضافة ${initialPaidAmount} جنيه إلى محفظتك. القضية الآن قيد العمل 🚀`);
    }

    res.status(200).json({
      ok: true,
      message: "تم الدفع وتحديث المحفظة وتفعيل القضية بنجاح ✅",
      data: { invoiceNumber: invoice.invoiceNumber, paymentId, amount: initialPaidAmount }
    });
  } catch (err) { 
    res.status(500).json({ ok: false, message: err.message }); 
  }
};

export const getInvoice = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const invoiceData = await paymentsService.getInvoiceDetails(paymentId);
    if (!invoiceData) return res.status(404).json({ ok: false, message: "الفاتورة غير موجودة" });
    res.status(200).json({ ok: true, data: invoiceData });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

export const handleWalletWithdrawal = async (req, res) => { /* كود السحب */ };
export const getWalletInfo = async (req, res) => { /* كود الرصيد */ };
