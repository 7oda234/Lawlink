import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  Activity,
  Search,
  Eye,
  Clock,
  AlertTriangle,
  MessageSquare,
  User,
  Scale,
  RefreshCw,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';
import { io } from 'socket.io-client';


const AdminCaseMonitoringPage = () => {
  const { t } = useLanguage();
  const [monitoredCases, setMonitoredCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('created_at_desc');

  const debounceRef = useRef(null);
  const lastFetchIdRef = useRef(0);

  const buildQueryParams = (termOverride) => {
    const term = (termOverride ?? searchTerm).trim();
    return {
      search: term || undefined,
      status: statusFilter === 'All' ? undefined : statusFilter,
      priority: urgencyFilter === 'All' ? undefined : urgencyFilter,
      category: categoryFilter === 'All' ? undefined : categoryFilter,
      sort: sortBy || undefined,
    };
  };

  const fetchMonitoringData = async (termOverride) => {
    const fetchId = ++lastFetchIdRef.current;
    setLoading(true);
    try {
      const params = buildQueryParams(termOverride);
      const response = await dataService.admin.getCasesMonitor(params);
      if (fetchId !== lastFetchIdRef.current) return;
      const data = Array.isArray(response.data) ? response.data : [];
      setMonitoredCases(data);
    } catch (err) {
      console.error('Monitoring Error:', err);
      if (fetchId !== lastFetchIdRef.current) return;
      setMonitoredCases([]);
    } finally {
      if (fetchId === lastFetchIdRef.current) setLoading(false);
    }
  };

  // initial fetch + when non-search filters change
  useEffect(() => {
    // Cancel pending debounce when dropdowns change
    if (debounceRef.current) clearTimeout(debounceRef.current);
    fetchMonitoringData(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, urgencyFilter, categoryFilter, sortBy]);

  // debounced search (300ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchMonitoringData(searchTerm);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // derived categories from results
  const uniqueCategories = useMemo(() => {
    const set = new Set();
    for (const c of monitoredCases) {
      if (c.category) set.add(c.category);
    }
    return Array.from(set);
  }, [monitoredCases]);

  const filteredCases = monitoredCases;


  // WebSocket live updates (refetch on case changes)
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const socket = io(socketUrl, { reconnection: true, reconnectionDelay: 1000 });

    socket.on('connect', () => {
      // best-effort: join monitoring room if backend supports it
      socket.emit('admin:monitor', { section: 'cases' });
    });

    const refetch = () => fetchMonitoringData(searchTerm);
    socket.on('caseUpdated', refetch);
    socket.on('casesUpdated', refetch);
    socket.on('case:updated', refetch);

    return () => {
      socket.off('caseUpdated', refetch);
      socket.off('casesUpdated', refetch);
      socket.off('case:updated', refetch);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <AdminLayout 
      title={t('admin.sidebar.monitorCases') || "مراقبة القضايا"} 
      description="متابعة حية لتطورات القضايا النشطة، التفاعل بين الأطراف، والالتزام بالمواعيد."
    >
      <div className="space-y-6 mt-6">
        
        {/* شريط الأدوات السريع */}
        <div className="flex flex-col xl:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm items-stretch">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث برقم القضية، العنوان، اسم المحامي أو العميل..."
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              className="px-4 py-2 bg-surface border border-default rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">جميع الحالات</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Closed">Closed</option>
              <option value="Awaiting_Payment">Awaiting_Payment</option>
              <option value="Awaiting_Client_Approval">Awaiting_Client_Approval</option>
            </select>

            <select
              className="px-4 py-2 bg-surface border border-default rounded-lg"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
            >
              <option value="All">كل درجات الأولوية</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>

            <select
              className="px-4 py-2 bg-surface border border-default rounded-lg"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">كل التصنيفات</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 bg-surface border border-default rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="created_at_desc">الأحدث أولاً</option>
              <option value="created_at_asc">الأقدم أولاً</option>
              <option value="days_active_desc">الأكثر نشاطاً</option>
              <option value="days_active_asc">الأقل نشاطاً</option>
              <option value="missed_deadline_desc">الأكثر تجاوزاً</option>
            </select>

            <button
              onClick={() => fetchMonitoringData(searchTerm)}
              className="btn btn-ghost border flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> تحديث البيانات
            </button>
          </div>
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
