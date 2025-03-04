import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PetList from './PetList';
import Favorites from './Favorites';

function PetAdoption() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/3">
        <SearchForm setSearchResults={setSearchResults} />
        <Favorites />
      </div>
      <div className="lg:w-2/3">
        <PetList pets={searchResults} />
      </div>
    </div>
  );
}

export default PetAdoption;