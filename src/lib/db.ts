import { Pool, QueryResultRow } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export default pool;

export async function query<T extends QueryResultRow = any>(text: string, params?: any[]) {
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  console.log("[v0] Query executed:", { text, duration, rows: result.rowCount });
  return result;
}
