import React, { useState } from 'react';
import { Bot, Sparkles, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage'; 
import { useTheme } from '../../context/ThemeContext'; 
import "../../styles/client/ClientBase.css"; 

const AIClassifier = () => {
  const { language } = useLanguage(); 
  const { mode } = useTheme(); 
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [detectedCategory, setDetectedCategory] = useState(null);
  const [categoryKey, setCategoryKey] = useState(""); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const isDark = mode === 'dark';

  // --- Multi-Language Content ---
  const content = {
    en: {
      title: "Global AI Assistant",
      subtitle: "Describe your situation or need. Our AI will identify the right field and specialist for you.",
      placeholder: "Example: I need a developer to build an app... OR I feel a pain in my back...",
      btnAnalyze: "Analyze Request",
      analyzing: "AI is analyzing...",
      detected: "Field Identified",
      resultMsg: "Your request falls under:",
      btnConfirm: "Find Specialist",
      footer: "Encrypted & Confidential • Global Specialists Network",
      minChars: "Write 20+ characters for analysis.",
      categories: {
        // Legal Fields
        labor: "Labor Law", 
        family: "Family Law", 
        injury: "Injury & Accidents", 
        criminal: "Criminal Law", 
        realestate: "Real Estate", 
        civil: "Civil & Consumer", 
        // Global Fields
        medical: "Medical & Health Sciences",
        engineering: "Engineering & Technology",
        business: "Business & Economics",
        creative: "Creative Arts & Media",
        science: "Science & Environment",
        general: "General Consultation"
      }
    },
    eg: { 
      title: "مساعد الذكاء الاصطناعي الشامل",
      subtitle: "اشرح مشكلتك أو طلبك، وسيقوم الذكاء الاصطناعي بتحديد المجال والمتخصص المناسب لك.",
      placeholder: "مثال: محتاج مبرمج يعمل تطبيق... أو عندي ألم في ظهري...",
      btnAnalyze: "تحليل الطلب",
      analyzing: "جاري التحليل...",
      detected: "تم تحديد المجال",
      resultMsg: "بناءً على شرحك، طلبك يندرج تحت:",
      btnConfirm: "عرض المتخصصين المتاحين",
      footer: "مشفر وسري • شبكة المتخصصين الشاملة",
      minChars: "يرجى كتابة 20 حرفًا على الأقل.",
      categories: {
        // Legal Fields
        labor: "قانون العمل", 
        family: "قانون الأحوال الشخصية", 
        injury: "الحوادث والإصابات", 
        criminal: "القانون الجنائي", 
        realestate: "العقارات والإيجارات", 
        civil: "القانون المدني والتجاري", 
        // Global Fields
        medical: "المجال الطبي والصحي",
        engineering: "المجال الهندسي والتقني",
        business: "المجال التجاري والمالي",
        creative: "الفنون والإعلام",
        science: "العلوم والبيئة",
        general: "استشارة عامة"
      }
    }
  };

  const t = content[language] || content['eg']; 

  // قاموس مخصص لإرسال اسم التصنيف باللغة العربية في الـ URL
  const arabicUrlCategories = {
    // Legal
    labor: "عمل",
    family: "أحوال شخصية",
    injury: "إصابات",
    criminal: "جنائي",
    realestate: "عقاري",
    civil: "مدني",
    // Global
    medical: "طبي",
    engineering: "هندسي",
    business: "تجاري",
    creative: "فني",
    science: "علمي",
    general: "عام"
  };

  // --- AI Classification Logic ---
  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setDetectedCategory(null);
    
    setTimeout(() => {
      const input = description.toLowerCase();
      const cat = t.categories;
      
      let result = cat.general; 
      let key = "general"; 

      // 1. الكلمات المفتاحية للمجالات العالمية الجديدة
      const medicalRegex = /مريض|دكتور|طبيب|مستشفى|علاج|دواء|صيدلية|ألم|وجع|جراحة|تمريض|مرض|صحة|تحاليل|أشعة|doctor|hospital|medical|medicine|health|sick|patient|pain|surgery/;
      const engineeringRegex = /هندسة|مبرمج|برمجة|كود|تطبيق|موقع|حاسبات|سوفتوير|موبايل|شبكات|ذكاء اصطناعي|تقنية|تصميم موقع|react|node|engineer|code|software|app|web|tech|programming|developer/;
      const businessRegex = /تجارة|تسويق|مبيعات|اقتصاد|بزنس|فلوس|استثمار|مشروع|شركات|محاسبة|ضرائب|ريادة|أسهم|بنك|business|finance|marketing|sales|economy|accounting|investment|bank/;
      const creativeRegex = /رسم|فنون|تصميم|ميديا|سينما|فيلم|إعلام|صحافة|موسيقى|جرافيك|لوجو|مونتاج|فيديو|art|design|media|movie|music|cinema|graphic|logo|video/;
      const scienceRegex = /علوم|فضاء|كيمياء|فيزياء|بيئة|زراعة|طبيعة|مناخ|علم|نبات|حيوان|تحليل كيميائي|science|physics|chemistry|biology|space|environment|nature/;

      // 2. الكلمات المفتاحية القانونية
      const criminalRegex = /police|stole|theft|jail|crime|drugs|fraud|prison|arrest|scam|shassih|شرطة|سرقة|محضر|حبس|جريمة|mخدرات|نصب|قتل|ضرب|تحرش|بلطجة|قسم|نيابة|تزوير|تلاعب|شاسيه|مخالفة/;
      const civilRegex = /sale|buy|contract|car|vehicle|dealer|agreement|شراء|بيع|عقد|عقد بيع|عقد ابتدائي|سيارة|عربية|معيوبة|عيوب|البائع|مشتري|شركة شحن|تاجر|فحص/;
      const laborRegex = /boss|fired|salary|employment|job|promotion|manager|مديري|رفدني|مرتب|شغل|وظيفة|مكتب العمل|تأمينات|استقالة|mستحقات|خصم|طرد|فصل|تعسفي|جزاءات|ساعات العمل/;
      const familyRegex = /divorce|wife|husband|kids|children|marriage|inheritance|alimony|custody|court|طلاق|زوجتي|زوجي|نفقة|اطفال|خلع|محكمة|رؤية|حضانة|ميراث|ورث|قسيمة|جواز|نسب|ولاية/;
      const injuryRegex = /accident|hurt|damage|insurance|compensation|حادث|تعويض|إصابة|خبطة|تقرير طبي|تأمين بدني|ضرر جسدي|كسر|جرح/;
      const realestateRegex = /rent|house|apartment|landlord|flat|tenant|land|building|ایجار|شقة|بيت|مالك|عقار|ارض|مبنى|عمارة|mستأجر/;

      // 3. فحص الشروط لتحديد الـ Key والـ Result
      if (medicalRegex.test(input)) {
        result = cat.medical;
        key = "medical";
      } else if (engineeringRegex.test(input)) {
        result = cat.engineering;
        key = "engineering";
      } else if (businessRegex.test(input)) {
        result = cat.business;
        key = "business";
      } else if (creativeRegex.test(input)) {
        result = cat.creative;
        key = "creative";
      } else if (scienceRegex.test(input)) {
        result = cat.science;
        key = "science";
      } else if (criminalRegex.test(input)) {
        result = cat.criminal;
        key = "criminal";
      } else if (civilRegex.test(input)) {
        result = cat.civil;
        key = "civil";
      } else if (laborRegex.test(input)) {
        result = cat.labor;
        key = "labor";
      } else if (familyRegex.test(input)) {
        result = cat.family;
        key = "family";
      } else if (injuryRegex.test(input)) {
        result = cat.injury;
        key = "injury";
      } else if (realestateRegex.test(input)) {
        result = cat.realestate;
        key = "realestate";
      }

      setDetectedCategory(result);
      setCategoryKey(key);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleNavigation = () => {
    const urlCategory = arabicUrlCategories[categoryKey] || "عام";
    // نمرر البيانات الحقيقية في الـ state بدلاً من رقم قضية عشوائي وهمي
    navigate(`/client/find-specialist?category=${urlCategory}`, {
      state: {
        description: description,
        title: `طلب استشارة ذكاء اصطناعي - ${urlCategory}`
      }
    });
  };

  return (
    <div 
      className={`client-page-wrapper flex flex-col items-center justify-center min-h-screen p-4 ${isDark ? 'dark-mode bg-slate-900 text-white' : 'light-mode bg-gray-50 text-slate-900'}`} 
      dir={language === 'en' ? 'ltr' : 'rtl'}
    >
      <div className={`client-card w-full max-w-2xl rounded-2xl p-8 shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="ai-icon-wrapper flex justify-center mb-4">
            <div className="bg-yellow-400 text-slate-900 p-3 rounded-2xl shadow-lg">
              <Bot size={36} />
            </div>
          </div>
          <h1 className="client-h1 italic text-3xl font-black mb-2">{t.title}</h1>
          <p className="client-subtitle font-bold text-gray-400">{t.subtitle}</p>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
          <textarea
            className={`client-textarea w-full p-4 rounded-xl border-2 resize-none focus:outline-none focus:border-yellow-400 transition-colors h-48 font-bold ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'}`}
            placeholder={t.placeholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {/* Validation Warning */}
          {description.length > 0 && description.length < 20 && (
            <div className="flex items-center gap-1 text-red-500 text-sm font-bold px-2">
                <AlertCircle size={16} /> {t.minChars}
            </div>
          )}

          {/* Action Area */}
          {!detectedCategory ? (
            <button 
              onClick={runAIAnalysis} 
              disabled={isAnalyzing || description.length < 20} 
              className={`client-btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-lg italic transition-all ${
                isAnalyzing || description.length < 20 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                  : 'bg-yellow-500 hover:bg-yellow-400 text-slate-900 shadow-md'
              }`}
            >
              {isAnalyzing ? (
                <div className="spinner w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" /> 
              ) : (
                <><Sparkles size={20} /> {t.btnAnalyze}</>
              )}
            </button>
          ) : (
            /* Result Box */
            <div className={`ai-result-card p-6 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-950 p-2 rounded-lg">
                  <ShieldCheck className="text-yellow-500" size={28} />
                </div>
                <h3 className="text-xl font-black italic">{t.detected}</h3>
              </div>
              <p className="font-bold mb-6 text-lg flex items-center gap-2">
                {t.resultMsg} 
                <span className="ai-category-badge bg-yellow-500 text-slate-900 px-3 py-1 rounded-md text-sm">{detectedCategory}</span>
              </p>
              
              <button 
                onClick={handleNavigation} 
                className="client-btn-primary bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-lg italic transition-all"
              >
                {t.btnConfirm} <ArrowRight size={20} className={language === 'en' ? '' : 'rotate-180'} />
              </button>
            </div>
          )}
        </div>

        {/* Security Banner */}
        <div className="client-banner flex items-center justify-center gap-2 mt-8 py-3 rounded-lg bg-slate-900/50 text-gray-400 text-sm font-bold">
          <CheckCircle2 size={16} /> 
          <span className="client-banner-text uppercase tracking-wider">Private - AES-256 Encryption 100%</span>
        </div>
      </div>
      
      {/* Footer text */}
      <p className="mt-6 text-center text-sm font-bold text-gray-500 opacity-60">{t.footer}</p>
    </div>
  );
};

export default AIClassifier;