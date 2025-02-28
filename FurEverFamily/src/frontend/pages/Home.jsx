import React from "react";
import "./Home.css";
import NavBar from "../components/NavBar/NavBar";
import Banner from "../../assets/Banner.png";
import Footer from "../components/Footer/Footer";
import FeaturePets from "../components/FeaturePets/FeaturePets";
import PetCard from "../components/PetCard/PetCard";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { featuredPets, featuredRecipes } from "../../frontend/Mock API/mockData.js";

const Home = () => {
  return (
    <div className="w-full h-full absolute bg-gray-50">
      <NavBar />
      <header className="grid grid-cols-1 md:grid-cols-2 ">
        <div class="mx-4 mt-4 overflow-hidden text-gray-700 shadow-xl bg-gradient-to-b from-orange-100 to-green-100 bg-clip-border rounded-xl h-96">
          <img
            src={Banner}
            alt="card-image"
            class="object-cover w-full h-full "
          />
        </div>

        <div className="banner-text  justify-center items-center text-center p-4 md:p-8">
          <h1 className="banner-title text-gray-700 flex-1 text-2xl md:text-5xl">
            Welcome to FurEverFamily
          </h1>
          <p className="text-lg p-3 md:text-xl">
            Discover adorable pets waiting for their forever homes and learn to
            prepare healthy, delicious meals for your furry friends.
          </p>

          <div className="flex justify-center items-center gap-4 mt-2">
            <div>
              <button class="py-2 px-4 bg-transparent text-orange-400 font-semibold border border-orange-400 rounded-3xl hover:bg-orange-100 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                Adopt Now
              </button>
            </div>
            <div>
              <button class="py-2 px-4 bg-transparent text-orange-400 font-semibold border border-orange-400 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                View Recipes
              </button>
            </div>
          </div>
        </div>
      </header>

      <FeaturePets />

      {/* Featured Pets */}
      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Featured Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPets.map(pet => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-10 bg-gray-200 dark:bg-gray-700">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Featured Recipes</h2>
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
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-8">We are dedicated to helping pets find loving homes and providing resources for pet owners.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">Learn More</button>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default Home;
