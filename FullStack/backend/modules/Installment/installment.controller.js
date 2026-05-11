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

export const payInstallment = async (req, res) => {
  try {
    const { id } = req.params;
    // Some clients may provide clientId; otherwise we fetch via cases join in service.
    const { clientId } = req.body;

    const result = await installmentService.payInstallmentById({
      installmentId: id,
      payerClientId: clientId,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

