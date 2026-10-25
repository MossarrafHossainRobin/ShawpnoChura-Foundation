"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VolunteerPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(
      "Volunteer request submitted. Firebase saving system can be added later."
    );
    event.target.reset();
  };

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-emerald-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
              Volunteer
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Join Shapnochura Foundation as a volunteer.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Volunteers are the heart of our foundation. Join us to help in
              food distribution, medical support, education programs, and
              emergency relief activities.
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950">
                Why become a volunteer?
              </h2>

              <div className="mt-6 space-y-4">
                {[
                  "Help people directly in your community.",
                  "Work with a transparent foundation system.",
                  "Support campaigns, projects, and field activities.",
                  "Build responsibility, leadership, and teamwork skills.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
                  >
                    ✅ {item}
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900">
                Volunteer Registration
              </h2>

              {message && (
                <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {message}
                </div>
              )}

              <div className="mt-5 grid gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                <input
                  type="text"
                  placeholder="Area / Location"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                <select
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                >
                  <option value="">Select Interest Area</option>
                  <option>Food Distribution</option>
                  <option>Medical Support</option>
                  <option>Education Support</option>
                  <option>Emergency Relief</option>
                  <option>Accounts / Admin Help</option>
                </select>

                <textarea
                  rows="4"
                  placeholder="Tell us why you want to join"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Submit Application
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}