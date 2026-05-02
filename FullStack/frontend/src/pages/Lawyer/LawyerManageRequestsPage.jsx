import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  CheckCircle, XCircle, User, Calendar, 
  AlertCircle, Loader2, Scale, MessageSquare, Gavel
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContextObject';

const LawyerManageRequestsPage = () => {
  const { t } = useLanguage();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  
  // المتغير الذي سبب التحذير في صورة image_a56415.png
  const [error, setError] = useState(null); 

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // جلب طلبات القضايا الخاصة بالمحامي
      const response = await axios.get('/api/lawyer/case-requests');
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setRequests(data);
    } catch {
      // استخدام setError هنا يحل مشكلة التبعيات ويحدث الحالة
      setError(t('common.error_loading') || "تعذر تحميل الطلبات حالياً.");
    } finally {
      setLoading(false);
    }
  }, [t]); 

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDecision = async (caseId, decision) => {
    setActionLoading(caseId);
    try {
      // تحديث حالة القضية في قاعدة البيانات[cite: 1]
      await axios.patch(`/api/lawyer/cases/${caseId}/decision`, {
        status: decision === 'approve' ? 'Ongoing' : 'Rejected' 
      });
      setRequests(prev => prev.filter(req => req.case_id !== caseId));
    } catch {
      alert("فشل تنفيذ الإجراء.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F111A] text-white font-sans p-6 md:p-10">
      
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-2 text-accent text-sm mb-4 font-bold uppercase tracking-widest">
          <Gavel size={16} />
          <span>{t('lawyer.sidebar.requests') || "Requests Portal"}</span>
        </div>
        <h1>{t('lawyer.requests.title') || 'طلبات القضايا'}</h1>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ✅ الحل: استخدام المتغير 'error' هنا يزيل التحذير الظاهر في صورتك */}
        {error && (
          <div className="p-4 bg-red-900/20 border border-red-500 text-red-400 rounded-2xl flex items-center gap-3 font-bold animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-accent" size={48} /></div>
        ) : requests.length === 0 ? (
          <div className="text-center py-32 bg-[#161922] rounded-3xl border border-dashed border-white/10">
            <MessageSquare size={64} className="mx-auto text-gray-700 mb-6 opacity-20" />
            <h3 className="text-xl font-bold text-gray-400">لا توجد طلبات جديدة</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {requests.map((item) => (
              <div key={item.case_id} className="bg-[#161922] border border-white/5 p-8 rounded-2xl hover:border-accent/30 transition-all group">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-inner">
                        <Scale size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{item.title}</h3>
                        <span className="text-[10px] font-black text-gray-400 uppercase">Case #{item.case_id}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm italic leading-relaxed">"{item.description}"</p>
                    <div className="flex gap-6 pt-4 border-t border-white/5 mt-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User size={14} className="text-accent" />
                        <span className="text-gray-300 font-bold">{item.client_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} className="text-accent" />
                        <span dir="ltr">{new Date(item.created_at).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col justify-center gap-3 min-w-[220px]">
                    <button 
                      disabled={actionLoading === item.case_id}
                      onClick={() => handleDecision(item.case_id, 'approve')}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent/80 text-white rounded-2xl font-black transition-all"
                    >
                      {actionLoading === item.case_id ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                      {t('common.approve') || "قبول القضية"}
                    </button>
                    <button 
                      disabled={actionLoading === item.case_id}
                      onClick={() => handleDecision(item.case_id, 'reject')}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 border border-white/10 rounded-2xl font-bold transition-all"
                    >
                      <XCircle size={20} />
                      {t('common.reject') || "رفض الطلب"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerManageRequestsPage;
