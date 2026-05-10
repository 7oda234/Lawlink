import React, { useState } from 'react';
import dataService from '../../services/DataService';
import { Globe } from 'lucide-react';

const DocumentDraftingTool = () => {
  const [lang, setLang] = useState('ar');
  const [formData, setFormData] = useState({ documentType: 'NDA', parties: '', keyTerms: '', jurisdiction: 'Egypt' });
  const [draft, setDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'AI Document Drafting',
      docType: 'Document Type',
      parties: 'Parties Involved',
      partiesPlaceholder: 'e.g., Company A and John Doe',
      terms: 'Key Terms & Conditions',
      termsPlaceholder: 'Outline specific conditions, compensation, durations, etc.',
      note: 'This draft is designed for Egyptian law and Egyptian jurisdiction only.',
      btnDefault: 'Generate Draft',
      btnLoading: 'Drafting...',
      errorMsg: 'Failed to generate document draft.',
      draftTitle: 'Generated Draft',
      copyBtn: 'Copy Text',
      options: [
        { val: 'NDA', label: 'Non-Disclosure Agreement (NDA)' },
        { val: 'Employment Contract', label: 'Employment Contract' },
        { val: 'Service Agreement', label: 'Service Agreement' },
        { val: 'Cease and Desist', label: 'Cease and Desist Letter' }
      ]
    },
    ar: {
      title: 'صياغة المستندات بالذكاء الاصطناعي',
      docType: 'نوع المستند',
      parties: 'الأطراف المعنية',
      partiesPlaceholder: 'مثال: الشركة أ و أحمد محمد',
      terms: 'الشروط والأحكام الأساسية',
      termsPlaceholder: 'حدد الشروط الخاصة، التعويضات، المدد الزمنية، إلخ.',
      note: 'هذه المسودة مصممة لتتوافق مع القانون المصري وجهة الاختصاص المصرية فقط.',
      btnDefault: 'إنشاء المسودة',
      btnLoading: 'جاري الصياغة...',
      errorMsg: 'فشل في إنشاء مسودة المستند.',
      draftTitle: 'المسودة المُنشأة',
      copyBtn: 'نسخ النص',
      options: [
        { val: 'NDA', label: 'اتفاقية عدم إفشاء (NDA)' },
        { val: 'Employment Contract', label: 'عقد عمل' },
        { val: 'Service Agreement', label: 'اتفاقية تقديم خدمات' },
        { val: 'Cease and Desist', label: 'إنذار بالتوقف والامتناع' }
      ]
    }
  };
  const t = content[lang];

  const handleDraft = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setDraft(null);

    try {
      const response = await dataService.aiTools.draft(formData);
      const payload = response.data?.data || response.data;
      if (response.data?.success && payload?.draft) {
        setDraft(payload.draft);
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
      
      <form onSubmit={handleDraft} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.docType}</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              value={formData.documentType}
              onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
            >
              {t.options.map(opt => <option key={opt.val} value={opt.val}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.parties}</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder={t.partiesPlaceholder}
              value={formData.parties}
              onChange={(e) => setFormData({ ...formData, parties: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.terms}</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 min-h-[100px]"
            placeholder={t.termsPlaceholder}
            value={formData.keyTerms}
            onChange={(e) => setFormData({ ...formData, keyTerms: e.target.value })}
            required
          />
        </div>

        <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-md p-4">
          {t.note}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md disabled:bg-purple-400"
        >
          {isLoading ? t.btnLoading : t.btnDefault}
        </button>
      </form>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      {draft && (
        <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
            {t.draftTitle}
            <button 
              onClick={() => navigator.clipboard.writeText(draft)}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded"
            >
              {t.copyBtn}
            </button>
          </h3>
          <div className="text-gray-700 whitespace-pre-wrap font-serif bg-white p-4 border border-gray-300 rounded-sm" dir="auto">{draft}</div>
        </div>
      )}
    </div>
  );
};

export default DocumentDraftingTool;