"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/admin/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const isValidPhone = (p) => /^01[3-9]\d{8}$/.test(p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!isValidPhone(formData.phone)) {
      setMessage("Enter a valid 11-digit BD number.");
      return;
    }
    setSubmitting(true);

    const result = await loginAdmin(formData.phone, formData.password);

    if (result.success) {
      window.localStorage.setItem("admin_phone", formData.phone);
      window.sessionStorage.setItem("admin_pass", formData.password);
      router.push("/admin");
    } else {
      setMessage(result.message || "Login failed.");
    }
    setSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-xl font-bold text-white">
            S
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Shapnochura Admin
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Sign in with your admin phone number
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {message && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Admin Phone Number
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-emerald-600">
                <span className="border-r border-slate-300 px-3 py-2 text-sm font-semibold text-slate-500">
                  🇧🇩 +880
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01712345678"
                  inputMode="numeric"
                  maxLength={11}
                  required
                  className="w-full rounded-r-lg px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}