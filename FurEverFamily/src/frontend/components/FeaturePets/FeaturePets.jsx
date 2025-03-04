import React, { useEffect, useState } from 'react';
import PetCard from './../PetCard/PetCard';
import { featuredPets as mockFeaturedPets } from '../../Mock API/mockData';

function FeaturePets() {
  const [featuredPets, setFeaturedPets] = useState([]);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        // const response = await axios.get(
        //   'https://api-staging.adoptapet.com/search/pet_search',
        //   {
        //     params: {
        //       key: process.env.REACT_APP_API_KEY, // Store API key in .env
        //       v: 3,
        //       output: 'json',
        //       city_or_zip: '47374', // Example zip code
        //       geo_range: 50,
        //       species: 'dog',
        //       start_number: 1,
        //       end_number: 6, // Limit to 6 featured pets
        //     },
        //   }
        // );
        // setFeaturedPets(response.data.pets || []);
        setFeaturedPets(mockFeaturedPets); // Use mock data
      } catch (error) {
        console.error('Error fetching featured pets:', error);
      }
    };
    fetchFeaturedPets();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Featured Pets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPets.map((pet) => (
          <PetCard key={pet.pet_id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default FeaturePets;