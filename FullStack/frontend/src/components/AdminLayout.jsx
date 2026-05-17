import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

import { useLanguage } from '../context/LanguageContextObject';

const AdminLayout = ({ children, title, description }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'eg';

  return (
    <div
      className="min-h-screen flex bg-[#0F111A] text-gray-100 font-sans"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Sidebar Component */}
      <AdminSidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto h-screen bg-[#0F111A] relative">
        
        {/* Header Component */}
        <AdminHeader title={title} description={description} />

        {/* Page Content */}
        <div className="p-10 max-w-7xl mx-auto">
          {description && (
            <div className="mb-8 p-6 bg-[#161922] border border-white/5 rounded-2xl">
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                {description}
              </p>
            </div>
          )}

          <div className="animate-in fade-in zoom-in-95 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
