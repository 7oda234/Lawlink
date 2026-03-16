import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-wider mb-4">
              <Scale size={24} />
              <span>LAWLINK</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Redefining legal access through intelligent technology. Secure, transparent, and comprehensive.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Find a Lawyer</a></li>
              <li><a href="#" className="hover:text-white">Corporate Law</a></li>
              <li><a href="#" className="hover:text-white">Family Law</a></li>
              <li><a href="#" className="hover:text-white">Criminal Defense</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>© 2026 LawLink Inc. All rights reserved</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;