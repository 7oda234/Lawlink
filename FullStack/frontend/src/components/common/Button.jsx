// ═══════════════════════════════════════════════════════════════════════════════════
// 🔘 مكون الزرار المخصص - Custom Button Component
// ═══════════════════════════════════════════════════════════════════════════════════
// مكون قابل لإعادة الاستخدام للأزرار في كل التطبيق بتصميم موحد
// Reusable button component with consistent styling throughout the app
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';

// 📌 Props: children (محتوى الزرار), type (نوع الزرار), className (تصاميم إضافية), onClick (دالة الضغط)
const Button = ({ children, type = 'button', className = '', onClick }) => (
  {/* 🖱️ عنصر الزرار الفعلي - Actual button element */}
  <button
    type={type}  {/* 📝 نوع الزرار - button, submit, reset */}
    onClick={onClick}  {/* 🔄 دالة بتتنفذ لما يضغط على الزرار */}
    className={`rounded-lg px-4 py-2 font-semibold transition ${className}`}  {/* 🎨 التصاميم مع تأثيرات سلسة */}
  >
    {children}  {/* 📌 محتوى الزرار - نص أو icons */}
  </button>
);

export default Button;
