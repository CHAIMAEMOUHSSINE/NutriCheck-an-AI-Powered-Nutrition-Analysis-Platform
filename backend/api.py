from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
from ConnectionBD import history_ref

# ===== Flask setup =====
app = Flask(__name__)  # ✅ CORRECTION

CORS(app)

# ===== Charger dataset et modèle =====
usda_df = pd.read_csv("cleaned_ingredient_database.csv")

# Créer une colonne simplifiée pour l'affichage
usda_df['ingredient_simple'] = usda_df['ingredient_name'].apply(lambda x: x.split(',')[0].strip())

with open("W.pkl", "rb") as f:
    W = pickle.load(f)
with open("b.pkl", "rb") as f:
    b = pickle.load(f)
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)
with open("best_degree.pkl", "rb") as f:
    best_degree = pickle.load(f)

# ===== Fonctions du modèle =====
def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def mapFeature(X, degree):
    n_samples, n_features = X.shape
    res = np.ones((n_samples, 1))
    for i in range(n_features):
        res = np.column_stack((res, X[:, i]))
    if degree > 1:
        for d in range(2, degree + 1):
            for i in range(n_features):
                res = np.column_stack((res, X[:, i] ** d))
    return res

def modele(X, W, b):
    Z = X.dot(W) + b
    return sigmoid(Z)

def predict(X, W, b):
    A = modele(X, W, b)
    return A >= 0.5

def find_ingredient_row(ingredient, df):
    ingredient = ingredient.lower()
    matches = df[df['ingredient_name'].str.lower().str.contains(ingredient)]
    if len(matches) == 0:
        return None
    return matches.iloc[0]

# ===== Calcul nutriments avec conversion sodium mg → g =====
def calcul_nutriments_repas(ingredient_quantities, ingredients_df):
    nutrients = ['protein_100g','fat_100g','carbohydrates_100g','sugars_100g','fiber_100g','sodium_100mg']
    total = dict.fromkeys(nutrients, 0)
    for ing, qty in ingredient_quantities.items():
        row = find_ingredient_row(ing, ingredients_df)
        if row is None:
            continue
        for n in nutrients:
            total[n] += row[n] * (qty / 100)
    # Convertir le sodium de mg → g
    total['sodium_100mg'] = total['sodium_100mg'] / 1000
    # Renommer pour correspondre à l’entraînement
    total['sodium_100g'] = total.pop('sodium_100mg')
    return total

# ===== Routes API =====
@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    return jsonify(sorted(usda_df['ingredient_simple'].unique()))

@app.route('/predict', methods=['POST'])
def predict_meal():
    data = request.json
    ingredient_quantities = data["ingredients"]

    # 1. Calcul nutriments
    total_nutrients = calcul_nutriments_repas(ingredient_quantities, usda_df)

    # 2. Préparer entrée modèle
    X_user = np.array([[total_nutrients['fat_100g'],
                        total_nutrients['carbohydrates_100g'],
                        total_nutrients['sugars_100g'],
                        total_nutrients['fiber_100g'],
                        total_nutrients['protein_100g'],
                        total_nutrients['sodium_100g']]])
    
    X_scaled = scaler.transform(X_user)
    X_poly = mapFeature(X_scaled, best_degree)

    # 3. Prédiction
    pred = predict(X_poly, W, b)
    result = "Healthy" if pred[0][0] else "Unhealthy"

    return jsonify({
        "nutrients": total_nutrients,
        "result": result
    })


@app.route("/history", methods=["POST"])
def save_history():
    data = request.get_json()
    history_ref.child(str(data["id"])).set(data)
    return jsonify({"success": True})

@app.route("/history", methods=["GET"])
def get_history():
    all_history = history_ref.get() or {}
    return jsonify({"success": True, "history": all_history})



# ===== Lancer le serveur =====
if __name__ == "__main__":  # ✅ CORRECTION
    app.run(port=5000, debug=True)
