"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser, loginUser, getCurrentUserRole } from "@/lib/auth";
import { isSuperAdminRole } from "@/lib/roles";

export default function AdminAddUserPage() {
  const router = useRouter();
  const [myRole, setMyRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getCurrentUserRole().then((r) => {
      if (r.success) setMyRole(r.role);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const isValidPhone = (p) => /^01[3-9]\d{8}$/.test(p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess("");

    if (!isValidPhone(formData.phone)) {
      setMessage("Enter a valid 11-digit BD number.");
      return;
    }
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    const adminPhone = window.localStorage.getItem("admin_phone");
    const adminPass = window.sessionStorage.getItem("admin_pass");

    const result = await registerUser(
      formData.name,
      formData.phone,
      formData.password,
      formData.role
    );

    if (!result.success) {
      setMessage(result.message || "Failed to create user.");
      setSubmitting(false);
      return;
    }

    setSuccess(
      `User "${formData.name}" (${formData.phone}) created successfully.`
    );

    if (adminPhone && adminPass) await loginUser(adminPhone, adminPass);

    setFormData({ name: "", phone: "", password: "", role: "user" });
    setSubmitting(false);
  };

  const roleOptions = isSuperAdminRole(myRole)
    ? ["user", "volunteer", "accountant", "admin", "super_admin"]
    : ["user", "volunteer", "accountant"];

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">
            Add New User
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create an account with a Bangladesh phone number and password.
          </p>
        </div>
        <Link
          href="/admin/users"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-700"
        >
          Back
        </Link>
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
        {success && (
          <div className="mb-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {success}
          </div>
        )}

        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Md. Nasir Sardar"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Phone Number
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
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-emerald-600"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
        >
          {submitting ? "Creating user..." : "Create User"}
        </button>
      </form>
    </div>
  );
}