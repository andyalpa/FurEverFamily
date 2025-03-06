import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredRecipes } from '../Mock API/mockData';
import { useTheme } from '../features/ThemeContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [servings, setServings] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isSaved, setIsSaved] = useState(false);
  
  const recipe = featuredRecipes.find(r => r.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    setIsSaved(saved.includes(parseInt(id)));
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className={`text-2xl font-heading font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-text'
        }`}>
          Recipe not found
        </h2>
        <Link to="/recipes" className="btn-primary">
          Browse Recipes
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (isSaved) {
      localStorage.setItem(
        'savedRecipes',
        JSON.stringify(saved.filter(recipeId => recipeId !== recipe.id))
      );
    } else {
      localStorage.setItem(
        'savedRecipes',
        JSON.stringify([...saved, recipe.id])
      );
    }
    setIsSaved(!isSaved);
  };

  const calculateIngredient = (amount) => {
    return (amount * servings).toFixed(1).replace(/\.0$/, '');
  };

  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-16">
          <div className="max-w-3xl" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                {recipe.petType}
              </span>
              <span className="text-white text-sm">{recipe.prepTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              {recipe.title}
            </h1>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{recipe.difficulty}</span>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <svg
                  className={`w-5 h-5 ${isSaved ? 'text-primary' : ''}`}
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
                <span>{isSaved ? 'Saved' : 'Save Recipe'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-12" data-aos="fade-up">
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {recipe.description}
            </p>
          </div>

          {/* Servings Adjuster */}
          <div 
            className={`p-6 rounded-xl mb-8 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            data-aos="fade-up"
          >
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-white' : 'text-text'}>
                Adjust Servings
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  -
                </button>
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-text'
                }`}>
                  {servings}
                </span>
                <button
                  onClick={() => setServings(servings + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8" data-aos="fade-up">
            <div className="flex border-b dark:border-gray-700">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === 'ingredients'
                    ? 'border-primary text-primary'
                    : 'border-transparent ' + (
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    )
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === 'instructions'
                    ? 'border-primary text-primary'
                    : 'border-transparent ' + (
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    )
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === 'nutrition'
                    ? 'border-primary text-primary'
                    : 'border-transparent ' + (
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    )
                }`}
              >
                Nutrition
              </button>
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {activeTab === 'ingredients' && (
                <ul className="space-y-4" data-aos="fade-up">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li 
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <div className={`w-16 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {calculateIngredient(ingredient.amount)} {ingredient.unit}
                      </div>
                      <div className={theme === 'dark' ? 'text-white' : 'text-text'}>
                        {ingredient.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'instructions' && (
                <ol className="space-y-6" data-aos="fade-up">
                  {recipe.instructions.map((instruction, index) => (
                    <li 
                      key={index}
                      className={`flex gap-4 p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <span className={`flex-none w-8 h-8 flex items-center justify-center rounded-full ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {index + 1}
                      </span>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'nutrition' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
                  {recipe.nutrition.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`text-lg font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-text'
                      }`}>
                        {calculateIngredient(item.amount)}{item.unit}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div 
              className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
              data-aos="fade-up"
            >
              <h2 className={`text-xl font-heading font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}>
                Pro Tips
              </h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, index) => (
                  <li 
                    key={index}
                    className={`flex items-start gap-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <svg className="w-5 h-5 flex-none mt-0.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;