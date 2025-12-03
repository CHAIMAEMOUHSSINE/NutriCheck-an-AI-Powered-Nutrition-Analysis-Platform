import React from "react";
import ChaimaePic from "../Assets/Chaimae-image.jpg";
import LatifaPic from "../Assets/Latifa-image.jpg";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  const testimonialsData = [
    {
      image: ChaimaePic,
      review:
        "NutriCheck makes meal tracking so easy! I just enter the ingredients and grams, and it instantly tells me the nutrition breakdown. Super helpful for my diet plan.",
      name: "Chaimae Mouhssine",
    },
    {
      image: LatifaPic,
      review:
        "The AI-powered insights are amazing! I now know exactly how healthy my meals are, and it helps me plan better portions every day.",
      name: "Latifa Moutawakil",
    },
  ];

  return (
    <div className="work-section-wrapper" id="testimonial">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonials</p>
        <h1 className="primary-heading">What They Are Saying</h1>
      </div>

      <div
        className="testimonial-section-bottom"
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {testimonialsData.map((testimonial) => (
          <div
            className="testimonial-card"
            key={testimonial.name}
            style={{
              flex: "0 0 300px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
              }}
            />
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              {testimonial.review}
            </p>
            <div className="testimonials-stars-container" style={{ color: "#ffc107", marginBottom: "10px" }}>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
              {testimonial.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
