import { fetchJobs } from "../../../lib/jobs";
import { normalizeJob } from "../../../lib/normalizeJob";
import db from "../../../lib/db.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";

    const jobs = await fetchJobs(query);

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

    let imported = 0;

    const transaction = db.transaction((jobs) => {
      for (const job of jobs) {
        insert.run(normalizeJob(job));
        imported++;
      }
    });

    transaction(jobs);

    return Response.json({
      success: true,
      imported,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Failed to import jobs",
      },
      { status: 500 }
    );
  }
}