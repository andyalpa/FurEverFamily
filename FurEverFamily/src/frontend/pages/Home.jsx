import React from "react";
import "./Home.css";
import NavBar from "../components/NavBar/NavBar.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer";
import FeaturePets from "../components/FeaturePets/FeaturePets";
import PetCard from "../components/PetCard/PetCard";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { featuredPets, featuredRecipes } from "../../frontend/Mock API/mockData.js";
import { useTheme } from "../features/ThemeContext";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`w-full h-full absolute ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <Header />
      <FeaturePets />
      {/* Featured Pets */}
      <section className="py-10">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Featured Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </div>
      </section>
      {/* Featured Recipes */}
      <section className={`py-10 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </div>
      </section>
      {/* Introduction */}
      <section className="py-10">
        <div className="container mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>About Us</h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>We are dedicated to helping pets find loving homes and providing resources for pet owners.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">Learn More</button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
