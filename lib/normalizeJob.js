export function normalizeJob(job) {
  return {
    externalId: String(job.id),
    source: "Remotive",
    title: job.title,
    company: job.company_name,
    location: job.candidate_required_location || "Remote",
    salary: job.salary || null,
    description: job.description || "",
    url: job.url,
    employmentType: null,
    remoteType: "Remote",
    experience: null,
    postedAt: job.publication_date || new Date().toISOString(),
  };
}