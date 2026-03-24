import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-500 mb-8">Join the platform today.</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="••••••••" />
          </div>
          
          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black" id="terms" />
            <label htmlFor="terms" className="text-xs text-gray-500">
              I agree to the <a href="#" className="text-black font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-black font-medium hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-sm mt-4">
            Create Account
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;