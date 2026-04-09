// ═══════════════════════════════════════════════════════════════════════════════════
// 📊 مكون بطاقة قيم الشركة - Company Values Card Component
// ═══════════════════════════════════════════════════════════════════════════════════
// عرض قيم الشركة مع icons ووصف بفراغو مصمم جمل
// Display company values with emoji icons and descriptions in a beautiful card layout
// ────────────────────────────────────────────────────────────═════════════════════════════

import React from 'react';

// 📊 Dictionary لِموض الآيقونات - Icons mapping for each value
const icons = {
  'Trust & Security': '🛡️',
  'Client Satisfaction': '🤝',
  'Excellence': '🏅',
};

const ValuesCard = ({ title, description }) => {
  // 💳 الايقون المناسب للقيمة الحالية - Get the appropriate icon for this value
  // لو القيمة ما موجودة، بنستخدم المزراع كيقون افتراضي
  const icon = icons[title] || '⚖️'; // Added a scale icon as a generic legal default

  // 📍 Return section starts here
  return (
    <div className="value-card-container flex flex-col items-center text-center p-10 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="value-icon-wrapper text-5xl mb-6 drop-shadow-sm">
        {icon}
      </div>
      <h4 className="text-2xl font-bold mb-4 text-gray-900">
        {title}
      </h4>
      {/* 📄 وصف القيمة - Description of the value */}
      <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ValuesCard;
