import React, { useState } from 'react';
import dataService from '../../services/DataService';
import { Globe } from 'lucide-react';

const CaseOutcomePredictor = () => {
  const [lang, setLang] = useState('ar');
  const [formData, setFormData] = useState({ facts: '', jurisdiction: 'Egypt' });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'Case Outcome Predictor',
      jurisdiction: 'Jurisdiction (Egypt only)',
      jurisdictionNote: 'This prediction is tuned for Egyptian courts, law, and legal procedures.',
      factsLabel: 'Case Facts',
      factsPlaceholder: 'Describe the key facts of the case...',
      buttonDefault: 'Predict Outcome',
      buttonLoading: 'Generating Prediction...',
      errorMsg: 'Prediction failed.',
      successLabel: 'Estimated Success:',
      unknown: 'Unknown',
      noReason: 'The model provided no detailed explanation.'
    },
    ar: {
      title: 'متوقع نتيجة القضية',
      jurisdiction: 'جهة الاختصاص (مصر فقط)',
      jurisdictionNote: 'هذا التوقع مخصص للمحاكم والقوانين والإجراءات القانونية المصرية.',
      factsLabel: 'وقائع القضية',
      factsPlaceholder: 'قم بوصف الوقائع الأساسية للقضية...',
      buttonDefault: 'توقع النتيجة',
      buttonLoading: 'جاري إنشاء التوقع...',
      errorMsg: 'فشل التوقع.',
      successLabel: 'نسبة النجاح المتوقعة:',
      unknown: 'غير معروف',
      noReason: 'النموذج لم يقدم شرحاً مفصلاً.'
    }
  };
  const t = content[lang];

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await dataService.aiTools.predict({ ...formData, jurisdiction: 'Egypt' });
      const payload = response.data?.data || response.data;
      if (response.data?.success && payload) {
        setPrediction(payload);
      } else {
        throw new Error(response.data?.message || t.errorMsg);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || t.errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="text-gray-500 hover:text-gray-800 flex items-center gap-1">
          <Globe size={18} /> <span className="text-sm font-semibold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
      </div>
      
      <form onSubmit={handlePredict} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.jurisdiction}</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md outline-none bg-slate-50 cursor-not-allowed"
            value={lang === 'ar' ? 'مصر' : 'Egypt'}
            disabled
          />
          <p className="text-xs text-slate-500 mt-2">{t.jurisdictionNote}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.factsLabel}</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 min-h-[120px]"
            placeholder={t.factsPlaceholder}
            value={formData.facts}
            onChange={(e) => setFormData({ ...formData, facts: e.target.value })}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md disabled:bg-teal-400"
        >
          {isLoading ? t.buttonLoading : t.buttonDefault}
        </button>
      </form>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      {prediction && (
        <div className="bg-teal-50 p-6 rounded-md border border-teal-200">
          <h3 className="text-lg font-bold text-teal-900 mb-2">
            {t.successLabel} {typeof prediction.probability === 'number' ? `${Math.round(prediction.probability * 100)}%` : prediction.probability || t.unknown}
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{prediction.reasoning || t.noReason}</p>
        </div>
      )}
    </div>
  );
};

export default CaseOutcomePredictor;