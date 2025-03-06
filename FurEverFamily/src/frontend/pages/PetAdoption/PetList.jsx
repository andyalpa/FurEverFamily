import React from 'react';
import PropTypes from 'prop-types';
import PetCard from './../../components/PetCard/PetCard';
import { useTheme } from '../../features/ThemeContext';

function PetList({ pets }) {
  const { theme } = useTheme();

  if (!pets.length) {
    return (
      <div 
        className={`text-center py-16 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
        data-aos="fade-up"
      >
        <div className="w-24 h-24 mx-auto mb-6">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold mb-2">No pets found</h3>
        <p className="mb-8">Try adjusting your search criteria</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-ghost"
        >
          Modify Search
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet, index) => (
          <div
            key={pet.pet_id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="transform hover:-translate-y-1 transition-transform duration-300"
          >
            <PetCard pet={pet} />
          </div>
        ))}
      </div>

      {pets.length > 6 && (
        <div 
          className="text-center pt-8"
          data-aos="fade-up"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg
              className="w-5 h-5 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span>Back to Top</span>
          </button>
        </div>
      )}
    </div>
  );
}

PetList.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      pet_id: PropTypes.number.isRequired,
      pet_name: PropTypes.string.isRequired,
      primary_breed: PropTypes.string.isRequired,
      secondary_breed: PropTypes.string,
      addr_city: PropTypes.string.isRequired,
      addr_state_code: PropTypes.string.isRequired,
      large_results_photo_url: PropTypes.string.isRequired,
      details_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PetList;