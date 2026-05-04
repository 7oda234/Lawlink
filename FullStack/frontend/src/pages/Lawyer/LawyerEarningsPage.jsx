import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import DataService from '../../services/DataService';

const LawyerEarningsPage = () => {
  const { t } = useTranslation();
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    totalPaid: 0,
    pendingPayout: 0,
  });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const response = await DataService.finance.getLawyerEarnings();
        const data = response.data;

        let normalizedRecords = [];
        let totalEarnings = 0;
        let totalPaid = 0;
        let pendingPayout = 0;

        if (Array.isArray(data)) {
          normalizedRecords = data;
          totalEarnings = data.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
          totalPaid = data.filter((item) => item.paid || item.status === 'paid').reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
          pendingPayout = totalEarnings - totalPaid;
        } else {
          normalizedRecords = Array.isArray(data.records)
            ? data.records
            : Array.isArray(data.payments)
            ? data.payments
            : [];
          totalEarnings = Number(data.totalEarnings ?? data.totalAmount ?? 0);
          totalPaid = Number(data.totalPaid ?? data.paidAmount ?? 0);
          pendingPayout = Number(data.pendingPayout ?? (totalEarnings - totalPaid));
        }

        setSummary({ totalEarnings, totalPaid, pendingPayout });
        setRecords(normalizedRecords);
      } catch (err) {
        console.error('Failed to load lawyer earnings', err);
        setError(t('lawyer_earnings_error', 'Unable to load earnings data.'));
      } finally {
        setLoading(false);
      }
    };

    loadEarnings();
  }, [t]);

  const formatCurrency = (value) => {
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  const getRecordValue = (record) => {
    return record.amount ?? record.value ?? record.total ?? 0;
  };

  const getStatus = (record) => {
    if (record.status) return record.status;
    if (record.paid) return 'Paid';
    return 'Pending';
  };

  const getDate = (record) => {
    const dateValue = record.paid_at || record.created_at || record.date || record.transactionDate;
    if (!dateValue) return '-';
    return new Date(dateValue).toLocaleDateString();
  };

  return (
    <PageLayout title={t('lawyer_earnings', 'Earnings')} subtitle={t('lawyer_earnings_subtitle', 'Review your income and payment history')}>
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border p-6 shadow-sm bg-white">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{t('total_earnings', 'Total Earnings')}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatCurrency(summary.totalEarnings)} EGP</p>
          </div>
          <div className="rounded-3xl border p-6 shadow-sm bg-white">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{t('paid_to_date', 'Paid to Date')}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatCurrency(summary.totalPaid)} EGP</p>
          </div>
          <div className="rounded-3xl border p-6 shadow-sm bg-white">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{t('pending_payout', 'Pending Payout')}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatCurrency(summary.pendingPayout)} EGP</p>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">{t('recent_payouts', 'Recent Payouts')}</h2>
            <span className="text-sm text-slate-500">{loading ? t('loading', 'Loading...') : `${records.length} ${t('records', 'records')}`}</span>
          </div>

          {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="border-b bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3">{t('date', 'Date')}</th>
                  <th className="px-4 py-3">{t('client', 'Client')}</th>
                  <th className="px-4 py-3">{t('description', 'Description')}</th>
                  <th className="px-4 py-3">{t('amount', 'Amount')}</th>
                  <th className="px-4 py-3">{t('status', 'Status')}</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 && !loading ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>{t('no_earnings_records', 'No earnings records available.')}</td>
                  </tr>
                ) : (
                  records.map((record, index) => (
                    <tr key={record.id ?? index} className="border-b last:border-none">
                      <td className="px-4 py-4">{getDate(record)}</td>
                      <td className="px-4 py-4">{record.clientName || record.client || record.customer || '-'}</td>
                      <td className="px-4 py-4">{record.description || record.note || record.type || '-'}</td>
                      <td className="px-4 py-4 font-semibold text-slate-900">{formatCurrency(getRecordValue(record))} EGP</td>
                      <td className="px-4 py-4">{getStatus(record)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LawyerEarningsPage;
