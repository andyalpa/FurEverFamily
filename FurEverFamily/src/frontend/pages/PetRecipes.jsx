import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { featuredRecipes } from '../Mock API/mockData';

const PetRecipes = () => {
  const [filters, setFilters] = useState({ petType: '', dietary: '' });

  // Basic filtering (expand as needed)
  const filteredRecipes = featuredRecipes.filter((recipe) => {
    return (
      (!filters.petType || recipe.petType.toLowerCase().includes(filters.petType.toLowerCase())) &&
      (!filters.dietary || recipe.title.toLowerCase().includes(filters.dietary.toLowerCase()))
    );
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Pet Recipes</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 pr-4 mb-6 md:mb-0">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <input
              type="text"
              name="petType"
              value={filters.petType}
              onChange={handleFilterChange}
              placeholder="Pet Type (e.g., Dog)"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="dietary"
              value={filters.dietary}
              onChange={handleFilterChange}
              placeholder="Dietary Needs (e.g., Chicken)"
              className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))
            ) : (
              <p>No recipes match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetRecipes;