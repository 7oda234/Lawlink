import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextObject.jsx';

/**
 * سياق المصادقة - Authentication Context
 * يدير حالة المستخدم والمصادقة في التطبيق
 */

/**
 * مزود سياق المصادقة - Auth Context Provider
 */
export const AuthProvider = ({ children }) => {
  // حالة المستخدم - User state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // تحقق من التوكن عند بدء التطبيق - Check token on app start
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
   * تسجيل الدخول - Login function
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في تسجيل الدخول');
      }

      // حفظ التوكن والبيانات - Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * تسجيل الخروج - Logout function
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * تحديث بيانات المستخدم - Update user data
   */
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * تسجيل مستخدم جديد - Register new user
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
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

  /**
   * إكمال تسجيل العميل - Complete client registration
   */
  const completeClientRegistration = async (clientData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/complete-client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(clientData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في إكمال التسجيل');
      }

      // تحديث بيانات المستخدم - Update user data
      updateUser(data.user);

      return { success: true, data };
    } catch (error) {
      console.error('خطأ في إكمال تسجيل العميل:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * إكمال تسجيل المحامي - Complete lawyer registration
   */
  const completeLawyerRegistration = async (lawyerData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/complete-lawyer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(lawyerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في إكمال التسجيل');
      }

      // تحديث بيانات المستخدم - Update user data
      updateUser(data.user);

      return { success: true, data };
    } catch (error) {
      console.error('خطأ في إكمال تسجيل المحامي:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // قيم السياق - Context values
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    completeClientRegistration,
    completeLawyerRegistration,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
