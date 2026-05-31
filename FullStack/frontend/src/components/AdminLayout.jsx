import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useLanguage } from '../context/LanguageContextObject';

const AdminLayout = ({ children, title, description }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <div
      className={`min-h-screen flex bg-gray-50 dark:bg-[#0F111A] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 ${
        isRTL ? 'flex-row-reverse' : 'flex-row'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Dynamic side orientation rendering */}
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto h-screen relative flex flex-col w-full min-w-0">
        <AdminHeader title={title} description={description} />

        {/* 🚀 MAXIMIZED INNER BOUNDARIES: Swapped out heavy paddings for true edge-to-edge extension */}
        <div className="p-4 md:p-6 lg:p-8 w-full max-w-none mx-auto flex-1 flex flex-col">
          {description && (
            <div className="mb-6 p-6 bg-white dark:bg-[#161922] border border-gray-200 dark:border-white/5 rounded-2xl shadow-md dark:shadow-none w-full">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold leading-relaxed">
                {description}
              </p>
            </div>
          )}

          <div className="animate-in fade-in zoom-in-95 duration-500 w-full flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
