// ═══════════════════════════════════════════════════════════════════════════════════
// Team Card
// ═══════════════════════════════════════════════════════════════════════════════════
// بطاقة فريق - Team member card component
// Card component showing team member info.
// ───────────────────────────────────────────────────────────────────────────────────
import React from 'react';

const TeamCard = ({ name, role, img }) => {
  // 📍 Return section starts here
  return (
    <div className="team-card-wrapper flex flex-col items-center text-center cursor-pointer group">
      <div className="team-card-image-wrapper w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-gray-50 shadow-sm">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mb-1 text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
        {name}
      </h3>
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {role}
      </p>
    </div>
  );
};

export default TeamCard;
