"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { addFund, getFunds, calculateAllFundsSummary } from "@/lib/funds";
import { getDonations } from "@/lib/donations";
import { getExpenses } from "@/lib/expenses";

function formatCurrency(amount) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export default function FundsPage() {
  const [funds, setFunds] = useState([]);
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "general",
    openingBalance: "",
    description: "",
  });

  async function loadData() {
    const fundResult = await getFunds();
    const donationResult = await getDonations();
    const expenseResult = await getExpenses();

    if (fundResult.success) setFunds(fundResult.data);
    if (donationResult.success) setDonations(donationResult.data);
    if (expenseResult.success) setExpenses(expenseResult.data);

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!formData.name) {
      setMessage("Please enter fund name.");
      return;
    }

    setSubmitting(true);

    const result = await addFund(formData);

    if (result.success) {
      setMessage("Fund added successfully.");
      setFormData({
        name: "",
        type: "general",
        openingBalance: "",
        description: "",
      });
      loadData();
    } else {
      setMessage(result.message || "Something went wrong.");
    }

    setSubmitting(false);
  };

  const fundSummary = calculateAllFundsSummary(funds, donations, expenses);
  const totalBalance = fundSummary.reduce(
    (total, fund) => total + Number(fund.currentBalance || 0),
    0
  );

  const columns = [
    { key: "name", label: "Fund Name" },
    { key: "type", label: "Type" },
    {
      key: "openingBalance",
      label: "Opening",
      render: (value) => formatCurrency(value),
    },
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
    { key: "status", label: "Status" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">Funds</h1>
          <p className="mt-2 text-slate-500">
            Create funds and track fund-wise donation, expense, and balance.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Total Funds"
            value={funds.length}
            subtitle="Active and inactive"
            icon="🏦"
            variant="blue"
          />

          <StatCard
            title="Total Fund Balance"
            value={formatCurrency(totalBalance)}
            subtitle="All funds combined"
            icon="💰"
            variant="green"
          />

          <StatCard
            title="Donation Records"
            value={donations.length}
            subtitle="Connected with funds"
            icon="💝"
            variant="amber"
          />
        </div>

        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-900">Add Fund</h2>

            {message && (
              <div className="mt-4 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
                {message}
              </div>
            )}

            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Fund Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: General Fund"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Fund Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                >
                  <option value="general">General</option>
                  <option value="restricted">Restricted</option>
                  <option value="project">Project</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Opening Balance
                </label>
                <input
                  type="number"
                  name="openingBalance"
                  value={formData.openingBalance}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Fund"}
            </button>
          </form>

          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Fund Summary
            </h2>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Loading funds...
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={fundSummary}
                emptyMessage="No fund found. Add your first fund."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}