// ═══════════════════════════════════════════════════════════════════════════════════
// 🎨 سياق المظهر والألوان - Theme Context
// ═══════════════════════════════════════════════════════════════════════════════════
// هنا بنخزّن إعدادات المظهر (Light/Dark) والألوان المختارة
// ─────────────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  mode: 'light',
  palette: 'blue',
  toggleMode: () => {},
  setPalette: () => {},
  palettes: ['blue', 'yellow', 'green', 'purple'],
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('lawlink-theme-mode') || 'light');
  const [palette, setPalette] = useState(() => localStorage.getItem('lawlink-theme-palette') || 'blue');

  // حفظ تغييرات المظهر
  useEffect(() => {
    const isDark = mode === 'dark';
    
    // Toggle dark class on HTML element
    document.documentElement.classList.toggle('dark', isDark);
    
    // Color palettes
    const paletteMap = {
      blue: '#3b82f6',
      yellow: '#f59e0b',
      green: '#10b981',
      purple: '#8b5cf6',
    };
    
    const accentColor = paletteMap[palette] || paletteMap.blue;
    
    // Light mode colors
    const lightColors = {
      '--page-bg': '#f8fafc',
      '--surface-bg': 'rgba(255, 255, 255, 0.95)',
      '--surface-bg-solid': '#ffffff',
      '--surface-border': '#e2e8f0',
      '--text-color': '#0f172a',
      '--text-secondary': '#1e293b',
      '--text-muted': '#64748b',
      '--text-light': '#94a3b8',
      '--card-bg': '#ffffff',
      '--hover-bg': '#f1f5f9',
    };
    
    // Dark mode colors
    const darkColors = {
      '--page-bg': '#020617',
      '--surface-bg': 'rgba(15, 23, 42, 0.95)',
      '--surface-bg-solid': '#0f172a',
      '--surface-border': '#334155',
      '--text-color': '#f8fafc',
      '--text-secondary': '#e2e8f0',
      '--text-muted': '#94a3b8',
      '--text-light': '#64748b',
      '--card-bg': '#1e293b',
      '--hover-bg': '#334155',
    };
    
    const colors = isDark ? darkColors : lightColors;
    
    // Apply all CSS variables
    Object.entries(colors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    // Always set accent color
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--accent-hover', isDark 
      ? adjustBrightness(accentColor, -20) 
      : adjustBrightness(accentColor, 20));
    
    // Save to localStorage
    localStorage.setItem('lawlink-theme-mode', mode);
    localStorage.setItem('lawlink-theme-palette', palette);
    
    // Update color-scheme
    document.documentElement.style.colorScheme = mode;
  }, [mode, palette]);

  // Toggle between light and dark mode
  const toggleMode = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = useMemo(() => ({
    mode,
    palette,
    toggleMode,
    setPalette,
    palettes: ['blue', 'yellow', 'green', 'purple'],
  }), [mode, palette]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Helper function to adjust color brightness
const adjustBrightness = (hex, percent) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + 
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

export const useTheme = () => useContext(ThemeContext);
