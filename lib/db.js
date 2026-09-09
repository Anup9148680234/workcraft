import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "jobs.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    externalId TEXT NOT NULL,
    source TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    salary TEXT,
    description TEXT,
    url TEXT NOT NULL,
    employmentType TEXT,
    remoteType TEXT,
    experience TEXT,
    postedAt TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(source, externalId)
  );
`);

export default db;