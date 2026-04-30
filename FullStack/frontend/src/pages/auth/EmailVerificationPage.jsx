import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';
import "../../styles/auth/AuthBase.css";
import AuthShell from '../../components/AuthShell';

const EmailVerificationPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  return (
    <AuthShell>
      <div className="auth-wrapper" dir="rtl">
        <div className="auth-container" style={{
          maxWidth: '500px', 
          minHeight: 'auto', 
          padding: '3.5rem 2rem', 
          margin: 'auto', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          
          {/* أيقونة البريد الذهبية المتوهجة */}
          <div style={{
            width: '80px', 
            height: '80px', 
            backgroundColor: 'rgba(234, 179, 8, 0.1)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '2rem',
            border: '1px solid rgba(234, 179, 8, 0.2)'
          }}>
            <FaEnvelopeOpenText style={{fontSize: '2rem', color: '#eab308'}} />
          </div>
          
          {/* عنوان الصفحة */}
          <h2 className="form-title" style={{fontSize: '1.8rem', marginBottom: '1rem'}}>
            تحقق من بريدك الإلكتروني
          </h2>
          
          {/* وصف الخطوة التالية */}
          <p className="form-subtitle" style={{fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem', padding: '0 10px'}}>
            لقد أرسلنا رابط التحقق إلى بريدك الإلكتروني. يرجى الضغط على الرابط لتفعيل حسابك والبدء في استخدام منصة LawLink.
          </p>
          
          {/* زر الانتقال للصندوق الوارد */}
          <button 
            onClick={() => navigate('/login')} 
            className="btn-submit" 
            style={{width: '100%', marginBottom: '1.5rem'}}
          >
            الانتقال إلى صندوق الوارد
          </button>

          {/* رسالة نجاح إعادة الإرسال */}
          {message && (
            <div className="success-text" style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)', 
              color: '#22c55e', 
              padding: '0.75rem', 
              borderRadius: '0.75rem', 
              width: '100%', 
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              {message}
            </div>
          )}
          
          {/* خيار إعادة إرسال الرابط */}
          <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>
            لم تصلك الرسالة؟ 
            <button 
              className="text-yellow-500 font-bold"
              style={{
                background: 'none', 
                border: 'none', 
                color: '#eab308', 
                cursor: 'pointer', 
                marginRight: '8px',
                padding: '0',
                fontSize: '0.9rem',
                fontWeight: '700'
              }}
              onClick={() => setMessage('تم إعادة إرسال رابط التحقق بنجاح.')}
            >
              <FaPaperPlane style={{marginLeft: '5px', fontSize: '0.7rem'}} />
              إعادة إرسال الرابط
            </button>
          </p>
        </div>
      </div>
    </AuthShell>
  );
};

export default EmailVerificationPage;
