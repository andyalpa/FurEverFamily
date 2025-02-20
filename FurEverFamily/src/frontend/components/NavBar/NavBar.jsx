import React from 'react';
// import { Link } from 'react-router-dom';
// Replace div for Link when routing is implemented
import './NavBar.css'; 
import ThemeToggle from '../ThemeToggle';

const NavBar = () => {
    return (

        <nav className="navbar">
            <ThemeToggle />
            <div className="navbar-logo">
                <div to="/">FurEverFamily</div>
            </div>
            <ul className="navbar-links">
                <li><div to="/">Home</div></li>
                <li><div to="/about">About</div></li>
                <li><div to="/services">Services</div></li>
                <li><div to="/contact">Contact</div></li>
            </ul>
        </nav>
    );
};

export default NavBar;