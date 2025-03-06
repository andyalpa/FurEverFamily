import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '../../features/ThemeContext';

const PetCard = ({ pet }) => {
  const { theme } = useTheme();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favoritePets') || '[]');
    return favorites.includes(pet.pet_id);
  });

  const handleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favoritePets') || '[]');
    if (isFavorite) {
      localStorage.setItem(
        'favoritePets',
        JSON.stringify(favorites.filter(id => id !== pet.pet_id))
      );
    } else {
      localStorage.setItem(
        'favoritePets',
        JSON.stringify([...favorites, pet.pet_id])
      );
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/pet/${pet.pet_id}`}
      className={`group block rounded-2xl overflow-hidden transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } hover:shadow-xl transform hover:-translate-y-1`}
      data-aos="fade-up"
    >
      {/* Image Container */}
      <div className="relative aspect-w-16 aspect-h-9">
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 ${
          isImageLoaded ? 'hidden' : 'animate-pulse'
        }`} />
        <img
          src={pet.large_results_photo_url}
          alt={pet.pet_name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleFavorite}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg transform transition-all duration-300 hover:scale-110"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className={`w-5 h-5 ${
                isFavorite ? 'text-red-500' : 'text-gray-400'
              } transition-colors`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Pet Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {pet.age}
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {pet.addr_city}, {pet.addr_state_code}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xl font-heading font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            {pet.pet_name}
          </h3>
          <span className={`px-3 py-1 text-xs rounded-full ${
            theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary text-white'
          }`}>
            {pet.primary_breed}
          </span>
        </div>

        <p className={`mb-4 line-clamp-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {pet.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {pet.sex}
            </span>
          </div>
          <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    pet_id: PropTypes.number.isRequired,
    pet_name: PropTypes.string.isRequired,
    primary_breed: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    large_results_photo_url: PropTypes.string.isRequired,
    addr_city: PropTypes.string.isRequired,
    addr_state_code: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetCard;