import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Linkedin, 
  Bell, 
  Mail, 
  Lock, 
  ArrowRight,
  Scale
} from 'lucide-react';

const LoginPage = () => {
  const [portalType, setPortalType] = useState('client'); // 'client' or 'lawyer'

  return (
    <div className="min-h-screen font-sans text-gray-900 flex flex-col">
      
      {/* Top Black Bar */}
      <div className="bg-black text-white text-xs py-2 px-6 flex justify-between items-center">
        <div className="flex-1 text-center text-gray-300">Your Law Simplified</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-300"><Facebook size={16} /></a>
          <a href="#" className="hover:text-gray-300"><Linkedin size={16} /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-10 relative">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wider bg-black text-white p-2 rounded-full w-12 h-12 justify-center hover:bg-gray-800 transition">
          <Scale size={20} />
        </Link>
        
        <div className="hidden lg:flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <a href="#" className="hover:text-gray-600">Portfolio</a>
          <a href="#" className="hover:text-gray-600">Find Lawyers</a>
          <a href="#" className="hover:text-gray-600">About Us</a>
          <a href="#" className="hover:text-gray-600">Contact Us</a>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <button className="hover:text-gray-600">
            <Bell size={20} />
          </button>
          <button className="font-medium hover:text-gray-600">Login</button>
          <button className="bg-black text-white px-5 py-2 rounded-md font-medium hover:bg-gray-800 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content Area (Split Screen) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Image Hero */}
        <div className="relative hidden lg:flex flex-col justify-center px-12 py-20 min-h-[600px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div> 
          
          <div className="relative z-10 text-white max-w-lg">
            <h1 className="text-5xl font-serif font-bold mb-4">Welcome Back.</h1>
            <p className="text-lg text-gray-200">
              Access your secure portal to manage cases, review documents, and communicate with your legal team.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:py-20 bg-white">
          <div className="w-full max-w-md">
            
            {/* Center Logo */}
            <div className="flex justify-center mb-10">
              <div className="bg-black text-white p-4 rounded-full">
                <Scale size={40} />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Login</h2>
              <p className="text-gray-500 text-sm">Don't have an account?</p>
            </div>

            {/* Portal Toggle */}
            <div className="bg-gray-100 p-1 rounded-lg flex mb-8">
              <button 
                onClick={() => setPortalType('client')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition ${portalType === 'client' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Client Portal
              </button>
              <button 
                onClick={() => setPortalType('lawyer')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition ${portalType === 'lawyer' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Lawyer Portal
              </button>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your Mail" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="Enter your Password" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="font-medium hover:underline">Forgot Password ?</a>
              </div>

              <button className="w-full bg-black text-white flex justify-center items-center gap-2 py-3 rounded-md font-medium hover:bg-gray-800 transition">
                Login <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">New to LawLink ? </span>
              <a href="#" className="font-bold hover:underline">Create an Account</a>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-wider mb-4">
              <Scale size={24} />
              <div className="flex flex-col">
                <span>LAWLINK</span>
                <span className="text-[10px] text-gray-400 font-normal">Your Law Simplified</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs mt-4">
              Redefining legal access through intelligent technology. Secure, transparent, and authoritative.
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
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="bg-gray-200 text-black px-6 py-4 -mx-6 -mb-12 mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="font-medium">© 2026 LawLink Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600"><Facebook size={18} /></a>
            <a href="#" className="hover:text-gray-600"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LoginPage;