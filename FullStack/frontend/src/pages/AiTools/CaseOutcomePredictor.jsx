import React, { useState } from 'react';
import dataService from '../../services/DataService';

const CaseOutcomePredictor = () => {
  const [formData, setFormData] = useState({ facts: '', jurisdiction: 'Egypt' });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        throw new Error(response.data?.message || 'Prediction failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Prediction failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Case Outcome Predictor</h2>
      
      <form onSubmit={handlePredict} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction (Egypt only)</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md outline-none bg-slate-50 cursor-not-allowed"
            value="Egypt"
            disabled
          />
          <p className="text-xs text-slate-500 mt-2">This prediction is tuned for Egyptian courts, law, and legal procedures.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Case Facts</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 min-h-[120px]"
            placeholder="Describe the key facts of the case..."
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
          {isLoading ? 'Generating Prediction...' : 'Predict Outcome'}
        </button>
      </form>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}

      {prediction && (
        <div className="bg-teal-50 p-6 rounded-md border border-teal-200">
          <h3 className="text-lg font-bold text-teal-900 mb-2">
            Estimated Success: {typeof prediction.probability === 'number' ? `${Math.round(prediction.probability * 100)}%` : prediction.probability || 'Unknown'}
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{prediction.reasoning || 'The model provided no detailed explanation.'}</p>
        </div>
      )}
    </div>
  );
};

export default CaseOutcomePredictor;
