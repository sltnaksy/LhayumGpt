// app/lib/db.ts
import { createPool } from '@vercel/postgres';
const conn =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL;
export const pool = createPool({ connectionString: conn! });
