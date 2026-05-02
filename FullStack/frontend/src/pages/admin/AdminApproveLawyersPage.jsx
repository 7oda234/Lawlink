import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  CheckCircle, XCircle, FileText, User, 
  Briefcase, Award, ExternalLink, Loader2, 
  AlertCircle, ShieldCheck 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminApproveLawyersPage = () => {
  const { t } = useLanguage();
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // لتتبع حالة التحميل لكل زر
  const [alert, setAlert] = useState({ type: '', msg: '' });

  // جلب المحامين الذين لم يتم اعتمادهم بعد (verified = 0)
  const fetchPendingLawyers = useCallback(async () => {
    setLoading(true);
    try {
      // استعلام يجلب طلبات التسجيل الجديدة مع بيانات الترخيص والخبرة
      const response = await axios.get('/api/admin/lawyers/pending');
      const data = Array.isArray(response.data) ? response.data : [];
      setPendingLawyers(data);
    } catch  {
      setAlert({ type: 'error', msg: 'فشل في جلب طلبات الاعتماد.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingLawyers();
  }, [fetchPendingLawyers]);

  // دالة اتخاذ القرار (قبول أو رفض)
  const handleApproval = async (userId, decision) => {
    setActionLoading(userId);
    try {
      // تحديث حقل verified في جدول lawyer
      await axios.post(`/api/admin/lawyers/approve`, { 
        userId, 
        approved: decision === 'approve' 
      });
      
      setAlert({ 
        type: 'success', 
        msg: decision === 'approve' ? 'تم اعتماد المحامي بنجاح.' : 'تم رفض طلب التسجيل.' 
      });
      
      // إزالة المحامي من القائمة الحالية
      setPendingLawyers(prev => prev.filter(l => l.user_id !== userId));
    } catch  {
      setAlert({ type: 'error', msg: 'فشل في معالجة الطلب.' });
    } finally {
      setActionLoading(null);
      setTimeout(() => setAlert({ type: '', msg: '' }), 4000);
    }
  };

  return (
    <AdminLayout 
      title={t('admin.sidebar.approveLawyers') || "اعتماد المحامين"} 
      description="مراجعة طلبات الانضمام الجديدة والتأكد من صحة مستندات التراخيص المهنية."
    >
      <div className="space-y-6 mt-6">
        
        {/* رسائل الحالة */}
        {alert.msg && (
          <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <AlertCircle size={20} />
            <span className="font-bold text-sm">{alert.msg}</span>
          </div>
        )}

        {/* عرض الطلبات المعلقة */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2].map(i => <div key={i} className="shimmer h-40 rounded-2xl bg-surface" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {pendingLawyers.map((lawyer) => (
              <div key={lawyer.user_id} className="card bg-white border border-default p-6 rounded-2xl shadow-sm hover:border-accent/30 transition-all">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  
                  {/* معلومات المحامي والمستندات */}
                  <div className="flex gap-5 flex-1">
                    <div className="w-16 h-16 rounded-xl bg-page flex items-center justify-center text-secondary border">
                      <User size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-secondary">{lawyer.name}</h3>
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-muted uppercase">
                        <span className="flex items-center gap-1"><Briefcase size={14}/> {lawyer.license_number}</span>
                        <span className="flex items-center gap-1"><Award size={14}/> {lawyer.years_experience} سنوات خبرة</span>
                      </div>
                      <p className="text-sm text-muted">{lawyer.email}</p>
                    </div>
                  </div>

                  {/* معاينة المستندات المرفوعة */}
                  <div className="flex items-center gap-4 bg-page/50 p-4 rounded-xl border border-dashed">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-muted uppercase">مستند الترخيص</p>
                      <button className="text-accent text-sm font-bold flex items-center gap-1 hover:underline">
                        <FileText size={14} /> عرض الملف المرفق
                      </button>
                    </div>
                    <ExternalLink size={20} className="text-muted" />
                  </div>

                  {/* إجراءات الاعتماد */}
                  <div className="flex lg:flex-col justify-center gap-2">
                    <button 
                      disabled={actionLoading === lawyer.user_id}
                      onClick={() => handleApproval(lawyer.user_id, 'approve')}
                      className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2"
                    >
                      {actionLoading === lawyer.user_id ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                      اعتماد الحساب
                    </button>
                    <button 
                      disabled={actionLoading === lawyer.user_id}
                      onClick={() => handleApproval(lawyer.user_id, 'reject')}
                      className="btn btn-ghost border border-red-200 text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-xl flex items-center gap-2"
                    >
                      <XCircle size={18} /> رفض الطلب
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* حالة القائمة الفارغة */}
        {!loading && pendingLawyers.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-default">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4 opacity-20" />
            <p className="text-muted font-medium">لا توجد طلبات اعتماد معلقة حالياً. كل شيء تحت السيطرة!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminApproveLawyersPage;
