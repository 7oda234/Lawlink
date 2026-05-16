import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Activity, Search, Eye, Clock, AlertTriangle, 
  MessageSquare, User, Scale, Loader2, RefreshCw 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
// استيراد الـ dataService المركزي لحل مشكلة توجيه البورت 5173 إلى 5000 تلقائياً واختفاء الـ 500
import dataService from '../../services/DataService';

const AdminCaseMonitoringPage = () => {
  const { t } = useLanguage();
  const [monitoredCases, setMonitoredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // const [priorityFilter, setPriorityFilter] = useState('All');

  // جلب بيانات المراقبة بربط جداول cases و users و lawyer
  const fetchMonitoringData = useCallback(async () => {
    setLoading(true);
    try {
      // التعديل هنا: استبدال axios المباشر بـ dataService المركزي لحل مشاكل الاتصال والأمان
      const response = await dataService.admin.getCasesMonitoring();
      const data = Array.isArray(response.data) ? response.data : [];
      setMonitoredCases(data);
    } catch (err) {
      console.error("Monitoring Error:", err);
    } 
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitoringData();
  }, [fetchMonitoringData]);

  // منطق التصفية بناءً على العنوان أو اسم المحامي
  const filteredCases = monitoredCases.filter(c => {
    const matchesSearch = c.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.lawyer_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AdminLayout 
      title={t('admin.sidebar.monitorCases') || "مراقبة القضايا"} 
      description="متابعة حية لتطورات القضايا النشطة، التفاعل بين الأطراف، والالتزام بالمواعيد."
    >
      <div className="space-y-6 mt-6">
        
        {/* شريط الأدوات السريع */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث برقم القضية، العنوان، أو اسم المحامي..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={fetchMonitoringData} className="btn btn-ghost border flex items-center gap-2">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> تحديث البيانات
          </button>
        </div>

        {/* عرض حالة المراقبة */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="shimmer h-32 rounded-2xl bg-surface" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCases.map((caseItem) => (
              <div key={caseItem.case_id} className="card bg-white border border-default p-6 rounded-2xl shadow-sm hover:border-accent/50 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* معلومات القضية الأساسية */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-accent/10 text-accent rounded-lg"><Scale size={18} /></span>
                      <h3 className="font-bold text-secondary truncate">{caseItem.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted font-bold">
                      <span className="flex items-center gap-1"><Clock size={14} /> منذ {caseItem.days_active} يوم</span>
                      <span className={`px-2 py-0.5 rounded ${caseItem.urgency === 'High' ? 'bg-red-50 text-red-600' : 'bg-page'}`}>
                        {caseItem.urgency || 'Normal'}
                      </span>
                    </div>
                  </div>

                  {/* الأطراف المشاركة */}
                  <div className="lg:col-span-3 flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] text-muted font-black uppercase mb-1">المحامي المسئول</p>
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-secondary">
                        <User size={14} /> {caseItem.lawyer_name || 'غير معين'}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-default hidden lg:block"></div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted font-black uppercase mb-1">العميل</p>
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-secondary">
                        <User size={14} /> {caseItem.client_name}
                      </div>
                    </div>
                  </div>

                  {/* مؤشرات التفاعل */}
                  <div className="lg:col-span-3 flex items-center justify-around">
                    <div className="text-center group cursor-help" title="عدد الرسائل المتبادلة">
                      <MessageSquare size={20} className="mx-auto mb-1 text-muted group-hover:text-accent" />
                      <span className="text-xs font-black">{caseItem.msg_count || 0}</span>
                    </div>
                    <div className="text-center group cursor-help" title="المستندات المرفوعة">
                      <Activity size={20} className="mx-auto mb-1 text-muted group-hover:text-success" />
                      <span className="text-xs font-black">{caseItem.docs_count || 0}</span>
                    </div>
                    {caseItem.missed_deadline && (
                      <div className="text-center text-red-500 animate-pulse">
                        <AlertTriangle size={20} className="mx-auto mb-1" />
                        <span className="text-[10px] font-bold">تجاوز موعد</span>
                      </div>
                    )}
                  </div>

                  {/* إجراءات سريعة */}
                  <div className="lg:col-span-2 flex justify-end gap-2">
                    <button className="p-3 bg-page hover:bg-accent hover:text-white rounded-xl transition-all shadow-sm">
                      <Eye size={20} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* حالة عدم وجود بيانات */}
        {!loading && filteredCases.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-default">
            <Activity size={48} className="mx-auto text-muted mb-4 opacity-10" />
            <p className="text-muted font-medium">لا توجد قضايا نشطة قيد المراقبة حالياً.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCaseMonitoringPage;