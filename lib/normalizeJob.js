export function normalizeJob(job) {
  return {
    externalId: String(job.job_id),
    source: job.job_publisher || "JSearch",

    title: job.job_title || "Untitled Job",

    company: job.employer_name || "Unknown Company",

    location:
      job.job_location ||
      job.job_city ||
      job.job_country ||
      "Unknown",

    salary:
      job.job_min_salary && job.job_max_salary
        ? `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency || ""}`
        : null,

    description: job.job_description || "",

    url:
      job.job_apply_link ||
      job.job_google_link ||
      job.job_link ||
      "#",

    employmentType: job.job_employment_type || null,

    remoteType: job.job_is_remote
      ? "Remote"
      : null,

    experience: null,

    postedAt:
      job.job_posted_at_datetime_utc ||
      new Date().toISOString(),
  };
}