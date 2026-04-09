<<<<<<< Updated upstream
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const LawyerDashboardPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">Lawyer Dashboard</h1>
          <p className="text-gray-500 mb-8 text-lg">Attorney dashboard with pending cases and messages.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <div className="rounded-xl border border-gray-200 p-5 bg-black text-white"> 
              <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
              <ul className="space-y-2 text-sm">
                <li>• High-impact, professional UI</li>
                <li>• Fast, responsive layout</li>
                <li>• Consistent style language</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 p-5"> 
              <h3 className="text-xl font-bold mb-2">Overview</h3>
              <p className="text-gray-700">This page is scaffolded for lawyer dashboard with a bold black-and-white theming and a subtle accent tone consistent with LawLink branding. Extend it with actual fields and business logic as needed.</p>
            </div>
          </div>
=======
// ═══════════════════════════════════════════════════════════════════════════════════
// ⚡️ لوحة تحكم المحامي - Lawyer Dashboard Page
// ═══════════════════════════════════════════════════════════════════════════════════
// لوحة المحامي - عرض قضايا معالذة، رسالب من أعملاء
// Lawyer's main dashboard - view pending cases and client messages
// ────────────────────────────────────────═════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/DataService'; // ⚙️ خدمة البيانات

const LawyerDashboardPage = () => {
  // 📊 حالات البيانات
  const [dashboardData, setDashboardData] = useState({
    totalCases: 0, // إجمالي القضايا
    activeCases: 0, // القضايا النشطة
    winRate: 0, // نسبة الكسب
    avgRating: 0 // متوسط التقييم
  });
  const [assignedCases, setAssignedCases] = useState([]); // القضايا المعينة
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // رسالة الخطأ

  // 📥 تحميل بيانات لوحة المحامي
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 🔗 طلب بيانات القضايا والعملاء
        const [casesRes, lawyerRes] = await Promise.all([
          dataService.cases.getUserCases(),
          dataService.users.getById(JSON.parse(localStorage.getItem('user'))?.id)
        ]);

        const cases = casesRes.data || [];
        const activeCasesCount = cases.filter(c => c.status?.toLowerCase() === 'active').length;
        const closedCases = cases.filter(c => c.status?.toLowerCase() === 'closed').length;
        const successfulCases = cases.filter(c => c.case_outcome === 'won').length;

        // 📈 حساب الإحصائيات
        setDashboardData({
          totalCases: cases.length,
          activeCases: activeCasesCount,
          winRate: cases.length > 0 ? ((successfulCases / closedCases) * 100).toFixed(1) : 0,
          avgRating: lawyerRes.data?.rating || 0
        });

        // 🔄 تعيين أحدث القضايا
        setAssignedCases(cases.slice(0, 5));
        setError(null);
      } catch (err) {
        console.error('خطأ في تحميل البيانات:', err);
        setError('خطأ في تحميل بيانات لوحة التحكم');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 📊 بطاقة إحصائية
  const StatCard = ({ icon, title, value, unit = '' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {value}{unit}
          </p>
>>>>>>> Stashed changes
        </div>
        <span className="text-5xl opacity-30">{icon}</span>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* ☀️ طبقة الشفافية */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        <main className="flex-grow pt-32 pb-16">
          <section className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* 🎯 رأس الصفحة */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
                👨‍⚖️ لوحتي القانونية
              </h1>
              <p className="text-xl text-white opacity-90 drop-shadow">إدارة قضاياك وعملائك بكفاءة احترافية</p>
            </div>

            {/* ⚠️ رسائل الخطأ */}
            {error && (
              <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* 📊 الإحصائيات */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                  icon="📁"
                  title="إجمالي القضايا"
                  value={dashboardData.totalCases}
                />
                <StatCard
                  icon="⚡"
                  title="القضايا النشطة"
                  value={dashboardData.activeCases}
                />
                <StatCard
                  icon="🏆"
                  title="نسبة الكسب"
                  value={dashboardData.winRate}
                  unit="%"
                />
                <StatCard
                  icon="⭐"
                  title="متوسط التقييم"
                  value={dashboardData.avgRating}
                />
              </div>
            )}

            {loading && (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-white mt-4">جاري تحميل البيانات...</p>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 📋 القضايا المسندة */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <h2 className="text-2xl font-bold text-white">📋 القضايا المسندة</h2>
                  </div>

                  <div className="p-6">
                    {assignedCases.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">لا توجد قضايا مسندة حالياً</p>
                    ) : (
                      <div className="space-y-4">
                        {assignedCases.map(caseItem => (
                          <div
                            key={caseItem.case_id}
                            className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition rounded"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                {caseItem.case_title}
                              </h3>
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                {caseItem.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              📅 {new Date(caseItem.created_at).toLocaleDateString('ar-EG')}
                            </p>
                            <p className="text-sm text-gray-700">{caseItem.case_description?.slice(0, 150)}...</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 🔗 الروابط السريعة */}
                <div className="space-y-4">
                  {/* رابط إدارة القضايا */}
                  <button className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center group">
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">إدارة القضايا</h3>
                    <p className="text-xs text-gray-600 mb-3">عرض وتحديث قضاياك</p>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg group-hover:bg-blue-700 transition w-full">
                      فتح
                    </button>
                  </button>

                  {/* رابط العملاء */}
                  <button className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center group">
                    <div className="text-4xl mb-3">👥</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">عملائي</h3>
                    <p className="text-xs text-gray-600 mb-3">الاتصال بالعملاء</p>
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg group-hover:bg-green-700 transition w-full">
                      فتح
                    </button>
                  </button>

                  {/* رابط الجدول الزمني */}
                  <button className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center group">
                    <div className="text-4xl mb-3">📅</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">جدولي الزمني</h3>
                    <p className="text-xs text-gray-600 mb-3">إدارة المواعيد والجلسات</p>
                    <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg group-hover:bg-purple-700 transition w-full">
                      فتح
                    </button>
                  </button>

                  {/* رابط الملف الشخصي */}
                  <button className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition text-center group">
                    <div className="text-4xl mb-3">🎯</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">ملفي الشخصي</h3>
                    <p className="text-xs text-gray-600 mb-3">بيانات واحصائياتي</p>
                    <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg group-hover:bg-orange-700 transition w-full">
                      فتح
                    </button>
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

              </div>
    </div>
  );
};

export default LawyerDashboardPage;
