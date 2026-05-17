import React, { useEffect, useMemo, useCallback, useState } from 'react';
import {
  Search,
  RefreshCw,
  History,
  Terminal,
  User,
  Clock,
  AlertCircle,
  Filter,
  Loader2,
  Copy,
  Eye,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useLanguage } from '../../context/LanguageContextObject';
import dataService from '../../services/DataService';


const formatDateTime = (value) => {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleString('ar-EG', {
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const normalizeText = (v) => (v === null || v === undefined ? '' : String(v)).toLowerCase();

const AdminSystemLogsPage = () => {
  const { t } = useLanguage();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [expanded, setExpanded] = useState({}); // { [log_id]: true }
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dataService.admin.getSystemLogs();
      const data = Array.isArray(response?.data) ? response.data : [];
      setLogs(data);
      setLastUpdatedAt(new Date());
      setPage(1);
      setExpanded({});
    } catch (err) {
      console.error('Error fetching logs:', err);
      setLogs([]);
      setLastUpdatedAt(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = useMemo(() => {
    const q = normalizeText(searchTerm);
    const from = fromDate ? new Date(fromDate + 'T00:00:00') : null;
    const to = toDate ? new Date(toDate + 'T23:59:59') : null;

    return logs.filter((log) => {
      const createdAt = log?.created_at ? new Date(log.created_at) : null;
      if (from && createdAt && createdAt < from) return false;
      if (to && createdAt && createdAt > to) return false;

      const actionText = normalizeText(log.action_details || log.action || '');
      const userText = normalizeText(log.user_name || '');
      const typeText = normalizeText(log.action_type || '');
      const ipText = normalizeText(log.ip_address || log.ip || '');
      const targetText = normalizeText(log.target_user_id || log.target_id || '');
      const logIdText = normalizeText(log.log_id || '');

      const matchesSearch =
        !q ||
        actionText.includes(q) ||
        userText.includes(q) ||
        typeText.includes(q) ||
        ipText.includes(q) ||
        targetText.includes(q) ||
        logIdText.includes(q);

      const matchesType = typeFilter === 'All' || log.action_type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [logs, searchTerm, typeFilter, fromDate, toDate]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredLogs.length / pageSize)),
    [filteredLogs.length, pageSize]
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedLogs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, page, pageSize]);

  const typeBadgeClass = (type) => {
    if (type === 'DELETE') return 'text-red-400 border-red-500/30 bg-red-500/10';
    if (type === 'CREATE') return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (type === 'LOGIN') return 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10';
    return 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10';
  };

  const activeFiltersCount = useMemo(() => {
    let c = 0;
    if (searchTerm.trim()) c += 1;
    if (typeFilter !== 'All') c += 1;
    if (fromDate) c += 1;
    if (toDate) c += 1;
    return c;
  }, [searchTerm, typeFilter, fromDate, toDate]);

  return (
    <AdminLayout
      title={t('admin.sidebar.logs') || 'سجلات النظام'}
      description="مراقبة كافة التحركات والعمليات التي تمت على المنصة لضمان الأمان والشفافية."
    >
      <div className="space-y-6 mt-6">
        {/* Summary */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between bg-white p-4 rounded-xl border border-default shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-surface border border-default">
              <Terminal size={18} />
            </div>
            <div>
              <div className="font-bold">System Audit Trail</div>
              <div className="text-sm text-muted">
                {filteredLogs.length} سجل / {logs.length} إجمالي
                {lastUpdatedAt ? ` • آخر تحديث: ${formatDateTime(lastUpdatedAt)}` : ''}
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Filter size={16} />
              <span>Active filters: {activeFiltersCount}</span>
            </div>
          </div>
        </div>

        {/* Search / Filters */}
        <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-xl border border-default shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن عملية أو مستخدم أو IP..."
              className="w-full pr-10 pl-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <select
              className="px-4 py-2 bg-surface border border-default rounded-lg text-sm"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">كل العمليات</option>
              <option value="CREATE">إضافة (Create)</option>
              <option value="UPDATE">تعديل (Update)</option>
              <option value="DELETE">حذف (Delete)</option>
              <option value="LOGIN">دخول (Login)</option>
            </select>

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted" />
              <input
                type="date"
                className="px-3 py-2 bg-surface border border-default rounded-lg text-sm"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setPage(1);
                }}
              />
              <span className="text-muted">إلى</span>
              <input
                type="date"
                className="px-3 py-2 bg-surface border border-default rounded-lg text-sm"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('All');
                setFromDate('');
                setToDate('');
                setPage(1);
              }}
              className="btn btn-ghost border"
              type="button"
            >
              مسح الفلاتر
            </button>

            <button
              onClick={fetchLogs}
              className="btn btn-ghost border flex items-center gap-2"
              type="button"
              disabled={loading}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
              تحديث
            </button>
          </div>
        </div>

        {/* Logs */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="shimmer h-12 rounded-lg bg-surface" />
            ))}
          </div>
        ) : (
          <div className="bg-black text-green-400 rounded-2xl p-6 shadow-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
              <Terminal size={16} />
              <span className="uppercase tracking-widest text-gray-500 font-bold">System Audit Trail</span>
            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 gap-2 text-xs text-gray-500 px-2 py-2">
              <div className="col-span-2">Time</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-2">Actor</div>
              <div className="col-span-5">Summary</div>
              <div className="col-span-2 text-right">Details</div>
            </div>

            <div className="space-y-2 max-h-[560px] overflow-y-auto custom-scrollbar">
              {pagedLogs.map((log) => {
                const logId = log?.log_id ?? `log-${log?.created_at ?? Math.random()}`;
                const isExpanded = !!expanded[logId];
                const createdAtText = formatDateTime(log?.created_at);
                const type = log?.action_type;
                const summary = log?.action || log?.action_details || '(No details)';

                return (
                  <div key={logId} className="border border-gray-800/70 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 hover:bg-gray-900/40 transition-colors">
                      <div className="md:col-span-2 text-gray-500" dir="ltr">
                        <div className="text-xs">{createdAtText}</div>
                        {log?.log_id ? <div className="text-[11px] opacity-60">ID: {log?.log_id}</div> : null}
                      </div>

                      <div className="md:col-span-1">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-lg text-[11px] border ${typeBadgeClass(type)}`}
                        >
                          {type || '—'}
                        </span>
                      </div>

                      <div className="md:col-span-2 text-white flex items-center gap-2">
                        <User size={14} className="text-gray-600" />
                        <span className="text-sm">{log?.user_name || 'System'}</span>
                      </div>

                      <div className="md:col-span-5 text-gray-300">
                        <div className="text-sm line-clamp-2">{summary}</div>
                        {log?.ip_address || log?.ip ? (
                          <div className="text-[11px] opacity-70 mt-1">IP: {log.ip_address || log.ip}</div>
                        ) : null}
                      </div>

                      <div className="md:col-span-2 md:text-right flex md:justify-end items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpanded((prev) => ({ ...prev, [logId]: !isExpanded }))}
                          className="btn btn-ghost border flex items-center gap-2 text-xs text-gray-300"
                        >
                          <Eye size={14} /> {isExpanded ? 'Hide' : 'View'}
                        </button>
                        <div className="text-gray-600">
                          <AlertCircle size={14} className="opacity-60" />
                        </div>
                      </div>
                    </div>

                    {isExpanded ? (
                      <div className="bg-gray-950 border-t border-gray-800/70 p-3">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-3">
                          <div className="flex-1">
                            <div className="text-xs text-gray-400 mb-2">Raw details</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {Object.entries(log)
                                .filter(([k]) => k !== 'action_details')
                                .slice(0, 20)
                                .map(([k, v]) => (
                                  <div key={k} className="rounded-lg border border-gray-800/70 bg-gray-950 p-2">
                                    <div className="text-[11px] text-gray-500">{k}</div>
                                    <div className="text-xs text-gray-200 break-words">
                                      {typeof v === 'object' ? JSON.stringify(v) : String(v ?? '-')}
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {log?.action_details ? (
                              <div className="mt-3">
                                <div className="text-xs text-gray-400 mb-2">action_details</div>
                                <pre className="text-xs text-gray-200 whitespace-pre-wrap break-words rounded-lg border border-gray-800/70 bg-black p-3">
                                  {String(log.action_details)}
                                </pre>
                              </div>
                            ) : null}
                          </div>

                          <div className="lg:w-[360px]">
                            <div className="text-xs text-gray-400 mb-2">Actions</div>
                            <div className="space-y-2">
                              <button
                                type="button"
                                className="btn btn-ghost border w-full flex items-center justify-center gap-2 text-xs text-gray-200"
                                onClick={async () => {
                                  const text = JSON.stringify(log, null, 2);
                                  try {
                                    await navigator.clipboard.writeText(text);
                                  } catch (e) {
                                    console.warn('Clipboard copy failed', e);
                                  }
                                }}
                              >
                                <Copy size={14} /> Copy raw JSON
                              </button>

                              {log?.log_id ? (
                                <button
                                  type="button"
                                  className="btn btn-ghost border w-full flex items-center justify-center gap-2 text-xs text-gray-200"
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(String(log.log_id));
                                    } catch (e) {
                                      console.warn('Clipboard copy failed', e);
                                    }
                                  }}
                                >
                                  <Copy size={14} /> Copy log id
                                </button>
                              ) : null}

                              <div className="text-[11px] text-gray-600 leading-relaxed border border-gray-800/70 rounded-lg p-2 bg-gray-950">
                                عرض التفاصيل بالكامل من سجل الـ activity_log. عند وجود حقول إضافية (مثل IP أو target_user_id) ستظهر هنا تلقائيًا.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {filteredLogs.length === 0 && (
                <div className="text-center py-10 text-gray-600">
                  <History size={32} className="mx-auto mb-2 opacity-20" />
                  <p>لا توجد سجلات تطابق معايير البحث الحالية.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing{' '}
                {filteredLogs.length === 0 ? 0 : (page - 1) * pageSize + 1} -{' '}
                {Math.min(page * pageSize, filteredLogs.length)} of {filteredLogs.length}
              </div>

              <div className="flex items-center gap-2">
                <select
                  className="px-3 py-2 bg-gray-950 border border-gray-800/70 rounded-lg text-sm text-gray-200"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={10}>10 / page</option>
                  <option value={25}>25 / page</option>
                  <option value={50}>50 / page</option>
                </select>

                <button
                  type="button"
                  className="btn btn-ghost border text-gray-200"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Prev
                </button>

                <div className="text-sm text-gray-500" dir="ltr">
                  Page {page} / {totalPages}
                </div>

                <button
                  type="button"
                  className="btn btn-ghost border text-gray-200"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSystemLogsPage;

