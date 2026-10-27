"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser, loginUser, getCurrentUserRole } from "@/lib/auth";
import { isSuperAdminRole } from "@/lib/roles";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function AdminAddUserPage() {
  const router = useRouter();
  const [myRole, setMyRole] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "user",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    nid: "",
    occupation: "",
    address: "",
    district: "",
    emergencyContact: "",
    joiningDate: "",
    notes: "",
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

    if (!formData.name.trim()) {
      setMessage("Full name is required.");
      return;
    }
    if (!isValidPhone(formData.phone)) {
      setMessage("Enter a valid 11-digit BD number (e.g. 01712345678).");
      return;
    }
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    const adminPhone = window.localStorage.getItem("admin_phone");
    const adminPass = window.sessionStorage.getItem("admin_pass");

    const { name, phone, password, role, ...extra } = formData;

    const result = await registerUser(name, phone, password, role, extra);

    if (!result.success) {
      setMessage(result.message || "Failed to create user.");
      setSubmitting(false);
      return;
    }

    setSuccess(`User "${name}" (${phone}) registered successfully.`);

    // Restore the admin session (creating a user kicks us out)
    if (adminPhone && adminPass) await loginUser(adminPhone, adminPass);

    // Reset the form
    setFormData({
      name: "",
      phone: "",
      password: "",
      role: "user",
      fatherName: "",
      motherName: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      nid: "",
      occupation: "",
      address: "",
      district: "",
      emergencyContact: "",
      joiningDate: "",
      notes: "",
    });
    setSubmitting(false);
  };

  const roleOptions = isSuperAdminRole(myRole)
    ? ["user", "volunteer", "accountant", "admin", "super_admin"]
    : ["user", "volunteer", "accountant"];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">
            Register New User
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create an account and fill in the full profile for this member.
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

        {/* ---- ACCOUNT SECTION ---- */}
        <Section title="Account Information">
          <Field label="Full Name" required>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Md. Nasir Sardar"
              className="input"
            />
          </Field>

          <Field label="Phone Number" required>
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
          </Field>

          <Field label="Password" required>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="input"
            />
          </Field>

          <Field label="Role">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input capitalize"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>
          </Field>
        </Section>

        {/* ---- PERSONAL SECTION ---- */}
        <Section title="Personal Information">
          <Field label="Father's Name">
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Mother's Name">
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Date of Birth">
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Gender">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>

          <Field label="Blood Group">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select…</option>
              {BLOOD_GROUPS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          <Field label="NID Number">
            <input
              type="text"
              name="nid"
              value={formData.nid}
              onChange={handleChange}
              placeholder="10 or 17 digits"
              className="input"
            />
          </Field>

          <Field label="Occupation">
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g. Teacher, Student, Farmer"
              className="input"
            />
          </Field>
        </Section>

        {/* ---- ADDRESS SECTION ---- */}
        <Section title="Address & Contact">
          <Field label="Address" className="sm:col-span-2">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Village / Road / House"
              className="input"
            />
          </Field>

          <Field label="District">
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Feni"
              className="input"
            />
          </Field>

          <Field label="Emergency Contact">
            <input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              maxLength={11}
              className="input"
            />
          </Field>
        </Section>

        {/* ---- MEMBERSHIP SECTION ---- */}
        <Section title="Membership">
          <Field label="Joining Date">
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="input"
            />
          </Field>

          <Field label="Notes" className="sm:col-span-2">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any extra information about this member"
              className="input"
            />
          </Field>
        </Section>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
        >
          {submitting ? "Registering..." : "Register User"}
        </button>
      </form>
    </div>
  );
}

// ---- Small helper components (keep at the bottom of the same file) ----
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-emerald-700">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, required, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}