import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../features/ThemeContext';

const SearchForm = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    type: searchParams.get('type') || '',
    breed: searchParams.get('breed') || '',
    age: searchParams.get('age') || '',
    size: searchParams.get('size') || '',
    gender: searchParams.get('gender') || '',
    location: searchParams.get('location') || '',
    distance: searchParams.get('distance') || '50',
    goodWith: searchParams.getAll('goodWith') || [],
    traits: searchParams.getAll('traits') || [],
    isVaccinated: searchParams.get('isVaccinated') === 'true',
    isNeutered: searchParams.get('isNeutered') === 'true',
    isHouseTrained: searchParams.get('isHouseTrained') === 'true',
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'goodWith' || name === 'traits') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    
    navigate({
      pathname: '/adopt',
      search: params.toString()
    });
  };

  const handleReset = () => {
    setFormData({
      type: '',
      breed: '',
      age: '',
      size: '',
      gender: '',
      location: '',
      distance: '50',
      goodWith: [],
      traits: [],
      isVaccinated: false,
      isNeutered: false,
      isHouseTrained: false,
    });
  };

  return (
    <div className={`overflow-hidden rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Header */}
          <div className="mb-6">
            <h2 className={`text-xl  font-heading font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Find Your Perfect Pet
            </h2>
            <p className={`mt-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Use the filters below to find your new companion
            </p>
          </div>

          {/* Basic Search Fields */}
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="type" 
                className={`block text-sm font-medium mb-1.5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                I'm looking for a...
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full rounded-lg px-4 py-2.5 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-primary transition-colors`}
              >
                <option value="">Any Type of Pet</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other Pets</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="breed" 
                className={`block text-sm font-medium mb-1.5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                placeholder="Any breed"
                className={`w-full rounded-lg px-4 py-2.5 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:ring-2 focus:ring-primary transition-colors`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="location" 
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City or ZIP"
                  className={`w-full rounded-lg px-4 py-2.5 border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:ring-2 focus:ring-primary transition-colors`}
                />
              </div>

              <div>
                <label 
                  htmlFor="distance" 
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Distance
                </label>
                <select
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg px-4 py-2.5 border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-primary transition-colors`}
                >
                  <option value="10">10 miles</option>
                  <option value="25">25 miles</option>
                  <option value="50">50 miles</option>
                  <option value="100">100 miles</option>
                  <option value="anywhere">Any distance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Search Toggle */}
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

          {/* Advanced Search Fields */}
          {isAdvancedOpen && (
            <div className="pt-6 border-t dark:border-gray-700">
              <div className="space-y-6">
                {/* Age, Size, Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="age" 
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Age
                    </label>
                    <select
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg px-4 py-2.5 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary transition-colors`}
                    >
                      <option value="">Any Age</option>
                      <option value="baby">Baby</option>
                      <option value="young">Young</option>
                      <option value="adult">Adult</option>
                      <option value="senior">Senior</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="gender" 
                      className={`block text-sm font-medium mb-1.5 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg px-4 py-2.5 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary transition-colors`}
                    >
                      <option value="">Any Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Good With */}
                <div>
                  <span className={`block text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Good With
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {['kids', 'dogs', 'cats', 'seniors'].map(option => (
                      <label 
                        key={option}
                        className={`flex items-center gap-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="goodWith"
                          value={option}
                          checked={formData.goodWith.includes(option)}
                          onChange={handleInputChange}
                          className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Health & Training */}
                <div>
                  <span className={`block text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Health & Training
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <label 
                      className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="isVaccinated"
                        checked={formData.isVaccinated}
                        onChange={handleInputChange}
                        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <span className="text-sm">Vaccinated</span>
                    </label>
                    <label 
                      className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="isNeutered"
                        checked={formData.isNeutered}
                        onChange={handleInputChange}
                        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <span className="text-sm">Spayed/Neutered</span>
                    </label>
                    <label 
                      className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="isHouseTrained"
                        checked={formData.isHouseTrained}
                        onChange={handleInputChange}
                        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <span className="text-sm">House Trained</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="button"
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
              type="submit"
              className={`flex-1 px-4 py-2.5 rounded-lg bg-primary  text-sm font-medium hover:bg-primary-dark transition-colors ${
                theme === 'dark'
                 ? 'border-gray-700 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;