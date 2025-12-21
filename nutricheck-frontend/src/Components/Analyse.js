import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIngredients, predictMeal } from "../api";
import { Camera, TrendingUp, History, Info, XCircle, CheckCircle, PieChart, BarChart3, Calendar } from "lucide-react";
import "./Analyse.css";
import BannerBackground from "../Assets/home-banner-background.png";
import Logo from "../Assets/Logo.png";

const Analyse = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("upload");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Load ingredients from backend
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await fetchIngredients();
        setIngredientsList(data);
      } catch (err) {
        console.error("Erreur fetch ingredients:", err);
      }
    };
    loadIngredients();
  }, []);

  // ==================== UTILS ====================
  const toggleIngredient = (name) => {
    if (selectedIngredients.find((i) => i.name === name)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i.name !== name));
    } else {
      setSelectedIngredients([...selectedIngredients, { name, quantity: 100 }]);
    }
  };

  const updateQuantity = (name, qty) => {
    setSelectedIngredients(
      selectedIngredients.map((i) =>
        i.name === name ? { ...i, quantity: Number(qty) } : i
      )
    );
  };

  const handleAnalyze = async () => {
    if (selectedIngredients.length === 0) return;

    const ingredientQuantities = {};
    selectedIngredients.forEach((i) => {
      ingredientQuantities[i.name] = i.quantity;
    });

    try {
      const result = await predictMeal(ingredientQuantities);
      setAnalysisResult({
        ...result,
        ingredients: selectedIngredients,
      });

      // Add to history
      setHistory([
        {
          id: Date.now(),
          date: new Date().toLocaleDateString("fr-FR"),
          result: result.result === "Healthy" ? "sain" : "malsain",
          score: Math.round(Math.random() * 100), // optional score
          ingredients: selectedIngredients.map((i) => i.name),
          ...result.nutrients,
        },
        ...history,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredIngredients = ingredientsList.filter((ing) =>
    ing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== RENDER ====================
  const renderNavbar = () => (
    <nav className="navbar">
      <div className="nav-logo-container" onClick={() => navigate("/")}>
        <img src={Logo} alt="Logo NutriCheck" />
      </div>
      <div className="navbar-links">
        <a
          onClick={() => setCurrentPage("upload")}
          className={currentPage === "upload" ? "active" : ""}
        >
          <Camera size={20} /> Analyse
        </a>
        <a
          onClick={() => setCurrentPage("history")}
          className={currentPage === "history" ? "active" : ""}
        >
          <History size={20} /> Historique
        </a>
        <a
          onClick={() => setCurrentPage("about")}
          className={currentPage === "about" ? "active" : ""}
        >
        </a>
      </div>
    </nav>
  );

  const renderUpload = () => (
    <div className="upload-page">
      <h1 className="page-title">Sélection des Ingrédients</h1>
      <input
        type="text"
        placeholder="🔍 Rechercher un ingrédient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="ingredients-list">
        {filteredIngredients.map((name) => (
          <div
            key={name}
            className={`ingredient-item ${
              selectedIngredients.find((i) => i.name === name) ? "selected" : ""
            }`}
            onClick={() => toggleIngredient(name)}
          >
            {name}
            {selectedIngredients.find((i) => i.name === name) && (
              <CheckCircle size={20} color="#0cb431" />
            )}
          </div>
        ))}
      </div>

      {selectedIngredients.length > 0 && (
        <div className="selected-ingredients">
          <h3>Ingrédients sélectionnés</h3>
          {selectedIngredients.map((i) => (
            <div key={i.name} className="selected-item">
              <span>{i.name}</span>
              <input
                type="number"
                value={i.quantity}
                onChange={(e) => updateQuantity(i.name, e.target.value)}
                min="1"
                className="quantity-input"
              />
              <span>g</span>
              <XCircle size={18} onClick={() => toggleIngredient(i.name)} />
            </div>
          ))}
        </div>
      )}

      <button
        className="analyze-button"
        onClick={handleAnalyze}
        disabled={selectedIngredients.length === 0}
      >
        <TrendingUp size={20} /> Analyser
      </button>
    </div>
  );

  const renderResults = () => {
    if (!analysisResult) return null;

    return (
      <div className="results-page">
        <h1 className="page-title">Résultat de l'Analyse</h1>
        <div className={`result-card ${analysisResult.result === "Healthy" ? "healthy" : "unhealthy"}`}>
          <h2>{analysisResult.result === "Healthy" ? "🟢 Sain" : "🔴 Malsain"}</h2>
          <div className="nutrients">
            {Object.entries(analysisResult.nutrients).map(([nut, val]) => (
              <div key={nut} className="nutrient">
                <strong>{nut.replace("_100g", "").replace("_100mg", "")}:</strong>{" "}
                {val.toFixed(1)}
                {nut.includes("sodium") ? "mg" : "g"}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (history.length === 0) return <p>Aucune analyse pour le moment.</p>;

    return (
      <div className="history-page">
        <h1 className="page-title">Historique</h1>
        {history.map((h) => (
          <div key={h.id} className={`history-item ${h.result}`}>
            <div className="history-info">
              <div className="history-result">
                {h.result === "sain" ? "🟢 SAIN" : "🔴 MALSAIN"}
              </div>
              <div className="history-date">📅 {h.date}</div>
              <div className="history-ingredients">{h.ingredients.join(", ")}</div>
            </div>
            <div className="history-score">{h.score}/100</div>
          </div>
        ))}
      </div>
    );
  };



  return (
    <div className="app">
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="Banner" />
      </div>
      {renderNavbar()}
      <div className="app-content">
        {currentPage === "upload" && renderUpload()}
        {analysisResult && renderResults()}
        {currentPage === "history" && renderHistory()}
      </div>
    </div>
  );
};

export default Analyse;
