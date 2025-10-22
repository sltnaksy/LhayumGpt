// app/api/subscribe/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createPool, sql } from '@vercel/postgres';
import { Resend } from 'resend';

const CONN =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL;

const pool = createPool({ connectionString: CONN });
const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const welcomeHTML = (project = 'Lhayum GPT') => `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
    <h2 style="margin:0 0 8px 0">Welcome to ${project} 🎉</h2>
    <p>Thanks for subscribing. We’ll keep you posted about new features and releases.</p>
    <p style="font-size:12px;color:#64748b">If this wasn’t you, simply ignore this email.</p>
  </div>
`;

export async function POST(req: Request) {
  try {
    if (!CONN) {
      return NextResponse.json({ ok:false, error:'DB url missing' }, { status:500 });
    }
    const { email, source, consent = true } = await req.json().catch(() => ({}));
    if (!email || !EMAIL_RE.test(String(email))) {
      return NextResponse.json({ ok:false, error:'Invalid email' }, { status:400 });
    }

    // tabloyu garanti altına al (local ilk çalıştırma için)
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

// 2) tablo
await sql`
  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip INET,
    ua TEXT,
    consent BOOLEAN NOT NULL DEFAULT TRUE
  )
`;

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
    const ua = req.headers.get('user-agent') ?? null;

    const result = await pool.query(
     `INSERT INTO newsletter_subscribers (email, source, consent)
   VALUES ($1, $2, $3)
   ON CONFLICT (email) DO NOTHING`,
  [email.toLowerCase(), source, !!consent]
);

    // Yeni kayıt yapıldıysa (duplicate değilse) hoş geldin e-postası gönder
    if ((result.rowCount ?? 0) === 1 && process.env.RESEND_API_KEY && process.env.RESEND_FROM) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM!,
          to: email,
          subject: 'Welcome to Lhayum GPT',
          html: welcomeHTML('Lhayum GPT'),
        });
      } catch (mailErr) {
        // e-posta hatası aboneliği bozmasın; loglayıp devam ediyoruz
        console.error('[welcome-mail] error:', mailErr);
      }
    }

    const res = NextResponse.json({ ok:true, inserted: result.rowCount ?? 0 });
    res.cookies.set('lhayum_subscribed','1',{
      httpOnly:true, sameSite:'lax', secure:true, path:'/', maxAge:60*60*24*365
    });
    return res;
  } catch (e:any) {
    console.error('[subscribe] error:', e?.message || e);
    return NextResponse.json({ ok:false, error:e?.message || 'Server error' }, { status:500 });
  }
}
