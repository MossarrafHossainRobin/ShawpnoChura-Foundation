"use client";

import Link from "next/link";

const cards = [
  { label: "Total Users", value: "—", href: "/admin/users", color: "emerald" },
  { label: "Donations", value: "—", href: "/admin/donations", color: "blue" },
  { label: "Expenses", value: "—", href: "/admin/expenses", color: "amber" },
  { label: "Reports", value: "—", href: "/admin/reports", color: "purple" },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-950">
        Admin Overview
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage users, donations, expenses and reports of Shapnochura Foundation.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-600"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {c.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-950">
              {c.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/users/add"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
          >
            ➕ Add New User
          </Link>
          <Link
            href="/admin/users"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-700"
          >
            👥 View All Users
          </Link>
        </div>
      </div>
    </div>
  );
}