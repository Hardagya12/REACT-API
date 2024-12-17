import React, { useState } from "react";
import "./Cocktails.css";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    if (!search.trim()) return; // Prevent empty search
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktails(data.drinks || []); // Handle case when no cocktails are found
        setLoading(false);
        setSuggestions([]); // Clear suggestions after search
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
        setSuggestions(data.drinks || []); // Meals returned from API
      })
      .catch(() => setSuggestions([]));
  };

  return (
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
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((cocktail) => (
              <li
                key={cocktail.idDrink}
                className="suggestion-item"
                onClick={() => {
                  setSearch(cocktail.strDrink);
                  setSuggestions([]); // Clear suggestions after selection
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
    </div>
  );
};

export default Cocktails;
