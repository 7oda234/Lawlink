// ═══════════════════════════════════════════════════════════════════════════════════
// Lawyer Profile Public Page
// ═══════════════════════════════════════════════════════════════════════════════════
// صفحة ملف المحامي العامة - Public lawyer profile
// Public lawyer profile page for browsing lawyer details.
// ───────────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const lawyerData = {
  1: {
    name: 'Robert M. Hughes',
    specialty: 'Corporate Law',
    bio: '20+ years of experience guiding business owners through mergers, contracts, and compliance.',
    location: 'Cairo, Egypt',
    rating: 4.9,
    description: 'Trusted corporate partner with track record of securing successful outcomes in high-value cases.',
  },
  2: {
    name: 'Amina El-Sayed',
    specialty: 'Family Law',
    bio: 'Advocate helping families navigate divorce, custody, and inheritance with care and fairness.',
    location: 'Heliopolis, Cairo',
    rating: 4.8,
    description: 'A compassionate approach backed by legal expertise and strong negotiation skills.',
  },
};

const LawyerProfilePublicPage = () => {
  const { id } = useParams();
  const lawyer = lawyerData[id] || lawyerData[1];

  // 📍 Return section starts here
  return (
  <>
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <div className="md:flex md:items-start md:gap-8">
          <div className="rounded-lg bg-gray-100 p-5 w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-2">About</h2>
            <p className="text-gray-700 mb-4">{lawyer.bio}</p>
            <p className="text-gray-700">{lawyer.description}</p>
          </div>

          <aside className="mt-6 md:mt-0 w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-5">
            <p className="text-gray-500"><strong>Rating:</strong> {lawyer.rating} ★</p>
            <p className="text-gray-500"><strong>Location:</strong> {lawyer.location}</p>
            <p className="text-gray-500"><strong>Cases Closed:</strong> 120+</p>
            <Link
              to="/client/cases/new"
              className="mt-4 inline-block w-full text-center py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800"
            >
              Hire this Lawyer
            </Link>
          </aside>
        </div>
      </div>
  
  </>);
};

export default LawyerProfilePublicPage;
