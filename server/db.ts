import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'FATAL CONFIGURATION ERROR: DATABASE_URL environment variable is missing. ' +
    'Attach a PostgreSQL database in Railway (or set DATABASE_URL) before starting the server.'
  );
}

// Railway's internal Postgres connection does not require SSL; external/public
// connections (e.g. from your laptop) generally do. This picks the right mode
// automatically based on the host.
const isInternal = connectionString.includes('.railway.internal');

export const pool = new Pool({
  connectionString,
  ssl: isInternal ? false : { rejectUnauthorized: false }
});

let initialized = false;

export async function initDb(): Promise<void> {
  if (initialized) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_credentials (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT single_row CHECK (id = 1)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_content (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT single_row CHECK (id = 1)
    );
  `);

  initialized = true;
}
