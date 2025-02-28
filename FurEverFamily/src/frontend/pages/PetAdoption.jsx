import React, { useState } from 'react';
import PetCard from '../components/PetCard/PetCard';
import { featuredPets } from '../Mock API/mockData'; // Use as placeholder

const PetAdoption = () => {
  const [filters, setFilters] = useState({ species: '', breed: '', age: '', location: '' });
  const filteredPets = featuredPets; // Add filtering logic here later

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Adopt a Pet</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 pr-4 mb-6 md:mb-0">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <input type="text" placeholder="Species" className="w-full p-2 mb-2 border rounded dark:bg-gray-700" />
            <input type="text" placeholder="Breed" className="w-full p-2 mb-2 border rounded dark:bg-gray-700" />
            <input type="text" placeholder="Age" className="w-full p-2 mb-2 border rounded dark:bg-gray-700" />
            <input type="text" placeholder="Location" className="w-full p-2 mb-2 border rounded dark:bg-gray-700" />
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetAdoption;