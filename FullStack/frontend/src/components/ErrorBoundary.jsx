// ═══════════════════════════════════════════════════════════════════════════════════
// 🛡️ مكون حماية الأخطاء - Error Boundary Component
// ═══════════════════════════════════════════════════════════════════════════════════
// هذا المكون بيتحاول يمسك أي أخطاء حصلت في أي مكون بتاع الأطفال ويمنع التطبيق كله من يتعطل
// This component catches errors in child components and prevents the entire app from crashing
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';

export class ErrorBoundary extends React.Component {
  // 🔧 إعداد حالة الخطأ في البداية - Initialize error state
  // بنخزن فيها معلومات الخطأ اللي حصل (إن في خطأ أم لا وتفاصيله)
  constructor(props) {
    super(props);
    // الحالة bتشتمل على: hasError (في خطأ؟) و error (تفاصيل الخطأ)
    this.state = { hasError: false, error: null };
  }

  // 📋 تحديث الحالة عند حصول خطأ - Update state when error occurs
  // هذا الـ Method بنستخدمه عشان نحدّث الـ state بسرعة لما يحصل خطأ
  static getDerivedStateFromError(error) {
    // بنرجع الحالة الجديدة بـ hasError = true وحط الخطأ قدام الـ user
    return { hasError: true, error };
  }

  // 🔍 التعامل مع الخطأ بعد حصوله - Handle error after it occurs
  // بنقدر نرسل الخطأ لخدمة خارجية عشان نتابع الأخطاء في الـ production
  componentDidCatch(error, errorInfo) {
    // 📌 بنطبع الخطأ في الـ console عشان نشوفه وقت التطوير
    // في المستقبل بنقدر نرسل الخطأ لخدمة tracking زي Sentry
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  // 🖼️ عرض المحتوى أو رسالة الخطأ - Render content or error message
  render() {
    // لو في خطأ، بنعرض رسالة الخطأ للـ user
    if (this.state.hasError) {
      // 📍 Return section starts here
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">حدث خطأ في الصفحة</h1>
          <p className="mt-4 text-red-600">{this.state.error?.message || 'حدث خطأ غير متوقع.'}</p>
          <button
            // 🔄 زرار إعادة المحاولة - Reset error and try again
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            إعادة المحاولة
          </button>
        </div>
      );
    }

    // لو ما في خطأ، بنعرض المكونات الأطفال بشكل عادي
    return this.props.children;
  }
}
