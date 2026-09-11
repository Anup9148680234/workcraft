import { getJobs } from "../lib/jobs.js";

import Navbar from "../components/Navbar.js";
import JobCard from "../components/JobCard.js";
import SearchBar from "../components/SearchBar.js";
import AdSlot from "../components/AdSlot.js";

export default async function Home() {
  const jobs = await getJobs({
    limit: 10,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-semibold text-gray-500">
              WORKCRAFT
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Find your next job.
              <br />
              Without the endless searching.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Search jobs from multiple sources in one place.
            </p>

          </div>

          <div className="mt-8 max-w-4xl">
            <SearchBar />
          </div>

        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Top Advertisement */}

        <AdSlot type="banner" />

        {/* Latest Jobs */}

        <section className="mt-10">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-950">
                Latest Jobs
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Fresh opportunities from our job database.
              </p>
            </div>

            <a
              href="/jobs"
              className="text-sm font-semibold text-gray-900 hover:underline"
            >
              View all jobs →
            </a>

          </div>

          {jobs.length === 0 ? (

            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <p className="text-sm text-gray-500">
                No jobs available yet.
              </p>
            </div>

          ) : (

            <div className="grid gap-4">

              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}

            </div>

          )}

        </section>

        {/* In-feed Advertisement */}

        <div className="my-8">
          <AdSlot type="feed" />
        </div>

      </div>
    </main>
  );
}