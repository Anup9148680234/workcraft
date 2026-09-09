const REMOTIVE_API = "https://remotive.com/api/remote-jobs";

export async function fetchJobs(query = "") {
  const url = query
    ? `${REMOTIVE_API}?search=${encodeURIComponent(query)}`
    : REMOTIVE_API;

  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();

  return data.jobs || [];
}