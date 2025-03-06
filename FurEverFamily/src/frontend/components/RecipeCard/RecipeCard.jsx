import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTheme } from '../../features/ThemeContext';

const RecipeCard = ({ recipe }) => {
  const { theme } = useTheme();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
    if (!recipe) return false;
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    return savedRecipes.includes(recipe.id);
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!recipe) return;
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (isSaved) {
      localStorage.setItem(
        'savedRecipes',
        JSON.stringify(savedRecipes.filter(id => id !== recipe.id))
      );
    } else {
      localStorage.setItem(
        'savedRecipes',
        JSON.stringify([...savedRecipes, recipe.id])
      );
    }
    setIsSaved(!isSaved);
  };

  const getDifficultyColor = () => {
    const colors = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-red-500'
    };
    return colors[recipe.difficulty.toLowerCase()] || colors.medium;
  };

  if (!recipe) {
    return null;
  }

  return (
    <Link 
      to={`/recipes/${recipe.id}`}
      className={`group block rounded-2xl overflow-hidden transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } hover:shadow-xl transform hover:-translate-y-1`}
      data-aos="fade-up"
    >
      {/* Image Container */}
      <div className="relative aspect-w-16 aspect-h-9">
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 ${
          isImageLoaded ? 'hidden' : 'animate-pulse'
        }`} />
        <img
          src={recipe.image}
          alt={recipe.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Save Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleSave}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg transform transition-all duration-300 hover:scale-110"
            aria-label={isSaved ? 'Remove from saved recipes' : 'Save recipe'}
          >
            <svg
              className={`w-5 h-5 ${
                isSaved ? 'text-primary' : 'text-gray-400'
              } transition-colors`}
              fill={isSaved ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Recipe Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.prepTime}
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {recipe.ingredients.length} ingredients
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xl font-heading font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-text'
          }`}>
            {recipe.title}
          </h3>
          <span className={`px-3 py-1 text-xs rounded-full text-white ${getDifficultyColor()}`}>
            {recipe.difficulty}
          </span>
        </div>

        <p className={`mb-4 line-clamp-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {recipe.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {recipe.petType}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {recipe.prepTime}
            </span>
          </div>
          <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
            View Recipe
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    prepTime: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    petType: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    nutritionalInfo: PropTypes.shape({
      protein: PropTypes.string.isRequired,
      fat: PropTypes.string.isRequired,
      carbs: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
};

export default RecipeCard;