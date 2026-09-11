import {
  getJobs,
} from "../../lib/jobs.js";

import Navbar from "../../components/Navbar.js";
import JobCard from "../../components/JobCard.js";
import SearchBar from "../../components/SearchBar.js";
import JobFilters from "../../components/JobFilters.js";
import AdSlot from "../../components/AdSlot.js";

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;

  const query = params?.q || "";
  const location = params?.location || "";
  const remote = params?.remote || "";
  const experience = params?.experience || "";
  const source = params?.source || "";
  const sort = params?.sort || "newest";

  const jobs = await getJobs({
    search: query,
    location,
    remote,
    limit: 50,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">

        <SearchBar
          query={query}
          location={location}
        />

        <div className="my-6">
          <AdSlot type="banner" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)_260px]">

          {/* Filters */}

          <div className="hidden lg:block">
            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5">
              <JobFilters />
            </div>
          </div>

          {/* Results */}

          <section>

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h1 className="text-xl font-bold text-gray-950">
                  {query
                    ? `Jobs for "${query}"`
                    : "Latest Jobs"}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {jobs.length} opportunities found
                </p>
              </div>

              <form action="/jobs">

                {query && (
                  <input
                    type="hidden"
                    name="q"
                    value={query}
                  />
                )}

                {location && (
                  <input
                    type="hidden"
                    name="location"
                    value={location}
                  />
                )}

                {remote && (
                  <input
                    type="hidden"
                    name="remote"
                    value={remote}
                  />
                )}

                <select
                  name="sort"
                  defaultValue={sort}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
                >
                  <option value="newest">
                    Newest
                  </option>

                  <option value="relevance">
                    Relevance
                  </option>
                </select>

                <button
                  type="submit"
                  className="ml-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Sort
                </button>

              </form>

            </div>

            {jobs.length === 0 ? (

              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                <h2 className="font-semibold text-gray-900">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {jobs.map((job, index) => (

                  <div key={job.id}>

                    <JobCard job={job} />

                    {index === 1 && (
                      <div className="my-4">
                        <AdSlot type="feed" />
                      </div>
                    )}

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* Sidebar */}

          <aside className="hidden lg:block">

            <div className="sticky top-6 space-y-5">

              <AdSlot type="sidebar" />

              <div className="rounded-2xl border border-gray-200 bg-white p-5">

                <p className="text-sm font-semibold text-gray-900">
                  Search smarter
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Search by job title, skills, company or
                  location to find relevant opportunities.
                </p>

              </div>

              <AdSlot type="sidebar" />

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}