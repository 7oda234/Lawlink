import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  UserCheck, Search, Mail, Phone, Briefcase, 
  Award, ShieldCheck, ShieldAlert, Loader2, Filter, Star 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminManageLawyersPage = () => {
  const { t } = useLanguage();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, verified, unverified

  // جلب بيانات المحامين بربط جداول users و lawyer و specializations
  const fetchLawyers = useCallback(async () => {
    setLoading(true);
    try {
      // استعلام يجلب المحامين مع بيانات الخبرة والترخيص والتقييم
      const response = await axios.get('/api/admin/lawyers'); 
      setLawyers(Array.isArray(response.data) ? response.data : []);
    } catch  {
      console.error('فشل تحميل قائمة المحامين');
      setLawyers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  // تحديث حالة الاعتماد (Verified) في جدول lawyer
  const toggleVerification = async (userId, currentStatus) => {
    try {
      await axios.patch(`/api/admin/lawyers/${userId}/verify`, { 
        verified: currentStatus === 1 ? 0 : 1 
      });
      fetchLawyers(); // تحديث القائمة
    } catch  {
      alert("فشل تحديث حالة الاعتماد");
    }
  };

  // تصفية المحامين بناءً على البحث والحالة
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lawyer.license_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'verified' ? lawyer.verified === 1 : lawyer.verified === 0);
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout 
      title={t('admin.sidebar.manageLawyers')} 
      description="إدارة ملفات المحامين، مراجعة تراخيص المزاولة، واعتماد الحسابات الجديدة."
    >
      <div className="space-y-6 mt-6">
        
        {/* أدوات البحث والتصفية */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث باسم المحامي أو رقم الترخيص..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 bg-surface border border-default rounded-lg text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
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
              <div key={lawyer.user_id} className="card bg-white border border-default hover:shadow-lg transition-all rounded-2xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-page flex items-center justify-center border-2 border-default overflow-hidden">
                      {lawyer.image_url ? (
                        <img src={lawyer.image_url} alt={lawyer.name} className="w-full h-full object-cover" />
                      ) : (
                        <Briefcase size={24} className="text-muted" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary text-lg flex items-center gap-2">
                        {lawyer.name}
                        {lawyer.verified === 1 && <ShieldCheck size={18} className="text-success" />}
                      </h3>
                      <p className="text-xs text-muted font-bold uppercase tracking-wider">رقم الترخيص: {lawyer.license_number || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-warning font-bold">
                      <Star size={16} fill="currentColor" /> {lawyer.rating_avg || '0.00'}
                    </div>
                    <span className="text-[10px] text-muted">التقييم العام</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-dashed pt-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted font-black uppercase">سنوات الخبرة</p>
                    <p className="text-sm font-bold text-secondary flex items-center gap-2">
                      <Award size={14} className="text-accent" /> {lawyer.years_experience} عام
                    </p>
                  </div>
                  <div className="space-y-1 text-left" dir="ltr">
                    <p className="text-[10px] text-muted font-black uppercase text-right">التواصل</p>
                    <p className="text-xs text-muted truncate">{lawyer.email}</p>
                  </div>
                </div>

                {/* عرض التخصصات من جدول lawyer_specializations */}
                <div className="mb-6">
                   <p className="text-[10px] text-muted font-black uppercase mb-2">التخصصات القانونية[cite: 1]</p>
                   <div className="flex flex-wrap gap-2">
                      {lawyer.specializations?.split(',').map((spec, index) => (
                        <span key={index} className="px-2 py-1 bg-page text-secondary text-[10px] rounded font-bold border">
                          {spec.trim()}
                        </span>
                      ))}
                   </div>
                </div>

                <div className="pt-4 border-t flex justify-between items-center">
                  <button 
                    onClick={() => toggleVerification(lawyer.user_id, lawyer.verified)}
                    className={`btn flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors ${
                      lawyer.verified === 1 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {lawyer.verified === 1 ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                    {lawyer.verified === 1 ? "إلغاء الاعتماد" : "اعتماد المحامي"}
                  </button>
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
