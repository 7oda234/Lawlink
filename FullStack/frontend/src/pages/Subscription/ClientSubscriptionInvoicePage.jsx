import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CheckCircle2, FileText, ArrowRight, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'; 

const ClientSubscriptionInvoicePage = () => {
  const { invoiceId } = useParams(); 
  const { mode } = useTheme();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`/api/payments/invoice/${invoiceId}`);
        const data = await res.json();
        if (data.ok) {
          setInvoice(data.data);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const handleDownload = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice?.invoice_number || `client-invoice-${invoiceId}`}.pdf`);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("حدث خطأ أثناء تحميل الفاتورة كـ PDF");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-yellow-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto py-16 px-4 pt-28 text-center ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`} dir="rtl">
      
      <div className="flex justify-center mb-6">
        <CheckCircle2 size={80} className="text-green-500" />
      </div>
      
      <h1 className="text-3xl font-black mb-2">تم الدفع بنجاح!</h1>
      <p className="text-gray-500 mb-8">تم تفعيل باقتك وتقدر تستفيد من كل المميزات كعميل مميز دلوقتي.</p>

      <div ref={invoiceRef} className={`p-8 rounded-2xl text-right mb-8 border ${mode === 'dark' ? 'bg-slate-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-6 border-b pb-4 border-gray-500/20">
          <div className="flex items-center gap-2">
            <FileText className="text-yellow-500" />
            <h2 className="text-xl font-bold">تفاصيل الفاتورة</h2>
          </div>
          
          {invoice && (
            <button onClick={handleDownload} data-html2canvas-ignore="true" className="text-sm flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-all font-bold">
              <Download size={16} /> تحميل PDF
            </button>
          )}
        </div>
        
        {invoice ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">رقم الفاتورة:</span>
              <span className="font-bold">{invoice.invoice_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">المبلغ المدفوع:</span>
              <span className="font-bold">{invoice.amount} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">التاريخ:</span>
              <span className="font-bold">
                {new Date(invoice.issue_date).toLocaleDateString('ar-EG')}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 py-4">
            عذراً، لم نتمكن من جلب تفاصيل الفاتورة.
          </div>
        )}
      </div>

      <Link 
        to="/client/dashboard" 
        className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all"
      >
        العودة للوحة تحكم العميل
        <ArrowRight size={20} />
      </Link>
    </div>
  );
};

export default ClientSubscriptionInvoicePage;