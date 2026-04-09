<<<<<<< Updated upstream
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClientCasesPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">My Cases</h1>
          <p className="text-gray-500 mb-8 text-lg">Track all submitted cases and their statuses.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <div className="rounded-xl border border-gray-200 p-5 bg-black text-white"> 
              <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
              <ul className="space-y-2 text-sm">
                <li>• High-impact, professional UI</li>
                <li>• Fast, responsive layout</li>
                <li>• Consistent style language</li>
              </ul>
=======
// ═══════════════════════════════════════════════════════════════════════════════════
// 📁 قضاياي - Client Cases Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة قضايا العميل - عرض جميع قضايا العميل الحالية والمنتهية
// Display all client cases and their statuses - view, filter and manage cases
// ───────────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/DataService'; // ⚙️ خدمة البيانات

const ClientCasesPage = () => {
  // 📊 حالات البيانات
  const [cases, setCases] = useState([]); // قائمة القضايا
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // رسالة الخطأ
  const [filter, setFilter] = useState('all'); // فلتر حالة القضية

  // 📥 تحميل قضايا العميل عند الدخول
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        // 🔗 طلب قضايا المستخدم من الخادم
        const response = await dataService.cases.getUserCases();
        setCases(response.data || []);
        setError(null);
      } catch (err) {
        setError('خطأ في تحميل القضايا'); // Error loading cases
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  // 🔍 تصفية القضايا حسب الحالة
  const filteredCases = cases.filter(caseItem => {
    if (filter === 'all') return true;
    return caseItem.status?.toLowerCase() === filter.toLowerCase();
  });

  // 🎨 تحديد اللون بناءً على حالة القضية
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 📅 تنسيق التاريخ
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200&h=800&fit=crop")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* ☀️ طبقة شفافية */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        <main className="flex-grow pt-32 pb-16">
          <section className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* 🎯 رأس الصفحة */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">📁 قضاياي</h1>
              <p className="text-white text-lg opacity-90">عرض ومتابعة جميع قضاياك القانونية</p>
>>>>>>> Stashed changes
            </div>

            {/* ⚠️ رسائل الخطأ */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* 🎛️ تصفية القضايا */}
            <div className="mb-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">تصفية القضايا</h3>
              <div className="flex flex-wrap gap-3">
                {['all', 'active', 'pending', 'closed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      filter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {status === 'all' ? 'جميع القضايا' : status === 'active' ? 'قضايا نشطة' : status === 'pending' ? 'قيد الانتظار' : 'مقفولة'}
                  </button>
                ))}
              </div>
            </div>

            {/* 📦 قائمة القضايا */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-white mt-4">جاري التحميل...</p>
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-2xl text-gray-600">📭 لا توجد قضايا</p>
                <p className="text-gray-500 mt-2">يمكنك إنشاء قضية جديدة من قسم إرسال القضايا</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredCases.map(caseItem => (
                  <div
                    key={caseItem.case_id}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105 duration-300"
                  >
                    {/* 🗂️ رأس بطاقة القضية */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          القضية #{caseItem.case_id}
                        </h3>
                        <p className="text-gray-600">{caseItem.case_title}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </div>

                    {/* 📋 تفاصيل القضية */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* نوع القضية */}
                      <div className="flex items-center">
                        <span className="text-gray-500">🏛️ النوع:</span>
                        <span className="font-semibold text-gray-900 mr-2">{caseItem.case_type}</span>
                      </div>

                      {/* المحامي المسؤول */}
                      <div className="flex items-center">
                        <span className="text-gray-500">👨‍⚖️ المحامي:</span>
                        <span className="font-semibold text-gray-900 mr-2">{caseItem.lawyer_name || 'لم يتم التعيين'}</span>
                      </div>

                      {/* تاريخ الإنشاء */}
                      <div className="flex items-center">
                        <span className="text-gray-500">📅 التاريخ:</span>
                        <span className="font-semibold text-gray-900 mr-2">{formatDate(caseItem.created_at)}</span>
                      </div>
                    </div>

                    {/* 📝 الوصف */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {caseItem.case_description || 'لا يوجد وصف'}
                      </p>
                    </div>

                    {/* 🔘 أزرار الإجراء */}
                    <div className="flex gap-3">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        👁️ عرض التفاصيل
                      </button>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        📁 الملفات
                      </button>
                      <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        💬 رسائل
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

              </div>
    </div>
  );
};

export default ClientCasesPage;
