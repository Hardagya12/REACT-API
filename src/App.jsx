import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Meals from "./components/Meals";
import Cocktails from "./components/Cocktails";
import Potter from "./components/Potter";
import Banks from "./components/Banks";
import Recipe from "./components/Recipe";

import "./App.css";

const App = () => {


  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/meals" className={location.pathname === '/meals' ? 'active' : ''}>
            <i className="fas fa-utensils"></i> Meals
          </Link>
          <Link to="/cocktails" className={location.pathname === '/cocktails' ? 'active' : ''}>
            <i className="fas fa-cocktail"></i> Cocktails
          </Link>
          <Link to="/potter" className={location.pathname === '/potter' ? 'active' : ''}>
            <i className="fas fa-book"></i> Potter
          </Link>
          <Link to="/banks" className={location.pathname === '/banks' ? 'active' : ''}>
            <i className="fas fa-university"></i> Banks
          </Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/cocktails" element={<Cocktails />} />
            <Route path="/potter" element={<Potter />} />
            <Route path="/banks" element={<Banks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
