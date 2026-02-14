# 🥗 NutriCheck – AI-Powered Nutrition Analysis Platform

**NutriCheck** est une plateforme web intelligente conçue pour aider les utilisateurs à analyser leurs repas, comprendre leurs valeurs nutritionnelles et faire des choix alimentaires plus sains. 

L'application combine le **Machine Learning**, les technologies web modernes et une base de données alimentaire à grande échelle pour fournir des informations nutritionnelles instantanées et des recommandations personnalisées.

---

## 🎯 Objectifs du Projet
Le but de NutriCheck est de :
* **Simplifier** l'analyse des repas au quotidien.
* **Sensibiliser** les utilisateurs à leurs apports nutritionnels réels.
* **Améliorer** les habitudes alimentaires sur le long terme.
* **Fournir** un feedback santé clair, précis et actionnable.

---

## 🚀 Fonctionnalités Clés
* **Analyse de repas** basée sur les ingrédients et les quantités sélectionnés.
* **Calcul automatique des valeurs nutritionnelles :**
    * Calories, Protéines, Glucides, Lipides.
    * Sucres, Fibres, Sodium.
* **Score de santé (AI-generated) :** Note de 0 à 100.
* **Verdict clair :** Classification *Sain (Healthy)* / *Mauvais pour la santé (Unhealthy)*.
* **Recommandations personnalisées :** Conseils nutritionnels adaptés.
* **Suivi de l'historique :** Statistiques et visualisation des progrès de l'utilisateur.

---

## 🧠 Intelligence Artificielle
Le cœur de l'analyse repose sur un modèle de classification robuste :

* **Modèle :** Régression Logistique (implémentée *from scratch*).
* **Langage :** Python.
* **Features utilisées :** Protéines, Glucides, Lipides, Sucres, Fibres, Sodium.
* **Optimisation :** Expansion de caractéristiques polynomiales pour gérer les relations non-linéaires.
* **Performance du modèle :**
    * **Précision (Accuracy) :** ~87%
    * **Precision, Recall, F1-score :** ~87%

---

## 🛠️ Technologies Utilisées

| Secteur | Technologies |
| :--- | :--- |
| **Backend** | Python, Flask (REST API) |
| **Frontend** | React JS, Tailwind CSS |
| **Base de données** | Firebase Realtime Database |
| **Data & ML** | Jupyter Notebook, NumPy, Pandas |
| **Datasets** | USDA Food Dataset (500k+ items), Kaggle |

---

## 📂 Structure du Projet (Simplifiée)

```text
NutriCheck/
│
├── backend/
│   ├── model/         # Modèles ML entraînés
│   ├── api/           # Endpoints Flask
│   ├── notebooks/     # Analyse de données et entraînement
│   └── BDprivateKey/  # (Ignoré) Clés de configuration privées
│
├── frontend/
│   ├── components/    # Composants React réutilisables
│   ├── pages/         # Vues principales de l'application
│   └── assets/        # Images et styles
│
├── .gitignore         # Fichiers à exclure du versioning
└── README.md          # Documentation du projet
