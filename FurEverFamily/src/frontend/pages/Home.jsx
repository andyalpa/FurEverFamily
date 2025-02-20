import React from "react";
import "./Home.css";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
  return (
    <div className="dark:bg-content dark:text-white">
      <NavBar />
      <header>
        <h1>Welcome to FurEverFamily</h1>
      </header>
      <main>
        <section>
          <h2>About Us</h2>
          <p>We are dedicated to finding forever homes for pets in need.</p>
        </section>
        <section>
          <h2>Adopt a Pet</h2>
          <p>Check out our available pets for adoption.</p>
        </section>
        <section>
          <h2>Get Involved</h2>
          <p>Learn how you can help us in our mission.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 FurEverFamily. All rights reserved.</p>
      </footer>

      <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
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
        <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">
          Writes upside-down
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
      </div>
    </div>
  );
};

export default Home;
