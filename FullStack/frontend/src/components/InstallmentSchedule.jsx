import React, { useEffect, useState } from 'react';
import DataService from '../services/DataService';
import { useTranslation } from '../hooks/useTranslation';

const InstallmentSchedule = ({ caseId, onPaid }) => {
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    if (!caseId) {
      setSchedule([]);
      return;
    }

    const loadSchedule = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await DataService.finance.getInstallmentsByCase(caseId);
        const installments = Array.isArray(response.data)
          ? response.data
          : response.data?.installments ?? [];
        setSchedule(installments);
      } catch (err) {
        console.error('Failed to load installment schedule', err);
        setError(t('installment_schedule_error', 'Unable to load the installment schedule.'));
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [caseId, t]);

  const payInstallment = async (installmentId) => {
    setPayingId(installmentId);
    setError('');

    try {
      await DataService.finance.payInstallment(installmentId);
      setSchedule((current) =>
        current.map((item) =>
          item.id === installmentId
            ? { ...item, paid: true, paid_at: new Date().toISOString(), status: 'Paid' }
            : item
        )
      );
      if (typeof onPaid === 'function') {
        onPaid();
      }
    } catch (err) {
      console.error('Failed to pay installment', err);
      setError(t('installment_payment_error', 'Payment could not be completed. Please try again.'));
    } finally {
      setPayingId(null);
    }
  };

  const renderStatus = (installment) => {
    if (installment.paid || installment.status?.toLowerCase() === 'paid') {
      return <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{t('paid', 'Paid')}</span>;
    }

    return <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{t('pending', 'Pending')}</span>;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return '-';
    return new Date(dateValue).toLocaleDateString();
  };

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{t('installment_schedule', 'Installment Schedule')}</h2>
          <p className="text-sm text-slate-500">{t('installment_schedule_description', 'Track and pay scheduled case installments from here.')}</p>
        </div>
        {loading && <span className="text-sm text-slate-500">{t('loading', 'Loading...')}</span>}
      </div>

      {error && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {!caseId ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-600">
          {t('select_case_to_view_installments', 'Select a case to view its installment schedule.')}
        </div>
      ) : schedule.length === 0 && !loading ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-600">
          {t('no_installments_found', 'No installments were found for this case.')}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">{t('due_date', 'Due Date')}</th>
                <th className="px-4 py-3">{t('installment_amount', 'Amount')}</th>
                <th className="px-4 py-3">{t('status', 'Status')}</th>
                <th className="px-4 py-3">{t('action', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {schedule.map((installment) => (
                <tr key={installment.id}>
                  <td className="whitespace-nowrap px-4 py-4">{formatDate(installment.due_date || installment.dueDate || installment.date)}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">{Number(installment.amount || installment.value || 0).toFixed(2)} EGP</td>
                  <td className="px-4 py-4">{renderStatus(installment)}</td>
                  <td className="px-4 py-4">
                    {installment.paid || installment.status?.toLowerCase() === 'paid' ? (
                      <span className="text-slate-500">{t('already_paid', 'Already Paid')}</span>
                    ) : (
                      <button
                        type="button"
                        disabled={Boolean(payingId) && payingId !== installment.id}
                        onClick={() => payInstallment(installment.id)}
                        className="rounded-2xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {payingId === installment.id ? t('processing', 'Processing...') : t('pay_now', 'Pay Now')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstallmentSchedule;
