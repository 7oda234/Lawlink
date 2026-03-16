import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Animation Objects
const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
};

const formStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
};

const itemFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const LoginPage = () => {
  const [portalType, setPortalType] = useState('client');

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      
      {/* Reusable Navbar */}

      {/* Main Content Area (Split Screen) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* Left Side - Animated Image Hero */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          className="relative hidden lg:flex flex-col justify-center px-16 py-20 min-h-[600px]"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div> 
          
          <div className="relative z-10 text-white max-w-lg">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md p-4 rounded-full w-16 h-16 flex items-center justify-center mb-8 border border-white/20"
            >
              <Scale size={32} />
            </motion.div>
            <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">Welcome <br/>Back.</h1>
            <p className="text-lg text-gray-200 font-light leading-relaxed">
              Access your secure portal to manage cases, review documents, and communicate seamlessly with your legal team.
            </p>
          </div>
        </motion.div>

        {/* Right Side - Animated Login Form */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          className="flex flex-col justify-center items-center px-6 py-12 lg:py-20 bg-gray-50"
        >
          <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">Secure Login</h2>
              <p className="text-gray-500 text-sm">Access your personalized dashboard.</p>
            </div>

            {/* Portal Toggle (Animated) */}
            <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8 relative">
              <button 
                onClick={() => setPortalType('client')}
                className={`relative flex-1 py-2.5 text-sm font-bold rounded-lg z-10 transition-colors duration-300 ${portalType === 'client' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Client Portal
              </button>
              <button 
                onClick={() => setPortalType('lawyer')}
                className={`relative flex-1 py-2.5 text-sm font-bold rounded-lg z-10 transition-colors duration-300 ${portalType === 'lawyer' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Lawyer Portal
              </button>
              {/* The Sliding White Background */}
              <motion.div 
                className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-lg shadow-sm"
                animate={{ left: portalType === 'client' ? "6px" : "calc(50%)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* Form */}
            <motion.form 
              variants={formStagger}
              initial="hidden"
              animate="visible"
              className="space-y-5" 
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.div variants={itemFade}>
                <label className="block text-sm font-bold mb-2 text-gray-700">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemFade}>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-bold text-gray-500 hover:text-black transition-colors">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemFade} className="flex items-center pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black" />
                  <span className="text-sm font-medium text-gray-600">Remember me for 30 days</span>
                </label>
              </motion.div>

              <motion.div variants={itemFade} className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white flex justify-center items-center gap-2 py-3.5 rounded-lg font-bold shadow-lg shadow-black/20 hover:bg-gray-800 transition-all"
                >
                  Sign In <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </motion.form>

            <div className="mt-8 text-center text-sm">
              <span className="text-gray-500">New to the platform? </span>
              <a href="#" className="font-bold border-b border-black pb-0.5 hover:text-gray-600 transition-colors">Create an Account</a>
            </div>

          </div>
        </motion.div>
      </main>

      {/* Reusable Footer */}
      <Footer />

    </div>
  );
};

export default LoginPage;