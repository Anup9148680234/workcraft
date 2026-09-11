import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import sql from "./db.js";
import { fetchJobs } from "./jobs.js";
import { normalizeJob } from "./normalizeJob.js";

const query =
  process.argv.slice(2).join(" ") ||
  "software developer jobs in India";

async function importJobs() {
  console.log(`Fetching jobs for: "${query}"`);

  const apiJobs = await fetchJobs(query);

  console.log(`Found ${apiJobs.length} jobs.`);

  let imported = 0;

  for (const rawJob of apiJobs) {
    const job = normalizeJob(rawJob);

    await sql`
      INSERT INTO jobs (
        external_id,
        source,
        title,
        company,
        location,
        salary,
        description,
        url,
        employment_type,
        remote_type,
        experience,
        posted_at
      )
      VALUES (
        ${job.externalId},
        ${job.source},
        ${job.title},
        ${job.company},
        ${job.location},
        ${job.salary},
        ${job.description},
        ${job.url},
        ${job.employmentType},
        ${job.remoteType},
        ${job.experience},
        ${job.postedAt}
      )
      ON CONFLICT (source, external_id)
      DO UPDATE SET
        title = EXCLUDED.title,
        company = EXCLUDED.company,
        location = EXCLUDED.location,
        salary = EXCLUDED.salary,
        description = EXCLUDED.description,
        url = EXCLUDED.url,
        employment_type = EXCLUDED.employment_type,
        remote_type = EXCLUDED.remote_type,
        experience = EXCLUDED.experience,
        posted_at = EXCLUDED.posted_at,
        updated_at = NOW()
    `;

    imported++;
  }

  console.log(`Successfully imported ${imported} jobs.`);

  await sql.end();
}

importJobs().catch(async (error) => {
  console.error("Import failed:", error);

  await sql.end();

  process.exit(1);
});