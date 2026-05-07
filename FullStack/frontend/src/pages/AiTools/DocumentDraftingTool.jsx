import React, { useState } from 'react';
import dataService from '../../services/DataService';

const DocumentDraftingTool = () => {
  const [formData, setFormData] = useState({ documentType: 'NDA', parties: '', keyTerms: '', jurisdiction: 'Egypt' });
  const [draft, setDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        throw new Error(response.data?.message || 'Failed to generate document draft.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to generate document draft.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">AI Document Drafting</h2>
      
      <form onSubmit={handleDraft} className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              value={formData.documentType}
              onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
            >
              <option value="NDA">Non-Disclosure Agreement (NDA)</option>
              <option value="Employment Contract">Employment Contract</option>
              <option value="Service Agreement">Service Agreement</option>
              <option value="Cease and Desist">Cease and Desist Letter</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parties Involved</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              placeholder="e.g., Company A and John Doe"
              value={formData.parties}
              onChange={(e) => setFormData({ ...formData, parties: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Terms & Conditions</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 min-h-[100px]"
            placeholder="Outline specific conditions, compensation, durations, etc."
            value={formData.keyTerms}
            onChange={(e) => setFormData({ ...formData, keyTerms: e.target.value })}
            required
          />
        </div>

        <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-md p-4">
          This draft is designed for Egyptian law and Egyptian jurisdiction only.
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md disabled:bg-purple-400"
        >
          {isLoading ? 'Drafting...' : 'Generate Draft'}
        </button>
      </form>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      {draft && (
        <div className="bg-gray-50 p-6 rounded-md border border-gray-200 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
            Generated Draft
            <button 
              onClick={() => navigator.clipboard.writeText(draft)}
              className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded"
            >
              Copy Text
            </button>
          </h3>
          <div className="text-gray-700 whitespace-pre-wrap font-serif bg-white p-4 border border-gray-300 rounded-sm">{draft}</div>
        </div>
      )}
    </div>
  );
};

export default DocumentDraftingTool;
