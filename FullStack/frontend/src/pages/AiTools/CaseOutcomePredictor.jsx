import React, { useState } from 'react'; // بنستورد مكتبة ريأكت والـ Hooks زي useState عشان نحفظ الداتا
import { Link } from 'react-router-dom'; // بنستورد Link عشان نتنقل بين الصفحات من غير ما الصفحة تعمل ريفريش
import dataService from '../../services/DataService'; // بنستورد السيرفيس بتاعتنا اللي بتكلم الباك إند (سيرفر البايثون)
import { // بنستورد الأيقونات الشيك من مكتبة lucide-react عشان نزين الواجهة
  Scale, // أيقونة الميزان
  Sparkles, // أيقونة النجوم (بترمز للذكاء الاصطناعي)
  Cpu, // أيقونة المعالج
  ShieldAlert, // أيقونة التحذير للأخطاء
  ChevronRight, // سهم يمين
  ChevronLeft, // سهم شمال
  ArrowLeft, // سهم الرجوع للخلف
  Terminal, // أيقونة التيرمينال
  Activity // أيقونة النبض (للتحميل)
} from 'lucide-react'; 
import { useLanguage } from '../../context/useLanguage'; // بنستورد الـ Hook بتاع اللغة (عربي ولا إنجليزي)
import { useTheme } from '../../context/ThemeContext'; // بنستورد الـ Hook بتاع الثيم (فاتح ولا غامق)

const CaseOutcomePredictor = () => { // بنعرف الكومبوننت الأساسي بتاع أداة توقع الأحكام
  // بنسحب المتغيرات والدوال من الـ Context بتاع السيستم
  const { language, toggleLanguage } = useLanguage(); 
  const { mode } = useTheme(); 
  
  // بنحدد اتجاه الشاشة (يمين لشمال لو عربي أو مصري)
  const isRTL = language === 'ar' || language === 'eg'; 
  // بنعرف إحنا في الدارك مود ولا لأ
  const isDark = mode === 'dark'; 
  // بنحدد اللغة الحالية اللي هنستخدمها في قاموس النصوص
  const currentLang = isRTL ? 'ar' : 'en'; 

  // الـ States الخاصة بالداتا
  // دي هتشيل بيانات القضية (الوقائع وجهة الاختصاص) اللي اليوزر بيكتبها
  const [formData, setFormData] = useState({ facts: '', jurisdiction: 'Egypt' }); 
  // دي هتشيل التوقع النهائي (الحيثيات والنسبة) لما يرجع من السيرفر
  const [prediction, setPrediction] = useState(null); 
  // دي بتشغل وتوقف أنيميشن التحميل عشان اليوزر يعرف إننا بنفكر
  const [isLoading, setIsLoading] = useState(false); 
  // دي بتشيل رسالة الإيرور لو حصل مشكلة ونعرضها في مربع أحمر
  const [error, setError] = useState(''); 

  // ده القاموس بتاعنا اللي فيه كل النصوص باللغتين عشان الموقع يكون متوافق مع أي يوزر
  const content = {
    en: {
      title: 'Case Outcome Predictor',
      subtitle: 'Predictive legal intelligence for civil & criminal dispute analytics',
      jurisdiction: 'Jurisdiction Framework',
      jurisdictionNote: 'This prediction model is finely tuned for Egyptian courts and statutory legal procedures.',
      factsLabel: 'Case Merits & Facts',
      factsPlaceholder: 'Enter absolute case facts, witness statements, claims, and structural violations here...',
      buttonDefault: 'Predict Outcome',
      buttonLoading: 'Processing Through LawLink Brain...',
      errorMsg: 'Quantum core analysis failed.',
      successLabel: 'Estimated Success Probability',
      unknown: 'Calculation Error',
      noReason: 'The neural network model provided no detailed legal reasoning.',
      analysisHeader: 'Neural Legal Reasoning',
      egypt: 'Egypt (Cairo Supreme Court Standards)'
    },
    ar: {
      title: 'محلل ومتوقع الأحكام الذكي',
      subtitle: 'الذكاء الاصطناعي التنبئي لتحليل القضايا ونسب نجاحها',
      jurisdiction: 'إطار جهة الاختصاص القانوني',
      jurisdictionNote: 'نموذج التوقع هذا مخصص ومدرّب بالكامل على القوانين والمحاكم وإجراءات النقض المصرية.',
      factsLabel: 'وقائع وحيثيات الدعوى القضائية',
      factsPlaceholder: 'قم بكتابة وقائع القضية بالتفصيل، البنود المتنازع عليها، أو الدفوع القانونية المرفوعة...',
      buttonDefault: 'تشغيل محرك التوقع الفوري',
      buttonLoading: 'جاري مراجعة الأرشيف ومواد القانون...',
      errorMsg: 'فشل التوقع، يرجى التحقق من الاتصال بالسيرفر.',
      successLabel: 'نسبة النجاح المتوقعة للدعوى',
      unknown: 'غير قادر على الحساب',
      noReason: 'النموذج الذكي لم يقدم حيثيات تفصيلية كافية.',
      analysisHeader: 'التحليل والحيثيات القانونية المستخرجة',
      egypt: 'جمهورية مصر العربية (معايير محكمة النقض)'
    }
  };
  
  // بنحط النصوص بتاعة اللغة الحالية في متغير اسمه t
  const t = content[currentLang]; 

  // 🚀 الدالة الأساسية اللي بتشتغل لما اليوزر يدوس على زرار "توقع النسبة"
  const handlePredict = async (e) => {
    e.preventDefault(); // بنمنع الصفحة إنها تعمل ريفريش أوتوماتيك
    setIsLoading(true); // بنشغل اللودينج أنيميشن
    setError(''); // بننظف أي إيرور قديم
    setPrediction(null); // بنفضي أي توقع قديم عشان نعرض الجديد على نضافة

    try {
      // بنبعت وقائع القضية لسيرفر البايثون عن طريق الـ dataService
      const response = await dataService.aiTools.predict({ ...formData, jurisdiction: 'Egypt' });
      
      // 🚀 الاستخراج الذكي: بندور على نص "الحيثيات" في كل المستويات جوه الداتا اللي راجعة
      const finalReasoning = 
        response?.data?.data?.reasoning || 
        response?.data?.reasoning || 
        response?.reasoning || 
        response?.data?.data?.data?.reasoning ||
        response?.data?.data?.analysis; // بندور عليه بمسمى تاني احتياطي لو البايثون غيره
        
      // بندور على "النسبة المئوية" لو مبعوتة صريحة كمتغير منفصل
      let finalProbability = 
        response?.data?.data?.probability || 
        response?.data?.probability || 
        response?.probability;

      // 🎯 التعديل السحري: لو السيرفر مبعتش النسبة صريحة، هنسحبها من وسط الكلام بالـ Regex
      if (!finalProbability && finalReasoning) {
        // بنعمل تعبير نمطي (Regex) بيدور على أي رقم (من 1 لـ 3 خانات) وجنبه علامة %
        const match = finalReasoning.match(/(\d{1,3})\s*%/); 
        if (match) {
            // لو لقينا الرقم (مثلاً 85)، بنقسمه على 100 عشان نحوله لكسر (0.85) ونديه لدالة الألوان تحت
            finalProbability = parseInt(match[1], 10) / 100; 
        }
      }

      // لو الحيثيات موجودة فعلاً، بنحفظ النتيجة في الـ State عشان تظهر لليوزر
      if (finalReasoning) {
        setPrediction({ reasoning: finalReasoning, probability: finalProbability });
      } else {
        // لو مفيش حيثيات رجعت، بنطبع الريسبونس في الكونسول ونرمي إيرور
        console.error("Server Response Payload:", response);
        throw new Error("تم استلام رد من السيرفر ولكن لم يتم العثور على التوقع. يرجى مراجعة الـ Console.");
      }
    } catch (err) {
      // لو حصل أي إيرور (نت فصل، سيرفر وقع)، بنعرضه في المربع الأحمر
      setError(err.response?.data?.message || err.message || t.errorMsg);
    } finally {
      // في النهاية بنوقف اللودينج عشان الزرار يرجع لشكله الطبيعي
      setIsLoading(false);
    }
  };

  // 🎨 دالة ديناميكية بتلون مربع النسبة حسب الرقم (أخضر للعالي، أصفر للمتوسط، أحمر للضعيف)
  const getProbabilityColor = (prob) => {
    const val = prob * 100; // بنضرب في 100 عشان نرجع الرقم لنسبة مئوية (مثلاً 0.85 يبقى 85)
    // لو النسبة 70% أو أكتر -> اللون أخضر (أمل كبير)
    if (val >= 70) return { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' };
    // لو النسبة 50% أو أكتر -> اللون أصفر (فيها وفيها)
    if (val >= 50) return { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' };
    // لو النسبة أقل من 50% -> اللون أحمر (القضية خسرانة غالباً)
    return { text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' };
  };

  // بنجهز ألوان مربع النسبة بناءً على النتيجة (لو في توقع رجع)
  const probMetrics = prediction ? getProbabilityColor(prediction.probability || 0) : null;

  return ( // واجهة المستخدم (الـ HTML/JSX)
    // الكونتينر الأساسي: بيضبط الخلفية والاتجاه حسب الثيم واللغة
    <div className={`min-h-screen p-4 md:p-8 pt-24 transition-colors duration-300 ${isDark ? 'bg-[#06080c] text-white' : 'bg-slate-50 text-slate-900'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 🧭 الهيدر العلوي وزرار تغيير اللغة */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
            <Link to="/lawyer/dashboard" className="hover:text-yellow-500 transition-colors">Dashboard</Link>
            {isRTL ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            <Link to="/ai-tools" className="hover:text-yellow-500 transition-colors">AI Hub</Link>
            {isRTL ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            <span className="text-yellow-500">{t.title}</span>
          </div>

          <button 
            type="button"
            onClick={toggleLanguage} 
            className="px-4 py-1.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-white/5 text-gray-400 hover:text-white flex items-center gap-2 text-xs font-black transition-all"
          >
            <Sparkles size={12} className="text-yellow-500" />
            <span>{isRTL ? 'English Terminal' : 'الواجهة العربية'}</span>
          </button>
        </div>

        {/* 🧠 الكارت الكبير بتاع الأداة نفسها (واخد تأثير الإزاز الشفاف) */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          {/* أيقونة ميزان كبيرة ورا بخلفية شفافة للشياكة */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.01] pointer-events-none">
            <Scale size={200} />
          </div>

          {/* عنوان الكارت ووصف الأداة */}
          <div className="flex items-start gap-4 pb-6 border-b border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg shadow-indigo-600/5">
              <Cpu size={26} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black italic uppercase text-white tracking-tight">{t.title}</h2>
              <p className="text-xs opacity-50 font-bold mt-1 uppercase tracking-wide text-slate-300">{t.subtitle}</p>
            </div>
          </div>

          {/* ⚡ فورمة إدخال تفاصيل القضية */}
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* مربع بيعرض إن الأداة متظبطة على القانون المصري */}
              <div className="md:col-span-1">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{t.jurisdiction}</label>
                <div className="w-full p-4 rounded-2xl bg-slate-950 border border-white/5 text-sm font-black italic text-yellow-500 flex items-center gap-2">
                   <Terminal size={14} className="opacity-40" />
                   {t.egypt}
                </div>
              </div>
              <div className="md:col-span-2 pt-4 md:pt-6">
                <p className="text-xs opacity-50 font-medium leading-relaxed text-slate-400">
                  {t.jurisdictionNote}
                </p>
              </div>
            </div>

            {/* المربع الكبير اللي اليوزر بيكتب فيه وقائع القضية */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">{t.factsLabel}</label>
              <textarea
                className="w-full p-5 rounded-2xl bg-slate-950 border border-white/5 focus:border-yellow-500/50 outline-none text-sm font-medium text-white transition-all min-h-[160px] leading-relaxed shadow-inner"
                placeholder={t.factsPlaceholder}
                value={formData.facts} // بنربط التيكست إريا بالـ State
                onChange={(e) => setFormData({ ...formData, facts: e.target.value })} // بنحدث الـ State مع كل حرف اليوزر بيكتبه
                required
              />
            </div>
            
            {/* زرار "توقع النسبة" */}
            <button
              type="submit" // بيعمل Submit للفورمة عشان يشغل دالة handlePredict
              disabled={isLoading} // بنعطل الزرار طول ما البوت بيفكر عشان اليوزر ميدوسش مرتين
              className="w-full relative group overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black italic py-4 rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-yellow-500/5 hover:shadow-yellow-500/10 transition-all active:scale-[0.99] disabled:opacity-40"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {/* لو بنحمل بنعرض أيقونة بتلف، لو لأ بنعرض أيقونة نجوم */}
                {isLoading ? <Activity size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {/* كلمة الزرار بتتغير حسب حالة التحميل */}
                {isLoading ? t.buttonLoading : t.buttonDefault}
              </span>
              {/* أنيميشن خفيف بيحصل لما تعمل هوفر على الزرار */}
              <div className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>
          </form>

          {/* ❌ عرض الأخطاء لو السيرفر وقع أو النت فصل */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3 text-xs font-bold animate-pulse">
              <ShieldAlert className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 📊 منطقة النتيجة: دي بتظهر بس لما النتيجة (التوقع) ترجع من السيرفر بنجاح */}
          {prediction && (
            <div className="mt-8 border-t border-white/5 pt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                
                {/* المربع السحري اللي بيعرض النسبة المستخرجة (بياخد لونه من دالة الألوان) */}
                <div className={`md:col-span-1 p-6 rounded-[2rem] border ${probMetrics.border} ${probMetrics.bg} flex flex-col items-center justify-center text-center space-y-2 h-[150px] shadow-lg`}>
                   <span className="text-[9px] font-black uppercase opacity-60 tracking-wider block">{t.successLabel}</span>
                   {/* بنعرض النسبة كرقم في المية (مثلاً 85%) لو موجودة، غير كده بنكتب "غير قادر على الحساب" */}
                   <span className={`text-4xl font-black italic tracking-tighter ${probMetrics.text}`}>
                     {typeof prediction.probability === 'number' && !isNaN(prediction.probability) 
                       ? `${Math.round(prediction.probability * 100)}%` 
                       : t.unknown}
                   </span>
                </div>

                {/* الحيثيات القانونية اللي رجعت من البوت (الكلام والنصوص) */}
                <div className="md:col-span-3 space-y-2">
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Terminal size={12} className="text-yellow-500" />
                      {t.analysisHeader}
                   </h4>
                   <div className="p-5 rounded-[2rem] bg-slate-950 border border-white/5 text-xs font-medium leading-relaxed text-slate-300 whitespace-pre-wrap max-h-[250px] overflow-y-auto no-scrollbar shadow-inner" dir="auto">
                      {prediction.reasoning || t.noReason}
                   </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* 🛡️ الفوتر (التذييل) اللي تحت خالص */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/10 border border-dashed border-white/5">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-wider">
             LawLink Matrix Core • Hyper-Secure Court Analytics
          </p>
          <Link to="/ai-tools" className="inline-flex items-center gap-1 text-[10px] font-black italic uppercase text-yellow-500 hover:underline tracking-widest">
             {/* سهم الرجوع، لو عربي بنعكسه */}
             {isRTL ? <ArrowLeft size={12} className="rotate-180" /> : <ArrowLeft size={12} />} 
             {isRTL ? 'الرجوع للمكتبة الذكية' : 'Back to AI Terminal'}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CaseOutcomePredictor; // بنصدر الكومبوننت عشان الموقع يقدر يستخدمه
