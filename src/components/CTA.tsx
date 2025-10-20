"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="newsletter" className="mx-auto max-w-3xl px-6 py-20 text-center">
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .5 }}
        className="text-3xl font-bold"
      >
        Join Our Journey
      </motion.h2>
      <p className="text-white/70 mt-2">
        Stay updated on our progress and be the first to know when we launch new features.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks! We'll keep you posted.");
        }}
        className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
      >
        <input
          type="email"
          required
          placeholder="Your email"
          className="w-full sm:w-80 rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-xl bg-accent text-black font-semibold px-6 py-3 hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
