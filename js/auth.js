// ======================================
// Authentication Controller
// ======================================

const AuthController = {
  // -----------------------------
  // Initialize Authentication
  // -----------------------------
  init() {
    // Google Login
    const loginBtn = document.getElementById("googleLoginBtn");

    if (loginBtn) {
      loginBtn.addEventListener("click", AuthController.login);
    }

    // Desktop Logout
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", AuthController.logout);
    }

    // Mobile Logout
    const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");

    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", AuthController.logout);
    }

    // Firebase Auth Listener
    auth.onAuthStateChanged(AuthController.handleAuthState);
  },

  // -----------------------------
  // Google Login
  // -----------------------------
  async login() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      await auth.signInWithPopup(provider);
    } catch (error) {
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
    try {
      await auth.signOut();

      UI.closeMobileMenu();

      UI.showLogin();

      Utils.showToast("success", "Logged out successfully.");
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
  // Auth State Changed
  // -----------------------------
  async handleAuthState(user) {
    if (!user) {
      AppState.currentUser = null;
      AppState.expenses = [];

      UI.showLogin();

      return;
    }

    AppState.currentUser = user;

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
