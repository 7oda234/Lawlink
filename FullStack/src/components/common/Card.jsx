import React from 'react';

const Card = ({ title, children, className = '' }) => (
  <article className={`rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm ${className}`}>
    {title && <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3">{title}</h3>}
    {children}
  </article>
);

export default Card;
