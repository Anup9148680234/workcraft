import Link from "next/link";
import { notFound } from "next/navigation";
import db from "../../../lib/db";
import Navbar from "../../../components/Navbar";
import AdSlot from "../../../components/AdSlot";
import JobCard from "../../../components/JobCard";

export default async function JobPage({ params }) {
  const { id } = await params;

  const job = db
    .prepare("SELECT * FROM jobs WHERE id = ?")
    .get(id);

  if (!job) {
    notFound();
  }

  const relatedJobs = db
    .prepare(`
      SELECT *
      FROM jobs
      WHERE id != ?
      AND (
        company = ?
        OR title LIKE ?
      )
      ORDER BY datetime(postedAt) DESC
      LIMIT 3
    `)
    .all(id, job.company, `%${job.title.split(" ")[0]}%`);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Top Advertisement */}
        <AdSlot type="banner" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* Main Content */}
          <div>

            {/* Job Header */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7">

              <div className="flex flex-wrap items-start justify-between gap-5">

                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {job.source}
                  </span>

                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-950">
                    {job.title}
                  </h1>

                  <p className="mt-2 text-lg font-medium text-gray-700">
                    {job.company}
                  </p>
                </div>

                <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Save Job
                </button>

              </div>

              {/* Job Meta */}
              <div className="mt-6 flex flex-wrap gap-3">

                {job.location && (
                  <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                    📍 {job.location}
                  </span>
                )}

                {job.remoteType && (
                  <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                    💻 {job.remoteType}
                  </span>
                )}

                {job.employmentType && (
                  <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                    💼 {job.employmentType}
                  </span>
                )}

                {job.experience && (
                  <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                    👤 {job.experience}
                  </span>
                )}

              </div>

              {job.salary && (
                <div className="mt-5 text-sm font-semibold text-gray-900">
                  💰 {job.salary}
                </div>
              )}

              {job.postedAt && (
                <p className="mt-3 text-sm text-gray-400">
                  Posted{" "}
                  {new Date(job.postedAt).toLocaleDateString()}
                </p>
              )}

            </div>

            {/* Apply CTA */}
            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">

              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Interested in this opportunity?
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Continue to the original job listing to apply.
                  </p>
                </div>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Apply on {job.source} →
                </a>

              </div>

            </div>

            {/* Advertisement */}
            <div className="my-6">
              <AdSlot type="content" />
            </div>

            {/* Description */}
            <article className="rounded-2xl border border-gray-200 bg-white p-7">

              <h2 className="text-xl font-bold text-gray-950">
                Job Description
              </h2>

              <div className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>

            </article>

            {/* Another Advertisement */}
            <div className="my-6">
              <AdSlot type="content" />
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <section>

                <h2 className="mb-4 text-xl font-bold text-gray-950">
                  Similar Jobs
                </h2>

                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <JobCard
                      key={relatedJob.id}
                      job={relatedJob}
                    />
                  ))}
                </div>

              </section>
            )}

          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-5">

              <AdSlot type="sidebar" />

              <div className="rounded-2xl border border-gray-200 bg-white p-5">

                <p className="text-sm font-semibold text-gray-900">
                  About this listing
                </p>

                <div className="mt-4 space-y-3 text-sm text-gray-500">

                  <div className="flex justify-between">
                    <span>Source</span>
                    <span className="font-medium text-gray-800">
                      {job.source}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Company</span>
                    <span className="font-medium text-gray-800">
                      {job.company}
                    </span>
                  </div>

                  {job.remoteType && (
                    <div className="flex justify-between">
                      <span>Work mode</span>
                      <span className="font-medium text-gray-800">
                        {job.remoteType}
                      </span>
                    </div>
                  )}

                </div>

              </div>

              <AdSlot type="sidebar" />

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}