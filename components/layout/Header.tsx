"use client";

import Link from "next/link";
import React from "react";

const NAV_LINKS = [
  { id: "accueil", label: "Home", href: "/" },
  { id: "propos", label: "About", href: "/propos" },
  { id: "prestations", label: "Services", href: "/prestations" },
  { id: "realisations", label: "Portfolio", href: "/realisations" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-4" : "bg-transparent py-6"
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase text-black">
          REKCAL
        </Link>

        <ul className="flex gap-8 items-center text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="hover:opacity-60 transition-opacity uppercase tracking-wider"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
