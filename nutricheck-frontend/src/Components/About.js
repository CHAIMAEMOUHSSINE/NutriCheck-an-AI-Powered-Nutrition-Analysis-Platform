import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container" id ="about">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="primary-text">
         Food plays a crucial role in maintaining a healthy lifestyle. At NutriCheck, we believe that understanding what you eat is the first step toward better health. Our platform helps you analyze every meal, providing insights into calories, proteins, carbohydrates, and fats.
        </p>
        <p className="primary-text">
          Our goal is to empower you to make informed decisions about your diet. With detailed analysis, health scoring, and easy-to-understand reports, NutriCheck ensures that every meal supports your wellbeing and lifestyle goals.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>

          {/* Modern Watch Tutorial Button */}
          <button
            className="watch-tutorial-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 25px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(90deg, #4CAF50, #FF9800)",
              color: "#fff",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)")}
          >
            <BsFillPlayCircleFill size={24} /> Watch Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
