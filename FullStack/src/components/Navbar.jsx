import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, User } from 'lucide-react';

const Navbar = () => (
    <div className="min-h-screen font-sans text-gray-900">
      
    {/* Navbar */}
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wider hover:text-gray-300 transition">
        <Scale size={24} />
        <span>LAWLINK</span>
      </Link>

      <div className="hidden md:flex gap-8 text-sm">
        <a href="#" className="hover:text-gray-300">Find a Lawyer</a>
        <a href="#" className="hover:text-gray-300">How it works</a>
        <Link to="/about" className="hover:text-gray-300">About Us</Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/login" className="flex items-center gap-2 hover:text-gray-300">
          <User size={16} /> Login
        </Link>
        <Link to="/login" className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
          Sign Up
        </Link>
      </div>
    </nav>
  </div>
);

export default Navbar;