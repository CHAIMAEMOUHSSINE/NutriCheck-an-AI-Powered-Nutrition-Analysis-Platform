🥗 NutriCheck – AI-Powered Nutrition Analysis Platform

NutriCheck is an AI-powered web platform designed to help users analyze their meals, understand their nutritional values, and make healthier food choices.
The application combines machine learning, web technologies, and a large-scale food database to provide instant nutritional insights and personalized recommendations.

🎯 Project Objective
The goal of NutriCheck is to:
Simplify meal analysis
Increase awareness of nutritional intake
Help users improve their eating habits over time
Provide clear and actionable health feedback

🚀 Key Features
Meal analysis based on selected ingredients and quantities
Automatic calculation of nutritional values:
Calories
Proteins
Carbohydrates
Fats
Sugars
Fibers
Sodium
AI-generated health score (0–100)
Clear verdict: Healthy / Unhealthy
Personalized nutrition recommendations
User history tracking with statistics and progress visualization
🧠 Artificial Intelligence
Model: Logistic Regression implemented from scratch
Language: Python
Features used:
Proteins
Carbohydrates
Fats
Sugars
Fibers
Sodium
Polynomial feature expansion to handle non-linear relationships
Model performance:
Accuracy: ~87%
Precision, Recall, and F1-score around 87%
🛠️ Technologies Used
Backend: Python
Flask – REST API
Firebase Realtime Database – user data & history
Frontend : React JS
Tailwind CSS
Data & ML : Jupyter Notebook
USDA Food Dataset (500,000+ food items)
Kaggle Dataset for model training
📂 Project Structure (Simplified)
NutriCheck/
│
├── backend/
│   ├── model/
│   ├── api/
│   ├── notebooks/
│   └── BDprivateKey/   (ignored – contains local keys only)
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── .gitignore
└── README.md
🔐 Security Notice
⚠️ Important

To run the project locally, you must provide your own Firebase credentials.
This follows industry best practices for security.
▶️ Demo
A full demo video showcasing:
Meal analysis
Health score calculation
Recommendations
User history and statistics
📹 Demo video is available in this repository / LinkedIn post
https://www.linkedin.com/posts/chaimae-mouhssine-b305a22a8_what-if-your-meals-could-speak-for-your-activity-7408541798920331264-p15U?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEogOdQB0qRuhbbwDdjTRUWcSbSFBDRCL_A
NutriCheck transforms nutritional data into clear, actionable insights.
Our vision is to make healthy eating simple, accessible, and intelligent — because every meal is an opportunity to improve your health.
