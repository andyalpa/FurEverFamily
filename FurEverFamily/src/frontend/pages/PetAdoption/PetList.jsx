import React from 'react';
import PetCard from './../../components/PetCard/PetCard';

function PetList({ pets }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.length > 0 ? (
        pets.map((pet) => <PetCard key={pet.pet_id} pet={pet} />)
      ) : (
        <p className="text-gray-600">No pets found. Try adjusting your search.</p>
      )}
    </div>
  );
}

export default PetList;