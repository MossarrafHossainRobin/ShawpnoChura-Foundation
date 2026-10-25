"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Message submitted. Firebase contact saving can be added later.");
    event.target.reset();
  };

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-emerald-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
              Contact
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Contact Shapnochura Foundation.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Contact us for donation, volunteering, beneficiary support,
              project collaboration, or general information.
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950">
                Get in touch
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-500">Address</p>
                  <p className="mt-1 text-slate-800">Dhaka, Bangladesh</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-500">Phone</p>
                  <p className="mt-1 text-slate-800">+880 1XXX-XXXXXX</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-500">Email</p>
                  <p className="mt-1 text-slate-800">info@shawpnochura.org</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900">
                Send Message
              </h2>

              {message && (
                <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {message}
                </div>
              )}

              <div className="mt-5 grid gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
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

                <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600">
                  <option>General Message</option>
                  <option>Donation Related</option>
                  <option>Volunteer Related</option>
                  <option>Beneficiary Support</option>
                  <option>Project Collaboration</option>
                </select>

                <textarea
                  rows="5"
                  placeholder="Write your message"
                  required
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}