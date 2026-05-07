import React, { useState } from 'react';
import dataService from '../../services/DataService';

const ContractReviewTool = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReview = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a PDF contract to review.');
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
        throw new Error(response.data?.message || 'Failed to analyze the contract.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to analyze the contract.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">AI Contract Review</h2>
      
      <form onSubmit={handleReview} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Contract (PDF):</label>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={isLoading}
            />
            <p className="mt-2 text-sm text-slate-500">Upload standard contract file formats for Egyptian law review.</p>
            {file && <p className="mt-2 text-sm text-slate-500">Selected file: <strong>{file.name}</strong></p>}
          </div>
          <button
            type="submit"
            disabled={isLoading || !file}
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md disabled:bg-indigo-400"
          >
            {isLoading ? 'Analyzing...' : 'Review Contract'}
          </button>
        </div>
      </form>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-md border border-red-200">{error}</div>}

      {analysis && (
        <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Summary:</h3>
          <div className="text-gray-700 whitespace-pre-wrap">{analysis}</div>
        </div>
      )}
    </div>
  );
};

export default ContractReviewTool;
