// ═══════════════════════════════════════════════════════════════════════════════════
// 📋 مكون حقل الإدخال المخصص - Custom Input Field Component
// ═══════════════════════════════════════════════════════════════════════════════════
// مكون للأحقال الضيقة (=حقول النصوص , البريد, الرقم) مع support للموضوع dark
// Styled input field for text, email, numbers, etc. with light/dark theme support
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';

// 📌 Props: label, id, type, value, onChange, placeholder, className
const InputField = ({ label, id, type = 'text', value, onChange, placeholder, className = '' }) => (
  {/* 📋 عنصر الليبل (label) للحقل - Label wrapper element */}
  <label htmlFor={id} className={`w-full mb-4 block ${className}`}>
    {/* 📝 نص الليبل - Label text */}
    {label && <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</span>}
    {/* 🖱️ عنصر الإدخال الفعلي - Actual input element */}
    <input
      id={id}  {/* معرف فريد للحقل */}
      value={value}  {/* قيمة الحقل الحالية */}
      onChange={onChange}  {/* دالة تتنفذ عند التغيير */}
      type={type}  {/* نوع الحقل: text, email, password, etc */}
      placeholder={placeholder}  {/* نص المرشد - placeholder text */}
      className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  {/* تصاميم الحقل */}
    />
  </label>
);

export default InputField;
