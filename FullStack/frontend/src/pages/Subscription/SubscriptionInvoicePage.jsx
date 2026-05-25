import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContextHook';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';

const SubscriptionInvoicePage = () => {
  const { invoiceId } = useParams();
  const { mode } = useTheme();

  return (
    <div className={`max-w-2xl mx-auto py-16 px-4 text-center ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`} dir="rtl">
      
      <div className="flex justify-center mb-6">
        <CheckCircle2 size={80} className="text-green-500" />
      </div>
      
      <h1 className="text-3xl font-black mb-2">تم الدفع بنجاح!</h1>
      <p className="text-gray-500 mb-8">تم تفعيل اشتراكك وتقدر تستفيد من كل المميزات دلوقتي.</p>

      <div className={`p-8 rounded-2xl text-right mb-8 border ${mode === 'dark' ? 'bg-slate-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-6 border-b pb-4 border-gray-500/20">
          <FileText className="text-yellow-500" />
          <h2 className="text-xl font-bold">تفاصيل الفاتورة</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">رقم الفاتورة:</span>
            <span className="font-bold">{invoiceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">التاريخ:</span>
            <span className="font-bold">{new Date().toLocaleDateString('ar-EG')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">حالة الدفع:</span>
            <span className="font-bold text-green-500">مكتمل</span>
          </div>
        </div>
      </div>

      <Link 
        to="/lawyer/dashboard" 
        className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all"
      >
        العودة للوحة التحكم
        <ArrowRight size={20} />
      </Link>

    </div>
  );
};

export default SubscriptionInvoicePage;