import React from 'react';
import { useAuth } from '../features/AuthContext';
import { userData } from '../Mock API/userData';
import { featuredPets, featuredRecipes } from '../Mock API/mockData';
import PetCard from '../components/PetCard/PetCard';
import RecipeCard from '../components/RecipeCard/RecipeCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { savedPets, savedRecipes, adoptionHistory } = userData;

  const pets = featuredPets.filter((pet) => savedPets.includes(pet.id));
  const recipes = featuredRecipes.filter((recipe) =>
    savedRecipes.includes(recipe.id)
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Welcome, {user.email}!</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pets.length > 0 ? (
            pets.map((pet) => <PetCard key={pet.id} {...pet} />)
          ) : (
            <p>No saved pets yet.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)
          ) : (
            <p>No saved recipes yet.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Adoption History</h2>
        {adoptionHistory.length > 0 ? (
          <ul className="list-disc pl-5">
            {adoptionHistory.map((adoption, index) => (
              <li key={index}>
                Adopted pet ID {adoption.petId} on {adoption.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No adoption history yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;