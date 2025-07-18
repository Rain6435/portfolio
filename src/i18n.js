import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Analytics Dashboard",
      "language": "Language",
      
      // Dashboard Title
      "title": "Food Price Analysis Dashboard",
      "subtitle": "Interactive visualization of food price trends and comparisons",
      
      // Charts
      "priceOverTime": "Price Trends Comparison",
      "nutritionVsPrice": "Nutrition vs Price Analysis",
      "selectFood": "Select Food Item",
      "selectTimeRange": "Select Time Range",
      "selectCurrency": "Select Currency",
      "selectFoods": "Select Foods to Compare",
      "selectMetric": "Select Metric",
      
      // Food Items
      "tomatoes": "Tomatoes",
      "potatoes": "Potatoes",
      "onions": "Onions",
      "carrots": "Carrots",
      "broccoli": "Broccoli",
      "lettuce": "Lettuce",
      "apples": "Apples",
      "bananas": "Bananas",
      "oranges": "Oranges",
      "chicken": "Chicken",
      "beef": "Beef",
      "salmon": "Salmon",
      "milk": "Milk",
      "cheese": "Cheese",
      
      // Time Ranges
      "6months": "Last 6 Months",
      "1year": "Last Year",
      "2years": "Last 2 Years",
      
      // Currencies
      "cad": "CAD",
      "usd": "USD",
      "eur": "EUR",
      
      // Chart Labels
      "price": "Price",
      "month": "Month",
      "foodItem": "Food Item",
      "pricePerKg": "Price per Kg",
      
      // Months
      "jan": "Jan",
      "feb": "Feb",
      "mar": "Mar",
      "apr": "Apr",
      "may": "May",
      "jun": "Jun",
      "jul": "Jul",
      "aug": "Aug",
      "sep": "Sep",
      "oct": "Oct",
      "nov": "Nov",
      "dec": "Dec",
      
      // Context
      "chartContext": "This dashboard visualizes food price trends over time and enables comparison between different food items. Data is synthetic and generated for demonstration purposes.",
      
      // Interactions
      "interactionHelp": "Use the controls above each chart to modify the data displayed. You can change time ranges, currencies, and food items to explore different aspects of the data.",
      
      // New metrics
      "nutritionScore": "Nutrition Score",
      "caloriesPerDollar": "Calories per Dollar",
      "proteinPerDollar": "Protein per Dollar",
      "vitaminCPerDollar": "Vitamin C per Dollar",
      "calories": "Calories",
      "protein": "Protein (g)",
      "vitaminC": "Vitamin C (mg)",
      "marketShare": "Market Share (%)",
      
      // Food Categories
      "vegetable": "Vegetables",
      "fruit": "Fruits",
      "meat": "Meat",
      "fish": "Fish",
      "dairy": "Dairy",
      "starch": "Starchy Foods",
      "leafy": "Leafy Greens",
      "selectCategory": "Select Category",
      "allCategories": "All Categories",
      
      // View Modes
      "viewMode": "View Mode",
      "chartView": "Chart View",
      "tableView": "Table View"
    }
  },
  fr: {
    translation: {
      // Navigation
      "dashboard": "Tableau de Bord Analytique",
      "language": "Langue",
      
      // Dashboard Title
      "title": "Tableau de Bord d'Analyse des Prix Alimentaires",
      "subtitle": "Visualisation interactive des tendances et comparaisons des prix alimentaires",
      
      // Charts
      "priceOverTime": "Comparaison des Tendances de Prix",
      "nutritionVsPrice": "Analyse Nutrition vs Prix",
      "selectFood": "Sélectionner un Aliment",
      "selectTimeRange": "Sélectionner une Période",
      "selectCurrency": "Sélectionner une Devise",
      "selectFoods": "Sélectionner des Aliments à Comparer",
      "selectMetric": "Sélectionner une Métrique",
      
      // Food Items
      "tomatoes": "Tomates",
      "potatoes": "Pommes de Terre",
      "onions": "Oignons",
      "carrots": "Carottes",
      "broccoli": "Brocoli",
      "lettuce": "Laitue",
      "apples": "Pommes",
      "bananas": "Bananes",
      "oranges": "Oranges",
      "chicken": "Poulet",
      "beef": "Bœuf",
      "salmon": "Saumon",
      "milk": "Lait",
      "cheese": "Fromage",
      
      // Time Ranges
      "6months": "6 Derniers Mois",
      "1year": "Dernière Année",
      "2years": "2 Dernières Années",
      
      // Currencies
      "cad": "CAD",
      "usd": "USD",
      "eur": "EUR",
      
      // Chart Labels
      "price": "Prix",
      "month": "Mois",
      "foodItem": "Aliment",
      "pricePerKg": "Prix par Kg",
      
      // Months
      "jan": "Jan",
      "feb": "Fév",
      "mar": "Mar",
      "apr": "Avr",
      "may": "Mai",
      "jun": "Jun",
      "jul": "Jul",
      "aug": "Aoû",
      "sep": "Sep",
      "oct": "Oct",
      "nov": "Nov",
      "dec": "Déc",
      
      // Context
      "chartContext": "Ce tableau de bord visualise les tendances des prix alimentaires au fil du temps et permet la comparaison entre différents aliments. Les données sont synthétiques et générées à des fins de démonstration.",
      
      // Interactions
      "interactionHelp": "Utilisez les contrôles au-dessus de chaque graphique pour modifier les données affichées. Vous pouvez changer les périodes, les devises et les aliments pour explorer différents aspects des données.",
      
      // New metrics
      "nutritionScore": "Score Nutritionnel",
      "caloriesPerDollar": "Calories par Dollar",
      "proteinPerDollar": "Protéines par Dollar",
      "vitaminCPerDollar": "Vitamine C par Dollar",
      "calories": "Calories",
      "protein": "Protéines (g)",
      "vitaminC": "Vitamine C (mg)",
      "marketShare": "Part de Marché (%)",
      
      // Food Categories
      "vegetable": "Légumes",
      "fruit": "Fruits",
      "meat": "Viande",
      "fish": "Poisson",
      "dairy": "Produits Laitiers",
      "starch": "Féculents",
      "leafy": "Légumes Verts",
      "selectCategory": "Sélectionner une Catégorie",
      "allCategories": "Toutes les Catégories",
      
      // View Modes
      "viewMode": "Mode d'Affichage",
      "chartView": "Vue Graphique",
      "tableView": "Vue Tableau"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;