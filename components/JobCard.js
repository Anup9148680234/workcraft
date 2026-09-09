import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <article className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
              {job.title}
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {job.company}
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {job.source}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
          {job.location && (
            <span className="rounded-md bg-gray-50 px-2 py-1">
              📍 {job.location}
            </span>
          )}

          {job.remoteType && (
            <span className="rounded-md bg-gray-50 px-2 py-1">
              {job.remoteType}
            </span>
          )}

          {job.employmentType && (
            <span className="rounded-md bg-gray-50 px-2 py-1">
              {job.employmentType}
            </span>
          )}
        </div>

        {job.salary && (
          <p className="mt-4 text-sm font-medium text-gray-800">
            {job.salary}
          </p>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </p>

        <div className="mt-5 text-sm font-semibold text-blue-600">
          View Job →
        </div>
      </article>
    </Link>
  );
}