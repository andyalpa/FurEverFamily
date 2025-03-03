import React from "react";
import "./NavBar.css";
import Logo from "../../../assets/logo.png";
import { useTheme } from "../../features/ThemeContext";
import ThemeToggle from "../../features/ThemeToggle";
import UserTab from "./UserTab";
import { useAuth } from "../../features/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../features/firebase";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav
      className={`header max-h-24 flex justify-between items-center ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      } shadow-md py-6 px-8 md:px-32`}
    >
      {/* Logo on the left */}
      <a href="/" className="navbar-logo flex items-center gap-2 font-bold text-2xl">
        <img
          src={Logo}
          className={`w-13 p-0 hover:scale-105 transition-all ${
            theme === "dark" ? "filter invert" : ""
          }`}
          alt="Logo"
        />
        <span className="header-title w-13 p-0 hover:scale-105 transition-all">
          FurEverFamily
        </span>
      </a>

      {/* Navigation links in the middle (desktop only) */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/adopt">Adopt</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/recipes">Recipes</a>
        </li>
        <li className="p-3 rounded-md transition-all cursor-pointer">
          <a href="/about">About</a>
        </li>
        <li className="p-3 rounded-2xl transition-all cursor-pointer">
          <a href="/contact">Contact</a>
        </li>
      </ul>

      {/* Right section (desktop only) */}
      <div className="hidden xl:flex items-center gap-4">
        {user ? (
          <>
            <UserTab />
            <button
              onClick={handleLogout}
              className="p-2 text-base bg-red-400 text-gray-100 font-semibold transition-all leading-none border border-red-500 rounded-xl hover:border-transparent hover:bg-red-500"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <a
              className={`p-2 text-base ${
                theme === "light"
                  ? "bg-white text-orange-400"
                  : "bg-gray-800 text-orange-400 hover:text-orange-500 hover:border-gray-700 hover:bg-gray-700"
              } font-semibold transition-all leading-none rounded-xl hover:border-transparent hover:bg-gray-100`}
              href="/signinpage"
            >
              Login
            </a>
            <a
              className="p-2 text-base bg-orange-400 text-gray-100 font-semibold transition-all leading-none border border-orange-500 rounded-xl hover:border-transparent hover:bg-orange-500"
              href="/signuppage"
            >
              Sign up
            </a>
          </>
        )}
        <ThemeToggle />
      </div>

      {/* Right section (mobile only) */}
      <div className="flex items-center gap-4 xl:hidden">
        {user && <UserTab className="flex-shrink-0" />}
        <i
          className="bx bx-menu text-5xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
        <ThemeToggle className="flex-shrink-0" />
      </div>

      {/* Dropdown menu (mobile only) */}
      <div
        className={`absolute xl:hidden top-24 left-0 w-full ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } rounded-b-4xl flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        
        <a
          href="/adopt"
          className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer"
        >
          Adopt
        </a>
        <a
          href="/recipes"
          className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer"
        >
          Recipes
        </a>
        <a
          href="/about"
          className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer"
        >
          About
        </a>
        <a
          href="/contact"
          className="list-none w-full text-center p-4 hover:bg-orange-400 hover:text-white transition-all cursor-pointer"
        >
          Contact
        </a>
        <div className="flex flex-col items-center gap-4 mt-4 mb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 bg-red-400 text-gray-100 font-semibold leading-none border border-red-500 rounded hover:border-transparent hover:bg-red-500"
            >
              Log out
            </button>
          ) : (
            <>
              <a
                className={`p-2 text-base ${
                  theme === "light"
                    ? "bg-white text-orange-400"
                    : "bg-gray-800 text-orange-400 hover:text-orange-500 hover:border-gray-700 hover:bg-gray-700"
                } font-semibold transition-all leading-none rounded-xl hover:border-transparent hover:bg-gray-100`}
                href="/signinpage"
              >
                Login
              </a>
              <a
                className="p-2 text-base bg-orange-400 text-gray-100 font-semibold transition-all leading-none border border-orange-500 rounded-xl hover:border-transparent hover:bg-orange-500"
                href="/signuppage"
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;