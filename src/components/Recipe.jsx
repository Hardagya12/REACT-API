import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import "./recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const formatInstructions = (instructions) => {
    return instructions
      ? instructions.split(/STEP \d+/).filter((step) => step.trim())
      : [];
  };

  if (loading) return <p className="loading">Loading...</p>;

  const steps = formatInstructions(meal.strInstructions);

  return (
    <div className="recipe-page">
      <h2 className="recipe-title">{meal.strMeal} Recipe</h2>
      <div className="recipe-container">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-img"
        />
        <div className="recipe-details">
          <ol className="recipe-steps">
            {steps.map((step, index) => (
              <li key={index} className="step-item">
                {step.trim()}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Video Section */}
      {meal.strYoutube && (
        <div className="video-container">
          <h2>Recipe Video:</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
            title={meal.strMeal}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <button className="back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default Recipe;
