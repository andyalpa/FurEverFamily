import React, { useEffect, useState } from 'react';
import { mockPetDetails } from '../../Mock API/mockData';

function Favorites() {
  const [favoritePets, setFavoritePets] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      // const petDetails = await Promise.all(
      //   favorites.map(async (petId) => {
      //     try {
      //       const response = await axios.get(
      //         'https://api-staging.adoptapet.com/search/limited_pet_details',
      //         {
      //           params: {
      //             key: process.env.REACT_APP_API_KEY,
      //             v: 3,
      //             output: 'json',
      //             pet_id: petId,
      //           },
      //         }
      //       );
      //       return response.data.pet[0];
      //     } catch (error) {
      //       console.error(`Error fetching pet ${petId}:`, error);
      //       return null;
      //     }
      //   })
      // );
      const petDetails = favorites.map((petId) => mockPetDetails.find(pet => pet.pet_id === petId)); // Use mock data
      setFavoritePets(petDetails.filter((pet) => pet));
    };
    fetchFavorites();
  }, []);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      {favoritePets.length > 0 ? (
        favoritePets.map((pet) => (
          <div key={pet.pet_id} className="flex items-center mb-4">
            <img
              src={pet.images[0]?.thumbnail_url}
              alt={pet.pet_name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{pet.pet_name}</p>
              <a
                href={pet.pet_details_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Details
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;