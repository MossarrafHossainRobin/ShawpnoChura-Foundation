"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";
import { getDonations, calculateTotalDonations } from "@/lib/donations";
import { getExpenses, calculateTotalExpenses } from "@/lib/expenses";
import { getFunds, calculateAllFundsSummary } from "@/lib/funds";

function formatCurrency(amount) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export default function ReportsPage() {
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
  const fundSummary = calculateAllFundsSummary(funds, donations, expenses);

  const columns = [
    { key: "name", label: "Fund" },
    {
      key: "totalIncome",
      label: "Income",
      render: (value) => formatCurrency(value),
    },
    {
      key: "totalExpense",
      label: "Expense",
      render: (value) => formatCurrency(value),
    },
    {
      key: "currentBalance",
      label: "Balance",
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">Reports</h1>
          <p className="mt-2 text-slate-500">
            Basic accounts report for donations, expenses, balance, and funds.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading reports...
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              <StatCard
                title="Total Income"
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
                title="Net Balance"
                value={formatCurrency(balance)}
                subtitle="Income minus expense"
                icon="🏦"
                variant="blue"
              />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Income & Expense Statement
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-medium text-slate-600">
                    Total Donation Income
                  </span>
                  <span className="font-bold text-emerald-700">
                    {formatCurrency(totalDonation)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-medium text-slate-600">
                    Total Expenses
                  </span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(totalExpense)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Current Balance
                  </span>
                  <span className="text-xl font-extrabold text-slate-950">
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Fund-wise Report
              </h2>

              <DataTable
                columns={columns}
                data={fundSummary}
                emptyMessage="No fund report found."
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}