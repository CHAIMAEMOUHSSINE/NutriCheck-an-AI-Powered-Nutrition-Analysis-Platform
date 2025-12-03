// Components/Analyse.js
import React, { useState } from 'react';
import { Camera, TrendingUp, History, Info, XCircle, CheckCircle, PieChart, BarChart3, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BannerBackground from "../Assets/home-banner-background.png"; // Image orange
import Logo from "../Assets/Logo.png"; // Logo NutriCheck
import './Analyse.css';

// ==================== DONNÉES STATIQUES ====================

// Base de données locale contenant 8 ingrédients avec leurs valeurs nutritionnelles
const INGREDIENTS_DATABASE = [
  { id: 1, name: "Pillsbury Golden Layer Buttermilk Biscuits", protein: 5.88, fat: 13.24, carbs: 41.18, sugars: 5.0, fiber: 0, sodium: 780 },
  { id: 2, name: "Bread, Salvadoran Sweet Cheese", protein: 7.12, fat: 17.12, carbs: 47.84, sugars: 24.9, fiber: 0.7, sodium: 510 },
  { id: 3, name: "Waffles, Buttermilk, Frozen", protein: 6.58, fat: 9.22, carbs: 41.05, sugars: 4.3, fiber: 2.2, sodium: 621 },
  { id: 4, name: "Crackers, Snack, Goya Crackers", protein: 14.25, fat: 13.35, carbs: 64.35, sugars: 2.35, fiber: 3.8, sodium: 665 },
  { id: 5, name: "Bagels, Wheat", protein: 10.2, fat: 1.53, carbs: 48.89, sugars: 6.12, fiber: 4.1, sodium: 439 },
  { id: 6, name: "Snacks, Beef Jerky", protein: 33.2, fat: 25.6, carbs: 11.0, sugars: 9.0, fiber: 0.9, sodium: 1785 },
  { id: 7, name: "Pie Crust, Deep Dish, Frozen", protein: 5.52, fat: 28.74, carbs: 46.79, sugars: 0.0, fiber: 1.4, sodium: 353 },
  { id: 8, name: "Tostada Shells, Corn", protein: 6.15, fat: 23.38, carbs: 64.43, sugars: 0.0, fiber: 5.8, sodium: 657 }
];

// Historique statique pour les graphiques
const STATIC_HISTORY = [
  { id: 1, date: '2024-11-15', result: 'sain', score: 82, ingredients: ['Bagels, Wheat', 'Snacks, Beef Jerky'], protein: 43.4, fat: 27.13, carbs: 59.89, sugars: 15.12 },
  { id: 2, date: '2024-11-17', result: 'malsain', score: 48, ingredients: ['Pie Crust, Deep Dish, Frozen', 'Waffles, Buttermilk, Frozen'], protein: 12.1, fat: 37.96, carbs: 87.84, sugars: 4.3 },
  { id: 3, date: '2024-11-19', result: 'sain', score: 75, ingredients: ['Bagels, Wheat', 'Tostada Shells, Corn'], protein: 16.35, fat: 24.91, carbs: 113.32, sugars: 6.12 },
  { id: 4, date: '2024-11-21', result: 'malsain', score: 38, ingredients: ['Bread, Salvadoran Sweet Cheese', 'Crackers, Snack, Goya Crackers'], protein: 21.37, fat: 30.47, carbs: 112.19, sugars: 27.25 },
  { id: 5, date: '2024-11-23', result: 'sain', score: 88, ingredients: ['Snacks, Beef Jerky', 'Bagels, Wheat'], protein: 43.4, fat: 27.13, carbs: 59.89, sugars: 15.12 },
  { id: 6, date: '2024-11-25', result: 'sain', score: 71, ingredients: ['Bagels, Wheat', 'Waffles, Buttermilk, Frozen'], protein: 16.78, fat: 10.75, carbs: 89.94, sugars: 10.42 }
];

// ==================== COMPOSANT PRINCIPAL ====================

const Analyse = () => {
  const navigate = useNavigate();
  
  // ==================== ÉTATS (STATE) ====================
  const [currentPage, setCurrentPage] = useState('upload');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState(STATIC_HISTORY);

  // ==================== FONCTIONS UTILITAIRES ====================

  /**
   * Ajoute ou retire un ingrédient de la sélection
   */
  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.find(i => i.id === ingredient.id)) {
      setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredient.id));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  /**
   * Analyse les ingrédients sélectionnés et calcule le score nutritionnel
   */
  const analyzeIngredients = () => {
    if (selectedIngredients.length === 0) return;

    const totalNutrition = selectedIngredients.reduce((acc, ing) => ({
      protein: acc.protein + ing.protein,
      fat: acc.fat + ing.fat,
      carbs: acc.carbs + ing.carbs,
      sugars: acc.sugars + ing.sugars,
      fiber: acc.fiber + ing.fiber,
      sodium: acc.sodium + ing.sodium
    }), { protein: 0, fat: 0, carbs: 0, sugars: 0, fiber: 0, sodium: 0 });

    const score = Math.max(0, Math.min(100, 
      70 - (totalNutrition.sugars * 0.5) - (totalNutrition.sodium * 0.01) + (totalNutrition.fiber * 2) + (totalNutrition.protein * 0.3)
    ));

    const result = {
      isHealthy: score >= 60,
      score: Math.round(score),
      nutrition: totalNutrition,
      ingredients: selectedIngredients,
      timestamp: new Date().toISOString()
    };

    const newHistoryEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('fr-FR'),
      result: result.isHealthy ? 'sain' : 'malsain',
      score: result.score,
      ingredients: selectedIngredients.map(i => i.name),
      protein: totalNutrition.protein,
      fat: totalNutrition.fat,
      carbs: totalNutrition.carbs,
      sugars: totalNutrition.sugars
    };

    setHistory([newHistoryEntry, ...history]);
    setAnalysisResult(result);
    setCurrentPage('results');
  };

  const filteredIngredients = INGREDIENTS_DATABASE.filter(ing =>
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== COMPOSANTS DE RENDU ====================

  /**
   * Barre de navigation principale avec logo et liens
   */
  const renderNavbar = () => (
    <nav className="navbar">
      {/* Logo cliquable qui redirige vers la page d'accueil */}
      <div className="nav-logo-container" onClick={() => navigate('/')}>
        <img src={Logo} alt="NutriCheck Logo" />
      </div>
      
      {/* Liens de navigation */}
      <div className="navbar-links">
        <a onClick={() => setCurrentPage('upload')} className={currentPage === 'upload' ? 'active' : ''}>
          <Camera size={20} /> Analyse
        </a>
        <a onClick={() => setCurrentPage('history')} className={currentPage === 'history' ? 'active' : ''}>
          <History size={20} /> Historique
        </a>
        <a onClick={() => setCurrentPage('about')} className={currentPage === 'about' ? 'active' : ''}>
          <Info size={20} /> À propos
        </a>
      </div>
    </nav>
  );

  /**
   * Page de sélection des ingrédients
   */
  const renderUpload = () => (
    <div className="upload-page">
      <h1 className="page-title">Sélection des Ingrédients</h1>
      <p className="page-subtitle">Choisissez les ingrédients de votre repas</p>

      <div className="upload-container">
        <input
          type="text"
          placeholder="🔍 Rechercher un ingrédient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {selectedIngredients.length > 0 && (
          <div className="selected-ingredients">
            <h3>✅ Ingrédients sélectionnés ({selectedIngredients.length})</h3>
            <div className="selected-badges">
              {selectedIngredients.map(ing => (
                <span key={ing.id} className="ingredient-badge">
                  {ing.name}
                  <XCircle size={16} onClick={() => toggleIngredient(ing)} />
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="ingredients-list">
          {filteredIngredients.map(ing => (
            <div
              key={ing.id}
              onClick={() => toggleIngredient(ing)}
              className={`ingredient-item ${selectedIngredients.find(i => i.id === ing.id) ? 'selected' : ''}`}
            >
              <div className="ingredient-info">
                <div className="ingredient-name">{ing.name}</div>
                <div className="ingredient-nutrients">
                  Protéines: {ing.protein}g | Glucides: {ing.carbs}g | Lipides: {ing.fat}g
                </div>
              </div>
              {selectedIngredients.find(i => i.id === ing.id) && (
                <CheckCircle size={24} color="#0cb431" />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={analyzeIngredients}
          disabled={selectedIngredients.length === 0}
          className="analyze-button"
        >
          <TrendingUp size={24} /> Analyser la Composition
        </button>
      </div>
    </div>
  );

  /**
   * Page des résultats d'analyse
   */
  const renderResults = () => {
    if (!analysisResult) return null;

    return (
      <div className="results-page">
        <h1 className="page-title">Résultats de l'Analyse</h1>

        <div className="results-container">
          <div className={`result-banner ${analysisResult.isHealthy ? 'healthy' : 'unhealthy'}`}>
            <div className="result-emoji">{analysisResult.isHealthy ? '🟢' : '🔴'}</div>
            <h2 className="result-title">{analysisResult.isHealthy ? 'SAIN' : 'MALSAIN'}</h2>
            <div className="result-score">
              Score Santé: <strong>{analysisResult.score}/100</strong>
            </div>
          </div>

          <div className="nutrition-card">
            <h3><PieChart size={28} /> Valeurs Nutritionnelles Totales</h3>
            <div className="nutrition-grid">
              {[
                { label: 'Protéines', value: analysisResult.nutrition.protein, unit: 'g', color: '#ff6b6b' },
                { label: 'Glucides', value: analysisResult.nutrition.carbs, unit: 'g', color: '#4ecdc4' },
                { label: 'Lipides', value: analysisResult.nutrition.fat, unit: 'g', color: '#ffe66d' },
                { label: 'Sucres', value: analysisResult.nutrition.sugars, unit: 'g', color: '#ff9ff3' },
                { label: 'Fibres', value: analysisResult.nutrition.fiber, unit: 'g', color: '#95e1d3' },
                { label: 'Sodium', value: analysisResult.nutrition.sodium, unit: 'mg', color: '#ffa07a' }
              ].map((nut, i) => (
                <div key={i} className="nutrition-item">
                  <div className="nutrition-value" style={{ color: nut.color }}>
                    {nut.value.toFixed(1)}{nut.unit}
                  </div>
                  <div className="nutrition-label">{nut.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ingredients-card">
            <h3>🍽️ Ingrédients Analysés ({analysisResult.ingredients.length})</h3>
            <div className="ingredients-analyzed">
              {analysisResult.ingredients.map(ing => (
                <div key={ing.id} className="analyzed-ingredient">
                  <div className="analyzed-name">{ing.name}</div>
                  <div className="analyzed-nutrients">
                    P: {ing.protein}g | G: {ing.carbs}g | L: {ing.fat}g
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recommendations-card">
            <h3>💡 Recommandations</h3>
            <ul className="recommendations-list">
              {analysisResult.isHealthy ? (
                <>
                  <li>✅ Bonne composition nutritionnelle globale</li>
                  <li>✅ Équilibre satisfaisant des macronutriments</li>
                  <li>💪 Continuez sur cette voie pour maintenir une alimentation saine</li>
                </>
              ) : (
                <>
                  <li>⚠️ Teneur élevée en sucres - privilégiez les aliments moins sucrés</li>
                  <li>⚠️ Sodium élevé - réduisez les produits transformés</li>
                  <li>🥗 Ajoutez plus de légumes et de fibres à votre alimentation</li>
                </>
              )}
            </ul>
          </div>

          <button onClick={() => { setCurrentPage('upload'); setAnalysisResult(null); setSelectedIngredients([]); }} className="new-analysis-button">
            Nouvelle Analyse
          </button>
        </div>
      </div>
    );
  };

  /**
   * Page de l'historique avec statistiques et graphiques
   */
  const renderHistory = () => {
    const totalAnalyses = history.length;
    const healthyCount = history.filter(h => h.result === 'sain').length;
    const avgScore = (history.reduce((sum, h) => sum + h.score, 0) / totalAnalyses).toFixed(1);
    
    const recentHistory = history.slice(0, 7).reverse();
    const maxScore = 100;

    return (
      <div className="history-page">
        <h1 className="page-title">Historique des Analyses</h1>
        <p className="page-subtitle">Suivez l'évolution de votre alimentation</p>

        <div className="history-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">{totalAnalyses}</div>
              <div className="stat-label">Analyses totales</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{healthyCount}</div>
              <div className="stat-label">Repas sains</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">{avgScore}</div>
              <div className="stat-label">Score moyen</div>
            </div>
          </div>

          <div className="chart-card">
            <h3><BarChart3 size={24} /> Évolution du Score Santé</h3>
            <div className="chart-container">
              <div className="chart-y-axis">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
              <div className="chart-bars">
                {recentHistory.map((entry, index) => (
                  <div key={entry.id} className="chart-bar-container">
                    <div className="chart-bar-wrapper">
                      <div 
                        className={`chart-bar ${entry.result === 'sain' ? 'healthy-bar' : 'unhealthy-bar'}`}
                        style={{ height: `${(entry.score / maxScore) * 100}%` }}
                      >
                        <span className="bar-value">{entry.score}</span>
                      </div>
                    </div>
                    <div className="chart-label">{entry.date.slice(5)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3><PieChart size={24} /> Répartition Nutritionnelle Moyenne</h3>
            <div className="nutrients-chart">
              {['protein', 'fat', 'carbs', 'sugars'].map(nutrient => {
                const avgValue = (history.reduce((sum, h) => sum + h[nutrient], 0) / totalAnalyses).toFixed(1);
                const maxValue = Math.max(...history.map(h => h[nutrient]));
                const percentage = (avgValue / maxValue) * 100;
                
                const labels = {
                  protein: 'Protéines',
                  fat: 'Lipides',
                  carbs: 'Glucides',
                  sugars: 'Sucres'
                };
                
                const colors = {
                  protein: '#ff6b6b',
                  fat: '#ffe66d',
                  carbs: '#4ecdc4',
                  sugars: '#ff9ff3'
                };

                return (
                  <div key={nutrient} className="nutrient-bar-item">
                    <div className="nutrient-bar-label">
                      <span>{labels[nutrient]}</span>
                      <span>{avgValue}g</span>
                    </div>
                    <div className="nutrient-bar-bg">
                      <div 
                        className="nutrient-bar-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: colors[nutrient]
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="history-list">
            <h3><Calendar size={24} /> Toutes les Analyses</h3>
            {history.map(item => (
              <div key={item.id} className={`history-item ${item.result}`}>
                <div className="history-info">
                  <div className="history-result">
                    {item.result === 'sain' ? '🟢 SAIN' : '🔴 MALSAIN'}
                  </div>
                  <div className="history-details">
                    📅 {item.date} | 🍽️ {item.ingredients.length} ingrédients
                  </div>
                  <div className="history-ingredients-preview">
                    {item.ingredients.join(', ')}
                  </div>
                </div>
                <div className={`history-score ${item.result}`}>
                  {item.score}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Page "À propos"
   */
  const renderAbout = () => (
    <div className="about-page">
      <div className="about-container">
        <h1 className="page-title">À propos de NutriCheck</h1>
        <p className="about-intro">
          NutriCheck est une application innovante qui utilise l'intelligence artificielle pour analyser la qualité nutritionnelle de vos repas. Notre mission est de vous aider à faire des choix alimentaires plus sains et éclairés.
        </p>
        <div className="about-card">
          <h3>🎯 Nos Fonctionnalités</h3>
          <ul className="about-features">
            <li>Analyse nutritionnelle instantanée basée sur une base de données USDA</li>
            <li>Classification automatique sain/malsain avec score détaillé</li>
            <li>Recommandations personnalisées pour améliorer votre alimentation</li>
            <li>Suivi de l'historique de vos analyses avec graphiques interactifs</li>
            <li>Statistiques nutritionnelles pour suivre votre évolution</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // ==================== RENDU PRINCIPAL ====================
  
  return (
    <div className="app">
      {/* Background orange décoratif */}
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      
      {/* Navbar */}
      {renderNavbar()}
      
      {/* Contenu principal */}
      <div className="app-content">
        {currentPage === 'upload' && renderUpload()}
        {currentPage === 'results' && renderResults()}
        {currentPage === 'history' && renderHistory()}
        {currentPage === 'about' && renderAbout()}
      </div>
    </div>
  );
};

export default Analyse;