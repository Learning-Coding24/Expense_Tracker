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
  },

  // -----------------------------
  // Main App
  // -----------------------------
  showApp(user) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("userName").textContent = user.displayName || "";

    document.getElementById("userEmail").textContent = user.email || "";

    document.getElementById("userPhoto").src =
      user.photoURL || "https://via.placeholder.com/60";
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

                    <div
                        class="expense-icon"
                        style="background:${category.color}">

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
    <button class="edit-btn" data-id="${expense.id}" title="Edit Expense">
        <i class="fas fa-pen"></i>
    </button>

    <button class="delete-btn" data-id="${expense.id}" title="Delete Expense">
        <i class="fas fa-trash"></i>
    </button>
</div>

                </div>

            `;

      container.appendChild(card);
    });

    // Edit button events
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        console.log("Edit clicked:", button.dataset.id);
        ExpenseController.editExpense(button.dataset.id);
      });
    });

    // Delete button events
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        ExpenseController.deleteExpense(button.dataset.id);
      });
    });
  },
};
