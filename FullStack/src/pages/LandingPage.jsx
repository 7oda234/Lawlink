import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle, 
  FileText, 
  Cpu, 
  Lock, 
  Clock, 
  ArrowRight,
  Scale,
  Facebook,
  Linkedin,
  User
} from 'lucide-react';

const LandingPage = () => {
  return (
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
          <a href="#" className="hover:text-gray-300">About Us</a>
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

      {/* Hero Section */}
      <header className="relative h-[600px] flex items-center justify-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60 z-10"></div> 
        
        <div className="relative z-20 max-w-3xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
            Find the Perfect <br /> Lawyer for Your Case
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200 px-4">
            Connect with top-rated lawyers, review their track records, 
            and get expert legal assistance powered by AI technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition">
              Find a Lawyer
            </button>
            <button className="bg-white/20 backdrop-blur-sm border border-white/40 text-white px-8 py-3 rounded-md font-medium hover:bg-white/30 transition">
              Consult AI Assistant
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose LawLink?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a comprehensive platform that connects you with qualified lawyers while offering advanced tools to ensure transparent, reliable service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Search size={24} />, title: "Find Expert Lawyers", desc: "Search through our extensive network of top-tier legal professionals tailored to your specific needs." },
            { icon: <CheckCircle size={24} className="text-blue-500" />, title: "Verified Profiles", desc: "Every lawyer on our platform undergoes a strict verification process for your peace of mind." },
            { icon: <FileText size={24} />, title: "Secure Document Sharing", desc: "Safely share and manage your sensitive legal documents within our encrypted ecosystem." },
            { icon: <Cpu size={24} />, title: "AI-Powered Match", desc: "Our proprietary AI analyzes your case details to match you with the most suitable attorney." },
            { icon: <Lock size={24} />, title: "Real-time Status", desc: "Keep track of your case progress with transparent, real-time updates directly from your lawyer." },
            { icon: <Clock size={24} />, title: "24/7 Support", desc: "Access round-the-clock customer support to assist you with any platform-related inquiries." },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="mb-4 text-gray-800">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Navigating the legal system has never been easier. Follow these simple steps to find the right lawyer.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
          {[
            { num: "01", title: "Submit Your Case", desc: "Fill out a simple form describing your legal needs and requirements." },
            { num: "02", title: "Get Matched", desc: "Our system analyzes your info to find qualified lawyers experienced in your specific case type." },
            { num: "03", title: "Review & Choose", desc: "Review lawyer profiles, ratings, and past cases to choose the best fit for you." },
            { num: "04", title: "Connect & Resolve", desc: "Schedule a consultation, discuss your case, and begin resolving your legal matter." },
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="bg-gray-100 w-full rounded-lg py-8 px-4 mb-4">
                  <h3 className="text-6xl font-bold text-black mb-4">{step.num}</h3>
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
              {idx < 3 && (
                <div className="hidden md:flex items-center justify-center pt-24 text-yellow-500">
                  <ArrowRight size={32} strokeWidth={1} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to begin?</h2>
        <p className="text-lg text-gray-400 mb-10">Experience the future of legal representation today.</p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Create Account
        </button>
      </section>

      {/* Footer */}
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
              <li><a href="#" className="hover:text-white">About</a></li>
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

    </div>
  );
};

export default LandingPage;