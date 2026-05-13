import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import dataService from '../../services/DataService';
import { useLanguage } from '../../context/LanguageContextObject';
import { ChevronDown, ChevronUp, Download, FileText, Loader2, RefreshCcw } from 'lucide-react';

const formatMoney = (amount, currency = 'EGP') => {
  const n = Number(amount);
  if (Number.isNaN(n)) return `0 ${currency}`;
  return `${n.toFixed(2)} ${currency}`;
};

const StatusBadge = ({ status }) => {
  const s = String(status || '').toLowerCase();
  const isCompleted = s === 'completed' || s === 'paid' || s === 'success';
  const isPending = s === 'pending' || s === 'awaiting' || s === 'incomplete';

  const base = 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border';

  if (isCompleted) {
    return <span className={`${base} bg-emerald-500/10 border-emerald-500/30 text-emerald-400`}>SUCCESS</span>;
  }

  if (isPending) {
    return <span className={`${base} bg-amber-500/10 border-amber-500/30 text-amber-300`}>PENDING</span>;
  }

  return (
    <span className={`${base} bg-white/5 border-white/10 text-slate-200`}>
      {String(status || 'N/A').toUpperCase()}
    </span>
  );
};

const KeyValue = ({ label, value, span = 'full' }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${span === 'half' ? 'md:col-span-1' : ''}`.trim()}>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
    <p className="text-white font-bold mt-2 break-words">{value ?? '-'}</p>
  </div>
);

const ValueOrDash = ({ value }) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return '-';
  const s = String(value);
  return s.length ? s : '-';
};

const SkeletonBox = () => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="h-3 w-32 bg-white/10 rounded animate-pulse" />
    <div className="mt-3 h-5 w-48 bg-white/10 rounded animate-pulse" />
  </div>
);

const DetailsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />
  </div>
);



const toNiceDate = (v) => {
  if (!v) return '-';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleString();
};

const DetailsSection = ({ selectedInvoice, selectedPaymentId, detailsLoading }) => {
  const [rawOpen, setRawOpen] = useState(false);

  // Reset accordion when switching invoice.
  // (We avoid setState inside an effect to keep ESLint/react-refresh rules happy.)
  if (!selectedPaymentId) return null;

  if (detailsLoading) {
    return (
      <div className="relative">
        <DetailsSkeleton />
        <div className="mt-4 flex items-center gap-3 text-slate-300 font-bold">
          <Loader2 className="animate-spin text-yellow-500" />
          Loading invoice...
        </div>
      </div>
    );
  }

  if (!selectedInvoice) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-500">
        Select a row and click <b>Details</b> to view the invoice information.
      </div>
    );
  }

  // Collect fields defensively because backend may include different naming styles.
  const invoiceNumber = selectedInvoice.invoice_number ?? selectedInvoice.invoiceNumber ?? '-';
  const issueDate = selectedInvoice.issue_date ?? selectedInvoice.issueDate ?? '-';

  const paymentId = selectedInvoice.payment_id ?? selectedInvoice.paymentId ?? selectedPaymentId ?? '-';

  const caseId = selectedInvoice.case_id ?? selectedInvoice.caseId ?? '-';
  const clientId = selectedInvoice.client_id ?? selectedInvoice.clientId ?? '-';

  const amount = selectedInvoice.amount ?? selectedInvoice.total_amount ?? selectedInvoice.totalAmount ?? '-';
  const currency = selectedInvoice.currency ?? selectedInvoice.curr ?? 'EGP';

  const createdAt = selectedInvoice.created_at ?? selectedInvoice.createdAt ?? '-';
  const updatedAt = selectedInvoice.updated_at ?? selectedInvoice.updatedAt ?? '-';

  // Payment table likely has these:
  const paymentStatus = selectedInvoice.status ?? '-';

  // Render additional known-but-optional fields if present.
  const extraFields = [
    { k: 'payment_method', label: 'Payment Method', v: selectedInvoice.payment_method ?? selectedInvoice.paymentMethod },
    { k: 'transaction_id', label: 'Transaction ID', v: selectedInvoice.transaction_id ?? selectedInvoice.transactionId },
    { k: 'paid_at', label: 'Paid At', v: selectedInvoice.paid_at ?? selectedInvoice.paidAt },
    { k: 'due_date', label: 'Due Date', v: selectedInvoice.due_date ?? selectedInvoice.dueDate },
    { k: 'notes', label: 'Notes', v: selectedInvoice.notes },
  ].filter((x) => x.v !== undefined);

  // “All details needed”: show every primitive key/value in the raw json AND show a curated list here.
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KeyValue label="Invoice Number" value={invoiceNumber} />
        <KeyValue label="Issue Date" value={toNiceDate(issueDate)} />
        <KeyValue label="Amount" value={formatMoney(amount, currency)} />

        <KeyValue label="Status" value={String(paymentStatus).toUpperCase()} />
        <KeyValue label="Payment ID" value={paymentId} />
        <KeyValue label="Case ID" value={caseId} />

        <KeyValue label="Client ID" value={clientId} />
        <KeyValue label="Created At" value={toNiceDate(createdAt)} />
        <KeyValue label="Updated At" value={toNiceDate(updatedAt)} />

        {extraFields.slice(0, 6).map((f) => (
          <KeyValue key={f.k} label={f.label} value={<ValueOrDash value={f.v} />} span="half" />
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <button
          type="button"
          onClick={() => setRawOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-slate-200 font-bold">Raw details (JSON)</span>
            <span className="text-slate-500 text-xs">{rawOpen ? 'Hide' : 'Show'} full backend response</span>
          </div>
          {rawOpen ? <ChevronUp size={18} className="text-yellow-400" /> : <ChevronDown size={18} className="text-yellow-400" />}
        </button>
        {rawOpen && (
          <div className="px-5 pb-5">
            <pre className="text-xs text-slate-200/90 whitespace-pre-wrap break-words bg-black/20 border border-white/10 rounded-2xl p-4 max-h-96 overflow-auto">
              {JSON.stringify(selectedInvoice, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminInvoicesPage = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return invoices;
    return invoices.filter((x) => {
      return (
        String(x.payment_id).toLowerCase().includes(q) ||
        String(x.case_id).toLowerCase().includes(q) ||
        String(x.client_id).toLowerCase().includes(q) ||
        String(x.status).toLowerCase().includes(q)
      );
    });
  }, [invoices, query]);

  const fetchInvoices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await dataService.admin.getFinancialLogs();
      const rows = res?.data || res || [];
      setInvoices(Array.isArray(rows) ? rows : rows?.financial_logs || []);
    } catch (e) {
      console.error(e);
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const openInvoiceDetails = async (paymentId) => {
    if (!paymentId) return;

    setSelectedPaymentId(paymentId);

    // Keep the UI stable: show loading but replace content once loaded.
    setDetailsLoading(true);
    setSelectedInvoice(null);

    try {
      const res = await dataService.finance.getInvoiceDetails(paymentId);
      const payload = res?.data?.data ?? res?.data;
      setSelectedInvoice(payload);
    } catch (e) {
      console.error(e);
      setSelectedInvoice(null);
      setError('Failed to load invoice details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const downloadInvoice = async (paymentId) => {
    try {
      await dataService.finance.downloadInvoice(paymentId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout
      title={t('admin.sidebar.reports', 'Invoices')}
      description="Admin invoices and payment invoices (generated per payment)"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FileText size={20} className="text-yellow-500" />
            </div>
            <div>
              <h2 className="text-white font-black text-lg">Invoices</h2>
              <p className="text-slate-400 text-sm">View invoice/payment details, download JSON</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by payment/case/client/status"
                className="w-80 max-w-[75vw] bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50"
              />
            </div>
            <button
              type="button"
              onClick={fetchInvoices}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm font-bold flex items-center gap-2"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200">{error}</div>}

        <div className="bg-[#161922] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="text-slate-300 font-bold">Invoices list</p>
              <p className="text-slate-500 text-xs">Showing {filtered.length} record(s)</p>
            </div>
            <div className="text-slate-500 text-xs">Status is derived from payment.status</div>
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
                    <th className="px-5 py-4">Payment ID</th>
                    <th className="px-5 py-4">Case ID</th>
                    <th className="px-5 py-4">Client ID</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((inv) => (
                    <tr
                      key={`${inv.payment_id}-${inv.created_at}`}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        selectedPaymentId === inv.payment_id ? 'bg-white/[0.04]' : ''
                      }`}
                    >
                      <td className="px-5 py-4 font-bold text-white">{inv.payment_id}</td>
                      <td className="px-5 py-4 text-slate-300">{inv.case_id}</td>
                      <td className="px-5 py-4 text-slate-400">{inv.client_id}</td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {formatMoney(inv.amount, inv.currency || 'EGP')}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openInvoiceDetails(inv.payment_id)}
                            className="rounded-xl bg-yellow-500/15 border border-yellow-500/25 hover:bg-yellow-500/20 transition px-3 py-2 text-xs font-bold text-yellow-200"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() => downloadInvoice(inv.payment_id)}
                            className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition p-2"
                            title="Download invoice JSON"
                          >
                            <Download size={16} className="text-slate-200" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-slate-500">No invoices found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-[#161922] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="text-slate-300 font-bold">Invoice details</p>
              <p className="text-slate-500 text-xs">
                {selectedPaymentId ? `Payment ID: ${selectedPaymentId}` : 'Select an invoice from the table'}
              </p>
            </div>
            {selectedPaymentId && (
              <button
                type="button"
                onClick={() => downloadInvoice(selectedPaymentId)}
                className="px-4 py-2 rounded-xl bg-yellow-500/15 border border-yellow-500/25 hover:bg-yellow-500/20 transition text-sm font-bold flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </button>
            )}
          </div>

          {/* Professional transition: show a skeleton while switching invoice */}
          <div className="p-6">
            <div className="transition-all duration-200 ease-out">
              <DetailsSection
                selectedInvoice={selectedInvoice}
                selectedPaymentId={selectedPaymentId}
                detailsLoading={detailsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInvoicesPage;

