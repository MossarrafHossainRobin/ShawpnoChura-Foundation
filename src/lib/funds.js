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

// Add new fund
export async function addFund(fundData) {
  try {
    const docRef = await addDoc(collection(db, "funds"), {
      name: fundData.name,
      type: fundData.type || "general",
      description: fundData.description || "",
      openingBalance: Number(fundData.openingBalance || 0),
      status: fundData.status || "active",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
      message: "Fund added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Get all funds
export async function getFunds() {
  try {
    const q = query(collection(db, "funds"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const funds = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return {
      success: true,
      data: funds,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
}

// Update fund
export async function updateFund(fundId, fundData) {
  try {
    const fundRef = doc(db, "funds", fundId);

    await updateDoc(fundRef, {
      ...fundData,
      openingBalance: Number(fundData.openingBalance || 0),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Fund updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Delete fund
export async function deleteFund(fundId) {
  try {
    await deleteDoc(doc(db, "funds", fundId));

    return {
      success: true,
      message: "Fund deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// Calculate fund summary using donations and expenses
export function calculateFundSummary(fund, donations = [], expenses = []) {
  const fundDonations = donations.filter(
    (donation) =>
      donation.fundId === fund.id && donation.status === "verified"
  );

  const fundExpenses = expenses.filter(
    (expense) =>
      expense.fundId === fund.id &&
      (expense.status === "approved" || expense.status === "paid")
  );

  const totalIncome = fundDonations.reduce(
    (total, donation) => total + Number(donation.amount || 0),
    0
  );

  const totalExpense = fundExpenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  const openingBalance = Number(fund.openingBalance || 0);
  const currentBalance = openingBalance + totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    openingBalance,
    currentBalance,
  };
}

// Calculate all funds summary
export function calculateAllFundsSummary(funds = [], donations = [], expenses = []) {
  return funds.map((fund) => {
    const summary = calculateFundSummary(fund, donations, expenses);

    return {
      ...fund,
      ...summary,
    };
  });
}