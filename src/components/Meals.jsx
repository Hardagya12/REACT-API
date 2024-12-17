import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Meals.css";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const navigate = useNavigate();

  // Fetch categories and areas when component mounts
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => res.json())
      .then((data) => setCategories(data.meals || []));

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => res.json())
      .then((data) => setAreas(data.meals || []));
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    setMeals([]);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
        setSuggestions([]);
      })
      .catch(() => {
        setMeals([]);
        setLoading(false);
      });
  };

  const handleSortByCategory = (category) => {
    setLoading(true);
    setMeals([]);
    setSelectedCategory(category);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      });
  };

  const handleSortByArea = (area) => {
    setLoading(true);
    setMeals([]);
    setSelectedArea(area);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []);
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
        setSuggestions(data.meals || []);
      })
      .catch(() => setSuggestions([]));
  };

  return (
    <div className="meals-container">
      <h1>Meals</h1>
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

        {/* Sort by Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => handleSortByCategory(e.target.value)}
          className="dropdown"
        >
          <option value="">Sort by Category</option>
          {categories.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>

        {/* Sort by Area Dropdown */}
        <select
          value={selectedArea}
          onChange={(e) => handleSortByArea(e.target.value)}
          className="dropdown"
        >
          <option value="">Sort by Area</option>
          {areas.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>

        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((meal) => (
              <li
                key={meal.idMeal}
                className="suggestion-item"
                onClick={() => {
                  setSearch(meal.strMeal);
                  setSuggestions([]);
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

      {/* Loading or Meals Display */}
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
                onClick={() => navigate(`/recipe/${meal.idMeal}`)}
              >
                Recipe
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Search for meals or use filters to display results.</p>
      )}
    </div>
  );
};

export default Meals;
