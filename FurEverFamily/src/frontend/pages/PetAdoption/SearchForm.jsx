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
    <div className={`rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full rounded-lg px-4 py-2 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-primary`}
              >
                <option value="">Any Type</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="other">Other Pets</option>
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
                value={formData.breed}
                onChange={handleInputChange}
                placeholder="Any breed"
                className={`w-full rounded-lg px-4 py-2 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-primary`}
              />
            </div>

            <div>
              <label 
                htmlFor="location" 
                className={`block text-sm font-medium mb-1 ${
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
                placeholder="City, State, or ZIP"
                className={`w-full rounded-lg px-4 py-2 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
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
                Distance
              </label>
              <select
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                className={`w-full rounded-lg px-4 py-2 border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-primary`}
              >
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
                <option value="100">Within 100 miles</option>
                <option value="anywhere">Anywhere</option>
              </select>
            </div>
          </div>

          {/* Toggle Advanced Search */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`flex items-center gap-2 text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <svg 
                className={`w-5 h-5 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Advanced Search Options
            </button>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleReset}
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } hover:text-primary transition-colors`}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Search Pets
              </button>
            </div>
          </div>

          {/* Advanced Search Fields */}
          {isAdvancedOpen && (
            <div className="pt-6 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Age, Size, Gender */}
                <div className="space-y-4">
                  <div>
                    <label 
                      htmlFor="age" 
                      className={`block text-sm font-medium mb-1 ${
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
                      className={`w-full rounded-lg px-4 py-2 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary`}
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
                      htmlFor="size" 
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Size
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg px-4 py-2 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Any Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="xlarge">Extra Large</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="gender" 
                      className={`block text-sm font-medium mb-1 ${
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
                      className={`w-full rounded-lg px-4 py-2 border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary`}
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
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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
        </form>
      </div>
    </div>
  );
};

export default SearchForm;