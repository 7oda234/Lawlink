import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import dataService from '../../services/DataService';
import { useLanguage } from '../../context/LanguageContextObject';
import { Loader2, Plus, Search, Lock } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

const formatMoney = (amount, currency = 'EGP') => {
  const n = Number(amount);
  if (Number.isNaN(n)) return `0 ${currency}`;
  return `${n.toFixed(2)} ${currency}`;
};

const StatusPill = ({ status }) => {
  const s = String(status || '').toLowerCase();
  const isPaid = s === 'paid' || s === 'completed' || s === 'success';
  const isPending = s === 'pending' || s === 'awaiting' || !s;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${
        isPaid
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : isPending
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            : 'bg-white/5 border-white/10 text-slate-200'
      }`}
    >
      {(status || 'N/A').toString().toUpperCase()}
    </span>
  );
};

const AdminInstallmentsPage = () => {
  const { t } = useLanguage();
  const { authUser } = useAuth();
  
  const myLevel = useMemo(() => {
    const levelMap = {
      'SuperAdmin': 5,
      'Level 4': 4,
      'Level 3': 3,
      'Level 2': 2,
      'Level 1': 1
    };
    const rawLevel = authUser?.authority_level || localStorage.getItem('authorityLevel');
    return levelMap[rawLevel] ?? parseInt(rawLevel || 1, 10);
  }, [authUser]);

  const canManageFinance = myLevel >= 4;

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [caseId, setCaseId] = useState('');
  const [installments, setInstallments] = useState([]);
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState({ totalAmount: '', months: '' });
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return installments;
    return installments.filter((x) => {
      const recordId = x.installment_id || x.id || '';
      return (
        String(recordId).toLowerCase().includes(q) ||
        String(x.amount).toLowerCase().includes(q) ||
        String(x.status).toLowerCase().includes(q) ||
        String(x.due_date || x.dueDate || x.date).toLowerCase().includes(q)
      );
    });
  }, [installments, query]);
const fetchCases = async () => {
    setLoading(true);
    setError('');
    try {
      // ✅ استخدمنا الدالة المعتمدة اللي بتنادي على /api/admin/cases
      const res = await dataService.admin.getCases();
      
      const rows = res?.data?.data || res?.data?.cases || res?.data || (Array.isArray(res) ? res : []);
      setCases(Array.isArray(rows) ? rows : []);
    } catch (e) {
      console.error("Failed to load cases telemetry for dropdown selection:", e);
      setError('تعذر جلب قضايا المنصة لتوليد خطة الأقساط حالياً.');
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstallments = async (selectedCaseId) => {
    if (!selectedCaseId) {
      setInstallments([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await dataService.finance.getInstallmentsByCase(selectedCaseId);
      const rows = res?.data?.installments ?? res?.data?.data ?? res?.data ?? [];
      setInstallments(Array.isArray(rows) ? rows : []);
    } catch (err) {
      console.error("Failed to load installments:", err);
      setError('فشلنا في تحميل بيانات الأقساط الخاصة بهذه القضية.');
      setInstallments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    if (caseId) fetchInstallments(caseId);
    else setInstallments([]);
  }, [caseId]);

  const createPlan = async () => {
    if (!canManageFinance) {
      setError("عفواً، ليس لديك صلاحية مستوى 4 لإنشاء خطط تقسيط.");
      return;
    }
    if (!caseId) return;

    const totalAmount = Number(plan.totalAmount);
    const months = Number(plan.months);
    if (!totalAmount || totalAmount <= 0 || !months || months <= 0) {
      setError('يرجى إدخال مبلغ وعدد شهور صحيح.');
      return;
    }

    setCreatingPlan(true);
    setError('');
    try {
      await dataService.finance.createInstallmentPlan(caseId, { totalAmount, months });
      await fetchInstallments(caseId); 
      setPlan({ totalAmount: '', months: '' }); 
    } catch (err) {
      console.error(err);
      setError('حصلت مشكلة واحنا بنعمل خطة التقسيط.');
    } finally {
      setCreatingPlan(false);
    }
  };

  const payInstallment = async (id) => {
    if (!canManageFinance) {
      setError("عفواً، الدفع يحتاج لصلاحية مدير عمليات.");
      return;
    }
    if (!id) return;
    setPayingId(id);
    setError('');

    try {
      const inst = installments.find((x) => (x.installment_id || x.id) === id);
      const clientId = inst?.client_id || inst?.clientId || inst?.payer_client_id;
      const payload = { clientId, status: 'Paid' };

      await dataService.finance.payInstallment(id, payload);

      setInstallments((current) =>
        current.map((item) =>
          (item.installment_id || item.id) === id
            ? { ...item, paid: true, paid_at: new Date().toISOString(), status: 'Paid' }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      setError('عملية الدفع مفلحتش للأسف.');
    } finally {
      setPayingId(null);
    }
  };

  return (
    <AdminLayout
      title={t('admin.sidebar.installments', 'التقسيط')}
      description="إدارة خطط التقسيط وتحصيل الدفعات المالية (لصلاحيات مستوى 4 فما فوق)."
    >
      <div className="space-y-6 w-full max-w-none">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 bg-[#161922] p-6 rounded-2xl border border-white/5 shadow-xl">
          <div className="flex-1">
            <label className="text-slate-300 text-base font-black">اختر القضية المراقبة للمستند المالي</label>
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="mt-3 w-full bg-[#0f111a] border border-white/10 rounded-xl py-3.5 px-4 text-base font-bold text-white focus:border-yellow-500 outline-none h-[54px]"
            >
              <option value="">-- اختر القضية (رقم القضية - عنوان القضية - اسم العميل) --</option>
              {cases.map((c) => {
                const currentCaseId = c.case_id || c.id;
                const currentTitle = c.title || c.case_title || 'بدون عنوان';
                const currentClientName = c.client_name || c.clientName || 'غير معروف';
                
                return (
                  <option key={currentCaseId} value={currentCaseId} className="text-white bg-[#161922]">
                    {`رقم: ${currentCaseId} ⚖️ القضية: ${currentTitle} 👤 العميل: ${currentClientName}`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full xl:w-[500px] space-y-2">
            <label className="text-slate-300 text-base font-black">إنشاء خطة تقسيط جديدة</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={plan.totalAmount}
                onChange={(e) => setPlan((p) => ({ ...p, totalAmount: e.target.value }))}
                type="number"
                placeholder="إجمالي المبلغ بالجنيه"
                disabled={!canManageFinance}
                className="bg-[#0f111a] border border-white/10 rounded-xl py-3 px-4 text-sm text-white disabled:opacity-50 h-[54px]"
              />
              <input
                value={plan.months}
                onChange={(e) => setPlan((p) => ({ ...p, months: e.target.value }))}
                type="number"
                placeholder="عدد الأقساط (الشهور)"
                disabled={!canManageFinance}
                className="bg-[#0f111a] border border-white/10 rounded-xl py-3 px-4 text-sm text-white disabled:opacity-50 h-[54px]"
              />
            </div>
            
            {canManageFinance ? (
              <button
                type="button"
                onClick={createPlan}
                disabled={creatingPlan || !caseId}
                className="w-full h-[50px] rounded-xl bg-yellow-500 text-slate-950 hover:bg-yellow-400 transition font-black text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Plus size={18} />
                {creatingPlan ? 'جاري إنشاء خطة الدفع...' : 'توليد خطة الأقساط'}
              </button>
            ) : (
              <div className="w-full h-[50px] rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-black flex items-center justify-center gap-2">
                <Lock size={16} /> لا تملك صلاحية لإنشاء أقساط (مستوى 4 مطلوب)
              </div>
            )}
          </div>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm">{error}</div>}

        <div className="bg-[#161922] border border-white/5 rounded-2xl overflow-hidden shadow-2xl w-full">
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white text-lg font-black">جدولة الأقساط المسجلة</p>
              <p className="text-slate-400 text-xs mt-1">بنعرض {filtered.length} قسط حالي للقضية</p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالحالة أو المبلغ..."
                className="w-full bg-[#0f111a] border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-yellow-500 transition"
              />
            </div>
          </div>

          {loading && caseId ? (
            <div className="p-16 flex items-center justify-center"><Loader2 className="animate-spin text-yellow-500 w-8 h-8" /></div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-right text-sm">
                <thead className="bg-white/5 text-slate-300 uppercase text-xs font-black tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-right">تاريخ الاستحقاق</th>
                    <th className="px-6 py-4 text-right">المبلغ المطلوب</th>
                    <th className="px-6 py-4 text-right">الحالة الجارية</th>
                    <th className="px-6 py-4 text-center">الإجراء الإداري</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((it) => {
                    const due = it.due_date || it.dueDate || it.date;
                    const isPaid = Boolean(it.paid) || String(it.status || '').toLowerCase() === 'paid';
                    const recordId = it.installment_id || it.id;

                    return (
                      <tr key={recordId} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-slate-300 font-bold">{due ? new Date(due).toLocaleDateString('ar-EG') : '-'}</td>
                        <td className="px-6 py-4 font-black text-white text-base">{formatMoney(it.amount || it.value || 0, it.currency || 'EGP')}</td>
                        <td className="px-6 py-4"><StatusPill status={it.status || (isPaid ? 'Paid' : 'Pending')} /></td>
                        <td className="px-6 py-4 text-center">
                          {isPaid ? (
                            <span className="text-emerald-400 text-sm font-black">تم السداد والتسوية بنجاح ✔️</span>
                          ) : canManageFinance ? (
                            <button
                              type="button"
                              disabled={payingId === recordId}
                              onClick={() => payInstallment(recordId)}
                              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition disabled:opacity-50 shadow-md shadow-blue-600/10"
                            >
                              {payingId === recordId ? 'جاري السداد...' : 'تأكيد تحصيل القسط'}
                            </button>
                          ) : (
                            <span className="text-xs text-red-400 font-bold">مغلق 🔒 (مستوى 4 مطلوب)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-bold text-base">
                        {caseId ? "مفيش أقساط مسجلة للقضية دي يا هندسة." : "يرجى اختيار قضية من الأعلى أولاً لعرض الأقساط."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInstallmentsPage;
