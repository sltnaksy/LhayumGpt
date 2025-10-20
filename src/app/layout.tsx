import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LhayumGPT",
  description:
    "A modern, bilingual (Tibetan–English) AI assistant focused on Tibetan language and culture.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-b from-slate-800 to-slate-900">
        {children}
      </body>
    </html>
  );
}
