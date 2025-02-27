import React from "react";
// import { Link } from 'react-router-dom';
// Replace div for Link when routing is implemented
import "./NavBar.css";
// import ThemeToggle from '../ThemeToggle';
import Logo from "../../../assets/logo.png"
import { useTheme } from "../../features/ThemeContext";



const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`header flex justify-between items-center ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} shadow-md py-6 px-8 md:px-32`}>
      {/* <ThemeToggle /> */}
      <a href="#" className="navbar-logo flex items-center gap-2 font-bold text-2xl">
        <img src={Logo} className="w-13 p-0 hover:scale-105 transition-all" to="/" />
        <span className="header-title w-13 p-0 hover:scale-105 transition-all" to="/">FurEverFamily</span>
      </a>
      <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
      
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/">Home</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/adopt">Adopt</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/recipes">Recipes</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/about">About</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/contact">Contact</a>
        </li>
      </ul>

      <div className="relative hidden md:flex items-center justify-center gap-3">
        <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
        <input
          type="text"
          placeholder="Search..."
          className="py-2 pl-10 rounded-xl border-2 border-orange-300 focus:bg-slate-100 focus:outline-orange-500"
        />
      </div>

      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      ></i>

      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white rounded-b-4xl flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <a href="/" className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">
          Home
        </a>
        <a href="/adopt" className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">
        Adopt
        </a>
        <a href="/recipes" className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">
        Recipes
        </a>
        <a href="/about" className="list-none w-full rounded-b-4xl text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">
        About
        </a>
        <a href="/contact" className="list-none w-full rounded-b-4xl text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer">
        Contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
