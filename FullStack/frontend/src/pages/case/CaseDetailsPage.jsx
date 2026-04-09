<<<<<<< Updated upstream
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CaseDetailsPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">Case Details</h1>
          <p className="text-gray-500 mb-8 text-lg">Case timeline, documents, and status details.</p>
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
              <p className="text-gray-700">This page is scaffolded for case details with a bold black-and-white theming and a subtle accent tone consistent with LawLink branding. Extend it with actual fields and business logic as needed.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);
=======
// ═══════════════════════════════════════════════════════════════════════════════════
// Case Details Page
// ═══════════════════════════════════════════════════════════════════════════════════
// عن Case Details Page - File overview
// Case Details Page component or module.
// ───────────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataService } from '../../services/DataService'; // ⚙️ خدمة البيانات

const CaseDetailsPage = () => {
  // 🔗 استخراج معرف القضية من الرابط URL
  const { caseId } = useParams();

  // 📊 حالات البيانات
  const [caseData, setCaseData] = useState(null); // بيانات القضية
  const [timeline, setTimeline] = useState([]); // خط زمني للقضية
  const [documents, setDocuments] = useState([]); // ملفات القضية
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // رسالة خطأ
  const [activeTab, setActiveTab] = useState('overview'); // التبويب النشط

  // 📥 تحميل بيانات القضية
  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        setLoading(true);
        // 🔗 طلب تفاصيل القضية من الخادم
        const [caseRes, timelineRes, docsRes] = await Promise.all([
          dataService.cases.getById(caseId),
          dataService.cases.getTimeline?.(caseId) || Promise.resolve({ data: [] }),
          dataService.documents.getByCaseId?.(caseId) || Promise.resolve({ data: [] })
        ]);

        setCaseData(caseRes.data);
        setTimeline(timelineRes.data || []);
        setDocuments(docsRes.data || []);
        setError(null);
      } catch (err) {
        console.error('خطأ في تحميل تفاصيل القضية:', err);
        setError('خطأ في تحميل بيانات القضية');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  // 🎨 دالة لتحديد لون الحالة
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200&h=800&fit=crop")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      {/* ☀️ طبقة الشفافية */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
                
        <main className="flex-grow pt-32 pb-16">
          <section className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* 🎯 رأس الصفحة */}
            {!loading && caseData && (
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">📋 {caseData.case_title}</h1>
                <p className="text-white text-lg opacity-90">القضية #{caseData.case_id}</p>
              </div>
            )}

            {/* ⚠️ رسائل الخطأ */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-white mt-4">جاري تحميل تفاصيل القضية...</p>
              </div>
            ) : caseData && (
              <>
                {/* 📑 التبويبات */}
                <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden mb-6">
                  <div className="flex border-b border-gray-200">
                    {['overview', 'timeline', 'documents', 'messages'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-6 py-4 font-semibold transition ${
                          activeTab === tab
                            ? 'border-b-4 border-blue-600 text-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab === 'overview' && '📄 نظرة عامة'}
                        {tab === 'timeline' && '📅 خط زمني'}
                        {tab === 'documents' && '📁 الملفات'}
                        {tab === 'messages' && '💬 الرسائل'}
                      </button>
                    ))}
                  </div>

                  {/* 📏 محتوى التبويبات */}
                  <div className="p-8">
                    {/* تبويب النظرة العامة */}
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">نوع القضية</h3>
                            <p className="text-lg font-bold text-gray-900">{caseData.case_type}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">الحالة</h3>
                            <span className={`px-4 py-2 rounded-full font-semibold inline-block ${getStatusColor(caseData.status)}`}>
                              {caseData.status}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">المحامي المسؤول</h3>
                            <p className="text-lg font-bold text-gray-900">{caseData.lawyer_name || 'لم يتم التعيين'}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">تاريخ البدء</h3>
                            <p className="text-lg font-bold text-gray-900">{new Date(caseData.created_at).toLocaleDateString('ar-EG')}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 mb-2">وصف القضية</h3>
                          <p className="text-gray-700 leading-relaxed">{caseData.case_description}</p>
                        </div>
                      </div>
                    )}

                    {/* تبويب الخط الزمني */}
                    {activeTab === 'timeline' && (
                      <div className="space-y-4">
                        {timeline.length === 0 ? (
                          <p className="text-gray-500 text-center py-8">لا توجد أحداث في الخط الزمني بعد</p>
                        ) : (
                          timeline.map((event, idx) => (
                            <div key={idx} className="border-l-4 border-blue-500 pl-6 py-4">
                              <p className="font-semibold text-gray-900">{event.title}</p>
                              <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                              <p className="text-gray-500 text-xs mt-2">📅 {new Date(event.date).toLocaleDateString('ar-EG')}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* تبويب الملفات */}
                    {activeTab === 'documents' && (
                      <div className="space-y-3">
                        {documents.length === 0 ? (
                          <p className="text-gray-500 text-center py-8">لا توجد ملفات مرفوعة بعد</p>
                        ) : (
                          documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                              <div className="flex items-center">
                                <span className="text-2xl mr-4">📄</span>
                                <div>
                                  <p className="font-semibold text-gray-900">{doc.document_name}</p>
                                  <p className="text-gray-600 text-sm">{doc.file_type} • {new Date(doc.uploaded_at).toLocaleDateString('ar-EG')}</p>
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                ⬇️ تحميل
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* تبويب الرسائل */}
                    {activeTab === 'messages' && (
                      <div className="space-y-4">
                        <p className="text-gray-600 text-center py-8">💬 اذهب إلى قسم الرسائل للتواصل مع الفريق</p>
                        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          افتح الرسائل
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        </main>

              </div>
    </div>
  );
};
>>>>>>> Stashed changes

export default CaseDetailsPage;
