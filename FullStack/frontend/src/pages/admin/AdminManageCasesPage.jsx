import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Scale, Search, Edit3, Trash2, 
  CheckCircle, Loader2, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminManageCasesPage = () => {
  const { t } = useLanguage();
  
  // التأكد من أن الحالة الابتدائية هي مصفوفة فارغة لتجنب خطأ .filter
  const [cases, setCases] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [alert, setAlert] = useState({ type: '', msg: '' });

  /**
   * جلب البيانات من جدول cases الموضح في BackUp9.sql
   */
  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/cases'); 
      // التأكد من استلام مصفوفة من الـ API]
      const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setCases(data);
    } catch  {
      setAlert({ type: 'error', msg: 'فشل في جلب القضايا من قاعدة البيانات.' });
      setCases([]); // العودة للمصفوفة الفارغة عند الخطأ لمنع الانهيار
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // منطق التصفية الآمن الذي يعالج خطأ image_bedbc9.png[cite: 15]
  const filteredCases = Array.isArray(cases) 
    ? cases.filter(c => {
        const matchesSearch = c.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
    : [];

  const updateStatus = async (id, nextStatus) => {
    try {
      await axios.patch(`/api/cases/${id}`, { status: nextStatus });
      setAlert({ type: 'success', msg: 'تم تحديث الحالة بنجاح.' });
      fetchCases();
    } catch  {
      setAlert({ type: 'error', msg: 'فشل تحديث الحالة.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه القضية؟")) return;
    try {
      await axios.delete(`/api/cases/${id}`);
      setAlert({ type: 'success', msg: 'تم نقل القضية للأرشيف.' });
      fetchCases();
    } catch  {
      setAlert({ type: 'error', msg: 'فشل حذف القضية.' });
    }
  };

  return (
    <AdminLayout title={t('admin.sidebar.manageCases')}>
      <div className="space-y-6 mt-4">
        
        {/* أدوات البحث والتصفية */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl border border-default shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث عن قضية..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 bg-surface border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">جميع الحالات</option>
            <option value="Pending">قيد الانتظار</option>
            <option value="Ongoing">جارية</option>
            <option value="Closed">مغلقة</option>
          </select>
        </div>

        {/* تنبيهات العمليات */}
        {alert.msg && (
          <div className={`p-3 rounded-lg flex items-center gap-2 border ${
            alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <AlertCircle size={18} />
            <span className="text-sm font-bold">{alert.msg}</span>
          </div>
        )}

        {/* شبكة عرض القضايا */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="shimmer h-56 rounded-2xl bg-surface" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCases.map((item) => (
              <div key={item.case_id} className="card bg-white border border-default hover:shadow-md rounded-2xl p-6 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-page rounded-lg text-secondary"><Scale size={20} /></div>
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                    item.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 
                    item.status === 'Closed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}[cite: 11]
                  </span>
                </div>

                <h3 className="font-bold text-secondary text-lg mb-2 truncate">{item.title}</h3>
                <p className="text-muted text-sm line-clamp-2 mb-4 h-10">{item.description}</p>
                
                <div className="pt-4 border-t border-dashed space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">التصنيف:</span>
                    <span className="font-bold">{item.category}</span>[cite: 11]
                  </div>
                  <div className="flex justify-between text-muted text-[10px]">
                    <span>تاريخ الرفع:</span>
                    <span dir="ltr">{new Date(item.created_at).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                  <button onClick={() => updateStatus(item.case_id, 'Ongoing')} className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                    <CheckCircle size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.case_id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500">
                    <Trash2 size={18} />
                  </button>
                  <Link to={`/admin/cases/${item.case_id}/edit`} className="p-2 hover:bg-page rounded-lg text-accent">
                    <Edit3 size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminManageCasesPage;
