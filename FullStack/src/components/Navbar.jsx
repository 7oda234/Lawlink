import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, User, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { mode, palette, toggleMode, setPalette, palettes } = useTheme();

  // Detect scrolling to trigger the glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find a Lawyer', path: '/find-lawyer' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-3' : 'bg-black py-5'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wider hover:text-gray-300 transition group">
          <Scale size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
          <span>LAWLINK</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name}
                to={link.path} 
                className={`relative transition-colors hover:text-white ${isActive ? 'text-white' : 'text-gray-400'}`}
              >
                {link.name}
                {/* Active Link Underline Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth and Theme Controls */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          <button
            onClick={toggleMode}
            className="text-gray-300 hover:text-white transition p-2 rounded-md bg-black/20 hover:bg-black/30"
            aria-label="Toggle theme mode"
          >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex items-center gap-1">
            {palettes.map((color) => (
              <button
                key={color}
                onClick={() => setPalette(color)}
                className={`w-3 h-3 rounded-full border ${palette === color ? 'ring-2 ring-white' : 'opacity-70'} ${
                  color === 'blue' ? 'bg-blue-500' : color === 'yellow' ? 'bg-yellow-400' : color === 'green' ? 'bg-emerald-500' : 'bg-purple-500'
                }`}
                aria-label={`Set ${color} accent`}
              />
            ))}
          </div>
          <Link to="/login" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <User size={18} /> Login
          </Link>
          <Link to="/login" className="bg-white text-black px-5 py-2.5 rounded-lg font-bold hover:bg-gray-200 transition shadow-sm hover:shadow-md">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-gray-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`text-lg font-medium ${location.pathname === link.path ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-800 my-2"></div>
              <div className="flex items-center gap-3">
                <button onClick={toggleMode} className="text-gray-300 hover:text-white transition p-2 rounded-md bg-black/20 hover:bg-black/30">
                  {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                {palettes.map((color) => (
                  <button
                    key={color}
                    onClick={() => setPalette(color)}
                    className={`w-3 h-3 rounded-full border ${palette === color ? 'ring-2 ring-white' : 'opacity-70'} ${
                      color === 'blue' ? 'bg-blue-500' : color === 'yellow' ? 'bg-yellow-400' : color === 'green' ? 'bg-emerald-500' : 'bg-purple-500'
                    }`} 
                    aria-label={`Set ${color} accent`}
                  />
                ))}
              </div>
              <Link to="/login" className="flex items-center gap-2 text-lg font-medium text-gray-300">
                <User size={20} /> Login
              </Link>
              <Link to="/login" className="bg-white text-black text-center px-4 py-3 rounded-lg font-bold mt-2">
                Create Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;