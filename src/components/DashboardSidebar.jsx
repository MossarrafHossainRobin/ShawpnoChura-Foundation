"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

const menuItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Donations",
    href: "/dashboard/donations",
    icon: "💝",
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
    icon: "💸",
  },
  {
    name: "Funds",
    href: "/dashboard/funds",
    icon: "🏦",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: "📄",
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: "👥",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result.success) {
      router.push("/login");
    }
  };

  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-slate-200 bg-white lg:w-72">
      <div className="border-b border-slate-200 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-lg font-bold text-white">
            S
          </div>

          <div>
            <h2 className="text-lg font-bold leading-5 text-slate-900">
              Shapnochura
            </h2>
            <p className="text-xs font-medium text-slate-500">
              Admin Dashboard
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-5">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActive(item.href)
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <Link
          href="/"
          className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="text-lg">🌐</span>
          <span>View Website</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}