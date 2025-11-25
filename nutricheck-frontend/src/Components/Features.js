import React from "react";

const Features = () => {
  const featuresData = [
    {
      title: "Ingredient Analysis",
      text: "Enter any ingredients with their grams, and NutriCheck calculates the nutritional values instantly.",
      color: "#4CAF50",
    },
    {
      title: "Macronutrient Breakdown",
      text: "Get a detailed report of calories, proteins, carbs, and fats for every meal.",
      color: "#FF9800",
    },
    {
      title: "Health Scoring",
      text: "Our AI evaluates your meal and tells you if it's healthy, with suggestions to improve it.",
      color: "#4CAF50",
    },
    {
      title: "Portion Guidance",
      text: "NutriCheck suggests the right portion sizes to meet your daily nutrition goals.",
      color: "#FF9800",
    },
    {
      title: "Daily Summary",
      text: "Track your meals throughout the day and get a complete nutritional overview.",
      color: "#4CAF50",
    },
    {
      title: "AI Recommendations",
      text: "Receive smart suggestions for healthier alternatives based on your meal inputs.",
      color: "#4CAF50",
    },
  ];

  return (
    <div className="features-section-wrapper" id="features" style={{ padding: "50px 20px", textAlign: "center" }}>
      <div className="features-section-top" style={{ marginBottom: "40px" }}>
        <p className="primary-subheading" style={{ color: "#4CAF50", fontWeight: "bold", fontSize: "18px" }}>Features</p>
        <h1 className="primary-heading" style={{ fontSize: "32px", marginBottom: "20px" }}>What NutriCheck Offers</h1>
        <p className="primary-text" style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          NutriCheck helps you make smarter food choices by analyzing your meals with AI and providing instant nutritional insights.
        </p>
      </div>

      <div className="features-section-bottom" style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
        {featuresData.map((feature) => (
          <div
            className="features-section-info"
            key={feature.title}
            style={{
              flex: "0 0 250px",
              padding: "20px",
              borderRadius: "10px",
              background: feature.color + "33", // light transparent background
              color: feature.color,
              fontWeight: "bold",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>{feature.title}</h2>
            <p style={{ fontSize: "16px", fontWeight: "normal", color: "#333" }}>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
