"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Bangladesh mobile: 11 digits, starts with 013–019
  const isValidPhone = (phone) => /^01[3-9]\d{8}$/.test(phone);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!isValidPhone(formData.phone)) {
      setMessage("Enter a valid 11-digit BD number (e.g. 01712345678).");
      return;
    }

    setSubmitting(true);

    const result = await loginUser(formData.phone, formData.password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setMessage(result.message || "Login failed.");
    }

    setSubmitting(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-xl font-bold text-white">
              S
            </div>

            <div className="text-left">
              <h1 className="text-xl font-bold leading-5 text-slate-900">
                Shapnochura
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Foundation Dashboard
              </p>
            </div>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-extrabold text-slate-950">
            Admin Login
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Login with your Bangladesh phone number and password to manage
            donations, expenses, funds, and reports.
          </p>

          {message && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <div className="mt-6 grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-emerald-600">
                <span className="flex items-center gap-1 border-r border-slate-300 px-3 py-2 text-sm font-semibold text-slate-500">
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
              <p className="mt-1 text-xs text-slate-400">
                Enter the 11-digit number without +880.
              </p>
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
                placeholder="••••••••"
                required
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

          <Link
            href="/"
            className="mt-5 block text-center text-sm font-semibold text-slate-500 hover:text-emerald-700"
          >
            Back to Website
          </Link>
        </form>
      </div>
    </main>
  );
}