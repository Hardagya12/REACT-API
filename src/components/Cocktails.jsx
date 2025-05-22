import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Cocktails.css";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);
  const [randomCocktail, setRandomCocktail] = useState(null);

  useEffect(() => {
    // Fetch categories
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.drinks);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch areas
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((data) => {
        setAreas(data.drinks);
      })
      .catch((error) => console.error("Error fetching areas:", error));
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks || []);
        setLoading(false);
        setSuggestions([]);
      })
      .catch(() => {
        setCocktails([]);
        setLoading(false);
      });
  };

  const fetchSuggestions = (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.drinks || []);
      })
      .catch(() => setSuggestions([]));
  };

  const handleOptionChange = (event) => {
    const { value, name } = event.target;
    if (name === "category") {
      setSelectedCategory(value);
      fetchCocktailsByCategory(value);
    } else if (name === "area") {
      setSelectedArea(value);
      fetchCocktailsByArea(value);
    }
  };

  const fetchCocktailsByCategory = (category) => {
    if (!category) return;
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks || []);
        setLoading(false);
      })
      .catch(() => {
        setCocktails([]);
        setLoading(false);
      });
  };

  const fetchRandomCocktail = () => {
    setLoading(true);
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        setRandomCocktail(data.drinks[0]);
        setLoading(false);
      })
      .catch(() => {
        setRandomCocktail(null);
        setLoading(false);
      });
  };

  return (
    <div className="cocktails-wrapper">
      <Navbar />
      <div className="cocktails-container">
        <h1 className="title">Cocktails</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search cocktails..."
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
          <select className="dropdown" name="category" onChange={handleOptionChange} value={selectedCategory}>
            <option value="">Sort by Category</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
          <button onClick={fetchRandomCocktail} className="random-button">
            Random Cocktail
          </button>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((cocktail) => (
                <li
                  key={cocktail.idDrink}
                  className="suggestion-item"
                  onClick={() => {
                    setSearch(cocktail.strDrink);
                    setSuggestions([]);
                  }}
                >
                  <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    className="suggestion-img"
                  />
                  <span>{cocktail.strDrink}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : cocktails.length === 0 ? (
          <p>No cocktails found.</p>
        ) : (
          <div className="cocktail-grid">
            {cocktails.map((cocktail) => (
              <div className="cocktail-card" key={cocktail.idDrink}>
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="cocktail-img"
                />
                <h2 className="cocktail-name">{cocktail.strDrink}</h2>
                <p className="cocktail-id">ID: {cocktail.idDrink}</p>
                <p className="cocktail-category">Category: Cocktail</p>
              </div>
            ))}
          </div>
        )}

        {randomCocktail && (
          <div className="random-cocktail">
            <h2>Random Cocktail</h2>
            <div className="cocktail-card">
              <img
                src={randomCocktail.strDrinkThumb}
                alt={randomCocktail.strDrink}
                className="cocktail-img"
              />
              <h2 className="cocktail-name">{randomCocktail.strDrink}</h2>
              <p className="cocktail-id">ID: {randomCocktail.idDrink}</p>
              <p className="cocktail-category">Category: Cocktail</p>
              <p className="cocktail-description">{randomCocktail.strInstructions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cocktails;