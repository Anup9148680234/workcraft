import Link from "next/link";
import db from "../lib/db";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import AdSlot from "../components/AdSlot";

export default function Home() {
  const jobs = db
    .prepare(`
      SELECT *
      FROM jobs
      ORDER BY datetime(postedAt) DESC
      LIMIT 6
    `)
    .all();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600">
              Search jobs from multiple sources
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl">
              Find your next opportunity.
              <span className="block text-blue-600">
                Faster.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
              Search thousands of opportunities in one place and discover
              jobs that match what you're looking for.
            </p>

            {/* Search */}
            <form
              action="/jobs"
              className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:flex-row"
            >
              <input
                name="q"
                placeholder="Job title, skills or keywords"
                className="h-12 flex-1 rounded-xl bg-gray-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                name="location"
                placeholder="Location"
                className="h-12 w-full rounded-xl bg-gray-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 sm:w-48"
              />

              <button
                type="submit"
                className="h-12 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Search Jobs
              </button>
            </form>

            {/* Popular searches */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
              <span className="mr-1 text-gray-400">
                Popular:
              </span>

              {[
                "Software Engineer",
                "Frontend Developer",
                "SDET",
                "Data Analyst",
              ].map((search) => (
                <Link
                  key={search}
                  href={`/jobs?q=${encodeURIComponent(search)}`}
                  className="text-gray-600 hover:text-blue-600"
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Advertisement */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <AdSlot type="banner" />
      </div>

      {/* Latest Jobs */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              LATEST OPPORTUNITIES
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
              Recently added jobs
            </h2>
          </div>

          <Link
            href="/jobs"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all jobs →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-950">
            Stop searching everywhere.
          </h2>

          <p className="mt-3 text-gray-500">
            Find relevant opportunities from multiple job sources in one place.
          </p>

          <Link
            href="/jobs"
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Explore Jobs
          </Link>
        </div>
      </section>
    </main>
  );
}