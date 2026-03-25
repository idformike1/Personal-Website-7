"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id: "accueil", label: "Home", href: "/" },
  { id: "propos", label: "About", href: "/propos" },
  { id: "prestations", label: "Services", href: "/prestations" },
  { id: "realisations", label: "Portfolio", href: "/realisations" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const overlayVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        delay: 0.2
      }
    },
    open: {
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        type: "spring" as const,
        stiffness: 40,
        restDelta: 2
      }
    }
  };

  const navItemVariants = {
    closed: { y: 100, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1] as const
      }
    }),
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "py-4" : "py-6"
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-[110]">
        {/* LOGO */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className={`text-xl font-black tracking-tighter uppercase transition-colors duration-300 ${
            isOpen ? "text-white" : "text-black"
          }`}
        >
          REKCAL
        </Link>

        {/* DESKTOP MENU (Visible on lg screens and above) */}
        <ul className="hidden lg:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="hover:opacity-60 transition-opacity font-avenir text-black text-[18px] font-[500] leading-[23px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE TOGGLE BUTTON (Visible on md/sm screens below lg) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none relative w-10 h-10 items-center justify-center cursor-pointer group"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className={`w-6 h-[2px] transition-colors duration-300 ${isOpen ? "bg-white" : "bg-black"}`}
          />
          <motion.div 
            animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            className={`w-6 h-[2px] transition-colors duration-300 ${isOpen ? "bg-white" : "bg-black"}`}
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className={`w-6 h-[2px] transition-colors duration-300 ${isOpen ? "bg-white" : "bg-black"}`}
          />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-[#141414] z-[100] flex flex-col pt-[20vh] px-10 overflow-y-auto no-scrollbar"
          >
            {/* MOBILE MENU NAV ITEMS */}
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <div key={link.id} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={navItemVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl sm:text-7xl font-bold uppercase tracking-tighter text-white hover:text-white/60 transition-colors block leading-none"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* SOCIAL LINKS (Right after menu list) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 items-center pt-10 mt-6 border-t border-white/10"
            >
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity text-white" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity text-white" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity text-white" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </motion.div>
            
            {/* BACKGROUND STYLING */}
            <div className="mt-20 opacity-10 select-none pointer-events-none self-start">
                <span className="text-[20vw] font-black text-white leading-none uppercase">
                    REKCAL
                </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
