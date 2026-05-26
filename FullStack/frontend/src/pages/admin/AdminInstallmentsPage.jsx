// بنستورد الحاجات الأساسية من رياكت
import React, { useEffect, useMemo, useState } from 'react';
// الهيكل الأساسي بتاع لوحة الإدارة
import AdminLayout from '../../components/AdminLayout';
// ملف السيرفيس اللي بيكلم الباك إند
import dataService from '../../services/DataService';
// سياق اللغة للترجمة
import { useLanguage } from '../../context/LanguageContextObject';
// شوية أيقونات روشة تظبط شكل الصفحة (وضيفنا القفل للصلاحيات)
import { Loader2, Plus, Search, Settings2, Lock } from 'lucide-react';
// 🛡️ سياق المصادقة عشان نراقب رتبة المدير الحالي
import { useAuth } from '../../context/useAuth';

// دالة صغيرة عشان تظبط شكل الفلوس وتكتب جنبها EGP
const formatMoney = (amount, currency = 'EGP') => {
  const n = Number(amount);
  if (Number.isNaN(n)) return `0 ${currency}`;
  return `${n.toFixed(2)} ${currency}`;
};

// كومبوننت صغير بيرسم "بادج" لحالة القسط (مدفوع ولا لسه)
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
  
  // 🛡️ بنسحب بيانات المدير، وبنحدد مستواه
  const { authUser } = useAuth();
  const myLevel = parseInt(authUser?.authority_level || 1, 10);
  // 🛡️ الصلاحية: لازم يكون مستوى 4 (مدير عمليات) أو أعلى عشان يلعب في الفلوس
  const canManageFinance = myLevel >= 4;

  // حالات (States) عشان نشيل فيها القضايا والأقساط
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [caseId, setCaseId] = useState('');
  const [installments, setInstallments] = useState([]);
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState({ totalAmount: '', months: '' });
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [error, setError] = useState('');

  // بنفلتر الأقساط بناءً على البحث اللي بيكتبه المدير
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

  // بنجيب كل القضايا عشان نحطها في الدروب داون (Select)
  const fetchCases = async () => {
    const res = await dataService.admin.getCases();
    const rows = res?.data || res || [];
    setCases(Array.isArray(rows) ? rows : rows?.cases || []);
  };

  // بنجيب الأقساط بتاعت القضية اللي المدير اختارها
  const fetchInstallments = async (selectedCaseId) => {
    if (!selectedCaseId) {
      setInstallments([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await dataService.finance.getInstallmentsByCase(selectedCaseId);
      const rows = res?.data?.installments ?? res?.data ?? [];
      setInstallments(Array.isArray(rows) ? rows : rows?.installments || []);
    } catch  {
      setError('فشلنا في تحميل بيانات الأقساط.');
      setInstallments([]);
    } finally {
      setLoading(false);
    }
  };

  // أول ما الصفحة تفتح، بنجيب القضايا
  useEffect(() => {
    const boot = async () => {
      try {
        await fetchCases();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  // لما يغير القضية المحددة، نجيب أقساطها
  useEffect(() => {
    if (caseId) fetchInstallments(caseId);
  }, [caseId]);

  // دالة إنشاء خطة التقسيط
  const createPlan = async () => {
    // 🛡️ حماية إضافية لو حد لعب في الـ UI
    if (!canManageFinance) {
      setError("عفواً، ليس لديك صلاحية مستوى 4 لإنشاء خطط تقسيط.");
      return;
    }

    if (!caseId) return;
    const totalAmount = Number(plan.totalAmount);
    const months = Number(plan.months);
    if (!totalAmount || totalAmount <= 0 || !months || months <= 0) {
      setError('دخل مبلغ وشهور صح يا هندسة.');
      return;
    }

    setCreatingPlan(true);
    setError('');
    try {
      await dataService.finance.createInstallmentPlan(caseId, { totalAmount, months });
      await fetchInstallments(caseId); // بنحدث الجدول
      setPlan({ totalAmount: '', months: '' }); // بنفضي الفورم
    } catch  {
      setError('حصلت مشكلة واحنا بنعمل خطة التقسيط.');
    } finally {
      setCreatingPlan(false);
    }
  };

  // دالة دفع القسط
  const payInstallment = async (id) => {
    // 🛡️ حماية الدفع
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

      // بنحدث حالة القسط في الواجهة من غير ما نعمل ريلود
      setInstallments((current) =>
        current.map((item) =>
          (item.installment_id || item.id) === id
            ? { ...item, paid: true, paid_at: new Date().toISOString(), status: 'Paid' }
            : item
        )
      );
    } catch  {
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
      <div className="space-y-6">
        
        {/* فورم إنشاء خطة تقسيط جديدة */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex-1">
            <label className="text-slate-300 text-sm font-bold">اختر القضية</label>
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white"
            >
              <option value="">-- اختار القضية من هنا --</option>
              {cases.map((c) => (
                <option key={c.case_id || c.id} value={c.case_id || c.id}>
                  {c.title || `Case ${c.case_id || c.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-[420px]">
            <label className="text-slate-300 text-sm font-bold">إنشاء خطة تقسيط جديدة</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={plan.totalAmount}
                onChange={(e) => setPlan((p) => ({ ...p, totalAmount: e.target.value }))}
                type="number"
                placeholder="إجمالي المبلغ"
                disabled={!canManageFinance} // بنقفلها لو ملوش صلاحية
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white disabled:opacity-50"
              />
              <input
                value={plan.months}
                onChange={(e) => setPlan((p) => ({ ...p, months: e.target.value }))}
                type="number"
                placeholder="عدد الشهور"
                disabled={!canManageFinance}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white disabled:opacity-50"
              />
            </div>
            
            {/* 🛡️ زرار الإنشاء بيظهر لو ليه صلاحية، ولو ملوش بنطلعله زرار مقفول */}
            {canManageFinance ? (
              <button
                type="button"
                onClick={createPlan}
                disabled={creatingPlan || !caseId}
                className="mt-3 w-full px-4 py-2 rounded-xl bg-yellow-500/15 border border-yellow-500/25 hover:bg-yellow-500/20 transition text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
                {creatingPlan ? 'جاري الإنشاء...' : 'توليد خطة الأقساط'}
              </button>
            ) : (
              <div className="mt-3 w-full px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center justify-center gap-2">
                <Lock size={16} /> لا تملك صلاحية لإنشاء أقساط
              </div>
            )}
          </div>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200">{error}</div>}

        {/* جدول عرض الأقساط */}
        <div className="bg-[#161922] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 flex items-center justify-between gap-3">
            <div>
              <p className="text-slate-300 font-bold">الأقساط المسجلة</p>
              <p className="text-slate-500 text-xs">بنعرض {filtered.length} قسط</p>
            </div>
            <div className="relative w-72 max-w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالحالة أو المبلغ..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-10 flex items-center justify-center"><Loader2 className="animate-spin text-yellow-500" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-200 uppercase text-[10px] font-black tracking-widest">
                  <tr>
                    <th className="px-5 py-4">تاريخ الاستحقاق</th>
                    <th className="px-5 py-4">المبلغ</th>
                    <th className="px-5 py-4">الحالة</th>
                    <th className="px-5 py-4">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((it) => {
                    const due = it.due_date || it.dueDate || it.date;
                    const isPaid = Boolean(it.paid) || String(it.status || '').toLowerCase() === 'paid';
                    const recordId = it.installment_id || it.id;

                    return (
                      <tr key={recordId} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-5 py-4 text-slate-300">{due ? new Date(due).toLocaleDateString() : '-'}</td>
                        <td className="px-5 py-4 font-semibold text-white">{formatMoney(it.amount || it.value || 0, it.currency || 'EGP')}</td>
                        <td className="px-5 py-4"><StatusPill status={it.status || (isPaid ? 'Paid' : 'Pending')} /></td>
                        <td className="px-5 py-4">
                          {isPaid ? (
                            <span className="text-slate-500 text-xs font-bold">تم الدفع ✔️</span>
                          ) : canManageFinance ? (
                            // 🛡️ زرار الدفع بيظهر بس للمديرين الكبار
                            <button
                              type="button"
                              disabled={payingId === recordId}
                              onClick={() => payInstallment(recordId)}
                              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition disabled:opacity-50"
                            >
                              {payingId === recordId ? 'بنحمل...' : 'دفع القسط'}
                            </button>
                          ) : (
                            <span className="text-xs text-red-400">مقفول 🔒</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                        مفيش أقساط للقضية دي يا هندسة.
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
