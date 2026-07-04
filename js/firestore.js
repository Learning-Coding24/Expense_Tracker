// ======================================
// Firestore Service
// All Firestore operations
// ======================================

const FirestoreService = {
  // -----------------------------
  // Save Expense
  // -----------------------------
  async saveExpense(expense) {
    if (!AppState.currentUser) {
      throw new Error("User not logged in.");
    }

    return await db
      .collection(COLLECTIONS.USERS)
      .doc(AppState.currentUser.uid)
      .collection(COLLECTIONS.EXPENSES)
      .add({
        ...expense,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  },

  // -----------------------------
  // Load Expenses
  // -----------------------------
  async getExpenses() {
    if (!AppState.currentUser) return [];

    const snapshot = await db
      .collection(COLLECTIONS.USERS)
      .doc(AppState.currentUser.uid)
      .collection(COLLECTIONS.EXPENSES)
      .orderBy("date", "desc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // -----------------------------
  // Delete Expense
  // -----------------------------
  async deleteExpense(id) {
    if (!AppState.currentUser) {
      throw new Error("User not logged in.");
    }

    await db
      .collection(COLLECTIONS.USERS)
      .doc(AppState.currentUser.uid)
      .collection(COLLECTIONS.EXPENSES)
      .doc(id)
      .delete();
  },

  // -----------------------------
  // Update Expense
  // -----------------------------
  async updateExpense(id, expense) {
    if (!AppState.currentUser) {
      throw new Error("User not logged in.");
    }

    await db
      .collection(COLLECTIONS.USERS)
      .doc(AppState.currentUser.uid)
      .collection(COLLECTIONS.EXPENSES)
      .doc(id)
      .update({
        ...expense,
      });
  },
};
