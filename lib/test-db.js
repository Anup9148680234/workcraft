import sql from "./db.js";

const result = await sql`
  SELECT COUNT(*)::int AS count
  FROM jobs
`;

console.log(result);

await sql.end();