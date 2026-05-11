import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, Loader2, AlertCircle } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import DataService from '../../services/DataService';

const ClientInvoicePage = () => {
  const { t } = useTranslation();
  const { paymentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  const amount = useMemo(() => (invoice ? Number(invoice.amount ?? 0) : 0), [invoice]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await DataService.finance.downloadInvoice(paymentId);
        // downloadInvoice currently triggers file creation; but backend may return JSON.
        // In our integration we treat this as invoice response if JSON is returned.
        setInvoice(res?.data ?? res?.data?.data ?? null);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
    }, [paymentId]);

  const handleDownload = async () => {
    try {
      await DataService.finance.downloadInvoice(paymentId);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin" />
          <span className="ml-3">Loading...</span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black">{t('invoice', 'Invoice')}</h1>
            <p className="text-slate-500 mt-2">{t('invoice_subtitle', 'Invoice details')}</p>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="bg-yellow-500 text-black font-black px-5 py-3 rounded-xl hover:bg-yellow-400 transition flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            {t('download', 'Download')}
          </button>
        </div>

        {error ? (
          <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200">
            <AlertCircle className="inline w-4 h-4 mr-2" />
            {error}
          </div>
        ) : !invoice ? (
          <div className="p-8 rounded-2xl border border-slate-800 bg-white/5 text-slate-300">
            {t('invoice_not_found', 'Invoice not found.')}
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-slate-800 bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-bold">#{paymentId}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">{t('amount', 'Amount')}</p>
                <p className="text-2xl font-black">{amount.toLocaleString()} EGP</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t('status', 'Status')}</p>
                <p className="text-lg font-semibold">{invoice.status ?? '-'}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t('client_id', 'Client ID')}</p>
                <p className="text-lg font-semibold">{invoice.client_id ?? '-'}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">{t('case_id', 'Case ID')}</p>
                <p className="text-lg font-semibold">{invoice.case_id ?? '-'}</p>
              </div>
            </div>

            <div className="mt-6 text-slate-400 text-sm">
              {t('invoice_note', 'This invoice is generated from your payment record.')}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ClientInvoicePage;

