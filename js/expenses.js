// ======================================
// Expense Controller
// ======================================

const ExpenseController = {
  init() {
    const saveBtn = document.getElementById("saveExpenseBtn");

    if (saveBtn) {
      saveBtn.addEventListener("click", ExpenseController.saveExpense);
    }
  },

  // -----------------------------
  // Save / Update Expense
  // -----------------------------
  async saveExpense() {
    try {
      const expense = ExpenseController.readForm();

      if (!expense) return;

      const isEditing = AppState.editingExpenseId !== null;

      Utils.showLoading(
        isEditing ? "Updating Expense..." : "Saving Expense...",
      );

      if (isEditing) {
        await FirestoreService.updateExpense(
          AppState.editingExpenseId,
          expense,
        );
      } else {
        await FirestoreService.saveExpense(expense);
      }

      AppState.expenses = await FirestoreService.getExpenses();

      Utils.hideLoading();

      Utils.clearExpenseForm();

      // Exit edit mode
      AppState.editingExpenseId = null;

      document.getElementById("saveExpenseBtn").textContent = "Save Expense";

      UI.renderDashboard();
      UI.renderExpenses();
      Charts.renderAll();

      Utils.showToast(
        "success",
        isEditing ? "Expense Updated" : "Expense Saved",
      );
    } catch (error) {
      Utils.hideLoading();

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.message,
      });
    }
  },

  // -----------------------------
  // Read Form
  // -----------------------------
  readForm() {
    const title = document.getElementById("expenseTitle").value.trim();

    const amount = Number(document.getElementById("expenseAmount").value);

    const category = document.getElementById("expenseCategory").value;

    const date = document.getElementById("expenseDate").value;

    const notes = document.getElementById("expenseNotes").value.trim();

    if (!title) {
      Swal.fire("Validation", "Please enter title.", "warning");
      return null;
    }

    if (amount <= 0) {
      Swal.fire("Validation", "Please enter valid amount.", "warning");
      return null;
    }

    if (!category) {
      Swal.fire("Validation", "Please select category.", "warning");
      return null;
    }

    if (!date) {
      Swal.fire("Validation", "Please select date.", "warning");
      return null;
    }

    return {
      title,
      amount,
      category,
      date,
      notes,
    };
  },

  // -----------------------------
  // Delete Expense
  // -----------------------------
  async deleteExpense(id) {
    const result = await Swal.fire({
      title: "Delete Expense?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#EF4444",
    });

    if (!result.isConfirmed) return;

    try {
      Utils.showLoading("Deleting...");

      await FirestoreService.deleteExpense(id);

      AppState.expenses = await FirestoreService.getExpenses();

      Utils.hideLoading();

      UI.renderDashboard();
      UI.renderExpenses();
      Charts.renderAll();

      Utils.showToast("success", "Expense Deleted");
    } catch (error) {
      Utils.hideLoading();

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message,
      });
    }
  },

  // -----------------------------
  // Edit Expense
  // -----------------------------
  editExpense(expenseId) {
    console.log("Editing ID:", expenseId);
    console.log("Expenses:", AppState.expenses);

    const expense = AppState.expenses.find((item) => item.id === expenseId);

    console.log("Found expense:", expense);

    if (!expense) {
      Swal.fire("Error", "Expense not found.", "error");
      return;
    }

    document.getElementById("expenseTitle").value = expense.title;
    document.getElementById("expenseAmount").value = expense.amount;
    const category = Utils.getCategory(expense.category);

    document.getElementById("expenseCategory").value = category
      ? category.id
      : "";
    document.getElementById("expenseDate").value = expense.date;
    document.getElementById("expenseNotes").value = expense.notes || "";

    AppState.editingExpenseId = expense.id;

    document.getElementById("saveExpenseBtn").textContent = "Update Expense";
  },
};
