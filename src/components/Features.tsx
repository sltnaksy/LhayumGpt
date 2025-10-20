"use client";
import { motion } from "framer-motion";
import { Book, Languages, Database } from "lucide-react";

const items = [
  {
    title: "Authentic Sources",
    desc: "Curated Tibetan texts (language, history, medicine, culture) cleaned and organized.",
    Icon: Book,
  },
  {
    title: "Bilingual by Design",
    desc: "Understand and answer in Tibetan and English with cultural awareness.",
    Icon: Languages,
  },
  {
    title: "RAG + Vector DB",
    desc: "Chroma-backed retrieval with multilingual embeddings for precise context.",
    Icon: Database,
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Why Mini Tibetan GPT?</h2>
        <p className="text-white/70 mt-2">
          Clean data, smart retrieval, and a focused mission.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map(({ title, desc, Icon }, i) => (
          <motion.div
            key={title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: .5 }}
            className="glass rounded-2xl p-6"
          >
            <Icon className="mb-4" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-white/70 mt-2">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
