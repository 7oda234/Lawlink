import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const lawyers = [
  { id: 1, name: 'Robert M. Hughes', specialty: 'Corporate Law', rating: 4.9, cases: 180 },
  { id: 2, name: 'Amina El-Sayed', specialty: 'Family Law', rating: 4.8, cases: 117 },
  { id: 3, name: 'Marcus Thorne', specialty: 'Criminal Defense', rating: 5.0, cases: 236 },
  { id: 4, name: 'Sarah Jenkins', specialty: 'Real Estate Law', rating: 4.7, cases: 89 },
];

const LawyersListPage = () => {
  const [query, setQuery] = useState('');

  const filtered = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(query.toLowerCase()) ||
    lawyer.specialty.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or specialty"
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((l) => (
          <article key={l.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-black">{l.name}</h3>
                <p className="text-gray-600">{l.specialty}</p>
              </div>
              <span className="text-sm bg-yellow-200 text-black px-3 py-1 rounded-full font-semibold">{l.rating} ★</span>
            </div>
            <p className="text-gray-500 mt-2">Cases handled: {l.cases}</p>
            <Link
              to={`/lawyers/${l.id}`}
              className="inline-block mt-4 px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition"
            >
              View Profile
            </Link>
          </article>
        ))}
      </div>
    </>
  );
};

export default LawyersListPage;
