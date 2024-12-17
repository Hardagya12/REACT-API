import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome To Culinary & Charms</h1>
      <p className="home-description">
      Explore a magical world of delicious meals, enchanting mocktails, and Harry Potter characters all in one place!
      </p>
      <div className="home-introduction">
        <p>
        Welcome to Culinary & Charms, your ultimate destination for a delightful fusion of flavors and magic! Explore our curated collection of delicious meals and refreshing mocktails, perfect for any occasion. Dive into the enchanting world of Harry Potter with insights on your favorite characters, and stay informed with essential banking details. Join us in creating unforgettable culinary experiences infused with a touch of fantasy!
        </p>
      </div>
      <div className="home-cards">
       <Link to="/meals" className='home-card'>
              <i className="fas fa-utensils"></i> Meals
            </Link>
            <Link to="/cocktails" className='home-card'>
              <i className="fas fa-cocktail"></i> Cocktails
            </Link>
            <Link to="/potter" className='home-card'>
              <i className="fas fa-book"></i> Potter
            </Link>
            <Link to="/banks" className='home-card'>
              <i className="fas fa-university"></i> Banks
            </Link>
      </div>
      <div className="home-footer">
        <p>&copy; 2024 Hardagya's Explorer .   All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
