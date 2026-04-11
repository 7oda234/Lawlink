import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextObject';

/**
 * سياق المصادقة - Authentication Context
 * يدير حالة المستخدم والمصادقة في التطبيق
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // تحقق من التوكن عند بدء التطبيق
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('خطأ في تحليل بيانات المستخدم:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * 🔐 تسجيل الدخول - تم التعديل ليدعم الـ Role
   */
  const login = async (email, password, role) => { // 👈 أضفنا الـ role كمعامل ثالث
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          role // 👈 السطر ده هو اللي هيفتح لك بوابات المحامي
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في تسجيل الدخول');
      }

      // حفظ التوكن والبيانات - اتأكدنا إن الـ role متسيف جوه الـ user object
      localStorage.setItem('token', data.token);
      
      const userToStore = data.data?.user || data.user;
      localStorage.setItem('user', JSON.stringify(userToStore));

      setUser(userToStore);
      setIsAuthenticated(true);

      return { success: true, role: userToStore.role, token: data.token, data: data };
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📝 تسجيل مستخدم جديد
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // الـ role موجود جوه الـ userData أصلاً
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في التسجيل');
      }

      return { success: true, data };
    } catch (error) {
      console.error('خطأ في التسجيل:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};