// ======================================
// Utility Functions
// ======================================

const Utils = {
  formatCurrency(amount) {
    amount = Number(amount) || 0;

    return `${APP.CURRENCY}${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  formatDate(dateString) {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-IN", DATE_OPTIONS);
  },

  getTodayDate() {
    return new Date().toISOString().split("T")[0];
  },

  clearExpenseForm() {
    document.getElementById("expenseTitle").value = "";

    document.getElementById("expenseAmount").value = "";

    document.getElementById("expenseCategory").selectedIndex = 0;

    document.getElementById("expenseDate").value = Utils.getTodayDate();

    document.getElementById("expenseNotes").value = "";
  },

  loadCategories() {
    const select = document.getElementById("expenseCategory");

    if (!select) return;

    select.innerHTML = "";

    const defaultOption = document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent = "Select Category";

    select.appendChild(defaultOption);

    CATEGORIES.forEach((category) => {
      const option = document.createElement("option");

      option.value = category.id;

      option.textContent = category.name;

      select.appendChild(option);
    });
  },

  getCategory(value) {
    return CATEGORIES.find(
      (c) =>
        c.id.toLowerCase() === String(value).toLowerCase() ||
        c.name.toLowerCase() === String(value).toLowerCase(),
    );
  },
  showToast(icon, title) {
    Swal.fire({
      toast: true,

      position: "top-end",

      icon,

      title,

      timer: 2000,

      showConfirmButton: false,
    });
  },

  showLoading(message = "Please wait...") {
    Swal.fire({
      title: message,

      allowOutsideClick: false,

      didOpen: () => Swal.showLoading(),
    });
  },

  hideLoading() {
    Swal.close();
  },

  calculateTotals(expenses) {
    let today = 0;
    let week = 0;
    let month = 0;
    let total = 0;

    const now = new Date();

    const todayStr = Utils.getTodayDate();

    expenses.forEach((expense) => {
      const amount = Number(expense.amount);

      total += amount;

      if (expense.date === todayStr) today += amount;

      const expenseDate = new Date(expense.date);

      const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24);

      if (diffDays <= 7) week += amount;

      if (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      ) {
        month += amount;
      }
    });

    return { today, week, month, total };
  },

  initializeForm() {
    Utils.loadCategories();

    document.getElementById("expenseDate").value = Utils.getTodayDate();
  },
};
