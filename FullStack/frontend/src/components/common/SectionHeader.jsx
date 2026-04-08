// ═══════════════════════════════════════════════════════════════════════════════════
// 📊 مكون رأس القسم المخصص - Custom Section Header Component
// ═══════════════════════════════════════════════════════════════════════════════════
// رأس عنوان جميل لبداية الأقسام مع عنوان رئيسي وعنوان فرعي
// Display a section heading with title and optional subtitle for organizing page sections
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';

// 📌 Props: title (العنوان الرئيسي), subtitle (عنوان فرعي), className (تصاميم إضافية)
const SectionHeader = ({ title, subtitle, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
    {subtitle && <p className="text-gray-600 dark:text-gray-300 mt-2">{subtitle}</p>}
  </div>
);

export default SectionHeader;
