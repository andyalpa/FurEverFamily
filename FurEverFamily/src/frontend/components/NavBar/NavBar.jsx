import React from "react";
// import { Link } from 'react-router-dom';
// Replace div for Link when routing is implemented
import "./NavBar.css";
// import ThemeToggle from '../ThemeToggle';
import Logo from "../../../assets/logo.png"
const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="header flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md">
      {/* <ThemeToggle /> */}
      <a href="#" className="navbar-logo flex items-center gap-2 font-bold text-2xl">
        <img src={Logo} className="w-13 p-0 hover:scale-105 transition-all" to="/" />
        <span className="header-title w-13 text-gray-600 p-0 hover:scale-105 transition-all" to="/">FurEverFamily</span>
      </a>
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/">Home</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/about">About</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/services">Services</a>
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
          className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
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
        <a href="/" className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          Home
        </a>
        <a href="/about" className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          About
        </a>
        <a href="/services" className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          Services
        </a>
        <a href="/contact" className="list-none w-full rounded-b-4xl text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
