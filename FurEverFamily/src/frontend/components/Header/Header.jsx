import React from 'react'
import Banner from "../../../assets/Banner.png";
import { useTheme } from "../../features/ThemeContext";

const Header = () => {
  const { theme } = useTheme();

  return (
    <div>
      <header className="grid grid-cols-1 pt-9 md:grid-cols-2 ">
        <div className={`mx-4 mt-4 overflow-hidden text-gray-700 shadow-xl bg-gradient-to-b ${theme === 'dark' ? 'from-gray-700 to-gray-900' : 'from-orange-100 to-green-100'} bg-clip-border rounded-xl h-96`}>
          <img
            src={Banner}
            alt="card-image"
            className="object-cover w-full h-full "
          />
        </div>
        <div className="banner-text justify-center items-center text-center p-4 md:p-8">
          <h1 className={`banner-title ${theme === 'dark' ? 'text-white' : 'text-gray-700'} flex-1 text-2xl md:text-5xl`}>
            Welcome to FurEverFamily
          </h1>
          <p className={`text-lg p-3 md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>
            Discover adorable pets waiting for their forever homes and learn to
            prepare healthy, delicious meals for your furry friends.
          </p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <div>
              <button className="py-2 px-4 bg-transparent text-orange-400 font-semibold border border-orange-400 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                Adopt Now
              </button>
            </div>
            <div>
              <button className="py-2 px-4 bg-transparent text-orange-400 font-semibold border border-orange-400 rounded-3xl hover:bg-orange-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                View Recipes
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header