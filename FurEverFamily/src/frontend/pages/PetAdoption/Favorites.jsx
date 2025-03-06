import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPetDetails } from '../../Mock API/mockData';
import { useTheme } from '../../features/ThemeContext';

const Favorites = () => {
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterType, setFilterType] = useState('all');
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('petCollections');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPets, setSelectedPets] = useState([]);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoritePets') || '[]');
    const favoritePets = mockPetDetails.filter(pet => savedFavorites.includes(pet.pet_id));
    setFavorites(favoritePets.map(pet => ({
      ...pet,
      dateAdded: savedFavorites.indexOf(pet.pet_id), // Use index as proxy for date added
    })));
  }, []);

  useEffect(() => {
    localStorage.setItem('petCollections', JSON.stringify(collections));
  }, [collections]);

  const handleSort = (method) => {
    setSortBy(method);
    const sorted = [...favorites];
    switch (method) {
      case 'dateAdded':
        sorted.sort((a, b) => a.dateAdded - b.dateAdded);
        break;
      case 'name':
        sorted.sort((a, b) => a.pet_name.localeCompare(b.pet_name));
        break;
      case 'age':
        sorted.sort((a, b) => a.age_in_months - b.age_in_months);
        break;
      default:
        break;
    }
    setFavorites(sorted);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const handleSelectPet = (petId) => {
    setSelectedPets(prev => 
      prev.includes(petId)
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      setCollections(prev => [...prev, {
        id: Date.now(),
        name: newCollectionName.trim(),
        pets: selectedPets,
      }]);
      setNewCollectionName('');
      setIsCreatingCollection(false);
      setSelectedPets([]);
    }
  };

  const handleRemoveFromCollection = (collectionId, petId) => {
    setCollections(prev => prev.map(collection => 
      collection.id === collectionId
        ? { ...collection, pets: collection.pets.filter(id => id !== petId) }
        : collection
    ));
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections(prev => prev.filter(collection => collection.id !== collectionId));
  };

  const filteredFavorites = favorites.filter(pet => 
    filterType === 'all' ? true : pet.type.toLowerCase() === filterType
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className={`text-3xl font-heading font-bold ${
              theme === 'dark' ? 'text-white' : 'text-text'
            }`}>
              Favorite Pets
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {/* Sort Controls */}
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="dateAdded">Recently Added</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
              </select>

              {/* Filter Controls */}
              <select
                value={filterType}
                onChange={(e) => handleFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="other">Other</option>
              </select>

              {/* Collection Actions */}
              {selectedPets.length > 0 && (
                <button
                  onClick={() => setIsCreatingCollection(true)}
                  className="btn-primary"
                >
                  Create Collection
                </button>
              )}
            </div>
          </div>

          {/* Collections Section */}
          {collections.length > 0 && (
            <div className="mb-12 space-y-6">
              <h2 className={`text-xl font-heading font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}>
                Your Collections
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map(collection => (
                  <div
                    key={collection.id}
                    className={`p-6 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-text'
                      }`}>
                        {collection.name}
                      </h3>
                      <button
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {collection.pets.map(petId => {
                        const pet = favorites.find(p => p.pet_id === petId);
                        return pet ? (
                          <div
                            key={pet.pet_id}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
                          >
                            <img
                              src={pet.thumbnail_url}
                              alt={pet.pet_name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                              {pet.pet_name}
                            </span>
                            <button
                              onClick={() => handleRemoveFromCollection(collection.id, pet.pet_id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites Grid */}
          {filteredFavorites.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map(pet => (
                <div
                  key={pet.pet_id}
                  className={`group relative rounded-2xl overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  } transition-all duration-300 hover:shadow-xl`}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-4 left-4 z-10">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPets.includes(pet.pet_id)}
                        onChange={() => handleSelectPet(pet.pet_id)}
                        className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                    </label>
                  </div>

                  <Link to={`/pet/${pet.pet_id}`}>
                    <div className="relative aspect-w-16 aspect-h-9">
                      <img
                        src={pet.large_results_photo_url}
                        alt={pet.pet_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-heading font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-text'
                        }`}>
                          {pet.pet_name}
                        </h3>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary text-white'
                        }`}>
                          {pet.age}
                        </span>
                      </div>

                      <p className={`mb-4 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {pet.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {pet.addr_city}, {pet.addr_state_code}
                        </span>
                        <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                          View Details
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h2 className={`text-2xl font-heading font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}>
                No favorites yet
              </h2>
              <p className={`mb-6 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Start exploring and save pets you're interested in!
              </p>
              <Link to="/adopt" className="btn-primary">
                Browse Pets
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Create Collection Modal */}
      {isCreatingCollection && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div 
              className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => {
                    setIsCreatingCollection(false);
                    setNewCollectionName('');
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateCollection} className="space-y-4">
                <h3 className={`text-lg font-heading font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-text'
                }`}>
                  Create New Collection
                </h3>
                
                <div>
                  <label 
                    htmlFor="collection-name" 
                    className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Collection Name
                  </label>
                  <input
                    type="text"
                    id="collection-name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-primary`}
                    required
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingCollection(false);
                      setNewCollectionName('');
                    }}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Create Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;