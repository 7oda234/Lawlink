import Feedback from '../../models/Feedback.js';

export const createFeedback = async (data) => {
  const newFeedback = new Feedback(data);
  const result = await newFeedback.save();
  return result._id;
};

export const getFeedbackByCase = async (caseId) => {
  // MongoDB findOne
  return await Feedback.findOne({ case_id: caseId });
};

export const updateFeedback = async (feedbackId, data) => {
  // MongoDB findByIdAndUpdate
  return await Feedback.findByIdAndUpdate(feedbackId, data, { new: true });
};

// 🆕 الدالة الجديدة لجلب تقييمات المحامي
export const getFeedbackByLawyer = async (lawyerId) => {
  return await Feedback.find({ lawyer_id: lawyerId }).sort({ created_at: -1 });
};