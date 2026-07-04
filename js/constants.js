// ======================================
// Application Constants
// ======================================

const APP = {
  NAME: "Expense Tracker Pro",

  VERSION: "1.0.0",

  CURRENCY: "₹",
};

// Expense Categories
const CATEGORIES = [
  {
    id: "food",
    name: "Food",
    icon: "fa-utensils",
    color: "#FF6B6B",
  },

  {
    id: "travel",
    name: "Travel",
    icon: "fa-plane",
    color: "#4ECDC4",
  },

  {
    id: "shopping",
    name: "Shopping",
    icon: "fa-cart-shopping",
    color: "#6C5CE7",
  },

  {
    id: "bills",
    name: "Bills",
    icon: "fa-file-invoice-dollar",
    color: "#F39C12",
  },

  {
    id: "medical",
    name: "Medical",
    icon: "fa-heart-pulse",
    color: "#E74C3C",
  },

  {
    id: "education",
    name: "Education",
    icon: "fa-graduation-cap",
    color: "#3498DB",
  },

  {
    id: "investment",
    name: "Investment",
    icon: "fa-chart-line",
    color: "#27AE60",
  },

  {
    id: "entertainment",
    name: "Entertainment",
    icon: "fa-film",
    color: "#9B59B6",
  },

  {
    id: "others",
    name: "Others",
    icon: "fa-wallet",
    color: "#7F8C8D",
  },
];

// Firestore Collections
const COLLECTIONS = {
  USERS: "users",

  EXPENSES: "expenses",
};

// Chart Colors
const CHART_COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#84CC16",
];

// Date Formats
const DATE_OPTIONS = {
  year: "numeric",

  month: "short",

  day: "numeric",
};
