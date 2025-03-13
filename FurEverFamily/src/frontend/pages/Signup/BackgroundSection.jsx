import React from 'react';

function BackgroundSection() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 xl:w-2/3 2xl:w-3/4 h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/auth-bg.jpg')" }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40">
        <div className="flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-100 tracking-wider">FurEver Family</h1>
        </div>
        <p className="text-gray-100 mt-4 px-16 text-center text-lg">
          Find your perfect companion and give them a loving home
        </p>
        <div className="mt-8 flex space-x-4">
          <a href="#" className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg text-sm font-medium transition duration-150" title="About Us">
            About Us
          </a>
          <a href="#" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg text-sm font-medium transition duration-150" title="Browse Pets">
            Browse Pets
          </a>
        </div>
      </div>
    </div>
  );
}

export default BackgroundSection;