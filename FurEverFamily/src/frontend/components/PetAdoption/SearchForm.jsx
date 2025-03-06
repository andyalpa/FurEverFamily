import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../features/ThemeContext';

const SearchForm = ({ onSearch }) => {
  const { theme } = useTheme();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    location: '',
    distance: '50',
    goodWith: [],
    characteristics: [],
    sortBy: 'newest'
  });

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Small & Furry', 'Scales, Fins & Other'];
  const ages = ['Baby', 'Young', 'Adult', 'Senior'];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const genders = ['Male', 'Female'];
  const goodWithOptions = ['Kids', 'Dogs', 'Cats'];
  const characteristicOptions = ['House-trained', 'Special Needs', 'Vaccinated', 'Neutered/Spayed'];

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearch = { ...filters, timestamp: new Date().toISOString() };
    setRecentSearches(prev => [newSearch, ...prev].slice(0, 5));
    onSearch(filters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      breed: '',
      age: '',
      size: '',
      gender: '',
      location: '',
      distance: '50',
      goodWith: [],
      characteristics: [],
      sortBy: 'newest'
    });
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`p-6 rounded-2xl shadow-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
      data-aos="fade-up"
    >
      {/* Basic Search */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label 
            htmlFor="type"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Pet Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className={`w-full p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-primary`}
          >
            <option value="">All Types</option>
            {petTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label 
            htmlFor="breed"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={filters.breed}
            onChange={handleInputChange}
            placeholder="Any breed"
            className={`w-full p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-primary`}
          />
        </div>

        <div>
          <label 
            htmlFor="distance"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Distance (miles)
          </label>
          <div className="relative">
            <input
              type="range"
              id="distance"
              name="distance"
              min="10"
              max="500"
              step="10"
              value={filters.distance}
              onChange={handleInputChange}
              className="w-full"
            />
            <span className={`absolute right-0 -top-6 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filters.distance} miles
            </span>
          </div>
        </div>

        <div>
          <label 
            htmlFor="sortBy"
            className={`block text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Sort By
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
            className={`w-full p-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-primary`}
          >
            <option value="newest">Newest First</option>
            <option value="nearest">Nearest First</option>
            <option value="relevance">Best Match</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        type="button"
        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        className={`flex items-center gap-2 text-sm font-medium mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        } hover:text-primary transition-colors`}
      >
        <svg 
          className={`w-5 h-5 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        Advanced Filters
      </button>

      {/* Advanced Filters */}
      <div className={`space-y-6 overflow-hidden transition-all duration-300 ${
        isAdvancedOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {/* Age and Size */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-text'
            }`}>
              Age
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ages.map(age => (
                <label
                  key={age}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    filters.age === age
                      ? 'bg-primary text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  <input
                    type="radio"
                    name="age"
                    value={age}
                    checked={filters.age === age}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-sm">{age}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-text'
            }`}>
              Size
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map(size => (
                <label
                  key={size}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    filters.size === size
                      ? 'bg-primary text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={filters.size === size}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div>
          <h3 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            Gender
          </h3>
          <div className="flex gap-4">
            {genders.map(gender => (
              <label
                key={gender}
                className={`flex-1 flex items-center justify-center p-2 rounded-lg cursor-pointer ${
                  filters.gender === gender
                    ? 'bg-primary text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={filters.gender === gender}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span className="text-sm">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Good With */}
        <div>
          <h3 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            Good With
          </h3>
          <div className="flex flex-wrap gap-2">
            {goodWithOptions.map(option => (
              <label
                key={option}
                className={`inline-flex items-center px-3 py-1 rounded-full cursor-pointer ${
                  filters.goodWith.includes(option)
                    ? 'bg-primary text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                <input
                  type="checkbox"
                  checked={filters.goodWith.includes(option)}
                  onChange={() => handleCheckboxChange('goodWith', option)}
                  className="sr-only"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Characteristics */}
        <div>
          <h3 className={`text-sm font-medium mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            Characteristics
          </h3>
          <div className="flex flex-wrap gap-2">
            {characteristicOptions.map(option => (
              <label
                key={option}
                className={`inline-flex items-center px-3 py-1 rounded-full cursor-pointer ${
                  filters.characteristics.includes(option)
                    ? 'bg-primary text-white'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                <input
                  type="checkbox"
                  checked={filters.characteristics.includes(option)}
                  onChange={() => handleCheckboxChange('characteristics', option)}
                  className="sr-only"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="space-y-2">
          <h4 className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Recent Searches
          </h4>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setFilters(search);
                  onSearch(search);
                }}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {search.location || 'Any Location'} - {search.type || 'Any Pet'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={clearFilters}
          className="btn-ghost"
        >
          Reset Filters
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          Search Pets
        </button>
      </div>
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;