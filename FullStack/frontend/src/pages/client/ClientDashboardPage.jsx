<<<<<<< Updated upstream
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClientDashboardPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">Client Dashboard</h1>
          <p className="text-gray-500 mb-8 text-lg">Overview of your client activities, cases, payments and notifications.</p>
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
              <p className="text-gray-700">This page is scaffolded for client dashboard with a bold black-and-white theming and a subtle accent tone consistent with LawLink branding. Extend it with actual fields and business logic as needed.</p>
            </div>
          </div>
=======
// ═══════════════════════════════════════════════════════════════════════════════════
// � لوحة تحكم العميل - Client Dashboard Page
// ═══════════════════════════════════════════════════════════════════════════════════
// اللوحة الرئيسية للعميل - عرض الإحصائيات والقضايا والرسائل والمدفوعات
// Main dashboard for clients - view statistics, cases, messages and payments
// ───────────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/DataService'; // ⚙️ خدمة البيانات

const ClientDashboardPage = () => {
  // 📊 حالات البيانات - States لتخزين البيانات
  const [dashboardData, setDashboardData] = useState({
    totalCases: 0, // إجمالي القضايا
    activeCases: 0, // القضايا النشطة
    totalPayments: 0, // إجمالي المدفوعات
    pendingMessages: 0 // الرسائل المعلقة
  });
  const [recentCases, setRecentCases] = useState([]); // أحدث القضايا
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // رسالة الخطأ

  // 📥 تحميل بيانات لوحة التحكم
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 🔗 طلب جميع البيانات من الخادم بشكل متوازي
        const [casesRes, paymentsRes, messagesRes] = await Promise.all([
          dataService.cases.getUserCases(),
          dataService.payments.getUserPayments?.() || Promise.resolve({ data: [] }),
          dataService.messages.getUnreadCount?.() || Promise.resolve({ data: { count: 0 } })
        ]);

        // 📈 معالجة البيانات المستقبلة
        const cases = casesRes.data || [];
        const activeCasesCount = cases.filter(c => c.status?.toLowerCase() === 'active').length;
        const totalPayment = (paymentsRes.data || []).reduce((sum, p) => sum + (p.amount || 0), 0);

        setDashboardData({
          totalCases: cases.length,
          activeCases: activeCasesCount,
          totalPayments: totalPayment,
          pendingMessages: messagesRes.data?.count || 0
        });

        // 🔄 تعيين آخر 3 قضايا
        setRecentCases(cases.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error('خطأ في تحميل لوحة التحكم:', err);
        setError('خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 💳 بطاقة إحصائية - Statistics Card Component
  const StatCard = ({ icon, title, value, color }) => (
    <div className={`${color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-opacity-80 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
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
        backgroundImage: 'url("https://images.unsplash.com/photo-1485182708849-e193b0f817d6?w=1200&h=800&fit=crop")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* ☀️ طبقة الشفافية */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        <main className="flex-grow pt-32 pb-16">
          <section className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* 🎯 رأس الصفحة */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
                👋 مرحباً وسهلاً
              </h1>
              <p className="text-xl text-white opacity-90 drop-shadow">لوحة تحكمك الشاملة لإدارة قضاياك والمراسلات</p>
            </div>

            {/* ⚠️ رسائل الخطأ */}
            {error && (
              <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* 📊 الإحصائيات - Statistics Cards */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                  icon="📁"
                  title="إجمالي القضايا"
                  value={dashboardData.totalCases}
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <StatCard
                  icon="⚡"
                  title="القضايا النشطة"
                  value={dashboardData.activeCases}
                  color="bg-gradient-to-br from-green-500 to-green-600"
                />
                <StatCard
                  icon="💰"
                  title="إجمالي المدفوعات"
                  value={`${dashboardData.totalPayments.toLocaleString('ar-EG')} ج.م`}
                  color="bg-gradient-to-br from-purple-500 to-purple-600"
                />
                <StatCard
                  icon="💬"
                  title="الرسائل المعلقة"
                  value={dashboardData.pendingMessages}
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
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
              <>
                {/* 📌 أحدث القضايا */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                    <h2 className="text-2xl font-bold text-white">📋 آخر القضايا</h2>
                  </div>

                  <div className="p-6">
                    {recentCases.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">لا توجد قضايا حالياً</p>
                    ) : (
                      <div className="space-y-4">
                        {recentCases.map(caseItem => (
                          <div
                            key={caseItem.case_id}
                            className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition rounded"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">
                                  القضية #{caseItem.case_id}
                                </h3>
                                <p className="text-gray-600 mt-1">{caseItem.case_title}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                  محامي: {caseItem.lawyer_name || 'لم يتم التعيين'}
                                </p>
                              </div>
                              <span className="px-4 py-2 rounded-full font-semibold text-sm bg-blue-100 text-blue-800">
                                {caseItem.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 🔗 الروابط السريعة - Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* رابط القضايا */}
                  <button className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105 text-center group">
                    <div className="text-5xl mb-4">📁</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">عرض جميع القضايا</h3>
                    <p className="text-gray-600 text-sm mb-4">تتبع جميع قضاياك والملفات المرتبطة بها</p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition">
                      انتقل الآن
                    </button>
                  </button>

                  {/* رابط الرسائل */}
                  <button className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105 text-center group">
                    <div className="text-5xl mb-4">💬</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">الرسائل والمحادثات</h3>
                    <p className="text-gray-600 text-sm mb-4">تواصل مع محاميك والفريق القانوني</p>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg group-hover:bg-green-700 transition">
                      انتقل الآن
                    </button>
                  </button>

                  {/* رابط المدفوعات */}
                  <button className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105 text-center group">
                    <div className="text-5xl mb-4">💳</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">المدفوعات والفواتير</h3>
                    <p className="text-gray-600 text-sm mb-4">إدارة رسوم القضايا والمدفوعات</p>
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-lg group-hover:bg-purple-700 transition">
                      انتقل الآن
                    </button>
                  </button>
                </div>
              </>
            )}
          </section>
        </main>

              </div>
    </div>
  );
};

export default ClientDashboardPage;
