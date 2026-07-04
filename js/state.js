// ======================================
// Application State
// ======================================

const AppState = {
  // Logged in Firebase user
  currentUser: null,

  // All expenses of current user
  expenses: [],

  // Expense currently being edited
  editingExpenseId: null,

  // Charts
  charts: {
    daily: null,
    weekly: null,
    monthly: null,
    category: null,
  },

  // Filters
  filters: {
    search: "",
    category: "All",
    fromDate: "",
    toDate: "",
  },
};
