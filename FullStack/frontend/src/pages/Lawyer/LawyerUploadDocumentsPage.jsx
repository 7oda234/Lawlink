import React, { useState, useCallback } from 'react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import { 
  CloudUpload, 
  FileText, 
  Trash2, 
  ShieldCheck,
  Loader2
} from 'lucide-react';

const LawyerUploadDocumentsPage = () => {
  // بنجيب اللغة الحالية والتيم (عشان الـ Dark Mode) من الـ Context
  const { t, language } = useLanguage();
  const { mode } = useTheme();
  
  // بنحدد لو الاتجاه من اليمين للشمال (لو لغة عربية أو مصرية)
  const isRTL = language === 'ar' || language === 'eg';

  // State عشان نخزن فيها الملفات اللي المحامي هيختارها
  const [files, setFiles] = useState([]);
  // State عشان نعرف لو المحامي بيسحب ملف فوق منطقة الرفع (Drag)
  const [isDragging, setIsDragging] = useState(false);
  
  // States عشان نتابع حالة الرفع ونسبته
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // فانكشن بتعالج الملفات اللي تم اختيارها وبتحولها لـ Objects فيها بيانات الملف
  const handleFileSelection = useCallback((selectedFiles) => {
    const newFiles = selectedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9), // بنعمل ID عشوائي لكل ملف
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB', // بنحول الحجم لميجابايت
      type: file.type.split('/')[1]?.toUpperCase() || 'DOC'
    }));
    setFiles(prev => [...prev, ...newFiles]); // بنضيف الملفات الجديدة على القديمة
  }, []);

  // فانكشن بتشتغل لما المحامي يسيب الملفات فوق منطقة الرفع
  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false); // بنرجع الحالة للطبيعي
    const droppedFiles = Array.from(e.dataTransfer.files); // بنحول ملفات الـ Event لـ Array
    handleFileSelection(droppedFiles);
  }, [handleFileSelection]);

  // فانكشن وهمية عشان نوري المستخدم شكل الـ Progress Bar وهو بيحمل
  const simulateUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      }
    }, 200);
  };

  // بنحدد لون الخلفية بناءً على الـ Theme (فاتح ولا غامق)
  const cardBg = mode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';

  return (
    // بنظبط اتجاه الصفحة (RTL لليمين أو LTR للشمال)
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen pt-28 pb-16 ${mode === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <main className="max-w-6xl mx-auto px-6">
        
        {/* قسم العنوان - بنستخدم t للترجمة بناءً على اللغة المختارة */}
        <section className={`p-10 rounded-3xl border mb-10 shadow-sm ${cardBg}`}>
          <h1 className="text-4xl font-black mb-3">
            {t('page.lawyerUpload.title', isRTL ? 'رفع المستندات القانونية' : 'Upload Legal Documents')}
          </h1>
          <p className="opacity-70">
            {t('page.lawyerUpload.subtitle', isRTL ? 'تأكد من رفع ملفات القضية بصيغة PDF لضمان التوافق.' : 'Ensure case files are uploaded in PDF format for compatibility.')}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* منطقة سحب وإفلات الملفات (Drag & Drop) */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
                isDragging ? 'border-yellow-500 bg-yellow-500/5' : 'border-gray-300'
              } ${cardBg}`}
            >
              <CloudUpload size={48} className="mx-auto mb-4 text-yellow-500" />
              <button className="font-bold text-yellow-500 hover:underline">
                {isRTL ? 'اختر الملفات' : 'Browse Files'}
              </button>
              <p className="text-sm opacity-50 mt-2">
                {isRTL ? 'أو اسحب وأفلت المستندات هنا' : 'or drag and drop documents here'}
              </p>
            </div>

            {/* شريط التحميل - بيظهر بس لما نضغط على زر الرفع */}
            {isUploading && (
              <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex justify-between mb-2 text-sm font-bold">
                  <span>{isRTL ? 'جاري الرفع...' : 'Uploading...'}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  {/* العرض بيتغير ديناميكياً مع الـ uploadProgress */}
                  <div 
                    className="bg-yellow-50 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* زرار الرفع - بيكون مقفول (disabled) لو مفيش ملفات مختارة */}
            <button 
              onClick={simulateUpload}
              disabled={files.length === 0 || isUploading}
              className="w-full mt-8 py-4 bg-yellow-500 text-black font-black rounded-xl disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isUploading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} />}
              {isRTL ? 'بدء الرفع الآمن' : 'Start Secure Upload'}
            </button>
          </div>

          {/* القائمة الجانبية لعرض الملفات اللي المحامي اختارها */}
          <div className={`${cardBg} p-6 rounded-3xl border h-fit`}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-yellow-500" />
              {isRTL ? 'قائمة الملفات' : 'File List'}
            </h3>
            <div className="space-y-3">
              {files.map(file => (
                <div key={file.id} className="flex justify-between items-center p-3 border rounded-xl bg-gray-50/5">
                  <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                  {/* زرار حذف الملف من القائمة قبل الرفع */}
                  <button onClick={() => setFiles(files.filter(f => f.id !== file.id))}>
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LawyerUploadDocumentsPage;
