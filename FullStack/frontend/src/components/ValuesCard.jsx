import React from 'react';

const icons = {
  'Trust & Security': '🛡️',
  'Client Satisfaction': '🤝',
  'Excellence': '🏅',
};

const ValuesCard = ({ title, description }) => {
  const icon = icons[title] || '⚖️'; // Added a scale icon as a generic legal default

  return (
    <div className="value-card-container flex flex-col items-center text-center p-10 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="value-icon-wrapper text-5xl mb-6 drop-shadow-sm">
        {icon}
      </div>
      <h4 className="text-2xl font-bold mb-4 text-gray-900">
        {title}
      </h4>
      <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ValuesCard;