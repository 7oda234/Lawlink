import React, { useState } from 'react';
import { Bot, Sparkles, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage'; 
import { useTheme } from '../../context/ThemeContext'; 
import "../../styles/client/ClientBase.css"; // The unified CSS file

const AIClassifier = () => {
  const { language } = useLanguage(); 
  const { mode } = useTheme(); 
  const [description, setDescription] = useState("");
  const [detectedCategory, setDetectedCategory] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const navigate = useNavigate();
  const isDark = mode === 'dark';

  const content = {
    en: {
      title: "LawLink AI Assistant",
      subtitle: "Describe your situation in plain words. Our AI will identify the legal path for you.",
      placeholder: "Example: My employer hasn't paid my salary for two months...",
      btnAnalyze: "Analyze My Case",
      analyzing: "AI is analyzing...",
      detected: "Category Identified",
      resultMsg: "Your case falls under:",
      btnConfirm: "Proceed to Registration",
      footer: "Encrypted & Confidential • BIS AASTMT",
      minChars: "Write 20+ characters for analysis.",
      categories: {
        labor: "Labor Law", family: "Family Law", injury: "Injury Law", criminal: "Criminal Law", realestate: "Real Estate Law", general: "General Consultation"
      }
    },
    eg: { 
      title: "مساعد لاو-لينك الذكي",
      subtitle: "اشرح مشكلتك بلغة بسيطة وسيقوم الذكاء الاصطناعي بتحديد المسار القانوني.",
      placeholder: "مثال: صاحب العمل لم يدفع راتبي منذ شهرين...",
      btnAnalyze: "تحليل الحالة",
      analyzing: "جاري التحليل...",
      detected: "تم تحديد التصنيف",
      resultMsg: "بناءً على شرحك، قضيتك تندرج تحت:",
      btnConfirm: "الانتقال إلى التسجيل",
      footer: "مشفر وسري • مشروع BIS الأكاديمية العربية",
      minChars: "يرجى كتابة 20 حرفًا على الأقل.",
      categories: {
        labor: "قانون العمل", family: "قانون الأحوال الشخصية", injury: "قانون الإصابات", criminal: "القانون الجنائي", realestate: "القانون العقاري", general: "استشارة عامة"
      }
    }
  };

  const t = content[language] || content['eg']; 

const runAIAnalysis = () => {
  setIsAnalyzing(true);
  setDetectedCategory(null);
  
  setTimeout(() => {
    const input = description.toLowerCase();
    const cat = t.categories;
    let result = cat.general;

    // 1. Labor & Employment (شغل، مرتب، رفد، مدير)
    const laborRegex = /boss|fired|salary|work|job|employment|contract|company|promotion|manager|مديري|رفدني|مرتب|شغل|وظيفة|شركة|عقد|تأمينات|استقالة|مستحقات|خصم|طرد|فصل|تعسفي|جزاءات|ساعات العمل/;
    
    // 2. Family & Personal Status (طلاق، نفقة، خلع، أطفال، ورث)
    const familyRegex = /divorce|wife|husband|kids|children|marriage|inheritance|alimony|custody|court|طلاق|زوجتي|زوجي|نفقة|اطفال|خلع|محكمة|رؤية|حضانة|ميراث|ورث|قسيمة|جواز|نسب|ولاية/;
    
    // 3. Personal Injury & Accidents (حادث، إصابة، مستشفى، تعويض)
    const injuryRegex = /accident|car|hurt|hospital|injury|damage|insurance|compensation|medical|حادث|عربية|مستشفى|تعويض|إصابة|خبطة|عملية|تقرير طبي|تأمين|ضرر|كسر|جرح/;
    
    // 4. Criminal Defense (شرطة، سرقة، حبس، جريمة، نصب)
    const criminalRegex = /police|stole|theft|jail|crime|drugs|fraud|prison|arrest|scam|شرطة|سرقة|محضر|حبس|جريمة|مخدرات|نصب|قتل|ضرب|تحرش|بلطجة|قسم|نيابة|تزوير/;
    
    // 5. Real Estate & Property (إيجار، شقة، مالك، أرض، عقد)
    const realestateRegex = /rent|house|apartment|landlord|flat|tenant|land|building|sale|ایجار|شقة|بيت|مالك|عقار|ارض|مبنى|عمارة|مستأجر|توكيل|بيع|شراء|تسجيل/;

    if (laborRegex.test(input)) {
      result = cat.labor;
    } else if (familyRegex.test(input)) {
      result = cat.family;
    } else if (injuryRegex.test(input)) {
      result = cat.injury;
    } else if (criminalRegex.test(input)) {
      result = cat.criminal;
    } else if (realestateRegex.test(input)) {
      result = cat.realestate;
    }

    setDetectedCategory(result);
    setIsAnalyzing(false);
  }, 2000);
};

  return (
    <div className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} dir={language === 'en' ? 'ltr' : 'rtl'}>
      <div className="client-card">
        <div className="text-center mb-8">
          <div className="ai-icon-wrapper">
            <Bot />
          </div>
          <h1 className="client-h1 italic">{t.title}</h1>
          <p className="client-subtitle font-bold">{t.subtitle}</p>
        </div>

        <div className="space-y-6">
          <textarea
            className="client-textarea h-56 font-bold"
            placeholder={t.placeholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {description.length > 0 && description.length < 20 && (
            <div className="flex items-center gap-1 text-red-500 text-xs font-bold px-2">
                <AlertCircle size={14} /> {t.minChars}
            </div>
          )}

          {!detectedCategory ? (
            <button 
              onClick={runAIAnalysis} 
              disabled={isAnalyzing || description.length < 20} 
              className="client-btn-primary italic"
            >
              {isAnalyzing ? (
                <div className="spinner" /> 
              ) : (
                <><Sparkles size={20} /> {t.btnAnalyze}</>
              )}
            </button>
          ) : (
            /* AI Result Box using CSS classes */
            <div className="ai-result-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-950 p-2 rounded-lg">
                  <ShieldCheck className="text-yellow-500" size={28} />
                </div>
                <h3 className="text-xl font-black italic">{t.detected}</h3>
              </div>
              <p className="font-bold mb-6 text-lg">
                {t.resultMsg} <span className="ai-category-badge">{detectedCategory}</span>
              </p>
              <button 
                onClick={() => navigate('/register')} 
                className="client-btn-primary !bg-slate-950 !text-white w-full mt-4 italic"
              >
                {t.btnConfirm} <ArrowRight size={20} className={language === 'en' ? '' : 'rotate-180'} />
              </button>
            </div>
          )}
        </div>

        {/* Security Banner using unified classes */}
        <div className="client-banner justify-center mt-10">
          <CheckCircle2 size={14} /> 
          <span className="client-banner-text">100% Private • AES-256 Encryption</span>
        </div>
      </div>
      <p className="mt-8 text-center client-banner-text !opacity-40">{t.footer}</p>
    </div>
  );
};

export default AIClassifier;
