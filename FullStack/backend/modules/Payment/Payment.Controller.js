import * as paymentsService from "./payment.service.js";

// دفع الفيزا + إصدار فاتورة
export const handleVisaPayment = async (req, res) => {
  try {
    const { initialPaidAmount, clientId, caseId } = req.body;
    const lawyerId = await paymentsService.getLawyerIdByCase(caseId);
    
    // 1. الدفع
    const paymentId = await paymentsService.createPaymentEntry(initialPaidAmount, clientId, caseId);
    await paymentsService.addMoneyToWallet(lawyerId, initialPaidAmount);
    await paymentsService.activateCase(caseId);

    // 2. إصدار الفاتورة تلقائياً[cite: 1]
    const invoice = await paymentsService.createInvoice(paymentId);

    res.status(200).json({
      ok: true,
      message: "تم الدفع وإصدار الفاتورة بنجاح ✅🧾",
      data: { invoiceNumber: invoice.invoiceNumber, paymentId, amount: initialPaidAmount }
    });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

// استعراض الفاتورة[cite: 1]
export const getInvoice = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const invoiceData = await paymentsService.getInvoiceDetails(paymentId);
    if (!invoiceData) return res.status(404).json({ ok: false, message: "الفاتورة غير موجودة" });
    res.status(200).json({ ok: true, data: invoiceData });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

// العمليات الأخرى (سحب، رصيد، استرجاع)[cite: 1]
export const handleWalletWithdrawal = async (req, res) => { /* كود السحب السابق */ };
export const getWalletInfo = async (req, res) => { /* كود جلب الرصيد السابق */ };
export const handleRefund = async (req, res) => { /* كود الاسترجاع التبادلي السابق */ };