import React, { useState } from 'react';
import { Gavel, FileText, Send, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import "../../styles/client/ClientBase.css";

const ClientSubmitCasePage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });

  const isDark = mode === 'dark';
  const isRTL = language === 'ar' || language === 'eg';

  const categories = [
    { id: 'Civil', en: 'Civil Law', ar: 'قانون مدني' },
    { id: 'Criminal', en: 'Criminal Law', ar: 'قانون جنائي' },
    { id: 'Family', en: 'Family Law', ar: 'قانون الأحوال الشخصية' },
    { id: 'RealEstate', en: 'Real Estate Law', ar: 'قانون العقارات' },
    { id: 'Labor', en: 'Labor Law', ar: 'قانون العمل' }
  ];

  const content = {
    en: {
      title: "Submit New Case",
      subtitle: "Provide the details of your legal matter to find the right lawyer.",
      labelTitle: "Case Title",
      labelCategory: "Legal Category",
      labelDescription: "Case Description",
      placeholderTitle: "e.g., Unfair Dismissal from Work",
      placeholderDesc: "Describe the situation, dates, and parties involved...",
      btnSubmit: "Submit Case to LawLink",
      successMsg: "Case submitted successfully! Redirecting to dashboard...",
      securityNote: "Your case details are shared only with selected legal professionals."
    },
    eg: {
      title: "تقديم قضية جديدة",
      subtitle: "يرجى تقديم تفاصيل مسألتك القانونية لنوفر لك المحامي المناسب.",
      labelTitle: "عنوان القضية",
      labelCategory: "التصنيف القانوني",
      labelDescription: "وصف القضية",
      placeholderTitle: "مثال: فصل تعسفي من العمل",
      placeholderDesc: "اشرح الموقف، التواريخ، والأطراف المعنية...",
      btnSubmit: "إرسال القضية لـ لاو-لينك",
      successMsg: "تم تقديم القضية بنجاح! جاري الانتقال للوحة التحكم...",
      securityNote: "تفاصيل قضيتك يتم مشاركتها فقط مع المتخصصين القانونيين المختارين."
    }
  };

  const t = content[language] || content['eg'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Direct mapping to your cases table columns
      const response = await axios.post('http://localhost:5000/api/cases/submit', {
        ...formData,
        client_id: localStorage.getItem('userId'), // Assuming ID is stored on login
        status: 'Pending'
      });

      if (response.data.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/client/dashboard'), 3000);
      }
    } catch (err) {
      console.error("Case Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col pt-28 pb-16 transition-all duration-500 ${
      isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      <main className="flex-grow max-w-4xl mx-auto px-6 w-full">
        <div className={`rounded-[2.5rem] border p-10 shadow-2xl transition-all ${
          isDark ? 'bg-slate-900 border-white/5 shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          
          {/* Header */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-yellow-500/20">
              <Gavel className="text-slate-950 w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black mb-3 italic tracking-tight">{t.title}</h1>
            <p className={`text-lg font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.subtitle}</p>
          </div>

          {success ? (
            <div className="py-20 text-center animate-in zoom-in-95 duration-500">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-black mb-2">{t.successMsg}</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-black px-2 uppercase tracking-widest text-yellow-500">{t.labelTitle}</label>
                <div className="relative group">
                  <FileText className={`absolute top-4 ${isRTL ? 'right-5' : 'left-5'} text-slate-500 group-focus-within:text-yellow-500 transition-colors`} size={20} />
                  <input 
                    name="title"
                    required
                    className={`w-full py-4 rounded-2xl border transition-all font-bold outline-none ${
                      isRTL ? 'pr-14 pl-6' : 'pl-14 pr-6'
                    } ${isDark ? 'bg-slate-950 border-white/10 text-white focus:border-yellow-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500 focus:bg-white'}`}
                    placeholder={t.placeholderTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="text-sm font-black px-2 uppercase tracking-widest text-yellow-500">{t.labelCategory}</label>
                <select 
                  name="category"
                  required
                  className={`w-full p-4 rounded-2xl border font-bold outline-none cursor-pointer ${
                    isDark ? 'bg-slate-950 border-white/10 text-white focus:border-yellow-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500 focus:bg-white'
                  }`}
                  onChange={handleChange}
                >
                  <option value="">{isRTL ? 'اختر النوع' : 'Select Category'}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{isRTL ? cat.ar : cat.en}</option>
                  ))}
                </select>
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label className="text-sm font-black px-2 uppercase tracking-widest text-yellow-500">{t.labelDescription}</label>
                <textarea 
                  name="description"
                  required
                  rows="6"
                  className={`w-full p-6 rounded-2xl border transition-all font-bold outline-none resize-none ${
                    isDark ? 'bg-slate-950 border-white/10 text-white focus:border-yellow-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-yellow-500 focus:bg-white'
                  }`}
                  placeholder={t.placeholderDesc}
                  onChange={handleChange}
                />
              </div>

              {/* Security Banner */}
              <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
              }`}>
                <Info size={18} className="text-yellow-500 shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-relaxed">
                  {t.securityNote}
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-slate-950 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-4 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div> : <><Send size={20} /> {t.btnSubmit}</>}
              </button>

            </form>
          )}
        </div>

        <p className={`mt-8 text-center text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          LawLink Case Management System • Protected by AES-256
        </p>
      </main>
    </div>
  );
};

export default ClientSubmitCasePage;
