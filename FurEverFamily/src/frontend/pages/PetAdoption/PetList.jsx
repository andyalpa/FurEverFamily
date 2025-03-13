import React from 'react';
import PropTypes from 'prop-types';
import PetCard from './../../components/PetCard/PetCard';
import { useTheme } from '../../features/ThemeContext';

function PetList({ pets }) {
  const { theme } = useTheme();

  if (!pets.length) {
    return (
      <div 
        className={`flex flex-col items-center justify-center min-h-[400px] rounded-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}
        data-aos="fade-up"
      >
        <div className="w-20 h-20 mb-6">
          <svg
            className={`w-full h-full ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.5 14.5c1.5 0 3-.5 4-1.5M18 10c.9-.9.9-2.1 0-3m-1.8-1.7c.3-.4.5-.8.5-1.3 0-1.1-.9-2-2-2s-2 .9-2 2c0 .5.2.9.5 1.3M15.5 14.5c-1.5 0-3-.5-4-1.5M6 10c-.9-.9-.9-2.1 0-3m1.8-1.7C7.5 4.9 7.3 4.5 7.3 4c0-1.1.9-2 2-2s2 .9 2 2c0 .5-.2.9-.5 1.3M8.5 14.5c1.5 0 3-.5 4-1.5m-4 1.5c-1.5 0-3-.5-4-1.5M12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
            />
          </svg>
        </div>
        <h3 className={`text-xl font-heading font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          No pets found
        </h3>
        <p className={`text-center max-w-sm mb-8 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Try adjusting your search filters or browse our available pets
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Modify Search
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pets.map((pet, index) => (
          <div
            key={pet.pet_id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`group relative rounded-xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-sm hover:shadow-lg transition-all duration-300`}
          >
            <PetCard pet={pet} />
          </div>
        ))}
      </div>

      {pets.length > 6 && (
        <div 
          className="flex justify-center pt-8"
          data-aos="fade-up"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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