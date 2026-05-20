import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, X, MessageSquare, CheckCircle, Send } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose, clientId, lawyerId, caseId, existingFeedback, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const BASE_URL = "http://localhost:5000";

  // جلب البيانات القديمة لو العميل بيعمل "تعديل للتقييم"
  useEffect(() => {
    if (existingFeedback) {
      setRating(existingFeedback.rating || 0);
      setComment(existingFeedback.comment || '');
    } else {
      setRating(0);
      setComment('');
    }
  }, [existingFeedback, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("برجاء تحديد التقييم بالنجوم أولاً ⭐️");
      return;
    }

    setIsSubmitting(true);
    try {
      // ✅ تم تصحيح المسار ليطابق التعريف في app.controller.js (استخدام /api/feedbacks)
      if (existingFeedback && existingFeedback.feedback_id) {
        // تعديل التقييم القديم (Update)
        await axios.put(`${BASE_URL}/api/feedbacks/${existingFeedback.feedback_id}`, {
          rating,
          comment
        });
      } else {
        // إنشاء تقييم جديد (Create)
        await axios.post(`${BASE_URL}/api/feedbacks`, {
          rating,
          comment,
          client_id: clientId || null,
          lawyer_id: lawyerId || null,
          case_id: caseId || null
        });
      }
      
      setIsSuccess(true);
      if (onSuccess) onSuccess(); // تحديث الداتا في الصفحة الرئيسية
      
      // إغلاق النافذة
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);

    } catch (err) {
      console.error("Submission Error:", err);
      alert("حدث خطأ أثناء الإرسال، برجاء التأكد من عمل السيرفر.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 font-['Cairo']" dir="rtl">
      <div className="bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors z-10">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center justify-center h-full min-h-[350px]">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg shadow-green-500/20">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-black italic text-white mb-2">شكراً لك!</h3>
            <p className="text-slate-400 font-bold leading-relaxed">تم حفظ تقييمك بنجاح، رأيك يهمنا جداً.</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500 shadow-inner">
                <MessageSquare size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black italic text-white">{existingFeedback ? 'تعديل تقييمك' : 'شاركنا رأيك'}</h2>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Feedback & Rating</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 text-center shadow-inner">
                <p className="text-sm font-bold text-slate-300 mb-4">ما هو تقييمك لأداء المحامي؟</p>
                <div className="flex items-center justify-center gap-2 flex-row-reverse">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-transform hover:scale-110 focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        size={36} 
                        className={`transition-all duration-200 ${
                          star <= (hoverRating || rating) 
                            ? 'fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' 
                            : 'fill-transparent text-slate-600'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">هل لديك أي تعليق أو ملاحظات؟ (اختياري)</label>
                <textarea 
                  rows="4" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white focus:border-yellow-500 focus:outline-none resize-none custom-scrollbar"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || rating === 0}
                className={`w-full font-black py-4 rounded-xl italic uppercase shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitting || rating === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                    : 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/20 active:scale-95'
                }`}
              >
                {isSubmitting ? 'جاري الحفظ...' : (
                  <>{existingFeedback ? 'حفظ التعديلات' : 'إرسال التقييم'} <Send size={18} className="rotate-180" /></>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;