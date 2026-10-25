"use client";

import { useEffect, useState } from "react";
import { addExpense } from "@/lib/expenses";
import { getFunds } from "@/lib/funds";
import { useAuth } from "@/context/AuthContext";

const expenseCategories = [
  "Food Distribution",
  "Medical Support",
  "Education Support",
  "Emergency Relief",
  "Orphan Support",
  "Transport",
  "Event Cost",
  "Office Expense",
  "Volunteer Cost",
  "Printing",
  "Website / Software Cost",
  "Other",
];

const paymentMethods = [
  "Cash",
  "bKash",
  "Nagad",
  "Rocket",
  "Bank Transfer",
  "Card",
  "Other",
];

export default function ExpenseForm({ onSuccess }) {
  const { user } = useAuth();

  const [funds, setFunds] = useState([]);
  const [loadingFunds, setLoadingFunds] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Food Distribution",
    amount: "",
    fundId: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
    status: "pending",
    note: "",
  });

  useEffect(() => {
    async function loadFunds() {
      const result = await getFunds();

      if (result.success) {
        setFunds(result.data);

        if (result.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            fundId: result.data[0].id,
          }));
        }
      }

      setLoadingFunds(false);
    }

    loadFunds();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Food Distribution",
      amount: "",
      fundId: funds.length > 0 ? funds[0].id : "",
      paymentMethod: "Cash",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      note: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!formData.title || !formData.amount || !formData.fundId) {
      setMessage("Please fill expense title, amount, and fund.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setMessage("Expense amount must be greater than 0.");
      return;
    }

    setSubmitting(true);

    const result = await addExpense({
      ...formData,
      addedBy: user?.uid || "",
    });

    if (result.success) {
      setMessage("Expense added successfully.");
      resetForm();

      if (onSuccess) {
        onSuccess();
      }
    } else {
      setMessage(result.message || "Something went wrong.");
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Add Expense</h2>
        <p className="mt-1 text-sm text-slate-500">
          Record a new expense for foundation activities.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Expense Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: Food package purchase"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          >
            {expenseCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Fund
          </label>
          <select
            name="fundId"
            value={formData.fundId}
            onChange={handleChange}
            disabled={loadingFunds}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          >
            {loadingFunds && <option>Loading funds...</option>}

            {!loadingFunds && funds.length === 0 && (
              <option value="">No fund found</option>
            )}

            {!loadingFunds &&
              funds.map((fund) => (
                <option key={fund.id} value={fund.id}>
                  {fund.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Note
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            placeholder="Optional note"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || loadingFunds || funds.length === 0}
        className="mt-5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save Expense"}
      </button>
    </form>
  );
}