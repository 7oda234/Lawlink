import React, { useState } from 'react';
import dataService from '../../services/DataService';

const ResearchTool = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await dataService.aiTools.research({ query, jurisdiction: 'Egypt' });
      const payload = response.data?.data || response.data;
      if (response.data?.success && payload) {
        setResult(payload);
      } else {
        throw new Error(response.data?.message || 'No research result returned from the server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to connect to the research service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden transition-all duration-300">
      
      {/* Premium Header */}
      <div className="bg-slate-900 px-8 py-6 flex items-center gap-3">
        <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">AI Legal Research</h2>
          <p className="text-slate-400 text-sm mt-1">Egyptian law only — focused on local regulations and precedent.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        <form onSubmit={handleSearch} className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            What legal concept or precedent are you researching today?
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g., Requirements for forming an LLC in Delaware..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Conduct Research'
              )}
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="flex items-start gap-3 p-4 mb-8 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Empty State (Shows when no result and not loading) */}
        {!result && !isLoading && !error && (
          <div className="text-center py-12 px-6 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
            <svg className="w-12 h-12 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 className="text-sm font-semibold text-slate-600">Ready to assist</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">Enter a legal concept, precedent, or specific scenario above to generate a comprehensive AI-driven analysis.</p>
          </div>
        )}

        {/* Results State */}
        {result && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="text-md font-bold text-slate-800">Research Findings</h3>
            </div>
            
            <div className="p-6">
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                {result.answer}
              </div>
            </div>
            
            {/* Optional Footer for the result card */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
              <span>Disclaimer: AI-generated content. Not formal legal advice.</span>
              <button 
                onClick={() => navigator.clipboard.writeText(result.answer)}
                className="hover:text-blue-600 font-medium transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchTool;
