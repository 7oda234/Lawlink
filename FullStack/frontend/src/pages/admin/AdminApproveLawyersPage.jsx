import React, { useState, useEffect, useCallback } from 'react';
import { axiosInstance as axios } from '../../services/DataService'; 
import { 
  CheckCircle, XCircle, FileText, User, 
  Briefcase, Award, ExternalLink, Loader2, 
  AlertCircle, ShieldCheck, Lock 
} from 'lucide-react'; 
import AdminLayout from '../../components/AdminLayout'; 
import { useLanguage } from '../../context/LanguageContextObject'; 
import { useAuth } from '../../context/useAuth'; // 🛡️ Import authentication hook

const AdminApproveLawyersPage = () => {
  const { t } = useLanguage(); 
  
  // 🛡️ Track current user authority layer
  const { authUser, isLoading: authLoading } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || localStorage.getItem('authorityLevel') || 0, 10);

  const [pendingLawyers, setPendingLawyers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [actionLoading, setActionLoading] = useState(null); 
  const [alert, setAlert] = useState({ type: '', msg: '' }); 

  const fetchPendingLawyers = useCallback(async () => {
    if (myLevel < 3) return; // Prevent raw query leakage
    setLoading(true); 
    try {
      const response = await axios.get('/api/admin/lawyers/pending'); 
      const data = Array.isArray(response.data) ? response.data : []; 
      setPendingLawyers(data); 
    } catch (err) {
      console.error(err); 
      setAlert({ type: 'error', msg: 'فشل في جلب طلبات الاعتماد.' }); 
    } finally { // ✅ Fixed typo here from 'goldly' to 'finally'
      setLoading(false); 
    }
  }, [myLevel]);

  useEffect(() => {
    if (!authLoading) {
      fetchPendingLawyers(); 
    }
  }, [fetchPendingLawyers, authLoading]);

  // 🛡️ SECURITY GUARD: LEVEL 3 REQUIRED
  if (!authLoading && myLevel < 3) {
    return (
      <AdminLayout title="Access Denied" description="يتطلب هذا القسم مستوى 3 على الأقل.">
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-red-200 max-w-4xl mx-auto mt-6 p-8">
          <Lock size={56} className="mx-auto text-red-500 mb-4 opacity-90 animate-pulse" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">منطقة محمية - قسم المراجعة والتحقق</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            أنت لا تملك الصلاحية المهنية الكافية لاعتماد أو مراجعة وثائق المحامين الجدد. يرجى مراجعة إدارة العمليات العليا.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const handleApproval = async (userId, decision) => {
    if (myLevel < 3) return; // Immutable memory backup check
    setActionLoading(userId); 
    try {
      await axios.post(`/api/admin/lawyers/approve`, { 
        userId, 
        approved: decision === 'approve' 
      });
      
      setAlert({ 
        type: 'success', 
        msg: decision === 'approve' ? 'تم اعتماد المحامي بنجاح.' : 'تم رفض طلب التسجيل.' 
      });
      
      setPendingLawyers(prev => prev.filter(l => l.user_id !== userId)); 
    } catch (err) {
      console.error(err); 
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
        {alert.msg && (
          <div className={`p-4 rounded-xl border flex items-center gap-3 ${
            alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <AlertCircle size={20} />
            <span className="font-bold text-sm">{alert.msg}</span>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2].map(i => <div key={i} className="h-40 rounded-2xl bg-gray-100 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {pendingLawyers.map((lawyer) => (
              <div key={lawyer.user_id} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-500/30 transition-all">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex gap-5 flex-1">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 border">
                      <User size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-800">{lawyer.name}</h3>
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase">
                        <span className="flex items-center gap-1"><Briefcase size={14}/> {lawyer.license_number}</span>
                        <span className="flex items-center gap-1"><Award size={14}/> {lawyer.years_experience} سنوات خبرة</span>
                      </div>
                      <p className="text-sm text-gray-500">{lawyer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-dashed">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase">مستند الترخيص</p>
                      <button className="text-yellow-600 text-sm font-bold flex items-center gap-1 hover:underline">
                        <FileText size={14} /> عرض الملف المرفق
                      </button>
                    </div>
                    <ExternalLink size={20} className="text-gray-400" />
                  </div>

                  <div className="flex lg:flex-col justify-center gap-2">
                    <button 
                      disabled={actionLoading === lawyer.user_id}
                      onClick={() => handleApproval(lawyer.user_id, 'approve')}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition disabled:opacity-50"
                    >
                      {actionLoading === lawyer.user_id ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                      اعتماد الحساب
                    </button>
                    <button 
                      disabled={actionLoading === lawyer.user_id}
                      onClick={() => handleApproval(lawyer.user_id, 'reject')}
                      className="border border-red-200 text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition disabled:opacity-50"
                    >
                      <XCircle size={18} /> رفض الطلب
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && pendingLawyers.length === 0 && (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4 opacity-20" />
            <p className="text-gray-500 font-medium">لا توجد طلبات اعتماد معلقة حالياً. كل شيء تحت السيطرة!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminApproveLawyersPage;
