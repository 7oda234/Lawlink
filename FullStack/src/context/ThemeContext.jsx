import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  mode: 'light',
  palette: 'blue',
  toggleMode: () => {},
  setPalette: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [palette, setPalette] = useState('blue');

  useEffect(() => {
    const savedMode = localStorage.getItem('lawlink-theme-mode');
    const savedPalette = localStorage.getItem('lawlink-theme-palette');
    if (savedMode) setMode(savedMode);
    if (savedPalette) setPalette(savedPalette);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('lawlink-theme-mode', mode);
    localStorage.setItem('lawlink-theme-palette', palette);
  }, [mode, palette]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const palettes = ['blue', 'yellow', 'green', 'purple'];

  const value = useMemo(
    () => ({ mode, palette, toggleMode, setPalette, palettes }),
    [mode, palette],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
