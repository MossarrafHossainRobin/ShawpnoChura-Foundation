"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DonationForm from "@/components/DonationForm";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { getDonations, calculateTotalDonations } from "@/lib/donations";

function formatCurrency(amount) {
  return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadDonations() {
    const result = await getDonations();

    if (result.success) {
      setDonations(result.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadDonations();
  }, []);

  const columns = [
    { key: "receiptNo", label: "Receipt" },
    { key: "donorName", label: "Donor" },
    { key: "donorPhone", label: "Phone" },
    {
      key: "amount",
      label: "Amount",
      render: (value) => formatCurrency(value),
    },
    { key: "donationType", label: "Type" },
    { key: "paymentMethod", label: "Method" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">
            Donations
          </h1>
          <p className="mt-2 text-slate-500">
            Add, view, and manage foundation donation records.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Total Verified Donation"
            value={formatCurrency(calculateTotalDonations(donations))}
            subtitle="Only verified donations"
            icon="💝"
            variant="green"
          />

          <StatCard
            title="Total Records"
            value={donations.length}
            subtitle="All donation entries"
            icon="📋"
            variant="blue"
          />

          <StatCard
            title="Pending"
            value={donations.filter((item) => item.status === "pending").length}
            subtitle="Need verification"
            icon="⏳"
            variant="amber"
          />
        </div>

        <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
          <DonationForm onSuccess={loadDonations} />

          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Donation List
            </h2>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Loading donations...
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={donations}
                emptyMessage="No donation found."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}