import React, { useEffect, useMemo, useState } from 'react';
import { adjustBrightness } from './ThemeContextUtils';
import { ThemeContext } from './ThemeContextObject';

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem('lawlink-theme-mode') || 'light');
  const [palette, setPalette] = useState(() => localStorage.getItem('lawlink-theme-palette') || 'blue');

  useEffect(() => {
    const isDark = mode === 'dark';
    document.documentElement.classList.toggle('dark', isDark);

    const paletteMap = {
      blue: '#3b82f6',
      yellow: '#f59e0b',
      green: '#10b981',
      purple: '#8b5cf6',
    };

    const accentColor = paletteMap[palette] || paletteMap.blue;

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

    Object.entries(colors).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty(
      '--accent-hover',
      isDark ? adjustBrightness(accentColor, -20) : adjustBrightness(accentColor, 20)
    );

    localStorage.setItem('lawlink-theme-mode', mode);
    localStorage.setItem('lawlink-theme-palette', palette);
    document.documentElement.style.colorScheme = mode;
  }, [mode, palette]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(
    () => ({
      mode,
      palette,
      toggleMode,
      setPalette,
      palettes: ['blue', 'yellow', 'green', 'purple'],
    }),
    [mode, palette]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

