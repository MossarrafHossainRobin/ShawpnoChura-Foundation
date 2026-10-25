"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logoutUser, getUserData } from "@/lib/auth";
import { isAdminRole, can } from "@/lib/roles";

const navItems = [
  { href: "/admin", label: "Overview", icon: "🏠", resource: null },
  { href: "/admin/users", label: "Users", icon: "👥", resource: "users", action: "read" },
  { href: "/admin/users/add", label: "Add User", icon: "➕", resource: "users", action: "create" },
  { href: "/admin/donations", label: "Donations", icon: "💰", resource: "donations", action: "read" },
  { href: "/admin/expenses", label: "Expenses", icon: "🧾", resource: "expenses", action: "read" },
  { href: "/admin/funds", label: "Funds", icon: "🏦", resource: "funds", action: "read" },
  { href: "/admin/reports", label: "Reports", icon: "📊", resource: "reports", action: "read" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);
  const [noDoc, setNoDoc] = useState(false);
  const resolvedRef = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      resolvedRef.current = false;
      setUser(u);

      if (!u) {
        setChecking(false);
        setRole(null);
        setNoDoc(false);
        if (pathname !== "/admin/login") router.replace("/admin/login");
        return;
      }

      const res = await getUserData(u.uid);
      const userRole = res.success ? res.data.role : null;
      setRole(userRole);
      setNoDoc(!res.success);
      setChecking(false);
      resolvedRef.current = true;

      // If on login page but already authenticated as admin, go to dashboard.
      // If authenticated but NOT admin, stay on login (or show error) — do NOT bounce.
      if (pathname === "/admin/login") {
        if (isAdminRole(userRole)) {
          router.replace("/admin");
        }
        return;
      }

      // Protected pages: if not admin (or no doc), go to login
      if (!isAdminRole(userRole)) {
        router.replace("/admin/login");
      }
    });
    return () => unsub();
  }, [pathname, router]);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50">
        <p className="text-sm font-semibold text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  // Authenticated but has no admin role → show a clear message instead of looping
  if (!isAdminRole(role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <p className="text-lg font-bold text-red-700">Access Denied</p>
          <p className="mt-2 text-sm text-slate-600">
            {noDoc
              ? "Your account has no Firestore user document, or it is missing the 'role' field."
              : "Your account does not have admin access."}
          </p>
          <button
            onClick={handleLogout}
            className="mt-5 w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const visibleNav = navItems.filter(
    (item) => !item.resource || can(role, item.resource, item.action || "read")
  );

  return (
    <div className="flex min-h-screen bg-emerald-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-lg font-bold text-white">
            S
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Shapnochura</p>
            <p className="text-xs text-slate-500">
              {role === "super_admin" ? "Super Admin" : "Admin Panel"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {visibleNav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-emerald-700 text-white"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 px-3 py-4">
          <p className="mb-1 truncate px-2 text-xs font-semibold capitalize text-slate-700">
            {role?.replace("_", " ") || "unknown"}
          </p>
          <p className="mb-2 truncate px-2 text-xs text-slate-500">
            {user.email?.replace("@shapnochura.local", "") || user.displayName}
          </p>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <p className="text-sm font-bold text-slate-900">Shapnochura Admin</p>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}