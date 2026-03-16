import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamCard from '../components/TeamCard';
import ValuesCard from '../components/ValuesCard';
import { teamMembers } from '../models/TeamData';
import '../styles/AboutUs.css';

const coreValuesData = [
  { title: 'Trust & Security', description: 'Built-in protections ensuring the highest levels of safety and confidentiality.' },
  { title: 'Client Satisfaction', description: 'A relentless commitment to exceeding expectations and delivering results.' },
  { title: 'Excellence', description: 'Driven by innovation and a dedication to the highest standards of the legal profession.' },
];

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />
      {/* Refined Hero with Courtroom Image */}
      <section className="about-hero bg-black text-white py-32 px-6 relative overflow-hidden">
        {/* Replace this with your actual dignified courtroom image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://media.istockphoto.com/id/1018024484/photo/courtroom.jpg?s=612x612&w=0&k=20&c=iY8qKyfI1nxHtarT2Fll2_qKIs93dVIKlOhVi4ZjZMs=')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60 z-10"></div> 
        
        <div className="max-w-4xl mx-auto relative z-20 text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">The Future of <span className="text-yellow-400">Legal Excellence</span></h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
            Redefining legal access through intelligent technology, backed by elite human expertise.
          </p>
        </div>
      </section>

      {/* Meet Our Team (Data Driven UI) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Meet Our Team</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our mission is powered by a diverse group of passionate legal tech innovators.
          </p>
        </div>
        
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {teamMembers.map((member, idx) => (
            <TeamCard key={idx} {...member} />
          ))}
        </div>
      </section>

      {/* Core Values (Component Composition) */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-3">Our Core Values</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            These principles guide everything we do and shape our commitment to clients and lawyers.
          </p>
        </div>
        
        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {coreValuesData.map((value, idx) => (
            <ValuesCard key={idx} {...value} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;