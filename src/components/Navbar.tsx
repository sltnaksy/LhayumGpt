"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .6 }}
      className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Lhayum GPT logo" width={36} height={36} />
          <span className="font-semibold tracking-wide">Lhayum GPT</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#newsletter" className="hover:text-white">Newsletter</a>
        </nav>
      </div>
    </motion.header>
  );
}
