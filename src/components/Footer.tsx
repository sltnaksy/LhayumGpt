export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/60 flex flex-col md:flex-row gap-2 md:items-center md:justify-center">
        <p>© {new Date().getFullYear()} Lhayum GPT · Mini Tibetan GPT</p>
      </div>
    </footer>
  );
}
