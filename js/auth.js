// =====================================
// Authentication
// =====================================

const loginBtn = document.getElementById("googleLoginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// -----------------------------
// Google Login
// -----------------------------
async function login() {
  try {
    await auth.signInWithPopup(provider);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome to Expense Tracker!",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message,
    });
  }
}

// -----------------------------
// Logout
// -----------------------------
async function logout() {
  const result = await Swal.fire({
    title: "Logout?",

    text: "Do you really want to logout?",

    icon: "question",

    showCancelButton: true,

    confirmButtonColor: "#4F46E5",

    cancelButtonColor: "#EF4444",

    confirmButtonText: "Yes",
  });

  if (!result.isConfirmed) return;

  try {
    await auth.signOut();

    Swal.fire({
      icon: "success",

      title: "Logged Out",

      timer: 1200,

      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);
  }
}

// -----------------------------
// Authentication State
// -----------------------------
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("loginSection").style.display = "none";

    document.getElementById("app").style.display = "block";

    document.getElementById("userName").innerText = user.displayName || "";

    document.getElementById("userEmail").innerText = user.email || "";

    document.getElementById("userPhoto").src =
      user.photoURL || "https://via.placeholder.com/60";

    console.log("Logged In :", user.uid);

    // This function will be created in expenses.js
    if (typeof loadExpenses === "function") {
      loadExpenses();
    }
  } else {
    document.getElementById("loginSection").style.display = "flex";

    document.getElementById("app").style.display = "none";

    console.log("User Logged Out");
  }
});

// -----------------------------
// Events
// -----------------------------
if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
