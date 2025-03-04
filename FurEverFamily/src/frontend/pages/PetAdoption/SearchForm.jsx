import React, { useEffect, useState } from 'react';
import { mockFormOptions, mockSearchResults } from '../../Mock API/mockData';

function SearchForm({ setSearchResults }) {
  const [formData, setFormData] = useState({
    species: 'dog',
    city_or_zip: '47374',
    geo_range: '50',
    age: '',
    sex: '',
  });
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        // const response = await axios.get(
        //   'https://api-staging.adoptapet.com/search/search_form',
        //   {
        //     params: {
        //       key: process.env.REACT_APP_API_KEY,
        //       v: 3,
        //       output: 'json',
        //       species: formData.species,
        //     },
        //   }
        // );
        // setOptions(response.data);
        setOptions(mockFormOptions); // Use mock data
      } catch (error) {
        console.error('Error fetching form options:', error);
      }
    };
    fetchFormOptions();
  }, [formData.species]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.get(
      //   'https://api-staging.adoptapet.com/search/pet_search',
      //   {
      //     params: {
      //       key: process.env.REACT_APP_API_KEY,
      //       v: 3,
      //       output: 'json',
      //       ...formData,
      //       start_number: 1,
      //       end_number: 50,
      //     },
      //   }
      // );
      // setSearchResults(response.data.pets || []);
      setSearchResults(mockSearchResults); // Use mock data
    } catch (error) {
      console.error('Error searching pets:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Find a Pet</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Species</label>
        <select name="species" value={formData.species} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          {/* Add more species as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Zip Code</label>
        <input
          type="text"
          name="city_or_zip"
          value={formData.city_or_zip}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Range (miles)</label>
        <select name="geo_range" value={formData.geo_range} onChange={handleChange} className="w-full p-2 border rounded">
          {options.geo_range?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Age</label>
        <select name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded">
          {options.age?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Sex</label>
        <select name="sex" value={formData.sex} onChange={handleChange} className="w-full p-2 border rounded">
          {options.sex?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}

export default SearchForm;