"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // cookie varsa (daha önce abone olmuşsa) otomatik teşekkür görünümü
  useEffect(() => {
    if (typeof document !== "undefined") {
      const has = document.cookie.includes("lhayum_subscribed=1");
      if (has) setDone(true);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // honeypot: botlar doldurursa iptal
    const form = new FormData(e.currentTarget);
    const honeypot = String(form.get("website") || "");
    if (honeypot) return;

    setBusy(true);
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "cta", consent: true }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) {
        throw new Error(j.error || "Subscription failed");
      }
      setDone(true);
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="newsletter" className="mx-auto max-w-3xl px-6 py-20 text-center">
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        Join Our Journey
      </motion.h2>

      <p className="text-white/70 mt-2">
        Stay updated on our progress and be the first to know when we launch new features.
      </p>

      {/* Teşekkür / Hata mesajları */}
      {done ? (
        <div className="mt-6 inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white/90">
          Thanks! We’ll keep you posted. 🎉
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {/* Honeypot (gizli) */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80 rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-accent"
            aria-label="Email address"
          />

          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-accent text-black font-semibold px-6 py-3 hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {error && (
        <p className="mt-3 text-rose-300 text-sm">
          {error}
        </p>
      )}
    </section>
  );
}
