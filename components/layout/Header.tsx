"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NAV_LINKS = [
  { id: "accueil", label: "Home", href: "/", image: "/images/portfolio/olympic_athlete.png" },
  { id: "propos", label: "About", href: "/propos", image: "/images/portfolio/marathon_fuel.png" },
  { id: "prestations", label: "Services", href: "/prestations", image: "/images/portfolio/wrestling_transform.png" },
  { id: "realisations", label: "Portfolio", href: "/realisations", image: "/images/portfolio/cricket_prep.png" },
  { id: "contact", label: "Contact", href: "/contact", image: "/images/portfolio/badminton_agility.png" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const pathname = usePathname();
  const openRef = useRef(isOpen);

  useEffect(() => {
    openRef.current = isOpen;
  }, [isOpen]);

  // Determine active image based on hover or current route
  const activeImage = NAV_LINKS.find(l => l.href === (hoveredLink || pathname))?.image || NAV_LINKS[0].image;

  useGSAP(() => {
    // 1. Setup Menu Open/Close Timeline
    tl.current = gsap.timeline({ paused: true })
      // Background wipe down
      .to(".menu-overlay", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "expo.inOut",
      })
      // Text stagger reveal via yPercent
      .from(".menu-link-text", {
        yPercent: 100,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
      }, "-=0.6")
      // Extras (socials, small text) fade in
      .from(".menu-extras", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

    // 2. Setup Scroll Hide/Show
    const showAnim = gsap.to(container.current, {
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: "power3.out"
    });

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        setIsScrolled(window.scrollY > 50);
        // Don't act if menu is open
        if (openRef.current) return;
        
        if (self.direction === 1 && window.scrollY > 50) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      }
    });
  }, { scope: container });

  // Play/reverse on state change
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current?.play();
    } else {
      document.body.style.overflow = "unset";
      tl.current?.reverse();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // GSAP Image crossfade on hoveredLink change
  const imageRef = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, 
        { opacity: 0.5, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeImage]);

  return (
    <div ref={container} className="fixed top-0 left-0 right-0 z-50">
      <header className={`transition-all duration-500 ${isScrolled ? "py-4" : "py-6"}`}>
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-[110]">
          {/* LOGO */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`text-xl font-black tracking-tighter uppercase transition-colors duration-300 ${
              isOpen ? "text-white" : "text-black mix-blend-difference" // Note: Re-adding blending approach if desired, or just black
            }`}
          >
            REKCAL
          </Link>

          {/* NO DESKTOP MENU - Removed horizontal nav */}

          {/* TOGGLE BUTTON (Visible on ALL screens) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 focus:outline-none relative w-10 h-10 items-center justify-center cursor-pointer group z-[110]"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {/* Hamburger Lines styled directly based on isOpen */}
            <div 
              style={{ transform: isOpen ? "rotate(45deg) translateY(5px)" : "rotate(0) translateY(0)" }}
              className={`w-6 h-[2px] transition-all duration-300 ${isOpen ? "bg-white" : "bg-black"}`}
            />
            <div 
              style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? "scale(0)" : "scale(1)" }}
              className={`w-6 h-[2px] transition-all duration-300 ${isOpen ? "bg-white" : "bg-black"}`}
            />
            <div 
              style={{ transform: isOpen ? "rotate(-45deg) translateY(-5px)" : "rotate(0) translateY(0)" }}
              className={`w-6 h-[2px] transition-all duration-300 ${isOpen ? "bg-white" : "bg-black"}`}
            />
          </button>
        </nav>
      </header>

      {/* FULL-SCREEN MENU OVERLAY */}
      {/* We keep it in the DOM always for GSAP to manipulate, wiping via clip-path */}
      <div 
        className="menu-overlay fixed inset-0 bg-[#0a0a0a] z-[100] grid grid-cols-1 lg:grid-cols-2 h-screen w-full pointer-events-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/* Enable pointer events only when open */}
        <div className={`col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 h-full w-full ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          
          {/* LEFT COLUMN: IMAGE (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center p-12 xl:p-24 relative h-full">
             <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden bg-white/5 rounded-sm">
                <Image
                  ref={imageRef}
                  src={activeImage}
                  alt="Menu showcase image"
                  fill
                  className="object-cover"
                  priority
                />
             </div>
          </div>

          {/* RIGHT COLUMN: NAVIGATION LINKS */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 pt-[15vh] pb-[10vh] h-full relative">
            <div className="flex flex-col gap-2 sm:gap-4 mb-auto pt-20">
              {NAV_LINKS.map((link) => (
                <div key={link.id} className="overflow-hidden">
                  {/* The text we animate with yPercent */}
                  <div className="menu-link-text flex items-center">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white hover:text-white/60 transition-colors block leading-tight"
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIAL LINKS & EXTRAS */}
            <div className="menu-extras flex flex-col sm:flex-row justify-between items-start sm:items-end w-full gap-8 border-t border-white/20 pt-8">
              <div className="flex flex-col gap-2">
                <span className="text-white/50 uppercase text-xs tracking-wider">Socials</span>
                <div className="flex flex-col gap-1 text-sm">
                  <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-60 transition-opacity">Behance</a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-60 transition-opacity">Dribbble</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-60 transition-opacity">LinkedIn</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-60 transition-opacity">Instagram</a>
                </div>
              </div>

              <div className="flex gap-12 text-sm text-white/50">
                <span className="hover:text-white cursor-pointer transition-colors">Play Reel</span>
                <span className="hover:text-white cursor-pointer transition-colors">Our Story</span>
              </div>
            </div>

            {/* BACKGROUND TEXT DECORATION (Optional, kept from original) */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-[0.03] select-none pointer-events-none hidden lg:block">
                <span className="text-[15vw] font-black text-white leading-none uppercase mix-blend-overlay">
                    REKCAL
                </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

