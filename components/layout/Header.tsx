"use client";

import Link from "next/link";
import React from "react";

const NAV_LINKS = [
  { id: "accueil", label: "Accueil", href: "/" },
  { id: "propos", label: "À propos", href: "/#propos" },
  { id: "prestations", label: "Prestations", href: "/#prestations" },
  { id: "realisations", label: "Réalisations", href: "/#realisations" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight uppercase">
          Oroya Clone
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
