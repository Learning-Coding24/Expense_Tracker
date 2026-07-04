// =====================================
// Expense Management
// =====================================

let expenses = [];

// -----------------------------
// Save Expense
// -----------------------------
const saveExpenseBtn = document.getElementById("saveExpenseBtn");

if (saveExpenseBtn) {
  saveExpenseBtn.addEventListener("click", saveExpense);
}

async function saveExpense() {
  const user = auth.currentUser;

  if (!user) {
    Swal.fire("Error", "Please login first.", "error");
    return;
  }

  const title = document.getElementById("expenseTitle").value.trim();
  const amount = Number(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const date = document.getElementById("expenseDate").value;
  const notes = document.getElementById("expenseNotes").value.trim();

  if (!title || amount <= 0 || !category || !date) {
    Swal.fire({
      icon: "warning",
      title: "Please fill all required fields",
    });

    return;
  }

  try {
    await db.collection("users").doc(user.uid).collection("expenses").add({
      title,
      amount,
      category,
      date,
      notes,

      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    Swal.fire({
      icon: "success",
      title: "Expense Saved",
      timer: 1200,
      showConfirmButton: false,
    });

    clearForm();

    loadExpenses();
  } catch (error) {
    console.error(error);

    Swal.fire("Error", error.message, "error");
  }
}

// -----------------------------
// Load Expenses
// -----------------------------
async function loadExpenses() {
  const user = auth.currentUser;

  if (!user) return;

  const snapshot = await db
    .collection("users")
    .doc(user.uid)
    .collection("expenses")
    .orderBy("date", "desc")
    .get();

  expenses = [];

  snapshot.forEach((doc) => {
    expenses.push({
      id: doc.id,

      ...doc.data(),
    });
  });

  renderExpenses();

  updateDashboard();
}

// -----------------------------
// Render Expense List
// -----------------------------
function renderExpenses() {
  const expenseList = document.getElementById("expenseList");

  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    expenseList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-receipt"></i>
                <p>No expenses added yet.</p>
            </div>
        `;

    return;
  }

  expenses.forEach((expense) => {
    expenseList.innerHTML += `

        <div class="expense-item">

            <div>

                <h3>${expense.title}</h3>

                <small>

                    ${expense.category}

                    •

                    ${expense.date}

                </small>

            </div>

            <div>

                <strong>₹${expense.amount}</strong>

                <button
                    class="delete-btn"
                    onclick="deleteExpense('${expense.id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;
  });
}

// -----------------------------
// Delete Expense
// -----------------------------
async function deleteExpense(id) {
  const result = await Swal.fire({
    title: "Delete Expense?",

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  const user = auth.currentUser;

  await db

    .collection("users")

    .doc(user.uid)

    .collection("expenses")

    .doc(id)

    .delete();

  loadExpenses();
}

// -----------------------------
// Dashboard
// -----------------------------
function updateDashboard() {
  let total = 0;

  let today = 0;

  let week = 0;

  let month = 0;

  const now = new Date();

  const todayStr = now.toISOString().split("T")[0];

  expenses.forEach((expense) => {
    total += Number(expense.amount);

    if (expense.date === todayStr) today += Number(expense.amount);

    const expenseDate = new Date(expense.date);

    const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24);

    if (diffDays <= 7) week += Number(expense.amount);

    if (
      expenseDate.getMonth() === now.getMonth() &&
      expenseDate.getFullYear() === now.getFullYear()
    ) {
      month += Number(expense.amount);
    }
  });

  document.getElementById("todayExpense").innerText = `₹${today}`;

  document.getElementById("weekExpense").innerText = `₹${week}`;

  document.getElementById("monthExpense").innerText = `₹${month}`;

  document.getElementById("totalExpense").innerText = `₹${total}`;
}

// -----------------------------
// Clear Form
// -----------------------------
function clearForm() {
  document.getElementById("expenseTitle").value = "";

  document.getElementById("expenseAmount").value = "";

  document.getElementById("expenseCategory").value = "";

  document.getElementById("expenseDate").value = "";

  document.getElementById("expenseNotes").value = "";
}
