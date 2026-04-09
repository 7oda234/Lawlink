// ════════════════════════════════════════════════════════════════════════
// 🔐 صفحة تسجيل الدخول - Login Page (Full API Integration)
// ════════════════════════════════════════════════════════════════════════
// الصفحة ديت للدخول للتطبيق سواء كعميل أو محامي ومربوطة بالـ Backend
// Users can sign in as either a Client or a Lawyer with MariaDB integration
// ────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 🆕 للتوجيه بعد الدخول - for navigation
import { FaLock, FaEnvelope, FaGavel, FaUser } from 'react-icons/fa'; // 🎨 icons
import axios from 'axios'; // 🆕 لعمل طلبات الـ API - for API requests
import '../../styles/auth/AuthBase.css'; // 🎨 styles
import logo from '../../Assets/logo/logo canvas.png'; // 📦 logo

const LoginPage = () => {
  const navigate = useNavigate(); // Hook للتنقل بين الصفحات

  // 👤 حالة نوع المستخدم والبيانات - user states
  // بنستخدم 'client' كقيمة افتراضية
  const [userType, setUserType] = useState('client'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // لعرض أخطاء السيرفر - for server errors
  const [loading, setLoading] = useState(false); // حالة التحميل - loading state

  // 🌐 دالة التعامل مع الـ API عند إرسال الفورم
  // Handle Login API call to LawLink Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);

    console.log("🚀 جاري محاولة الاتصال بسيرفر LawLink...");

    try {
      // 📡 إرسال البيانات للـ Backend (POST Request)
      // المسار ده لازم يكون متطابق مع اللي عملناه في app.controller.js
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password,
        role: userType // إرسال الدور (محامي أو عميل) للـ Backend
      });

      // ✅ في حالة نجاح العملية واستلام التوكن
      if (response.data.ok || response.data.token) {
        // تنبيه لنجاح الاتصال بالـ API
        alert("🎉 تم تسجيل الدخول بنجاح! أهلاً بك في LawLink");
        console.log('✅ بيانات الدخول:', response.data);

        // 💾 حفظ الـ Token والـ Role في الـ LocalStorage للاستخدام لاحقاً
        localStorage.setItem('lawlink_token', response.data.token);
        localStorage.setItem('user_role', userType);
        
        // 🚀 التوجيه للـ Dashboard المناسبة حسب نوع الحساب
        if (userType === 'lawyer') {
          navigate('/lawyer-dashboard');
        } else {
          navigate('/client-dashboard');
        }
      }
    } catch (err) {
      // ❌ معالجة أخطاء الاتصال أو البيانات
      if (!err.response) {
        // لو السيرفر مش شغال خالص
        alert("❌ السيرفر لا يستجيب! تأكد من تشغيل Node.js Terminal");
        setError("خطأ في الاتصال بالسيرفر (Network Error)");
      } else {
        // لو السيرفر رد بخطأ (باسورد غلط مثلاً)
        const serverMsg = err.response.data.message || 'بيانات الدخول غير صحيحة';
        alert("❌ فشل الدخول: " + serverMsg);
        setError(serverMsg);
      }
      console.error('⚠️ API Error Detail:', err);
    } finally {
      setLoading(false);
    }
  };

  // 📍 Return section starts here - واجهة المستخدم
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        {/* Logo Section - شعار الشركة */}
        <div className="logo-container">
          <img src={logo} alt="LawLink Logo" />
        </div>

        <h2 className="form-title">Welcome Back</h2>
        
        {/* 🚨 عرض رسالة الخطأ للمستخدم بشكل واضح */}
        {error && (
          <div className="error-alert" style={{
            color: '#ff4d4d', 
            fontSize: '14px', 
            marginBottom: '15px', 
            textAlign: 'center',
            backgroundColor: '#ffe6e6',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ffcccc'
          }}>
            {error}
          </div>
        )}

        <p className="form-subtitle">Select account type to continue to LawLink</p>

        {/* User Type Toggle - اختيار نوع الحساب (محامي/عميل) */}
        <div className="user-toggle">
          <button 
            type="button"
            className={`toggle-btn ${userType === 'client' ? 'active' : ''}`}
            onClick={() => setUserType('client')}
          >
            <FaUser /> Client Portal
          </button>
          <button 
            type="button"
            className={`toggle-btn ${userType === 'lawyer' ? 'active' : ''}`}
            onClick={() => setUserType('lawyer')}
          >
            <FaGavel /> Lawyer Portal
          </button>
        </div>

        {/* Login Form - نموذج تسجيل الدخول */}
        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                className="law-input" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // تحديث الحالة عند الكتابة
                required 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                className="law-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // تحديث الحالة عند الكتابة
                required 
              />
            </div>
          </div>

          {/* Form Options - تذكرني ونسيان الباسورد */}
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" id="forgot-link">Forgot Password?</Link>
          </div>

          {/* Submit Button - زر تسجيل الدخول */}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Connecting to LawLink...' : `Sign In as ${userType === 'client' ? 'Client' : 'Lawyer'} →`}
          </button>
        </form>

        {/* Footer Link - إنشاء حساب جديد */}
        <p className="footer-link">
          New to LawLink? <Link to="/register">Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
