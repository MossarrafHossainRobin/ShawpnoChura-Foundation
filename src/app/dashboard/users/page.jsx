"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import DashboardSidebar from "@/components/DashboardSidebar";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { db } from "@/lib/firebase";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const userList = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setUsers(userList);
    } catch (error) {
      console.error("Users loading error:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950">Users</h1>
          <p className="mt-2 text-slate-500">
            View registered users and their roles.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Total Users"
            value={users.length}
            subtitle="Registered accounts"
            icon="👥"
            variant="blue"
          />

          <StatCard
            title="Admins"
            value={users.filter((user) => user.role === "admin").length}
            subtitle="Admin role"
            icon="🛡️"
            variant="green"
          />

          <StatCard
            title="Accountants"
            value={users.filter((user) => user.role === "accountant").length}
            subtitle="Accounts access"
            icon="📊"
            variant="amber"
          />
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading users...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            emptyMessage="No user found."
          />
        )}
      </main>
    </div>
  );
}