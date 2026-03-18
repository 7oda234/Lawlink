import React, { createContext, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

export const PageLayoutContext = createContext({ persistent: false });

export const PageLayoutProvider = ({ persistent, children }) => (
  <PageLayoutContext.Provider value={{ persistent }}>{children}</PageLayoutContext.Provider>
);

export const usePageLayoutPersistence = () => useContext(PageLayoutContext);

const PageLayout = ({ title, subtitle, children, heroImage }) => {
  const { mode, palette } = useTheme();
  const { persistent } = usePageLayoutPersistence();
  const showChrome = !persistent;

  const themeClass = mode === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const accentClass = palette === 'yellow' ? 'text-amber-400' : palette === 'green' ? 'text-emerald-400' : palette === 'purple' ? 'text-violet-400' : 'text-blue-400';

  return (
    <div className={`min-h-screen flex flex-col ${themeClass}`}>
      {showChrome && <Navbar />}
      <header
        className="relative bg-black text-white py-24"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : 'linear-gradient(120deg, #111827 0%, #000 80%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative max-w-6xl mx-auto px-6">
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${accentClass}`}>{title}</h1>
          {subtitle && <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl">{subtitle}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-md bg-white/20 text-gray-100">Mode: {mode}</span>
            <span className="text-xs px-2 py-1 rounded-md bg-white/20 text-gray-100">Palette: {palette}</span>
          </div>
        </div>
      </header>
      <main className="flex-grow pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {children}
        </div>
      </main>
      {showChrome && <Footer />}
    </div>
  );
};

export default PageLayout;
