import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextObject';

/**
 * سياق المصادقة - Authentication Context
 * يدير حالة المستخدم والمصادقة في تطبيق LawLink
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // تحقق من التوكن والبيانات عند بدء التطبيق لمنع تسجيل الخروج العشوائي
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
   * 🔐 تسجيل الدخول الشامل للمستخدمين والمحامين والأدمن
   */
  const login = async (email, password, role) => { 
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        console.error("Server HTML Error:", errorText);
        throw new Error(`حدث خطأ في السيرفر (Status: ${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'فشل في تسجيل الدخول');
      }

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
   * 📝 تسجيل مستخدم جديد - تم التوجيه للمسار المصلح بنجاح لمنع طمس بيانات المحامي
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      // 🚀 تحويل المسار إلى /users/register بدلاً من /auth/register ليمر من الكود الشامل الموثق
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const errorText = await response.text();
        console.error("Server HTML Error:", errorText); 
        throw new Error(`حدث خطأ داخلي في السيرفر (Status: ${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'فشل في عملية التسجيل الأساسية');
      }

      return { success: true, data };
    } catch (error) {
      console.error('خطأ في التسجيل من الـ Context:', error);
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
    authUser: user,
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