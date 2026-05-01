import * as casesService from "./cases.service.js";

// ➕ إنشاء قضية (POST) - [كود قديم]
export const handleCreateCase = async (req, res) => {
  try {
    const result = await casesService.createCase(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📖 جلب كل القضايا (GET) - [كود قديم]
export const handleGetCases = async (req, res) => {
  try {
    const cases = await casesService.getCases();
    res.status(200).json({ ok: true, cases });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📩 1. العميل يرسل القضية للمحامي (POST)
export const handleSendOffer = async (req, res) => {
  try {
    const { caseId, lawyerId } = req.body;
    const result = await casesService.sendOffer(caseId, lawyerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👨‍⚖️ 2. رد المحامي (لو وافق بيحط الفلوس والنسبة) (PUT) - [كود جديد]
export const handleLawyerResponse = async (req, res) => {
  try {
    const { caseId, lawyerId, response, upfrontFee, successPercentage } = req.body;
    const result = await casesService.lawyerRespondToOffer(caseId, lawyerId, response, upfrontFee, successPercentage);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👤 3. رد العميل على المبالغ اللي المحامي حددها (PUT) - [كود جديد]
export const handleClientResponse = async (req, res) => {
  try {
    const { caseId, response } = req.body;
    const result = await casesService.clientRespondToFees(caseId, response);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🗑️ مسح قضية (DELETE) - [كود قديم]
export const handleDeleteCase = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await casesService.deleteCase(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};