<<<<<<< Updated upstream
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClientMyProfilePage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50"> 
    <Navbar />
    <main className="flex-grow pt-28 pb-16"> 
      <section className="max-w-6xl mx-auto px-6 py-16"> 
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10"> 
          <h1 className="text-4xl font-bold text-black mb-3">My Profile</h1>
          <p className="text-gray-500 mb-8 text-lg">Your client profile and account details.</p>
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
// 👤 صفحة ملفي الشخصي - Client My Profile Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة ملف المستخدم الشخصي - عرض بيانات العميل وتعديلها
// Client profile - view and edit personal information and account settings
// ───────────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/DataService'; // ⚙️ خدمة البيانات - API service

const ClientMyProfilePage = () => {
  // 📊 حالات للبيانات
  const [profileData, setProfileData] = useState(null); // بيانات الملف الشخصي
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // رسالة الخطأ
  const [editMode, setEditMode] = useState(false); // وضع التحرير
  const [formData, setFormData] = useState({}); // بيانات النموذج

  // 📥 تحميل بيانات الملف الشخصي عند فتح الصفحة
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // 🔗 طلب بيانات المستخدم من الخادم
        const response = await dataService.users.getById(
          JSON.parse(localStorage.getItem('user'))?.id
        );
        setProfileData(response.data);
        setFormData(response.data);
        setError(null);
      } catch (err) {
        setError('خطأ في تحميل بيانات الملف الشخصي'); // Error loading profile
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✏️ معالج تغيير حقول النموذج
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 💾 معالج حفظ التعديلات
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // 🔗 إرسال التحديثات إلى الخادم
      await dataService.auth.updateProfile(formData);
      setProfileData(formData);
      setEditMode(false);
      setError(null);
    } catch (err) {
      setError('خطأ في حفظ البيانات'); // Error saving data
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 معالج إلغاء التعديلات
  const handleCancel = () => {
    setFormData(profileData);
    setEditMode(false);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}
    >
      {/* ☀️ طبقة الشفافية */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* 📍 محتوى الصفحة */}
      <div className="relative z-10 flex flex-col min-h-screen">
                
        <main className="flex-grow pt-32 pb-16">
          <section className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* 🎯 رأس الصفحة */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">👤 ملفي الشخصي</h1>
              <p className="text-white text-lg opacity-90">عرض وتعديل بيانات حسابك الشخصية</p>
>>>>>>> Stashed changes
            </div>

            {/* ⚠️ رسائل الخطأ */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* 📦 محتوى البطاقة الرئيسية */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-white mt-4">جاري التحميل...</p>
              </div>
            ) : profileData && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* 📋 قسم المعلومات الشخصية */}
                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">معلوماتي الشخصية</h2>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        ✏️ تعديل
                      </button>
                    )}
                  </div>

                  {/* 🔤 نماذج البيانات */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* الاسم الأول */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        الاسم الأول
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg text-gray-600">{profileData.firstName}</p>
                      )}
                    </div>

                    {/* اسم العائلة */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        اسم العائلة
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg text-gray-600">{profileData.lastName}</p>
                      )}
                    </div>

                    {/* البريد الإلكتروني */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        البريد الإلكتروني
                      </label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg text-gray-600">{profileData.email}</p>
                      )}
                    </div>

                    {/* رقم الهاتف */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg text-gray-600">{profileData.phone}</p>
                      )}
                    </div>

                    {/* العنوان */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        العنوان
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="address"
                          value={formData.address || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-lg text-gray-600">{profileData.address}</p>
                      )}
                    </div>
                  </div>

                  {/* 🔘 أزرار التحكم */}
                  {editMode && (
                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        💾 حفظ التغييرات
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                      >
                        ❌ إلغاء
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>

              </div>
    </div>
  );
};

export default ClientMyProfilePage;
