import Link from "next/link";
import React from "react";

const LEGAL_LINKS = [
  { id: "mentions", label: "Legal Notice", href: "/legal-notice" },
  { id: "cookies", label: "Cookie Management", href: "/cookies" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Stylized Cactus Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="text-4xl hover:scale-110 transition-transform cursor-pointer mb-4">
            🍎
          </div>
          <span className="text-2xl font-black tracking-widest uppercase text-center">
            REKCAL <br /> <span className="text-[10px] tracking-[0.5em] text-white/40">Elite Nutrition</span>
          </span>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-12" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full text-[10px] uppercase tracking-[0.3em] font-medium text-white/30 gap-8">
          <p>
            &copy; {currentYear} — REKCAL. <br className="md:hidden" /> ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8 whitespace-nowrap">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
