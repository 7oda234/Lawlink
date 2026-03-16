import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, CheckCircle, FileText, Cpu, Lock, Clock, ArrowRight } from 'lucide-react';

// Animation Variants (OOP - defining behavior objects)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const LandingPage = () => {
  const features = [
    { icon: <Search size={28} />, title: "Find Expert Lawyers", desc: "Search through our extensive network tailored to your needs." },
    { icon: <CheckCircle size={28} className="text-blue-600" />, title: "Verified Profiles", desc: "Every lawyer undergoes a strict verification process." },
    { icon: <Cpu size={28} className="text-purple-600" />, title: "AI-Powered Match", desc: "Our proprietary AI matches you with the most suitable attorney." },
    { icon: <FileText size={28} />, title: "Secure Documents", desc: "Safely manage sensitive legal files in our encrypted ecosystem." },
    { icon: <Lock size={28} />, title: "Real-time Status", desc: "Keep track of your case progress with transparent updates." },
    { icon: <Clock size={28} />, title: "24/7 Support", desc: "Access round-the-clock assistance for all your inquiries." },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-yellow-200">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white z-10" /> 
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-20 max-w-4xl mx-auto text-white text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl font-serif mb-6 leading-tight tracking-tight">
            Find the Perfect <br /> <span className="text-gray-300 italic">Legal Representation</span>
          </h1>
          <p className="text-xl mb-10 text-gray-200 font-light max-w-2xl mx-auto">
            Experience a new standard in legal services. We combine elite human expertise with advanced AI matching.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 rounded-full font-bold shadow-xl hover:bg-gray-100 transition"
            >
              Start Your Search
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold transition"
            >
              Consult AI Guide
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4">The LawLink Advantage</h2>
          <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Modern problems require modern legal solutions. Our platform is built for speed, security, and success.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6 p-4 bg-gray-50 rounded-lg w-fit group-hover:bg-black group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Dynamic CTA */}
      <section className="bg-black py-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-2">Ready to secure your future?</h2>
            <p className="text-gray-400">Join over 10,000 clients who found their legal match.</p>
          </div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition"
          >
            Create Your Account <ArrowRight />
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;