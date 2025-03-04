import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PetCard({ pet }) {
  if (!pet || !pet.pet_id) {
    return null;
  }

  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]').includes(pet.pet_id)
  );

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id) => id !== pet.pet_id);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } else {
      favorites.push(pet.pet_id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={pet.large_results_photo_url}
        alt={pet.pet_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{pet.pet_name}</h3>
        <p className="text-gray-600">{pet.primary_breed}{pet.secondary_breed ? ` / ${pet.secondary_breed}` : ''}</p>
        <p className="text-gray-500">{pet.addr_city}, {pet.addr_state_code}</p>
        <div className="mt-4 flex justify-between">
          <a
            href={pet.details_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Details
          </a>
          <button
            onClick={toggleFavorite}
            className={`p-1 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;