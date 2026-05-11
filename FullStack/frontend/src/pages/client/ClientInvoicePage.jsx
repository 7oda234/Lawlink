import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Download, Loader2, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import DataService from '../../services/DataService';

const ClientInvoicePage = () => {
  const { t } = useTranslation();
  const { paymentId } = useParams();
  const navigate = useNavigate(); 

  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  const amount = useMemo(() => (invoice ? Number(invoice.amount ?? 0) : 0), [invoice]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await DataService.finance.getInvoiceDetails(paymentId); 
        setInvoice(res?.data?.data || res?.data || null);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (paymentId) load();
  }, [paymentId]);

  const handleDownload = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-yellow-500 w-8 h-8" />
          <span className="ml-3 text-slate-300 font-bold">جاري تجهيز الفاتورة...</span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <style>
        {`
          @media print {
            body { background: white !important; color: black !important; }
            .no-print { display: none !important; }
            .invoice-container { 
              background: white !important; 
              color: black !important; 
              border: none !important; 
              box-shadow: none !important; 
            }
            .text-white, .text-slate-300, .text-slate-400 { color: #333 !important; }
            .border-slate-800, .border-white\\/10 { border-color: #ddd !important; }
            .bg-slate-900, .bg-slate-950, .bg-yellow-500\\/10 { background: white !important; }
            * { text-align: right !important; }
          }
        `}
      </style>

      <div className="max-w-3xl mx-auto" dir="rtl">
        <div className="flex items-start justify-between gap-4 mb-6 no-print">
          <div>
            <h1 className="text-3xl font-black text-white">الفاتورة الإلكترونية</h1>
            <p className="text-slate-500 mt-2">يمكنك مراجعة وطباعة تفاصيل العملية من هنا</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/client/dashboard')}
              className="bg-slate-800 text-white font-black px-5 py-3 rounded-xl hover:bg-slate-700 transition flex items-center shadow-lg"
            >
              العودة للوحة التحكم
              <ArrowRight className="w-5 h-5 mr-2" />
            </button>

            {invoice && (
              <button
                type="button"
                onClick={handleDownload}
                className="bg-yellow-500 text-black font-black px-5 py-3 rounded-xl hover:bg-yellow-400 transition flex items-center shadow-lg shadow-yellow-500/20"
              >
                <Download className="w-5 h-5 ml-2" />
                تحميل PDF
              </button>
            )}
          </div>
        </div>

        {error ? (
          <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 flex items-center">
            <AlertCircle className="w-5 h-5 ml-2" />
            {error}
          </div>
        ) : !invoice ? (
          <div className="p-8 rounded-2xl border border-slate-800 bg-white/5 text-slate-300">
            لم يتم العثور على الفاتورة.
          </div>
        ) : (
          <div className="invoice-container p-10 rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500 no-print"></div>

            <div className="flex justify-between items-center mb-10 pb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 text-black p-3 rounded-full">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-wider">INVOICE</h2>
                  <p className="text-slate-400 mt-1 font-mono text-sm">#{invoice.invoice_number || paymentId}</p>
                </div>
              </div>
              <div className="text-left">
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-lg mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-bold text-sm">عملية ناجحة</span>
                </div>
                <p className="text-slate-400 text-sm">{new Date(invoice.created_at || Date.now()).toLocaleDateString('ar-EG')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">العميل (Client ID)</p>
                <p className="text-lg font-bold text-white">{invoice.client_id ?? '-'}</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">رقم القضية (Case ID)</p>
                <p className="text-lg font-bold text-white">{invoice.case_id ?? '-'}</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 p-8 rounded-2xl border border-yellow-500/20 flex flex-col sm:flex-row justify-between items-center">
              <div>
                <p className="text-yellow-500 font-bold mb-2">حالة ونوع الدفع</p>
                <p className="text-xl text-white font-semibold">
                  {invoice.status === 'Partial' || invoice.status === 'Installment' 
                    ? 'دفع جزئي / قسط (Partial)' 
                    : invoice.status === 'Paid' || invoice.status === 'Full' 
                    ? 'دفع كامل (Paid)' 
                    : (invoice.status || 'دفعة مقدمة / كاش')}
                </p>
              </div>
              <div className="text-left mt-4 sm:mt-0">
                <p className="text-slate-400 font-bold mb-2">إجمالي المدفوع</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black text-white">{amount.toLocaleString()}</p>
                  <span className="text-yellow-500 font-bold text-xl">EGP</span>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center border-t border-white/10 pt-6">
              <p className="text-slate-400 text-sm">
                تم إصدار هذه الفاتورة إلكترونياً من نظام المدفوعات الخاص بنا وتعتبر إيصالاً رسمياً للدفع.
              </p>
            </div>
            
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ClientInvoicePage;