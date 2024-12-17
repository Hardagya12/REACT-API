import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Meals.css";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return; // Prevent empty search
    setLoading(true);
    setMeals([]); // Clear previous results
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []); // Handle case when no meals are found
        setLoading(false);
        setSuggestions([]); // Clear suggestions after search
      })
      .catch(() => {
        setMeals([]);
        setLoading(false);
      });
  };

  const fetchSuggestions = (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.meals || []); // Meals returned from API
      })
      .catch(() => setSuggestions([]));
  };

  return (
    <div className="meals-container">
      <h1>Meals 1</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((meal) => (
              <li
                key={meal.idMeal}
                className="suggestion-item"
                onClick={() => {
                  setSearch(meal.strMeal);
                  setSuggestions([]); // Clear suggestions after selection
                }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="suggestion-img"
                />
                <span>{meal.strMeal}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : meals.length > 0 ? (
        <div className="meal-grid">
          {meals.map((meal) => (
            <div className="meal-card" key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-img"
              />
              <h2>{meal.strMeal}</h2>
              <button
                className="recipe-button"
                onClick={() => navigate(`/recipe/${meal.idMeal}`)} // Navigate to Recipe page
              >
                Recipe
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Search for meals to display results.</p>
      )}
    </div>
  );
};

export default Meals;
