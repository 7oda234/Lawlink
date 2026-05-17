import React, { useEffect, useMemo, useState } from 'react';
import { Cpu, Clock, Search, ArrowUpRight, User, Zap } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import dataService from '../../services/DataService';
import { useLanguage } from '../../context/LanguageContextObject';

const AdminAiUsagePage = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await dataService.admin.getAIUsageLogs();
        // backend contract: { success: true, data: [] }
        const envelope = response?.data;
        const list = Array.isArray(envelope?.data)
          ? envelope.data
          : Array.isArray(envelope)
            ? envelope
            : [];
        setLogs(list);

      } catch (err) {
        console.error('Failed to load AI usage logs:', err);
        setError('تعذّر جلب سجلات استخدام الذكاء الاصطناعي.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return [item.action, item.tool, item.user_name].some((value) =>
        String(value || '').toLowerCase().includes(query)
      );
    });
  }, [logs, searchQuery]);

  const summary = useMemo(() => ({
    total: logs.length,
    research: logs.filter((item) => item.tool === 'Research').length,
    drafting: logs.filter((item) => item.tool === 'Document Drafting').length,
    predict: logs.filter((item) => item.tool === 'Case Outcome Predictor').length,
    chat: logs.filter((item) => item.tool === 'Legal Chatbot').length,
  }), [logs]);

  return (
    <AdminLayout
      title={t('admin.sidebar.aiUsage') || 'AI Usage'}
      description="عرض كامل لاستخدامات أدوات الذكاء الاصطناعي وسجل التفاعلات داخل لوحة الإدارة."
    >
      <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4 text-yellow-300">
              <Cpu size={20} />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Total AI calls</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.total}</p>
            <p className="mt-3 text-sm text-gray-400">Total AI interactions recorded.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4 text-cyan-300">
              <Zap size={20} />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Drafting</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.drafting}</p>
            <p className="mt-3 text-sm text-gray-400">Document drafting requests.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4 text-fuchsia-300">
              <Clock size={20} />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Predict</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.predict}</p>
            <p className="mt-3 text-sm text-gray-400">Outcome prediction requests.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4 text-amber-300">
              <User size={20} />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Chat</span>
            </div>
            <p className="text-4xl font-black text-white">{summary.chat}</p>
            <p className="mt-3 text-sm text-gray-400">Chatbot conversations logged.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">AI Tool Activity</h2>
              <p className="mt-1 text-sm text-gray-400">Review every AI request, user, and tool type from the audit log.</p>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by user, tool, or action..."
                className="w-full rounded-2xl border border-white/10 bg-[#0F111A] px-12 py-3 text-sm text-white outline-none transition focus:border-yellow-400"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Loading AI usage logs...</div>
          ) : error ? (
            <div className="py-16 text-center text-red-400">{error}</div>
          ) : filteredLogs.length === 0 ? (
            <div className="py-16 text-center text-gray-400">No AI usage events match your search.</div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((item) => (
                <article key={item.log_id} className="group rounded-3xl border border-white/10 bg-[#10131D]/80 p-5 transition hover:border-white/20 hover:bg-white/5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-white shadow-lg shadow-black/20">
                        <Cpu size={22} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white">{item.tool || 'AI Tool'}</p>
                        <p className="mt-1 text-sm text-gray-400">{item.user_name ? `User: ${item.user_name}` : 'User: system / anonymous'}</p>
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <p className="text-xs uppercase tracking-[0.24em] text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase text-gray-300">
                        <ArrowUpRight size={14} />
                        {item.action}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminAiUsagePage;
