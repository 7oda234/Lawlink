// ═══════════════════════════════════════════════════════════════════════════════════
// 🔘 مكون الزرار المخصص - Custom Button Component
// ═══════════════════════════════════════════════════════════════════════════════════
// مكون قابل لإعادة الاستخدام للأزرار في كل التطبيق بتصميم موحد
// Reusable button component with consistent styling throughout the app
// ─────────────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

// 📌 Props: children (محتوى الزرار), type (نوع الزرار), className (تصاميم إضافية), onClick (دالة الضغط), variant (primary/secondary/outline), size (sm/md/lg)
const Button = ({ 
  children, 
  type = 'button', 
  className = '', 
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false
}) => {
  const { palette, mode } = useTheme();
  
  // Define color schemes based on palette
  const colorMap = {
    blue: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
      secondary: mode === 'dark' ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20',
      outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
    },
    yellow: {
      primary: 'bg-yellow-400 text-black hover:bg-yellow-500 active:bg-yellow-600',
      secondary: mode === 'dark' ? 'bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30' : 'bg-yellow-400/10 text-yellow-700 hover:bg-yellow-400/20',
      outline: 'border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50'
    },
    green: {
      primary: 'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700',
      secondary: mode === 'dark' ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' : 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20',
      outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
    },
    purple: {
      primary: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700',
      secondary: mode === 'dark' ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-500/10 text-purple-700 hover:bg-purple-500/20',
      outline: 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50'
    }
  };

  const sizeMap = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const colors = colorMap[palette] || colorMap.blue;
  const sizeClass = sizeMap[size] || sizeMap.md;
  
  const baseClass = `rounded-lg font-semibold transition-all duration-200 ${sizeClass} ${colors[variant] || colors.primary} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
