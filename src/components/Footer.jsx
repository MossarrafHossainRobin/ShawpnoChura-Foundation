import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
                S
              </div>

              <div>
                <h2 className="text-lg font-bold">Shapnochura Foundation</h2>
                <p className="text-sm text-slate-400">
                  A helping foundation for humanity.
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-300">
              Shapnochura Foundation works to support people through education,
              medical help, food support, emergency relief, and community-based
              welfare projects.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link href="/about" className="hover:text-emerald-400">
                About
              </Link>
              <Link href="/projects" className="hover:text-emerald-400">
                Projects
              </Link>
              <Link href="/donate" className="hover:text-emerald-400">
                Donate
              </Link>
              <Link href="/transparency" className="hover:text-emerald-400">
                Transparency
              </Link>
              <Link href="/volunteer" className="hover:text-emerald-400">
                Volunteer
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-slate-400">
              <p>Dhaka, Bangladesh</p>
              <p>Email: info@shawpnochura.org</p>
              <p>Phone: +880 1XXX-XXXXXX</p>
            </div>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Shapnochura Foundation. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/donate" className="hover:text-emerald-400">
              Donate
            </Link>
            <Link href="/login" className="hover:text-emerald-400">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}