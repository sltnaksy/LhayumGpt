"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* floating blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-24 -left-10 h-72 w-72 bg-primary/50 rounded-full" />
        <div className="blob absolute -top-6 right-10 h-80 w-80 bg-accent/60 rounded-full" />
        <div className="blob absolute bottom-0 left-1/3 h-72 w-72 bg-sky-500/40 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .7 }}
            className="space-y-6"
          >
            <span className="text-2xl sm:text-4xl">Lhayum (ལྷ་ཡུམ་)</span> means <span className="italic">"Divine Mother"</span> in Tibetan

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Preserving Tibetan wisdom through{" "}
              <span className="text-accent">AI</span>.
            </h1>

            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              An AI-powered knowledge base dedicated to Tibetan culture, language, medicine, and Buddhist philosophy.
                Ask questions and explore centuries of wisdom in both Tibetan and English.
            </p>

            <div className="flex items-center gap-4" id="try">
              <a
                href="#newsletter"
                className="rounded-xl bg-accent px-5 py-3 text-black font-semibold shadow-soft hover:opacity-90"
              >
                Join Us
              </a>
              <a
                href="https://#"
                className="rounded-xl border border-white/20 px-5 py-3 font-medium hover:bg-white/10"
              >
                Try Demo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: .96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: .7 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-2">
              <Image
                src="/hero-art.jpg"
                alt="Tibetan mountains and stupa artwork"
                width={1200}
                height={1200}
                className="rounded-xl object-cover"
                priority
              />
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
