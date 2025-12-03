import React from "react";
import EnterIngredients from "../Assets/enter-ingredients.png";
import CalculateNutrition from "../Assets/calculate-nutrition.png";
import HealthScore from "../Assets/health-score.png";

const Work = () => {
  const workInfoData = [
    {
      image: EnterIngredients,
      title: "Enter Ingredients",
      text: "Add the ingredients of your meal and their respective grams for an accurate analysis.",
    },
    {
      image: CalculateNutrition,
      title: "Calculate Nutrition",
      text: "NutriCheck calculates calories, proteins, carbs, and fats automatically using AI-powered analysis.",
    },
    {
      image: HealthScore,
      title: "Get Health Score",
      text: "Finally, NutriCheck tells you if your meal is healthy or not and provides helpful recommendations.",
    },
  ];

  return (
    <div className="work-section-wrapper" id="work">
      <div className="work-section-top">
        <p className="primary-subheading">Workflow</p>
        <h1 className="primary-heading">How NutriCheck Works</h1>
        <p className="primary-text">
          Make smarter food choices in three simple steps: enter your meal, calculate nutrition, and see your health score instantly.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
