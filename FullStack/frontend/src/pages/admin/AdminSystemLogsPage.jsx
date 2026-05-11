import React, { useState, useEffect, useCallback } from 'react';
import { 
  History, Search, ShieldAlert, Clock, User, 
  Terminal, Filter, RefreshCw, AlertCircle, Loader2 
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';

const AdminSystemLogsPage = () => {
  const { t } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  // جلب سجلات النشاط من جدول activity_log
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dataService.admin.getSystemLogs();
      const data = Array.isArray(response.data) ? response.data : [];
      setLogs(data);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // تصفية السجلات بناءً على نوع العملية أو اسم المستخدم
  const filteredLogs = logs.filter(log => {
    const logText = (log.action_details || log.action || '').toLowerCase();
    const matchesSearch = logText.includes(searchTerm.toLowerCase()) || 
                          (log.user_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || log.action_type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <AdminLayout 
      title={t('admin.sidebar.logs') || "سجلات النظام"} 
      description="مراقبة كافة التحركات والعمليات التي تمت على المنصة لضمان الأمان والشفافية."
    >
      <div className="space-y-6 mt-6">
        
        {/* أدوات البحث والتصفية */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث عن عملية أو مستخدم معين..." 
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              className="px-4 py-2 bg-surface border border-default rounded-lg text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">كل العمليات</option>
              <option value="CREATE">إضافة (Create)</option>
              <option value="UPDATE">تعديل (Update)</option>
              <option value="DELETE">حذف (Delete)</option>
              <option value="LOGIN">دخول (Login)</option>
            </select>
            
            <button onClick={fetchLogs} className="btn btn-ghost border flex items-center gap-2">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> تحديث
            </button>
          </div>
        </div>

        {/* عرض السجلات في قائمة Terminal-style */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="shimmer h-12 rounded-lg bg-surface" />)}
          </div>
        ) : (
          <div className="bg-black text-green-400 font-mono text-xs rounded-2xl p-6 shadow-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
              <Terminal size={16} />
              <span className="uppercase tracking-widest text-gray-500 font-bold">System Audit Trail</span>
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
              {filteredLogs.map((log) => (
                <div key={log.log_id} className="grid grid-cols-1 md:grid-cols-12 gap-2 hover:bg-gray-900/50 p-2 rounded transition-colors group">
                  <span className="md:col-span-2 text-gray-500" dir="ltr">
                    [{new Date(log.created_at).toLocaleString('ar-EG', { hour12: true })}]
                  </span>
                  
                  <span className={`md:col-span-1 font-bold ${
                    log.action_type === 'DELETE' ? 'text-red-500' : 
                    log.action_type === 'CREATE' ? 'text-blue-400' : 'text-yellow-400'
                  }`}>
                    {log.action_type}
                  </span>
                  
                  <span className="md:col-span-2 text-white flex items-center gap-1">
                    <User size={12} className="text-gray-600" /> {log.user_name || 'System'}
                  </span>
                  
                  <span className="md:col-span-6 text-gray-300">
                    {log.action || log.action_details}
                  </span>
                  
                  <span className="md:col-span-1 text-right text-gray-600 group-hover:text-accent transition-colors">
                    <AlertCircle size={14} />
                  </span>
                </div>
              ))}
              
              {filteredLogs.length === 0 && (
                <div className="text-center py-10 text-gray-600">
                  <History size={32} className="mx-auto mb-2 opacity-20" />
                  <p>لا توجد سجلات تطابق معايير البحث الحالية.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSystemLogsPage;
