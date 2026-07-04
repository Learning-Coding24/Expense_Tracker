// ======================================
// Authentication Controller
// ======================================

const AuthController = {
  init() {
    const loginBtn = document.getElementById("googleLoginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn) {
      loginBtn.addEventListener("click", AuthController.login);
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", AuthController.logout);
    }

    auth.onAuthStateChanged(AuthController.handleAuthState);
  },

  // -----------------------------
  // Google Login
  // -----------------------------
  async login() {
    try {
      Utils.showLoading("Signing in...");

      await auth.signInWithPopup(provider);

      Utils.hideLoading();

      Utils.showToast("success", "Login Successful");
    } catch (error) {
      Utils.hideLoading();

      console.error(error);

      Swal.fire({
        icon: "error",

        title: "Login Failed",

        text: error.message,
      });
    }
  },

  // -----------------------------
  // Logout
  // -----------------------------
  async logout() {
    const result = await Swal.fire({
      title: "Logout?",

      text: "Do you want to logout?",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Logout",

      confirmButtonColor: "#4F46E5",

      cancelButtonColor: "#EF4444",
    });

    if (!result.isConfirmed) return;

    try {
      await auth.signOut();

      Utils.showToast("success", "Logged Out");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",

        title: "Logout Failed",

        text: error.message,
      });
    }
  },

  // -----------------------------
  // Authentication State
  // -----------------------------
  async handleAuthState(user) {
    AppState.currentUser = user;

    if (!user) {
      AppState.expenses = [];

      UI.showLogin();

      return;
    }

    UI.showApp(user);

    try {
      Utils.showLoading("Loading Expenses...");

      AppState.expenses = await FirestoreService.getExpenses();

      UI.renderDashboard();

      UI.renderExpenses();

      Charts.renderAll();

      Utils.hideLoading();
    } catch (error) {
      Utils.hideLoading();

      console.error(error);

      Swal.fire({
        icon: "error",

        title: "Unable to load expenses",

        text: error.message,
      });
    }
  },
};
