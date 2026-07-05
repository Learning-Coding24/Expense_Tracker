// ======================================
// UI Controller
// ======================================

const UI = {
  // -----------------------------
  // Login Screen
  // -----------------------------
  showLogin() {
    document.getElementById("loginSection").style.display = "flex";
    document.getElementById("app").style.display = "none";

    UI.closeMobileMenu();
  },

  // -----------------------------
  // Main App
  // -----------------------------
  showApp(user) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("app").style.display = "block";

    // Desktop Header
    document.getElementById("userName").textContent = user.displayName || "";

    document.getElementById("userEmail").textContent = user.email || "";

    document.getElementById("userPhoto").src =
      user.photoURL || "https://via.placeholder.com/60";

    // Mobile Menu
    const mobilePhoto = document.getElementById("mobileUserPhoto");
    const mobileName = document.getElementById("mobileUserName");
    const mobileEmail = document.getElementById("mobileUserEmail");

    if (mobilePhoto) {
      mobilePhoto.src = user.photoURL || "https://via.placeholder.com/60";
    }

    if (mobileName) {
      mobileName.textContent = user.displayName || "";
    }

    if (mobileEmail) {
      mobileEmail.textContent = user.email || "";
    }

    UI.closeMobileMenu();
  },

  // -----------------------------
  // Mobile Menu
  // -----------------------------
  initMobileMenu() {
    const menuBtn = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  },

  closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }
  },

  // -----------------------------
  // Dashboard Cards
  // -----------------------------
  renderDashboard() {
    const totals = Utils.calculateTotals(AppState.expenses);

    document.getElementById("todayExpense").textContent = Utils.formatCurrency(
      totals.today,
    );

    document.getElementById("weekExpense").textContent = Utils.formatCurrency(
      totals.week,
    );

    document.getElementById("monthExpense").textContent = Utils.formatCurrency(
      totals.month,
    );

    document.getElementById("totalExpense").textContent = Utils.formatCurrency(
      totals.total,
    );
  },

  // -----------------------------
  // Expense List
  // -----------------------------
  renderExpenses() {
    const container = document.getElementById("expenseList");

    if (!container) return;

    container.innerHTML = "";

    if (AppState.expenses.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
            <i class="fa-solid fa-wallet"></i>
            <h3>No Expenses Found</h3>
            <p>Add your first expense.</p>
        </div>
      `;
      return;
    }

    AppState.expenses.forEach((expense) => {
      const category = Utils.getCategory(expense.category) || {
        name: expense.category,
        icon: "fa-wallet",
        color: "#7F8C8D",
      };

      const card = document.createElement("div");

      card.className = "expense-item";

      card.innerHTML = `
        <div class="expense-left">

            <div class="expense-icon" style="background:${category.color}">
                <i class="fa-solid ${category.icon}"></i>
            </div>

            <div>
                <h3>${expense.title}</h3>

                <small>
                    ${category.name}
                    •
                    ${Utils.formatDate(expense.date)}
                </small>
            </div>

        </div>

        <div class="expense-right">

            <strong>
                ${Utils.formatCurrency(expense.amount)}
            </strong>

            <div class="expense-actions">

                <button
                    class="edit-btn"
                    data-id="${expense.id}"
                    title="Edit Expense">

                    <i class="fas fa-pen"></i>

                </button>

                <button
                    class="delete-btn"
                    data-id="${expense.id}"
                    title="Delete Expense">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        </div>
      `;

      container.appendChild(card);
    });

    // Edit Events
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        ExpenseController.editExpense(button.dataset.id);
      });
    });

    // Delete Events
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        ExpenseController.deleteExpense(button.dataset.id);
      });
    });
  },
};

// -----------------------------
// Initialize Mobile Menu
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  UI.initMobileMenu();
});
