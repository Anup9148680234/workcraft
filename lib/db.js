import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const sql = postgres(process.env.DATABASE_URL, {
  max: 5,
  prepare: false,
  ssl: "require",
});

export default sql;