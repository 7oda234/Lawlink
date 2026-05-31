import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity, Search, Eye, Clock, AlertTriangle, 
  MessageSquare, User, Scale, RefreshCw, Lock
} from 'lucide-react'; //[cite: 13]
import AdminLayout from '../../components/AdminLayout'; //[cite: 13]
import { useLanguage } from '../../context/LanguageContextObject'; //[cite: 13]
import dataService from '../../services/DataService'; //[cite: 13]
import { useAuth } from '../../context/useAuth'; // 🛡️ Import authentication hook
import { io } from 'socket.io-client'; //[cite: 13]

const AdminCaseMonitoringPage = () => {
  const { t } = useLanguage(); //[cite: 13]
  
  // 🛡️ Track current user authority layer
  const { authUser, isLoading: authLoading } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || localStorage.getItem('authorityLevel') || 0, 10);

  const [monitoredCases, setMonitoredCases] = useState([]); //[cite: 13]
  const [loading, setLoading] = useState(true); //[cite: 13]

  const [searchTerm, setSearchTerm] = useState(''); //[cite: 13]
  const [statusFilter, setStatusFilter] = useState('All'); //[cite: 13]
  const [urgencyFilter, setUrgencyFilter] = useState('All'); //[cite: 13]
  const [categoryFilter, setCategoryFilter] = useState('All'); //[cite: 13]
  const [sortBy, setSortBy] = useState('created_at_desc'); //[cite: 13]

  const debounceRef = useRef(null); //[cite: 13]
  const lastFetchIdRef = useRef(0); //[cite: 13]

  const fetchMonitoringData = async (termOverride) => {
    if (myLevel < 1) return; // Halt query if unauthorized
    const fetchId = ++lastFetchIdRef.current; //[cite: 13]
    setLoading(true); //[cite: 13]
    try {
      const term = (termOverride ?? searchTerm).trim(); //[cite: 13]
      const params = {
        search: term || undefined, //[cite: 13]
        status: statusFilter === 'All' ? undefined : statusFilter, //[cite: 13]
        priority: urgencyFilter === 'All' ? undefined : urgencyFilter, //[cite: 13]
        category: categoryFilter === 'All' ? undefined : categoryFilter, //[cite: 13]
        sort: sortBy || undefined, //[cite: 13]
      };
      const response = await dataService.admin.getCasesMonitor(params); //[cite: 13]
      if (fetchId !== lastFetchIdRef.current) return; //[cite: 13]
      const data = Array.isArray(response.data) ? response.data : []; //[cite: 13]
      setMonitoredCases(data); //[cite: 13]
    } catch (err) {
      console.error('Monitoring Error:', err); //[cite: 13]
      if (fetchId !== lastFetchIdRef.current) return; //[cite: 13]
      setMonitoredCases([]); //[cite: 13]
    } finally {
      if (fetchId === lastFetchIdRef.current) setLoading(false); //[cite: 13]
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current); //[cite: 13]
    if (!authLoading) fetchMonitoringData(searchTerm);
  }, [statusFilter, urgencyFilter, categoryFilter, sortBy, authLoading]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current); //[cite: 13]
    debounceRef.current = setTimeout(() => {
      if (!authLoading) fetchMonitoringData(searchTerm);
    }, 300); //[cite: 13]
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current); //[cite: 13]
    };
  }, [searchTerm, authLoading]);

  // WebSocket live updates
  useEffect(() => {
    if (myLevel < 1) return;
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; //[cite: 13]
    const socket = io(socketUrl, { reconnection: true, reconnectionDelay: 1000 }); //[cite: 13]

    socket.on('connect', () => {
      socket.emit('admin:monitor', { section: 'cases' }); //[cite: 13]
    });

    const refetch = () => fetchMonitoringData(searchTerm); //[cite: 13]
    socket.on('caseUpdated', refetch); //[cite: 13]
    socket.on('casesUpdated', refetch); //[cite: 13]
    socket.on('case:updated', refetch); //[cite: 13]

    return () => {
      socket.off('caseUpdated', refetch); //[cite: 13]
      socket.off('casesUpdated', refetch); //[cite: 13]
      socket.off('case:updated', refetch); //[cite: 13]
      socket.disconnect(); //[cite: 13]
    };
  }, [myLevel]);

  // 🛡 *SECURITY GUARD: LEVEL 1 ACCESS GUARD*
  if (!authLoading && myLevel < 1) {
    return (
      <AdminLayout title="Access Denied" description="حسابك غير مسجل في النظام الإداري.">
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-red-300 max-w-7xl mx-auto mt-6 p-8">
          <Lock size={48} className="mx-auto text-red-500 mb-4 opacity-70 animate-bounce" />
          <p className="text-gray-700 font-bold text-lg">تحذير أمني: ليس لديك حق الوصول لمراقبة قضايا السِستم.</p>
        </div>
      </AdminLayout>
    );
  }

  const uniqueCategories = useMemo(() => {
    const set = new Set();
    for (const c of monitoredCases) {
      if (c.category) set.add(c.category); //[cite: 13]
    }
    return Array.from(set); //[cite: 13]
  }, [monitoredCases]);

  return (
    <AdminLayout 
      title={t('admin.sidebar.monitorCases') || "مراقبة القضايا"} //[cite: 13]
      description="متابعة حية لتطورات القضايا النشطة، التفاعل بين الأطراف، والالتزام بالمواعيد." //[cite: 13]
    >
      <div className="space-y-6 mt-6">
        <div className="flex flex-col xl:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm items-stretch">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث برقم القضية، العنوان، اسم المحامي أو العميل..."
              className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} //[cite: 13]
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} //[cite: 13]
            >
              <option value="All">جميع الحالات</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)} //[cite: 13]
            >
              <option value="All">كل درجات الأولوية</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>

            <button
              onClick={() => fetchMonitoringData(searchTerm)}
              className="border px-4 py-2 bg-white rounded-lg flex items-center gap-2 whitespace-nowrap hover:bg-gray-50 transition"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> تحديث البيانات
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2].map(i => <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {monitoredCases.map((caseItem) => (
              <div key={caseItem.case_id} className="bg-white border p-6 rounded-2xl shadow-sm hover:border-yellow-500/50 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-yellow-50 text-yellow-600 rounded-lg"><Scale size={18} /></span>
                      <h3 className="font-bold text-gray-800 truncate">{caseItem.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-bold">
                      <span className="flex items-center gap-1"><Clock size={14} /> منذ {caseItem.days_active} يوم</span>
                      <span className={`px-2 py-0.5 rounded ${caseItem.urgency === 'High' ? 'bg-red-50 text-red-600' : 'bg-gray-100'}`}>
                        {caseItem.urgency || 'Normal'}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-black uppercase mb-1">المحامي المسئول</p>
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-700">
                        <User size={14} /> {caseItem.lawyer_name || 'غير معين'}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-200 hidden lg:block"></div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-black uppercase mb-1">العميل</p>
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-700">
                        <User size={14} /> {caseItem.client_name}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex items-center justify-around">
                    <div className="text-center" title="عدد الرسائل المتبادلة">
                      <MessageSquare size={20} className="mx-auto mb-1 text-gray-400" />
                      <span className="text-xs font-black">{caseItem.msg_count || 0}</span>
                    </div>
                    <div className="text-center" title="المستندات المرفوعة">
                      <Activity size={20} className="mx-auto mb-1 text-gray-400" />
                      <span className="text-xs font-black">{caseItem.docs_count || 0}</span>
                    </div>
                    {caseItem.missed_deadline && (
                      <div className="text-center text-red-500 animate-pulse">
                        <AlertTriangle size={20} className="mx-auto mb-1" />
                        <span className="text-[10px] font-bold">تجاوز موعد</span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-2 flex justify-end gap-2">
                    <button className="p-3 bg-gray-50 hover:bg-yellow-500 hover:text-white rounded-xl transition-all shadow-sm">
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && monitoredCases.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
            <Activity size={48} className="mx-auto text-gray-300 mb-4 opacity-40" />
            <p className="text-gray-400 font-medium">لا توجد قضايا نشطة قيد المراقبة حالياً.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCaseMonitoringPage;
