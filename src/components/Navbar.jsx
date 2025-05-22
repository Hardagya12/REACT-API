import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Culinary & Charms</Link>
      </div>
      <div className="navbar-links">
        <Link to="/meals" className="nav-link">Meals</Link>
        <Link to="/cocktails" className="nav-link">Cocktails</Link>
        <Link to="/potter" className="nav-link">Potter</Link>
        <Link to="/banks" className="nav-link">Banks</Link>
      </div>
    </nav>
  );
};

export default Navbar;