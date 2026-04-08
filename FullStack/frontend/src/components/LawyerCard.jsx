// ═══════════════════════════════════════════════════════════════════════════════════
// ⚡️ بطاقة المحامي - Lawyer Card Component
// ═══════════════════════════════════════════════════════════════════════════════════
// تعرض معلومات محامي جميلة (الاسم، الصورة، التقييم، الخبرة)
// وغاية مهمة بحزر موعد أو عرض الملف الرسلي
// Displays lawyer info with ratings, experience, and action buttons
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { MapPin, Star, Briefcase } from 'lucide-react';

// 📌 Props: lawyer (كائن به معلومات المحامي - lawyer object with all details)
const LawyerCard = ({ lawyer }) => {
  // 📍 Return section starts here
  return (
    {/* 📋 حاوية البطاقة الرئيسية - Main card container */}
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row group">
      {/* 🞨 صورة الملف الشخصي - Profile Image */}
      <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden bg-gray-100">
        {/* 🞨 الصورة بتبقا في hover - Image with hover zoom effect */}
        <img 
          src={lawyer.image} 
          alt={lawyer.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 📝 تفاصيل المحامي - Lawyer Details Section */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* 📊 رأس البصلة (الاسم والتقييم) - Header with name and rating */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                {lawyer.name}
              </h3>
              <p className="text-sm font-medium text-yellow-600 mb-3">{lawyer.specialty}</p>
            </div>
            {/* ⭐ بادج التقييم - Rating Badge */}
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold text-gray-700">{lawyer.rating}</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              <span>{lawyer.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Briefcase size={16} />
              <span>{lawyer.experience} Years Experience</span>
            </div>
          </div>
        </div>

        {/* 🔘 الازرار الفعلية - Action Buttons */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <button className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-sm">
            View Profile
          </button>
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition">
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
