"use client";
import { motion } from "framer-motion";

export default function Showcase() {
  return (
    <section id="showcase" className="relative bg-radial-fade">
      <div className="mx-auto max-w-7xl px-6 py-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="glass rounded-2xl p-8 mx-auto w-full max-w-5xl"
        >
          
          <div className="grid gap-6 lg:grid-cols-4">
            <Stat kpi="2" label="Languages (bo/en)" />
            <Stat kpi="RAG" label="Retrieval pipeline" />
            <Stat kpi="Chroma" label="Vector DB" />
            <Stat kpi="MVP" label="Launch-ready" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-2xl font-bold">{kpi}</div>
      <div className="text-white/70 text-sm">{label}</div>
    </div>
  );
}
