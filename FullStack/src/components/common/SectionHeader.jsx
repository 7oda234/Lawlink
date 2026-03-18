import React from 'react';

const SectionHeader = ({ title, subtitle, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
    {subtitle && <p className="text-gray-600 dark:text-gray-300 mt-2">{subtitle}</p>}
  </div>
);

export default SectionHeader;
