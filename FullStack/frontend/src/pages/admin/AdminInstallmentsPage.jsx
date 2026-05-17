import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import dataService from '../../services/DataService';
import { useLanguage } from '../../context/LanguageContextObject';
import { Loader2, Plus, Search, Settings2 } from 'lucide-react';

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
      // Use installment_id to match the database column
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
    const res = await dataService.admin.getCases();
    const rows = res?.data || res || [];
    setCases(Array.isArray(rows) ? rows : rows?.cases || []);
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
      const rows = res?.data?.installments ?? res?.data ?? [];
      setInstallments(Array.isArray(rows) ? rows : rows?.installments || []);
    } catch (e) {
      console.error(e);
      setError('Failed to load installments');
      setInstallments([]);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (caseId) fetchInstallments(caseId);
  }, [caseId]);

  const createPlan = async () => {
    if (!caseId) return;
    const totalAmount = Number(plan.totalAmount);
    const months = Number(plan.months);
    if (!totalAmount || totalAmount <= 0 || !months || months <= 0) {
      setError('Enter valid total amount and months');
      return;
    }

    setCreatingPlan(true);
    setError('');
    try {
      await dataService.finance.createInstallmentPlan(caseId, { totalAmount, months });
      await fetchInstallments(caseId);
      setPlan({ totalAmount: '', months: '' });
    } catch (e) {
      console.error(e);
      setError('Failed to create installment plan');
    } finally {
      setCreatingPlan(false);
    }
  };

  const payInstallment = async (id) => {
    if (!id) return;
    setPayingId(id);
    setError('');

    try {
      // Find the installment using installment_id
      const inst = installments.find((x) => (x.installment_id || x.id) === id);
      const clientId = inst?.client_id || inst?.clientId || inst?.payer_client_id;
      const payload = {
        clientId,
        status: 'Paid',
      };

      await dataService.finance.payInstallment(id, payload);

      setInstallments((current) =>
        current.map((item) =>
          // Check against installment_id
          (item.installment_id || item.id) === id
            ? { ...item, paid: true, paid_at: new Date().toISOString(), status: 'Paid' }
            : item
        )
      );
    } catch (e) {
      console.error(e);
      setError('Payment could not be completed');
    } finally {
      setPayingId(null);
    }
  };

  return (
    <AdminLayout
      title={t('admin.sidebar.casesSection', 'Installments')}
      description="Create installment plans and record installment payments."
    >
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex-1">
            <label className="text-slate-300 text-sm font-bold">Select Case</label>
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white"
            >
              <option value="">-- Choose case --</option>
              {cases.map((c) => (
                <option key={c.case_id || c.id} value={c.case_id || c.id}>
                  {c.title || `Case ${c.case_id || c.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-[420px]">
            <label className="text-slate-300 text-sm font-bold">Create Installment Plan</label>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={plan.totalAmount}
                onChange={(e) => setPlan((p) => ({ ...p, totalAmount: e.target.value }))}
                type="number"
                placeholder="Total amount"
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white"
              />
              <input
                value={plan.months}
                onChange={(e) => setPlan((p) => ({ ...p, months: e.target.value }))}
                type="number"
                placeholder="Months"
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white"
              />
            </div>
            <button
              type="button"
              onClick={createPlan}
              disabled={creatingPlan || !caseId}
              className="mt-3 w-full px-4 py-2 rounded-xl bg-yellow-500/15 border border-yellow-500/25 hover:bg-yellow-500/20 transition text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              {creatingPlan ? 'Creating...' : 'Generate Plan'}
            </button>
          </div>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200">{error}</div>}

        <div className="bg-[#161922] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 flex items-center justify-between gap-3">
            <div>
              <p className="text-slate-300 font-bold">Installments</p>
              <p className="text-slate-500 text-xs">Showing {filtered.length} record(s)</p>
            </div>
            <div className="relative w-72 max-w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by id/amount/status"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-yellow-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-200 uppercase text-[10px] font-black tracking-widest">
                  <tr>
                    <th className="px-5 py-4">Due Date</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((it) => {
                    const due = it.due_date || it.dueDate || it.date;
                    const isPaid = Boolean(it.paid) || String(it.status || '').toLowerCase() === 'paid';
                    
                    // Identify the correct ID for the record
                    const recordId = it.installment_id || it.id;

                    return (
                      <tr key={recordId} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-5 py-4 text-slate-300">{due ? new Date(due).toLocaleDateString() : '-'}</td>
                        <td className="px-5 py-4 font-semibold text-white">{formatMoney(it.amount || it.value || 0, it.currency || 'EGP')}</td>
                        <td className="px-5 py-4"><StatusPill status={it.status || (isPaid ? 'Paid' : 'Pending')} /></td>
                        <td className="px-5 py-4">
                          {isPaid ? (
                            <span className="text-slate-500 text-xs font-bold">Already Paid</span>
                          ) : (
                            <button
                              type="button"
                              disabled={payingId === recordId}
                              onClick={() => payInstallment(recordId)}
                              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition disabled:opacity-50"
                            >
                              {payingId === recordId ? 'Processing...' : 'Pay'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                        No installments found for this case.
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
