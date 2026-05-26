import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UserCheck, Search, Briefcase, Award, ShieldCheck, ShieldAlert, Star, Lock } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
// 🛡️ استيراد الصلاحيات
import { useAuth } from '../../context/useAuth';

const AdminManageLawyersPage = () => {
  const { t } = useLanguage();
  
  // 🛡️ بنجيب الصلاحيات
  const { authUser } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || 1, 10);
  // 🛡️ الصلاحية: لازم يكون مستوى 3 (مراجعة وامتثال) أو أعلى
  const canVerify = myLevel >= 3;

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); 

  // جلب المحامين
  const fetchLawyers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/lawyers'); 
      setLawyers(Array.isArray(response.data) ? response.data : []);
    } catch  {
      console.error('فشل تحميل قائمة المحامين');
      setLawyers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLawyers(); }, [fetchLawyers]);

  // الاعتماد (Toggle Verified)
  const toggleVerification = async (userId, currentStatus) => {
    // 🛡️ حماية عشان لو داس على الزرار بطريقة غير شرعية
    if (!canVerify) {
      alert("آسفين يا ريس، صلاحية اعتماد المحامين للمستويات العليا بس.");
      return;
    }

    try {
      await axios.patch(`/api/admin/lawyers/${userId}/verify`, { 
        verified: currentStatus === 1 ? 0 : 1 
      });
      fetchLawyers(); 
    } catch  {
      alert("فشل تحديث حالة الاعتماد، الباك إند زرجن.");
    }
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lawyer.license_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'verified' ? lawyer.verified === 1 : lawyer.verified === 0);
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title={t('admin.sidebar.manageLawyers')} description="إدارة ملفات المحامين، مراجعة تراخيص المزاولة، واعتماد الحسابات.">
      <div className="space-y-6 mt-6">
        
        {/* البحث والفلتر */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input type="text" placeholder="ابحث باسم المحامي أو رقم الترخيص..." className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="px-4 py-2 bg-surface border rounded-lg text-sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">كل المحامين</option>
            <option value="verified">معتمد فقط</option>
            <option value="unverified">قيد الانتظار</option>
          </select>
        </div>

        {/* عرض القائمة */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="shimmer h-64 rounded-2xl bg-surface" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLawyers.map((lawyer) => (
              <div key={lawyer.user_id} className="card bg-white border hover:shadow-lg transition-all rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-page flex items-center justify-center border overflow-hidden">
                      {lawyer.image_url ? <img src={lawyer.image_url} alt="img" className="w-full h-full object-cover" /> : <Briefcase size={24} className="text-muted" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary text-lg flex items-center gap-2">
                        {lawyer.name}
                        {lawyer.verified === 1 && <ShieldCheck size={18} className="text-success" />}
                      </h3>
                      <p className="text-xs text-muted font-bold uppercase tracking-wider">رقم الترخيص: {lawyer.license_number || 'مفيش'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-warning font-bold"><Star size={16} fill="currentColor" /> {lawyer.rating_avg || '0.00'}</div>
                    <span className="text-[10px] text-muted">التقييم العام</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-dashed pt-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted font-black uppercase">سنوات الخبرة</p>
                    <p className="text-sm font-bold flex items-center gap-2"><Award size={14} className="text-accent" /> {lawyer.years_experience} عام</p>
                  </div>
                  <div className="space-y-1 text-left" dir="ltr">
                    <p className="text-[10px] text-muted font-black uppercase text-right">التواصل</p>
                    <p className="text-xs text-muted truncate">{lawyer.email}</p>
                  </div>
                </div>

                <div className="mb-6">
                   <p className="text-[10px] text-muted font-black uppercase mb-2">التخصصات القانونية</p>
                   <div className="flex flex-wrap gap-2">
                      {lawyer.specializations?.split(',').map((spec, index) => (
                        <span key={index} className="px-2 py-1 bg-page text-[10px] rounded font-bold border">{spec.trim()}</span>
                      ))}
                   </div>
                </div>

                <div className="pt-4 border-t flex justify-between items-center">
                  {/* 🛡️ الزرار مبيظهرش شغال غير لو معاه الصلاحية (canVerify) */}
                  {canVerify ? (
                    <button 
                      onClick={() => toggleVerification(lawyer.user_id, lawyer.verified)}
                      className={`btn flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors ${lawyer.verified === 1 ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                    >
                      {lawyer.verified === 1 ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                      {lawyer.verified === 1 ? "إلغاء الاعتماد" : "اعتماد المحامي"}
                    </button>
                  ) : (
                    <div className="text-xs text-gray-400 font-bold bg-gray-50 p-2 rounded-xl flex items-center gap-1 border">
                      <Lock size={14} /> للعرض فقط
                    </div>
                  )}
                  <span className="text-[10px] text-muted" dir="ltr">
                    Joined: {new Date(lawyer.created_at).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageLawyersPage;
