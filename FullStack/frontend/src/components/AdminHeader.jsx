import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import dataService from '../services/DataService';


const AdminHeader = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 2) {
      setIsSearching(true);
      try {
        const response = await dataService.admin.searchGlobal(value); 
        console.log("نتائج البحث:", response.data);
      } catch (error) {
        console.error("مشكلة في البحث:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-[#0F111A]/80 backdrop-blur-md sticky top-0 z-50">
      
      {/* 1. Page Title (Matches Screenshot) */}
      <div className="flex flex-col justify-center">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">
          Management
        </h3>
        <h1 className="text-2xl font-black text-white tracking-tight leading-none">
          {title}
        </h1>
      </div>

      {/* 2. Global Search Bar */}
      <div className="relative w-96 mx-8 hidden lg:block">
        <Search 
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            isSearching ? 'text-yellow-500 animate-pulse' : 'text-gray-500'
          }`} 
          size={16} 
        />
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="البحث عن القضايا، المحامين، أو العملاء..." 
          className="w-full bg-[#161922] border border-white/5 rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-500/30 transition-all text-gray-200 placeholder:text-gray-600"
        />
      </div>

      {/* 3. Notifications & Profile (Matches Screenshot) */}
      <div className="flex items-center gap-6">
        <button className="relative p-2.5 text-gray-400 hover:text-white transition-colors bg-[#161922] rounded-full border border-white/5">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#161922]"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-200 leading-tight">Mahmoud Admin</p>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
              System Controller
            </p>
          </div>
          {/* Avatar with yellow text/border and dark background */}
          <div className="w-11 h-11 rounded-full bg-yellow-500/5 border border-yellow-600/50 flex items-center justify-center text-yellow-500 font-black text-sm shadow-sm">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
