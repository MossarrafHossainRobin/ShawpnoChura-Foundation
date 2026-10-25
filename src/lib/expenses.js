import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

// Generate simple expense voucher number
function generateVoucherNo() {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `EXP-${year}-${randomNumber}`;
}

// Add new expense
export async function addExpense(expenseData) {
  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      title: expenseData.title,
      category: expenseData.category,
      amount: Number(expenseData.amount),
      fundId: expenseData.fundId,
      paymentMethod: expenseData.paymentMethod,
      status: expenseData.status || "pending",
      voucherNo: generateVoucherNo(),
      date: expenseData.date || new Date().toISOString().split("T")[0],
      note: expenseData.note || "",
      addedBy: expenseData.addedBy || "",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      message: "Expense added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Get all expenses
export async function getExpenses() {
  try {
    const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const expenses = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return {
      success: true,
      data: expenses,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
}

// Update expense
export async function updateExpense(expenseId, expenseData) {
  try {
    const expenseRef = doc(db, "expenses", expenseId);

    await updateDoc(expenseRef, {
      ...expenseData,
      amount: Number(expenseData.amount),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Expense updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Update expense status
export async function updateExpenseStatus(expenseId, status) {
  try {
    const expenseRef = doc(db, "expenses", expenseId);

    await updateDoc(expenseRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Expense status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Delete expense
export async function deleteExpense(expenseId) {
  try {
    await deleteDoc(doc(db, "expenses", expenseId));

    return {
      success: true,
      message: "Expense deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Calculate total paid/approved expenses
export function calculateTotalExpenses(expenses = []) {
  return expenses.reduce((total, expense) => {
    if (expense.status === "approved" || expense.status === "paid") {
      return total + Number(expense.amount || 0);
    }

    return total;
  }, 0);
}