import React, { useState } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCcw, 
  History, 
  Send,
  Gavel
} from 'lucide-react';

const LawyerUpdateStatusPage = () => {
  // بنجيب الأدوات الأساسية: t للترجمة، language عشان نعرف اللغة، وmode عشان الـ Dark Mode
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  
  // بنحدد لو الاتجاه يمين (RTL) لو اللغة عربية أو مصرية عشان نظبط الشكل
  const isRTL = language === 'ar' || language === 'eg';

  // State عشان نراقب الحالة اللي المحامي هيختارها (Default: قيد العمل)
  const [selectedStatus, setSelectedStatus] = useState('in-progress');
  // State عشان نخزن الكلام اللي المحامي هيكتبه في الملاحظات
  const [statusComment, setStatusComment] = useState('');

  // مصفوفة (Array) فيها بيانات وهمية للسجل القديم بتاع القضية عشان الـ Timeline
  const caseHistory = [
    { id: 1, date: '2026-04-10', status: 'filed', text: t('page.updateStatus.filed', isRTL ? 'تم رفع الدعوى في المحكمة' : 'Case filed in court') },
    { id: 2, date: '2026-04-12', status: 'review', text: t('page.updateStatus.review', isRTL ? 'قيد مراجعة المستندات' : 'Documents under review') },
  ];

  // بنحدد ألوان الكروت بناءً على الـ Theme عشان الـ Contrast يكون مظبوط
  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textColor = mode === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    // الحاوية الكبيرة بتحدد اتجاه الصفحة وبتاخد لون الخلفية المناسب للـ Theme
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 transition-colors ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        
        {/* قسم الهيدر: بيعرض اسم الصفحة ورقم القضية بشكل شيك */}
        <section className={`p-10 rounded-3xl border mb-10 shadow-sm ${cardBg}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className={`text-4xl font-black mb-3 ${textColor}`}>
                {t('page.updateStatus.title', isRTL ? 'تحديث حالة القضية' : 'Update Case Status')}
              </h1>
              <p className="text-slate-500 text-lg">
                {t('page.updateStatus.subtitle', isRTL ? 'تابع تقدم القضايا وشارك التحديثات مع موكليك فوراً.' : 'Track case progress and share updates with your clients instantly.')}
              </p>
            </div>
            {/* رقم القضية ثابت حالياً كمثال للتوضيح في المشروع */}
            <div className="bg-yellow-500/10 text-yellow-600 px-4 py-2 rounded-xl border border-yellow-500/20 font-bold flex items-center gap-2">
              <Gavel size={20} />
              <span>{isRTL ? 'رقم القضية: #12345' : 'Case ID: #12345'}</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* الجزء الخاص بتعديل الحالة: المحامي بيختار منه الحالة الجديدة */}
          <div className="lg:col-span-2 space-y-8">
            <div className={`p-8 rounded-3xl border shadow-sm ${cardBg}`}>
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${textColor}`}>
                <RefreshCcw className="text-yellow-500" />
                {t('page.updateStatus.changeStatus', isRTL ? 'تغيير الحالة الحالية' : 'Change Current Status')}
              </h3>

              {/* أزرار الحالات: كل زرار بيغير الـ State بتاع selectedStatus لما نضغط عليه */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'in-progress', label: isRTL ? 'قيد العمل' : 'In Progress', icon: <Clock /> },
                  { id: 'on-hold', label: isRTL ? 'متوقفة مؤقتاً' : 'On Hold', icon: <AlertCircle /> },
                  { id: 'closed', label: isRTL ? 'مغلقة / منتهية' : 'Closed', icon: <CheckCircle2 /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedStatus(item.id)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                      selectedStatus === item.id 
                      ? 'border-yellow-500 bg-yellow-500/5' 
                      : 'border-transparent bg-gray-50/5 hover:border-gray-300'
                    }`}
                  >
                    <div className={`text-${selectedStatus === item.id ? 'yellow-500' : 'slate-400'}`}>
                      {item.icon}
                    </div>
                    <span className={`font-bold ${textColor}`}>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* خانة التعليق: بتربط القيمة المكتوبة بالـ statusComment State */}
              <div className="mb-6">
                <label className={`block text-sm font-bold mb-2 ${textColor}`}>
                  {isRTL ? 'إضافة ملاحظات للموكل' : 'Add Notes for Client'}
                </label>
                <textarea 
                  rows="4"
                  value={statusComment}
                  onChange={(e) => setStatusComment(e.target.value)}
                  placeholder={isRTL ? 'اكتب آخر التطورات هنا...' : 'Write latest developments here...'}
                  className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                    mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </div>

              {/* زرار الإرسال: وظيفته الأساسية تحديث الداتا في الـ Backend (قيد التنفيذ لاحقاً) */}
              <button className="w-full py-4 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-lg flex justify-center items-center gap-2">
                <Send size={20} />
                {t('page.updateStatus.submitBtn', isRTL ? 'تحديث وإرسال إشعار' : 'Update & Send Notification')}
              </button>
            </div>
          </div>

          {/* الجزء الخاص بسجل التحديثات: بيعرض الـ Timeline بتاع القضية لزيادة الشفافية */}
          <div className="lg:col-span-1">
            <div className={`p-8 rounded-3xl border shadow-sm h-full ${cardBg}`}>
              <h3 className={`text-xl font-bold mb-8 flex items-center gap-2 ${textColor}`}>
                <History className="text-yellow-500" />
                {isRTL ? 'سجل التحديثات' : 'Status History'}
              </h3>

              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-4 before:rtl:mr-4 before:rtl:ml-0 before:w-0.5 before:bg-gray-200">
                {caseHistory.map((history) => (
                  <div key={history.id} className="relative flex items-start gap-4">
                    {/* النقطة الصفراء اللي في الـ Timeline */}
                    <div className="absolute left-0 rtl:right-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className={`${isRTL ? 'mr-12' : 'ml-12'}`}>
                      <p className={`text-xs font-bold text-yellow-600 mb-1`}>{history.date}</p>
                      <p className={`text-sm font-bold ${textColor}`}>{history.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LawyerUpdateStatusPage;
