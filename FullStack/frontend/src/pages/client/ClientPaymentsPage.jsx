import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, FileText, Loader2, History } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import DataService from '../../services/DataService';

const ClientPaymentsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await DataService.finance.getPaymentHistory();
        const data = res.data;
        // tolerate multiple shapes
        const list = Array.isArray(data) ? data : data?.payments ?? data?.data?.payments ?? [];
        setPayments(list);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const goPay = () => navigate('/client/payments');

  const handleInvoiceClick = (paymentId) => {
    navigate(`/client/payments/${paymentId}/invoice`);
  };

  return (
    <PageLayout>
      <div className="min-h-[60vh]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black">{t('payments', 'Payments')}</h1>
            <p className="text-slate-500 mt-2">{t('payments_subtitle', 'Payment history & invoices')}</p>
          </div>

          <button
            type="button"
            className="bg-yellow-500 text-black font-black px-5 py-3 rounded-xl hover:bg-yellow-400 transition"
            onClick={goPay}
          >
            {t('new_payment', 'New Payment')}
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin" />
            <span className="ml-3">Loading...</span>
          </div>
        ) : error ? (
          <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200">
            {error}
          </div>
        ) : payments.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/20 flex flex-col items-center text-center">
            <History className="w-8 h-8 text-slate-400" />
            <p className="mt-3 text-slate-300">{t('no_payments', 'No payments found yet.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {payments.map((p) => (
              <div key={p.payment_id ?? p.id} className="p-5 rounded-2xl border border-slate-800 bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-yellow-400" />
                      <h2 className="font-bold">
                        {t('invoice', 'Invoice')} #{p.payment_id ?? p.id}
                      </h2>
                    </div>
                    <p className="text-slate-400 mt-2">
                      {new Date(p.created_at ?? p.date ?? Date.now()).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-400 text-sm">{t('amount', 'Amount')}</p>
                    <p className="text-lg font-black">
                      {Number(p.amount ?? 0).toLocaleString()} EGP
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 bg-slate-900 border border-slate-700 px-4 py-3 rounded-xl hover:bg-slate-800 transition text-white"
                    onClick={() => handleInvoiceClick(p.payment_id ?? p.id)}
                  >
                    <FileText className="inline w-4 h-4 mr-2" />
                    {t('view_invoice', 'View Invoice')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ClientPaymentsPage;

