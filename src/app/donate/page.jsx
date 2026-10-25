import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const values = [
  {
    title: "Transparency",
    description:
      "We believe every donation and expense should be recorded clearly and responsibly.",
    icon: "📊",
  },
  {
    title: "Humanity",
    description:
      "Our work focuses on helping people with respect, care, and compassion.",
    icon: "🤝",
  },
  {
    title: "Accountability",
    description:
      "We want to build a foundation where funds, projects, and activities are properly managed.",
    icon: "✅",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-emerald-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                About Us
              </p>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Shapnochura Foundation is built to serve people with honesty and
                care.
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Shapnochura Foundation is a non-profit helping organization
                focused on food support, medical help, education support,
                emergency relief, and community welfare. Our mission is to
                support vulnerable people through organized, transparent, and
                accountable work.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                To bring support, hope, and dignity to people in need.
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Our mission is to help people during difficult times through
                food distribution, medical assistance, education support, and
                emergency relief. We want to make every support activity
                organized, trackable, and meaningful.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                Our Vision
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                A trusted foundation where every donation creates real impact.
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Our vision is to create a transparent non-profit platform where
                donors can trust how their money is used and where beneficiaries
                receive support with fairness, dignity, and proper management.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                Our Values
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                What guides our foundation
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
                    {value.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-950">
              Help us build a better support system.
            </h2>

            <p className="mt-4 text-slate-600">
              Your donation, time, or support can help us reach more people and
              manage every activity with transparency.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Donate Now
              </Link>

              <Link
                href="/volunteer"
                className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-700"
              >
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}