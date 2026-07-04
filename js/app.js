// ======================================
// Expense Tracker Pro
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  console.log(`${APP.NAME} v${APP.VERSION}`);

  Utils.initializeForm();

  AuthController.init();

  ExpenseController.init();
});
