import * as casesService from "./cases.service.js";

// ➕ إنشاء قضية (POST)
export const handleCreateCase = async (req, res) => {
  try {
    const result = await casesService.createCase(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📖 جلب كل القضايا (GET)
export const handleGetCases = async (req, res) => {
  try {
    const cases = await casesService.getCases();
    res.status(200).json({ ok: true, cases });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📩 إرسال عرض لمحامي (POST)
export const handleSendOffer = async (req, res) => {
  try {
    const { caseId, lawyerId } = req.body;
    const result = await casesService.sendOffer(caseId, lawyerId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// ✅ رد المحامي (PUT)
export const handleOfferResponse = async (req, res) => {
  try {
    const { caseId, lawyerId, response } = req.body;
    const result = await casesService.respondToOffer(caseId, lawyerId, response);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🗑️ مسح قضية (DELETE)
export const handleDeleteCase = async (req, res) => {
  try {
    const { id } = req.params; // بياخد الـ ID من الـ URL (الرقم اللي بعد السلاش)
    const result = await casesService.deleteCase(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};