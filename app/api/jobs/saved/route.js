import { NextResponse } from "next/server";
import sql from "../../../../lib/db.js";

export async function POST(request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json([]);
    }

    const cleanIds = ids
      .map((id) => Number(id))
      .filter((id) => Number.isInteger(id));

    if (cleanIds.length === 0) {
      return NextResponse.json([]);
    }

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
      WHERE id = ANY(${cleanIds})
      ORDER BY posted_at DESC NULLS LAST
    `;

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Saved jobs error:", error);

    return NextResponse.json(
      { error: "Failed to load saved jobs" },
      { status: 500 }
    );
  }
}