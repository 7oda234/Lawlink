import * as installmentService from "./installment.service.js";

export const getInstallmentsByCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const installments = await installmentService.getInstallmentsByCaseId(caseId);
    res.status(200).json({ ok: true, installments });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👇 دالة جديدة للتحكم في أقساط اشتراكات المحامي
export const getSubscriptionInstallments = async (req, res) => {
  try {
    const { userId } = req.params;
    const installments = await installmentService.getInstallmentsByUserId(userId);
    res.status(200).json({ ok: true, installments });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const payInstallment = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId, status } = req.body;

    const result = await installmentService.payInstallmentById({
      installmentId: id,
      payerClientId: clientId, // هنا لو اشتراك هيكون الـ clientId هو المحامي نفسه
      paymentStatus: status
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const generateInstallments = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { totalAmount, months } = req.body;
    const result = await installmentService.createInstallmentPlan(caseId, totalAmount, months);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};