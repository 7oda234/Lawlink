import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LawyerCard from '../../components/LawyerCard';
import { Search, Filter } from 'lucide-react';

const FindLawyerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Dummy Data for the directory
  const lawyers = [
    {
      id: 1,
      name: "Robert M. Hughes",
      specialty: "Corporate Law",
      location: "Downtown Cairo",
      experience: 15,
      rating: 4.9,
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Amina El-Sayed",
      specialty: "Family Law",
      location: "Heliopolis, Cairo",
      experience: 8,
      rating: 4.8,
      category: "Family",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Marcus Thorne",
      specialty: "Criminal Defense",
      location: "Maadi, Cairo",
      experience: 20,
      rating: 5.0,
      category: "Criminal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      specialty: "Real Estate Law",
      location: "New Cairo",
      experience: 12,
      rating: 4.7,
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const categories = ["All", "Corporate", "Family", "Criminal", "Real Estate", "Intellectual Property"];

  // Basic filtering logic
  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || lawyer.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        {/* Page Header */}
        <div className="bg-black text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find the Right Legal Expert</h1>
            <p className="text-gray-400 max-w-2xl text-lg">
              Browse our verified network of top-tier attorneys. Filter by specialty, location, and experience to secure the best representation.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar: Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-28 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-lg mb-6 text-gray-900 border-b border-gray-100 pb-4">
                <Filter size={20} />
                Filters
              </div>

              {/* Practice Areas */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Practice Area</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category"
                        checked={activeCategory === category}
                        onChange={() => setActiveCategory(category)}
                        className="w-4 h-4 text-black focus:ring-black border-gray-300" 
                      />
                      <span className={`text-sm transition-colors ${activeCategory === category ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'}`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Search & Results */}
          <div className="lg:col-span-3">
            
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex items-center mb-8 focus-within:ring-2 focus-within:ring-black transition-all">
              <Search className="text-gray-400 ml-4 mr-2 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, firm, or specialty..." 
                className="w-full py-3 px-2 outline-none text-gray-800 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition shrink-0 hidden sm:block">
                Search
              </button>
            </div>

            {/* Results Header */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {filteredLawyers.length} {filteredLawyers.length === 1 ? 'Result' : 'Results'} Found
              </h2>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {filteredLawyers.length > 0 ? (
                filteredLawyers.map(lawyer => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                  <p className="text-gray-500 text-lg">No legal professionals found matching your criteria.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                    className="mt-4 text-yellow-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindLawyerPage;