import React from 'react';

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, className = '' }) => (
  <label htmlFor={id} className={`w-full mb-4 block ${className}`}>
    {label && <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</span>}
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </label>
);

export default InputField;
