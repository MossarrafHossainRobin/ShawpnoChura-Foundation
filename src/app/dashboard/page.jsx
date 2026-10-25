"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";
import { getDonations, calculateTotalDonations } from "@/lib/donations";
import { getExpenses, calculateTotalExpenses } from "@/lib/expenses";
import { getFunds } from "@/lib/funds";

function formatCurrency(amount) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export default function DashboardPage() {
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const donationResult = await getDonations();
    const expenseResult = await getExpenses();
    const fundResult = await getFunds();

    if (donationResult.success) setDonations(donationResult.data);
    if (expenseResult.success) setExpenses(expenseResult.data);
    if (fundResult.success) setFunds(fundResult.data);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const totalDonation = calculateTotalDonations(donations);
  const totalExpense = calculateTotalExpenses(expenses);
  const balance = totalDonation - totalExpense;
  const pendingExpenses = expenses.filter(
    (expense) => expense.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-slate-500">
            Summary of donations, expenses, funds, and foundation accounts.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Donation"
                value={formatCurrency(totalDonation)}
                subtitle="Verified donations"
                icon="💝"
                variant="green"
              />

              <StatCard
                title="Total Expense"
                value={formatCurrency(totalExpense)}
                subtitle="Approved or paid"
                icon="💸"
                variant="red"
              />

              <StatCard
                title="Current Balance"
                value={formatCurrency(balance)}
                subtitle="Donation minus expense"
                icon="🏦"
                variant="blue"
              />

              <StatCard
                title="Pending Expenses"
                value={pendingExpenses}
                subtitle="Need review"
                icon="⏳"
                variant="amber"
              />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  System Status
                </h2>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>✅ Donations module ready</p>
                  <p>✅ Expenses module ready</p>
                  <p>✅ Funds module ready</p>
                  <p>✅ Reports module basic version ready</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Records Summary
                </h2>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <p>Total donation records: {donations.length}</p>
                  <p>Total expense records: {expenses.length}</p>
                  <p>Total funds: {funds.length}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}