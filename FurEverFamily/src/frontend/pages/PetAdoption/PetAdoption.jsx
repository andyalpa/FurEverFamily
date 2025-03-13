import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PetList from './PetList';
import Favorites from './Favorites';
import { useTheme } from '../../features/ThemeContext';

function PetAdoption() {
  const [searchResults, setSearchResults] = useState([]);
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className={` lg:top-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm`}>
              <SearchForm setSearchResults={setSearchResults} />
            </div>
            <div className="hidden lg:block lg:sticky lg:top-[calc(100vh-4rem)]">
              <Favorites />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <PetList pets={searchResults} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetAdoption;