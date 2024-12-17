
import React, { useState, useEffect } from "react";
import "./Potter.css"; // Import the dark theme CSS

function Potter() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (category) => {
    try {
      let url = "";
      if (category === "Characters") url = "https://potterapi-fedeperin.vercel.app/en/characters";
      else if (category === "Books") url = "https://potterapi-fedeperin.vercel.app/en/books";
      else if (category === "Spells") url = "https://potterapi-fedeperin.vercel.app/en/spells";
      else if (category === "Houses") url = "https://potterapi-fedeperin.vercel.app/en/houses";

      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
      setError("");
    } catch (err) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchData(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="main-container">
      <div className="card">
        <h1>Harry Potter API Data</h1>

        <div className="category-buttons">
          {["Characters", "Books", "Spells", "Houses"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && <p className="loading">Fetching data...</p>}
        {error && <p className="error">{error}</p>}

        {selectedCategory && (
          <h2 className="data-title">Showing Data for {selectedCategory}</h2>
        )}

        <div className="data-grid">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="data-card">
                {selectedCategory === "Characters" && (
                  <div>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    )}
                    <p>Name: {item.name}</p>
                    <p>Full Name: {item.fullName}</p>
                    <p>Nickname: {item.nickname}</p>
                    <p>House: {item.hogwartsHouse}</p>
                    <p>Original Name: {item.interpretedBy}</p>
                    <p>D.O.B: {item.birthdate}</p>
                  </div>
                )}

                {selectedCategory === "Books" && (
                  <div>
                    {item.cover ? (
                      <img
                        src={item.cover}
                        alt={item.title}
                      />
                    ) : (
                      <p>No cover available</p>
                    )}
                    <p>Title: {item.title}</p>
                    <p>Author: {item.author}</p>
                    <p>Release Year: {item.releaseDate}</p>
                  </div>
                )}

                {selectedCategory === "Spells" && (
                  <div>
                    <p>Spell: {item.spell}</p>
                    <p>Usage: {item.use}</p>
                  </div>
                )}

                {selectedCategory === "Houses" && (
                  <div>
                    <p>House: {item.house}</p>
                    <p>Emoji: {item.emoji}</p>
                    <p>Founder: {item.founder}</p>
                    <p>Colors: {item.colors && item.colors.join(", ")}</p>
                    <p>Animal: {item.animal}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="loading">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Potter;
