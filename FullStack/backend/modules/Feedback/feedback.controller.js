import * as feedbackService from './feedback.service.js';

export const createFeedback = async (req, res) => {
  try {
    const { rating, comment, client_id, lawyer_id, case_id } = req.body;
    
    if (!rating) {
      return res.status(400).json({ message: "التقييم مطلوب (عدد النجوم)" });
    }

    const feedbackId = await feedbackService.createFeedback({ rating, comment, client_id, lawyer_id, case_id });
    res.status(201).json({ success: true, message: "تم إرسال تقييمك بنجاح!", feedbackId });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء الإرسال" });
  }
};

export const getFeedbackByCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const feedback = await feedbackService.getFeedbackByCase(caseId);
    
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب التقييم" });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "التقييم مطلوب (عدد النجوم)" });
    }

    await feedbackService.updateFeedback(id, { rating, comment });
    res.status(200).json({ success: true, message: "تم تحديث التقييم بنجاح!" });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء التحديث" });
  }
};

// 🆕 الدالة الجديدة للكنترولر
export const getFeedbackByLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const feedbacks = await feedbackService.getFeedbackByLawyer(lawyerId);
    
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Error fetching lawyer feedbacks:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء جلب تقييمات المحامي" });
  }
};