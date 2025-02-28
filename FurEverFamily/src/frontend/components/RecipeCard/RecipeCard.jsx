import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, image, title, description, petType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">For: {petType}</p>
        <Link
          to={`/recipes/${id}`}
          className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;