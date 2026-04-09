import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaPhone, FaCalendar, FaVenusMars, FaLock, FaMoneyBill } from 'react-icons/fa';
import { useAuth } from '../../context/useAuth';
import logo from '../../Assets/logo/logo canvas.png'; 
import AuthShell from '../../components/AuthShell';
/**
 * صفحة استكمال تسجيل العميل - Client Registration Continue Page
 * بتكمل بيانات العميل بعد التسجيل الأولي
 */
const RegisterClientContinuePage = () => {
  // 📊 حالة البيانات - state for form data
  const [formData, setFormData] = useState({
    phone1: '',
    phone2: '',
    dateOfBirth: '',
    gender: '',
    income: '',
    password: '',
    confirmPassword: ''
  });

  // ⚠️ حالة الأخطاء - error states
  const [errors, setErrors] = useState({});

  // 🔄 حالة التحميل - loading state
  const [loading, setLoading] = useState(false);

  // 🧭 التنقل - navigation
  const navigate = useNavigate();

  // 🔐 سياق المصادقة - auth context
  const { completeClientRegistration } = useAuth();

  // 📝 دالة تحديث البيانات - handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ✅ دالة التحقق من الصحة - validation function
  const validateForm = () => {
    const newErrors = {};

    // Phone 1 required
    if (!formData.phone1.trim()) {
      newErrors.phone1 = 'رقم الهاتف الأول مطلوب';
    } else if (!/^(\+20|0)?1[0-2,5]\d{8}$/.test(formData.phone1.replace(/\s/g, ''))) {
      newErrors.phone1 = 'رقم الهاتف غير صحيح';
    }

    // Phone 2 optional but if provided, validate
    if (formData.phone2.trim() && !/^(\+20|0)?1[0-2,5]\d{8}$/.test(formData.phone2.replace(/\s/g, ''))) {
      newErrors.phone2 = 'رقم الهاتف الثاني غير صحيح';
    }

    // Date of birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'تاريخ الميلاد مطلوب';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 100) {
        newErrors.dateOfBirth = 'العمر يجب أن يكون بين 18 و 100 سنة';
      }
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'الجنس مطلوب';
    }

    // Income
    if (!formData.income || formData.income <= 0) {
      newErrors.income = 'الدخل الشهري مطلوب ويجب أن يكون أكبر من صفر';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 📝 دالة معالجة الإرسال - handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const result = await completeClientRegistration(formData);
        if (result.success) {
          // نجح التسجيل - Registration successful
          navigate('/client/dashboard'); // أو أي صفحة ترحيب - or welcome page
        } else {
          setErrors({ general: result.error });
        }
      } catch (error) {
        console.error('خطأ في إكمال تسجيل العميل:', error);
        setErrors({ general: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthShell>
      <div className="auth-wrapper">
      <div className="auth-container">
        {/* الجزء اللي على الشمال - Brand Sidebar */}
        <div className="brand-sidebar">
          <div className="brand-content">
            <h1 className="brand-logo">LawLink</h1>
            <h2 className="welcome-text">Complete Your Profile</h2>
            <p className="brand-tagline">Help us provide you with the best legal services.</p>
          </div>
        </div>

        {/* الجزء اللي على اليمين - Form Section */}
        <div className="form-section">
          <div className="auth-card">
            <>
              <div className="logo-container">
                <img src={logo} alt="LawLink Logo" />
              </div>
              <h2 className="form-title">Client Information</h2>
              <p className="form-subtitle">Please provide additional details to complete your registration</p>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* Phone Numbers */}
                <div className="form-group">
                  <label>Phone Number 1 *</label>
                  <div className="input-container">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      name="phone1"
                      className="law-input"
                      placeholder="+20 123 456 7890"
                      value={formData.phone1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.phone1 && <span className="error-text">{errors.phone1}</span>}
                </div>

                <div className="form-group">
                  <label>Phone Number 2 (Optional)</label>
                  <div className="input-container">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      name="phone2"
                      className="law-input"
                      placeholder="+20 123 456 7890"
                      value={formData.phone2}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone2 && <span className="error-text">{errors.phone2}</span>}
                </div>

                {/* Date of Birth and Gender */}
                <div className="form-row">
                  <div className="form-group half">
                    <label>Date of Birth *</label>
                    <div className="input-container">
                      <FaCalendar className="input-icon" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        className="law-input"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                  </div>

                  <div className="form-group half">
                    <label>Gender *</label>
                    <div className="input-container">
                      <FaVenusMars className="input-icon" />
                      <select
                        name="gender"
                        className="law-input"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.gender && <span className="error-text">{errors.gender}</span>}
                  </div>
                </div>

                {/* Income */}
                <div className="form-group">
                  <label>Monthly Income (EGP) *</label>
                  <div className="input-container">
                    <FaMoneyBill className="input-icon" />
                    <input
                      type="number"
                      name="income"
                      className="law-input"
                      placeholder="5000"
                      min="0"
                      step="100"
                      value={formData.income}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.income && <span className="error-text">{errors.income}</span>}
                </div>

                {/* Password Fields */}
                <div className="form-row">
                  <div className="form-group half">
                    <label>Password *</label>
                    <div className="input-container">
                      <FaLock className="input-icon" />
                      <input
                        type="password"
                        name="password"
                        className="law-input"
                        placeholder="Create strong password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <div className="form-group half">
                    <label>Confirm Password *</label>
                    <div className="input-container">
                      <FaLock className="input-icon" />
                      <input
                        type="password"
                        name="confirmPassword"
                        className="law-input"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>
                </div>

                {/* رسالة خطأ عامة - General error message */}
                {errors.general && <div className="error-text" style={{ textAlign: 'center', marginBottom: '15px' }}>{errors.general}</div>}

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Completing Registration...' : 'Complete Registration →'}
                </button>
              </form>

              <p className="footer-link">
                <Link to="/register">← Back to Registration</Link>
              </p>
            </>
          </div>
        </div>
      </div>
    </div>
    </AuthShell>
  );
};

export default RegisterClientContinuePage;
