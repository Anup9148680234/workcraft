import db from "../../lib/db";
import { fetchJobs } from "../../lib/jobs";
import { normalizeJob } from "../../lib/normalizeJob";

import Navbar from "../../components/Navbar";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";
import JobFilters from "../../components/JobFilters";
import AdSlot from "../../components/AdSlot";

async function importJobs(query) {
  try {
    const apiJobs = await fetchJobs(query);

    if (!apiJobs.length) {
      return;
    }

    const insert = db.prepare(`
      INSERT INTO jobs (
        externalId,
        source,
        title,
        company,
        location,
        salary,
        description,
        url,
        employmentType,
        remoteType,
        experience,
        postedAt
      )
      VALUES (
        @externalId,
        @source,
        @title,
        @company,
        @location,
        @salary,
        @description,
        @url,
        @employmentType,
        @remoteType,
        @experience,
        @postedAt
      )
      ON CONFLICT(source, externalId)
      DO UPDATE SET
        title = excluded.title,
        company = excluded.company,
        location = excluded.location,
        salary = excluded.salary,
        description = excluded.description,
        url = excluded.url,
        updatedAt = CURRENT_TIMESTAMP
    `);

    const transaction = db.transaction((jobs) => {
      for (const job of jobs) {
        insert.run(normalizeJob(job));
      }
    });

    transaction(apiJobs);
  } catch (error) {
    console.error("Job import failed:", error);
  }
}

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;

  const query = params?.q || "";
  const location = params?.location || "";
  const remote = params?.remote || "";
  const experience = params?.experience || "";
  const source = params?.source || "";
  const sort = params?.sort || "newest";

  /*
   * Import fresh jobs when the user searches.
   */
  await importJobs(query);

  let sql = `
    SELECT *
    FROM jobs
    WHERE 1 = 1
  `;

  const values = {};

  if (query) {
    sql += `
      AND (
        title LIKE @query
        OR company LIKE @query
        OR description LIKE @query
      )
    `;

    values.query = `%${query}%`;
  }

  if (location) {
    sql += ` AND location LIKE @location`;
    values.location = `%${location}%`;
  }

  if (remote) {
    sql += ` AND remoteType = @remote`;
    values.remote = remote;
  }

  if (experience) {
    sql += ` AND experience LIKE @experience`;
    values.experience = `%${experience}%`;
  }

  if (source) {
    sql += ` AND source = @source`;
    values.source = source;
  }

  if (sort === "newest") {
    sql += ` ORDER BY datetime(postedAt) DESC`;
  } else {
    sql += ` ORDER BY title ASC`;
  }

  sql += ` LIMIT 50`;

  const jobs = db.prepare(sql).all(values);

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

                <select
                  name="sort"
                  defaultValue={sort}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="newest">
                    Newest
                  </option>

                  <option value="relevance">
                    Relevance
                  </option>
                </select>

                <button className="ml-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white">
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