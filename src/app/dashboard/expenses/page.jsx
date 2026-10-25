"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import ExpenseForm from "@/components/ExpenseForm";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { getExpenses, calculateTotalExpenses } from "@/lib/expenses";

function formatCurrency(amount) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadExpenses() {
    const result = await getExpenses();

    if (result.success) {
      setExpenses(result.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const columns = [
    { key: "voucherNo", label: "Voucher" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "amount",
      label: "Amount",
      render: (value) => formatCurrency(value),
    },
    { key: "paymentMethod", label: "Method" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">Expenses</h1>
          <p className="mt-2 text-slate-500">
            Add, view, and manage foundation expenses.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Total Expense"
            value={formatCurrency(calculateTotalExpenses(expenses))}
            subtitle="Approved or paid"
            icon="💸"
            variant="red"
          />

          <StatCard
            title="Total Records"
            value={expenses.length}
            subtitle="All expense entries"
            icon="📋"
            variant="blue"
          />

          <StatCard
            title="Pending"
            value={expenses.filter((item) => item.status === "pending").length}
            subtitle="Need approval"
            icon="⏳"
            variant="amber"
          />
        </div>

        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
          <ExpenseForm onSuccess={loadExpenses} />

          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Expense List
            </h2>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Loading expenses...
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={expenses}
                emptyMessage="No expense found."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}