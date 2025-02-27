import React from "react";
import "./Home.css";
import NavBar from "../components/NavBar/NavBar";
import Banner from "../../assets/Banner.png";
import Footer from "../components/Footer/Footer";
import FeaturePets from "../components/FeaturePets/FeaturePets";

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

      <main className="p-4 md:p-8">
        <section className="mb-8">
          <h2 className="text-xl md:text-3xl">About Us</h2>
          <p className="text-base md:text-lg">
            We are dedicated to finding forever homes for pets in need.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-3xl">Adopt a Pet</h2>
          <p className="text-base md:text-lg">
            Check out our available pets for adoption.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl md:text-3xl">Get Involved</h2>
          <p className="text-base md:text-lg">
            Learn how you can help us in our mission.
          </p>
        </section>
      </main>
      <footer className="p-4 md:p-8">
        <p className="text-center text-sm md:text-base">
          &copy; 2023 FurEverFamily. All rights reserved.
        </p>
      </footer>

      <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <div>
          <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
            <svg
              className="h-6 w-6 stroke-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </span>
        </div>
        <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight">
          Writes upside-down
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
