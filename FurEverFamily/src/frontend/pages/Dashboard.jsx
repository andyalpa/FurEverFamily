import React, { useState } from 'react';
import { useAuth } from '../features/AuthContext';
import { userData } from '../Mock API/userData';
import { featuredPets, featuredRecipes } from '../Mock API/mockData';
import PetCard from '../components/PetCard/PetCard';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { updateProfile } from 'firebase/auth';
import { auth } from '../features/firebase';

const Dashboard = () => {
  const { user } = useAuth();
  const { savedPets, savedRecipes, adoptionHistory } = userData;
  const [profilePicture, setProfilePicture] = useState(user?.photoURL);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const pets = featuredPets.filter((pet) => savedPets.includes(pet.id));
  const recipes = featuredRecipes.filter((recipe) =>
    savedRecipes.includes(recipe.id)
  );

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        await updateProfile(auth.currentUser, { photoURL: base64String });
        setProfilePicture(base64String);
        window.location.reload(); // Force reload to update UserTab
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = async () => {
    if (displayName) {
      await updateProfile(auth.currentUser, { displayName });
      window.location.reload(); // Force reload to update UserTab
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Welcome, {user.email}!</p>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profile Picture</h2>
        <div className="flex items-center">
          <img
            src={profilePicture || "https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg"}
            alt="avatar"
            className="h-20 w-20 rounded-full object-cover object-center mr-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Display Name</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 border border-gray-300 rounded text-sm text-gray-900"
          />
          <button
            onClick={handleNameChange}
            className="ml-4 bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-gray-100"
          >
            Update Name
          </button>
        </div>
      </div>

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