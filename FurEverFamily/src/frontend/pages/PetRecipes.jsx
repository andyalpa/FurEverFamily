import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { featuredRecipes } from '../Mock API/mockData';
import { useTheme } from '../features/ThemeContext';

const PetRecipes = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState({
    petType: '',
    dietary: '',
    difficulty: '',
    prepTime: '',
    ingredients: [],
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Basic filtering (expand as needed)
  const filteredRecipes = featuredRecipes.filter((recipe) => {
    return (
      (!filters.petType || recipe.petType.toLowerCase().includes(filters.petType.toLowerCase())) &&
      (!filters.dietary || recipe.title.toLowerCase().includes(filters.dietary.toLowerCase()))
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      petType: '',
      dietary: '',
      difficulty: '',
      prepTime: '',
      ingredients: [],
    });
  };

  return (
    <div className={`min-h-screen pt-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/3">
            <div className={`sticky top-20 rounded-xl shadow-sm ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="p-6">
                <div className="mb-6">
                  <h2 className={`text-xl font-heading font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Find Pet Recipes
                  </h2>
                  <p className={`mt-1 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Filter recipes to find the perfect meal for your pet
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Basic Filters */}
                  <div>
                    <label 
                      htmlFor="petType" 
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Pet Type
                    </label>
                    <select
                      id="petType"
                      name="petType"
                      value={filters.petType}
                      onChange={handleFilterChange}
                      className={`w-full rounded-lg px-4 py-2.5 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary transition-colors`}
                    >
                      <option value="">All Pets</option>
                      <option value="dog">Dogs</option>
                      <option value="cat">Cats</option>
                      <option value="other">Other Pets</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="dietary" 
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Dietary Requirements
                    </label>
                    <select
                      id="dietary"
                      name="dietary"
                      value={filters.dietary}
                      onChange={handleFilterChange}
                      className={`w-full rounded-lg px-4 py-2.5 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary transition-colors`}
                    >
                      <option value="">Any Diet</option>
                      <option value="grain-free">Grain Free</option>
                      <option value="high-protein">High Protein</option>
                      <option value="low-fat">Low Fat</option>
                      <option value="vegetarian">Vegetarian</option>
                    </select>
                  </div>

                  {/* Advanced Filters Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {isAdvancedOpen ? 'Less Filters' : 'More Filters'}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform ${
                        isAdvancedOpen ? 'rotate-180' : ''
                      } ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Advanced Filters */}
                  {isAdvancedOpen && (
                    <div className="pt-6 border-t dark:border-gray-700 space-y-6">
                      <div>
                        <label 
                          htmlFor="difficulty" 
                          className={`block text-sm font-medium mb-1.5 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Difficulty Level
                        </label>
                        <select
                          id="difficulty"
                          name="difficulty"
                          value={filters.difficulty}
                          onChange={handleFilterChange}
                          className={`w-full rounded-lg px-4 py-2.5 border ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-primary transition-colors`}
                        >
                          <option value="">Any Difficulty</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      <div>
                        <label 
                          htmlFor="prepTime" 
                          className={`block text-sm font-medium mb-1.5 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Preparation Time
                        </label>
                        <select
                          id="prepTime"
                          name="prepTime"
                          value={filters.prepTime}
                          onChange={handleFilterChange}
                          className={`w-full rounded-lg px-4 py-2.5 border ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-primary transition-colors`}
                        >
                          <option value="">Any Time</option>
                          <option value="quick">Quick (&lt; 15 mins)</option>
                          <option value="medium">Medium (15-30 mins)</option>
                          <option value="long">Long (&gt; 30 mins)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-6">
                    <button
                      onClick={handleReset}
                      className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Reset
                    </button>
                    <button
                      className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="lg:w-2/3">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    data-aos="fade-up"
                    className={`group relative rounded-xl overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-sm hover:shadow-lg transition-all duration-300`}
                  >
                    <RecipeCard {...recipe} />
                  </div>
                ))}
              </div>
            ) : (
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
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-4m6 0h-2m-6 0H4m12 6h-2m-6 0H4m12 6h-2m-6 0H4"
                    />
                  </svg>
                </div>
                <h3 className={`text-xl font-heading font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  No recipes found
                </h3>
                <p className={`text-center max-w-sm mb-8 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Try adjusting your filters to find more recipes
                </p>
                <button
                  onClick={handleReset}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetRecipes;