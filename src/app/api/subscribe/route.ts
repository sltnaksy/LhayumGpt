// app/api/subscribe/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createPool, sql } from '@vercel/postgres';

const CONN =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL;

const pool = createPool({ connectionString: CONN });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export async function POST(req: Request) {
  try {
    if (!CONN) {
      return NextResponse.json({ ok:false, error:'DB url missing' }, { status:500 });
    }

    const { email, source = 'cta', consent = true } = await req.json();
    if (!email || !EMAIL_RE.test(String(email))) {
      return NextResponse.json({ ok:false, error:'Invalid email' }, { status:400 });
    }

    // DDL'leri AYRI ayrı çalıştır (Neon tek komutta birden fazla SQL sevmez)
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        source TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        consent BOOLEAN NOT NULL DEFAULT TRUE
      )
    `;
    await sql`ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS ip INET`;
    await sql`ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS ua TEXT`;

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
    const ua = req.headers.get('user-agent') ?? null;

    const resInsert = await pool.query(
      `INSERT INTO newsletter_subscribers (email, source, ip, ua, consent)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [String(email).toLowerCase(), source, ip, ua, !!consent]
    );

    const res = NextResponse.json({ ok:true, inserted: resInsert.rowCount ?? 0 });
    res.cookies.set('lhayum_subscribed','1', {
      httpOnly:true, sameSite:'lax', secure:true, path:'/', maxAge:60*60*24*365,
    });
    return res;
  } catch (e: any) {
    console.error('[subscribe] error:', e?.message || e);
    return NextResponse.json({ ok:false, error: e?.message || 'Server error' }, { status:500 });
  }
}
