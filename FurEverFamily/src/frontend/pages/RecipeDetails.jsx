import React from 'react';
import { useParams } from 'react-router-dom';
import { featuredRecipes } from '../Mock API/mockData';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = featuredRecipes.find((r) => r.id === parseInt(id));

  if (!recipe) return <div className="container mx-auto py-10">Recipe not found</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="text-gray-600 dark:text-gray-400 mb-4">For: {recipe.petType}</p>
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="prose dark:prose-invert">{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;