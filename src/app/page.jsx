import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const impactStats = [
  {
    value: "1,200+",
    label: "People Supported",
  },
  {
    value: "35+",
    label: "Active Volunteers",
  },
  {
    value: "20+",
    label: "Completed Programs",
  },
  {
    value: "৳2.5L+",
    label: "Support Managed",
  },
];

const focusAreas = [
  {
    title: "Food Support",
    description:
      "Providing food packages and emergency meals for families in need.",
    icon: "🍚",
  },
  {
    title: "Medical Help",
    description:
      "Supporting vulnerable people with urgent medical treatment and medicine.",
    icon: "🏥",
  },
  {
    title: "Education Support",
    description:
      "Helping students with books, fees, learning materials, and guidance.",
    icon: "📚",
  },
];

const campaigns = [
  {
    title: "Emergency Relief Support",
    description:
      "Help families affected by crisis with food, medicine, and daily essentials.",
    amount: "৳50,000",
  },
  {
    title: "Education for Children",
    description:
      "Support underprivileged students with education materials and tuition help.",
    amount: "৳35,000",
  },
  {
    title: "Medical Aid Fund",
    description:
      "Contribute to urgent medical support for low-income patients.",
    amount: "৳75,000",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                A helping foundation for humanity
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Together we can bring hope to people in need.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Shapnochura Foundation works for food support, medical help,
                education support, emergency relief, and transparent community
                welfare activities.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donate"
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Donate Now
                </Link>

                <Link
                  href="/projects"
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-700"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl">
              <div className="rounded-2xl bg-slate-100 p-8">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-700 text-4xl text-white">
                  🤝
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Transparent Donation & Accounts System
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Every donation, expense, and fund balance will be tracked
                  through a digital accounts dashboard to build trust and
                  accountability.
                </p>

                <div className="mt-6 rounded-xl bg-white p-4">
                  <p className="text-sm font-semibold text-slate-500">
                    Current Focus
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-700">
                    Donation • Expense • Fund Balance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 p-5 text-center"
              >
                <h3 className="text-3xl font-extrabold text-emerald-700">
                  {stat.value}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                What We Do
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
                Our Main Support Areas
              </h2>
              <p className="mt-4 text-slate-600">
                We focus on practical help that directly supports people and
                families during difficult situations.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {focusAreas.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                  Current Campaigns
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">
                  Support Active Programs
                </h2>
              </div>

              <Link
                href="/projects"
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-700"
              >
                View All Projects
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    {campaign.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {campaign.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Target Amount
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                      {campaign.amount}
                    </p>
                  </div>

                  <Link
                    href="/donate"
                    className="mt-5 inline-flex rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                  >
                    Donate
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-emerald-700 py-16 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <h2 className="text-3xl font-extrabold">
                Want to become a volunteer?
              </h2>
              <p className="mt-3 max-w-2xl text-emerald-50">
                Join Shapnochura Foundation and help us serve people with care,
                honesty, and responsibility.
              </p>
            </div>

            <Link
              href="/volunteer"
              className="rounded-xl bg-white px-6 py-3 text-center text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              Join as Volunteer
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}