const API_URL = "http://127.0.0.1:5000";

// Récupérer tous les ingrédients depuis le backend
export const fetchIngredients = async () => {
  try {
    const res = await fetch(`${API_URL}/ingredients`);
    if (!res.ok) throw new Error("Erreur fetch ingredients");
    const data = await res.json();
    return data; // renvoie un tableau d'ingrédients simples
  } catch (err) {
    console.error("Erreur fetch ingredients:", err);
    return [];
  }
};

// Envoyer les ingrédients et quantités au backend pour prédiction
export const predictMeal = async (ingredientQuantities) => {
  try {
    const res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientQuantities })
    });
    if (!res.ok) throw new Error("Erreur predict meal");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erreur predict meal:", err);
    return null;
  }
};


// Envoyer un élément d'historique au backend pour le sauvegarder
export const saveHistoryItem = async (historyItem) => {
  try {
    const res = await fetch(`${API_URL}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(historyItem)
    });
    if (!res.ok) throw new Error("Erreur save history");
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Erreur save history:", err);
    return false;
  }
};


// Récupérer l'historique complet depuis le backend
export const fetchHistory = async () => {
  try {
    const res = await fetch(`${API_URL}/history`);
    if (!res.ok) throw new Error("Erreur fetch history");
    const data = await res.json();
    if (data.success) {
      // Convertir l'objet Firebase en tableau
      return Object.values(data.history);
    }
    return [];
  } catch (err) {
    console.error("Erreur fetch history:", err);
    return [];
  }
};
