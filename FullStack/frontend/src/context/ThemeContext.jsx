// ═══════════════════════════════════════════════════════════════════════════════════
// 🎨 سياق المظهر والألوان - Theme Context
// ═══════════════════════════════════════════════════════════════════════════════════
// هنا بنخزّن إعدادات المظهر (Light/Dark) والألوان المختارة ويمكن نوصّل المعلومات
// دي لأي مكون في التطبيق من غير ما نعدي البيانات من component لحد يتاني
// ─────────────────────────────────────────────────────────────────────────────────────

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// 🔧 إنشاء السياق الأساسي - Create the initial context object
const ThemeContext = createContext({
  mode: 'light',
  palette: 'blue',
  toggleMode: () => {},
  setPalette: () => {},
});

// 🎯 مزود المظهر - Theme Provider Component
// بيوفّر أعدادات المظهر لكل مكونات التطبيق
export const ThemeProvider = ({ children }) => {
  // 🌙 حالة المظهر (Light أو Dark) - Light/Dark mode state
  // بنشتغل من الـ localStorage عشان نخزّن الاختيار الأخير للـ user
  const [mode, setMode] = useState(() => localStorage.getItem('lawlink-theme-mode') || 'light');
  
  // 🎨 حالة لون الموضوع (blue, yellow, green, purple) - Color palette state
  const [palette, setPalette] = useState(() => localStorage.getItem('lawlink-theme-palette') || 'blue');

  // 💾 حفظ تغييرات المظهر - Save theme changes
  // لما يتغيّر المظهر أو اللون، بنحدّث الـ document class وبنخزّن في localStorage
  useEffect(() => {
    // 🖥️ بنضيف أو بنشيل 'dark' class من الـ HTML element
    document.documentElement.classList.toggle('dark', mode === 'dark');

    // 🎨 نضبط متغيرات CSS للعناصر المشتركة زي الخلفية والنص والaccent
    const paletteMap = {
      blue: '#3b82f6',
      yellow: '#f59e0b',
      green: '#10b981',
      purple: '#8b5cf6',
    };
    document.documentElement.style.setProperty('--accent-color', paletteMap[palette] || paletteMap.blue);
    document.documentElement.style.setProperty('--page-bg', mode === 'dark' ? '#020617' : '#f8fafc');
    document.documentElement.style.setProperty('--surface-bg', mode === 'dark' ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.92)');
    document.documentElement.style.setProperty('--surface-border', mode === 'dark' ? '#334155' : '#e2e8f0');
    document.documentElement.style.setProperty('--text-color', mode === 'dark' ? '#f8fafc' : '#0f172a');
    document.documentElement.style.setProperty('--muted-text', mode === 'dark' ? '#cbd5e1' : '#475569');

    // 💾 بنخزّن الاختيار في الـ localStorage عشان لما يفتح الـ user التطبيق ثاني، ييجي معاه الإعداد
    localStorage.setItem('lawlink-theme-mode', mode);
    localStorage.setItem('lawlink-theme-palette', palette);
  }, [mode, palette]); // هذا dependents array يقول: بنشتغل دالة دي لما mode أو palette يتغيروا

  // 🔄 دالة تغيير المظهر - Toggle between light and dark mode
  // بتحول من light لـ dark والعكس
  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 📦 إنشاء القيمة اللي بنوديها للـ children - Create context value
  // useMemo بتتأكد إننا ما بننشئ object جديد في كل render، عشان performance
  const value = useMemo(
    () => {
      // 🎨 الألوان المتاحة في التطبيق
      const palettes = ['blue', 'yellow', 'green', 'purple'];
      // 🔙 بنرجع كل البيانات اللي بنحتاجها في المكونات الأطفال
      return { mode, palette, toggleMode, setPalette, palettes };
    },
    [mode, palette], // dependencies: لما دول يتغيروا بس بننشئ object جديد
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 🪝 Hook مخصص للوصول للمظهر - Custom hook to access theme
// أي مكون بيحتاج يستخدم المظهر يـ import ده واستدعيه
export const useTheme = () => useContext(ThemeContext);
