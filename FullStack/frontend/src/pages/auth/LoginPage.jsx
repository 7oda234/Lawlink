import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaExclamationCircle, FaGavel, FaUser, FaQuestionCircle } from 'react-icons/fa';
import axios from 'axios';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('Lawyer'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (!email || !password) {
      setValidationErrors({
        email: !email ? "يرجى إدخال البريد الإلكتروني" : "",
        password: !password ? "يرجى إدخال كلمة المرور" : ""
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim().toLowerCase(),
        password: password
      });

      // التعامل مع هيكلية الرد سواء كانت داخل data أو مباشرة
      const responseData = response.data.data || response.data;
      const { user, token } = responseData;

      // 1. ✅ استخراج الـ ID بأي مسمى يبعته الباك إند
      const finalUserId = user.id || user.user_id || user.userId;

      if (!finalUserId) {
         setError("⚠️ سيرفر الباك إند لم يرسل رقم الحساب (ID) بشكل صحيح.");
         setLoading(false);
         return;
      }

      const userRoleFromDB = user.role.toLowerCase();
      const currentSelectedPortal = selectedRole.toLowerCase();

      // 2. التحقق من البوابة المختار الدخول منها
      if (userRoleFromDB !== 'admin' && userRoleFromDB !== currentSelectedPortal) {
        setError(`⚠️ الحساب مسجل كـ [${user.role}]؛ يرجى الدخول من بوابة ${user.role === 'Lawyer' ? 'المحامي' : 'العميل'}.`);
        setLoading(false);
        return; 
      }

      setFailedAttempts(0);

      // 3. 🖼️ معالجة رابط الصورة (الحل النهائي للصورة)
      const serverURL = "http://localhost:5000";
      let finalUserImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // الصورة الافتراضية

      if (user.image_url) {
          // لو الرابط كامل يبدأ بـ http نأخذه كما هو، لو مسار جزئي ندمجه مع رابط السيرفر
          finalUserImage = user.image_url.startsWith('http') 
              ? user.image_url 
              : `${serverURL}${user.image_url}`;
      }

      // 4. ✅ تخزين البيانات في الـ LocalStorage بالأسماء اللي الـ Navbar مستنيها
      localStorage.setItem('token', token);
      localStorage.setItem('userId', finalUserId);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userImage', finalUserImage); // 👈 الرابط الكامل للصورة

      // 5. التوجيه بناءً على الصلاحية
      if (userRoleFromDB === 'admin') {
          navigate('/admin/dashboard');
      } else if (currentSelectedPortal === 'lawyer') {
          navigate('/lawyer/dashboard');
      } else {
          navigate('/client/dashboard');
      }

    } catch (err) {
      setFailedAttempts(prev => prev + 1);
      if (err.response) {
        setError(err.response.data.message || "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        setError("🔌 عذراً، تعذر الاتصال بالسيرفر. تأكد من تشغيل الـ Backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 text-white" dir="rtl">
      <div className="max-w-md w-full p-10 rounded-[40px] bg-slate-900 border border-white/5 shadow-2xl">
        
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-3xl font-black mb-2 tracking-tight italic">Login Portal</h2>
          <p className="text-yellow-500 font-bold text-sm uppercase tracking-widest italic underline decoration-2 underline-offset-8">LAWLINK SYSTEM</p>
        </div>

        {/* اختيار البوابة */}
        <div className="flex p-1.5 rounded-2xl mb-8 bg-slate-950 border border-white/5 shadow-inner">
          <button 
            type="button"
            onClick={() => { setSelectedRole('Client'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all duration-300 ${
              selectedRole === 'Client' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-gray-500 hover:text-white'
            }`}
          >
            <FaUser size={14} /> بوابة العميل
          </button>
          <button 
            type="button"
            onClick={() => { setSelectedRole('Lawyer'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all duration-300 ${
              selectedRole === 'Lawyer' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'text-gray-500 hover:text-white'
            }`}
          >
            <FaGavel size={14} /> بوابة المحامي
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* البريد الإلكتروني */}
          <div className="relative flex items-center group">
            <FaEnvelope className={`absolute right-5 transition-colors ${validationErrors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-500'}`} size={16} />
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pr-14 pl-6 py-4 rounded-2xl bg-slate-950 border outline-none transition-all font-bold text-left text-white ${
                validationErrors.email ? 'border-red-500' : 'border-white/10 focus:border-yellow-500'
              }`}
            />
          </div>

          {/* كلمة المرور */}
          <div className="relative flex items-center group">
            <FaLock className={`absolute right-5 transition-colors ${validationErrors.password ? 'text-red-500' : 'text-gray-500 group-focus-within:text-yellow-500'}`} size={16} />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pr-14 pl-6 py-4 rounded-2xl bg-slate-950 border outline-none transition-all font-bold text-left text-white ${
                validationErrors.password ? 'border-red-500' : 'border-white/10 focus:border-yellow-500'
              }`}
            />
          </div>

          {/* رابط نسيت كلمة المرور */}
          {failedAttempts >= 1 && (
            <div className="flex justify-start px-2 animate-fadeIn">
              <Link 
                to="/forgot-password" 
                className="text-xs font-bold text-gray-400 hover:text-yellow-500 transition-colors flex items-center gap-1"
              >
                <FaQuestionCircle size={10} /> هل نسيت كلمة المرور؟
              </Link>
            </div>
          )}

          {/* عرض رسائل الخطأ */}
          {error && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 animate-pulse ${
              error.includes('⚠️') ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
            }`}>
              <FaExclamationCircle className="shrink-0" />
              <span className="text-[11px] font-bold text-right flex-1 leading-relaxed">{error}</span>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-slate-950 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-yellow-400 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "جاري التحقق..." : `دخول كـ ${selectedRole === 'Lawyer' ? 'محامي' : 'عميل'}`}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-bold text-sm">
          ليس لديك حساب؟ <Link to="/register" className="text-yellow-500 hover:underline ms-1">سجل الآن</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;