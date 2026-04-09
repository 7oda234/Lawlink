import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth/AuthBase.css";
import { FaPhone, FaCalendar, FaVenusMars, FaLock, FaIdCard, FaStar, FaBriefcase } from 'react-icons/fa';
import { useAuth } from "../../context/AuthContext";
import logo from '../../Assets/logo/logo canvas.png'; 

/**
 * صفحة استكمال تسجيل المحامي - Lawyer Registration Continue Page
 * بتكمل بيانات المحامي بعد التسجيل الأولي
 */
const RegisterLawyerContinuePage = () => {
  // 📊 حالة البيانات - state for form data
  const [formData, setFormData] = useState({
    phone1: '',
    phone2: '',
    dateOfBirth: '',
    gender: '',
    licenseNumber: '',
    ratingAverage: '',
    specializations: [],
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
  const { completeLawyerRegistration } = useAuth();

  // قائمة التخصصات المتاحة - Available specializations
  const availableSpecializations = [
    'Civil Law',
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Tax Law',
    'Labor Law',
    'Real Estate Law',
    'Intellectual Property',
    'International Law',
    'Administrative Law'
  ];

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

  // 📝 دالة تحديث التخصصات - handle specialization changes
  const handleSpecializationChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData(prev => ({
      ...prev,
      specializations: selected
    }));
    if (errors.specializations) {
      setErrors(prev => ({
        ...prev,
        specializations: ''
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
      if (age < 25 || age > 100) {
        newErrors.dateOfBirth = 'العمر يجب أن يكون بين 25 و 100 سنة للمحامين';
      }
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'الجنس مطلوب';
    }

    // License number
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'رقم الترخيص مطلوب';
    } else if (!/^\d{4,10}$/.test(formData.licenseNumber)) {
      newErrors.licenseNumber = 'رقم الترخيص يجب أن يكون أرقام فقط (4-10 أرقام)';
    }

    // Rating average
    if (!formData.ratingAverage) {
      newErrors.ratingAverage = 'متوسط التقييم مطلوب';
    } else {
      const rating = parseFloat(formData.ratingAverage);
      if (rating < 0 || rating > 5) {
        newErrors.ratingAverage = 'التقييم يجب أن يكون بين 0 و 5';
      }
    }

    // Specializations
    if (formData.specializations.length === 0) {
      newErrors.specializations = 'يجب اختيار تخصص واحد على الأقل';
    } else if (formData.specializations.length > 5) {
      newErrors.specializations = 'لا يمكن اختيار أكثر من 5 تخصصات';
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
        const result = await completeLawyerRegistration(formData);
        if (result.success) {
          // نجح التسجيل - Registration successful
          navigate('/lawyer/dashboard'); // أو أي صفحة ترحيب - or welcome page
        } else {
          setErrors({ general: result.error });
        }
      } catch (error) {
        console.error('خطأ في إكمال تسجيل المحامي:', error);
        setErrors({ general: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* الجزء اللي على الشمال - Brand Sidebar */}
        <div className="brand-sidebar">
          <div className="brand-content">
            <h1 className="brand-logo">LawLink</h1>
            <h2 className="welcome-text">Professional Details</h2>
            <p className="brand-tagline">Complete your legal professional profile.</p>
          </div>
        </div>

        {/* الجزء اللي على اليمين - Form Section */}
        <div className="form-section">
          <div className="auth-card">
            <>
              <div className="logo-container">
                <img src={logo} alt="LawLink Logo" />
              </div>
              <h2 className="form-title">Lawyer Information</h2>
              <p className="form-subtitle">Please provide your professional details to complete registration</p>

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

                {/* License Number and Rating */}
                <div className="form-row">
                  <div className="form-group half">
                    <label>License Number *</label>
                    <div className="input-container">
                      <FaIdCard className="input-icon" />
                      <input
                        type="text"
                        name="licenseNumber"
                        className="law-input"
                        placeholder="1234567890"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.licenseNumber && <span className="error-text">{errors.licenseNumber}</span>}
                  </div>

                  {/* <div className="form-group half">
                    <label>Rating Average *</label>
                    <div className="input-container">
                      <FaStar className="input-icon" />
                      <input
                        type="number"
                        name="ratingAverage"
                        className="law-input"
                        placeholder="4.5"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.ratingAverage}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.ratingAverage && <span className="error-text">{errors.ratingAverage}</span>}
                  </div> */}
                </div>

                {/* Specializations */}
                <div className="form-group">
                  <label>Specializations * (Select 1-5)</label>
                  <div className="input-container">
                    <FaBriefcase className="input-icon" />
                    <select
                      multiple
                      name="specializations"
                      className="law-input"
                      value={formData.specializations}
                      onChange={handleSpecializationChange}
                      required
                    >
                      {availableSpecializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  {errors.specializations && <span className="error-text">{errors.specializations}</span>}
                  <small className="form-hint">Hold Ctrl (Cmd on Mac) to select multiple specializations</small>
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
  );
};

export default RegisterLawyerContinuePage;
