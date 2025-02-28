import React from 'react';

const PetCard = ({ image, name, breed, age, location }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400">{breed}</p>
        <p className="text-gray-600 dark:text-gray-400">Age: {age}</p>
        <p className="text-gray-600 dark:text-gray-400">Location: {location}</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default PetCard;