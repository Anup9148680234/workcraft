import sql from "./db.js";

const JSEARCH_URL =
  "https://api.openwebninja.com/jsearch/search-v2";

export async function fetchJobs(
  query = "software developer jobs in India"
) {
  const response = await fetch(
    `${JSEARCH_URL}?query=${encodeURIComponent(query)}&country=in&language=en`,
    {
      headers: {
        "x-api-key": process.env.JSEARCH_API_KEY,
      },
    }
  );

  const text = await response.text();



  if (!response.ok) {
    throw new Error(
      `JSearch API error ${response.status}: ${text}`
    );
  }

  const data = JSON.parse(text);

  return data.data?.jobs || [];
}

export async function getJobs({
  search = "",
  location = "",
  remote = "",
  limit = 50,
} = {}) {
  const searchTerm = `%${search}%`;
  const locationTerm = `%${location}%`;

  return await sql`
    SELECT
      id,
      external_id AS "externalId",
      source,
      title,
      company,
      location,
      salary,
      description,
      url,
      employment_type AS "employmentType",
      remote_type AS "remoteType",
      experience,
      posted_at AS "postedAt"
    FROM jobs
    WHERE
      (
        ${search} = ''
        OR title ILIKE ${searchTerm}
        OR company ILIKE ${searchTerm}
        OR description ILIKE ${searchTerm}
      )
      AND (
        ${location} = ''
        OR location ILIKE ${locationTerm}
      )
      AND (
        ${remote} = ''
        OR remote_type ILIKE ${`%${remote}%`}
      )
    ORDER BY posted_at DESC NULLS LAST
    LIMIT ${limit}
  `;
}

export async function getJobById(id) {
  const jobs = await sql`
    SELECT
      id,
      external_id AS "externalId",
      source,
      title,
      company,
      location,
      salary,
      description,
      url,
      employment_type AS "employmentType",
      remote_type AS "remoteType",
      experience,
      posted_at AS "postedAt"
    FROM jobs
    WHERE id = ${id}
    LIMIT 1
  `;

  return jobs[0] || null;
}