import React, { useState } from 'react';
import dataService from '../../services/DataService';
import { Globe } from 'lucide-react';

const ContractReviewTool = () => {
  const [lang, setLang] = useState('ar');
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'AI Contract Review',
      uploadLabel: 'Upload Contract (PDF):',
      uploadNote: 'Upload standard contract file formats for Egyptian law review.',
      selectedFile: 'Selected file:',
      btnReview: 'Review Contract',
      btnAnalyzing: 'Analyzing...',
      errorMsg: 'Failed to analyze the contract.',
      errorFile: 'Please upload a file to review.',
      summaryTitle: 'Review Summary:'
    },
    ar: {
      title: 'مراجعة العقود بالذكاء الاصطناعي',
      uploadLabel: 'ارفع العقد (PDF):',
      uploadNote: 'قم برفع ملفات العقود القياسية للمراجعة وفقاً للقانون المصري.',
      selectedFile: 'الملف المحدد:',
      btnReview: 'مراجعة العقد',
      btnAnalyzing: 'جاري التحليل...',
      errorMsg: 'فشل في تحليل العقد.',
      errorFile: 'يرجى رفع ملف لمراجعته.',
      summaryTitle: 'ملخص المراجعة:'
    }
  };
  const t = content[lang];

  const handleReview = async (e) => {
    e.preventDefault();
    if (!file) {
      setError(t.errorFile);
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis(null);

    const formData = new FormData();
    formData.append('contract', file);

    try {
      const response = await dataService.aiTools.contractReview(formData);
      const payload = response.data?.data || response.data;
      if (response.data?.success && payload?.analysis) {
        setAnalysis(payload.analysis);
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
      
      <form onSubmit={handleReview} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.uploadLabel}</label>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              className={`w-full p-2 border border-gray-300 rounded-md file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${lang === 'ar' ? 'file:ml-4' : 'file:mr-4'}`}
              onChange={(e) => setFile(e.target.files[0])}
              disabled={isLoading}
            />
            <p className="mt-2 text-sm text-slate-500">{t.uploadNote}</p>
            {file && <p className="mt-2 text-sm text-slate-500">{t.selectedFile} <strong>{file.name}</strong></p>}
          </div>
          <button
            type="submit"
            disabled={isLoading || !file}
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md disabled:bg-indigo-400"
          >
            {isLoading ? t.btnAnalyzing : t.btnReview}
          </button>
        </div>
      </form>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-md border border-red-200">{error}</div>}

      {analysis && (
        <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.summaryTitle}</h3>
          <div className="text-gray-700 whitespace-pre-wrap">{analysis}</div>
        </div>
      )}
    </div>
  );
};

export default ContractReviewTool;