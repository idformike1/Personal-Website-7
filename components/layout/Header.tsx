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

/**
 * Reusable component to handle the specific GSAP "Full to Half Left-Aligned" hover animation
 */
function AnimatedLink({
  href,
  children,
  className = "",
  isActive = false,
  isExternal = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  thickness = "large",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isExternal?: boolean;
  thickness?: "small" | "large";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Safety: Kill any active tweens (like from a recent MouseLeave) when the route changes
    gsap.killTweensOf(lineRef.current);

    // Initial state: right-aligned, width is based on active stat
    gsap.set(lineRef.current, { scaleX: isActive ? 0.5 : 0, transformOrigin: "right" });
  }, { scope: lineRef, dependencies: [isActive] });

  const handleMouseEnter = () => {
    onMouseEnter?.();
    if (isActive) return;

    // Safety: Kill any ongoing animations to prevent twitching if the user hovers very rapidly
    gsap.killTweensOf(lineRef.current);

    // Step 1: Force origin to the LEFT
    gsap.set(lineRef.current, { transformOrigin: "left" });
    
    // Step 2 & 3: Strike fully from the left (0 -> 1)
    gsap.to(lineRef.current, { 
      scaleX: 1, 
      duration: 0.32, 
      ease: "power2.out",
      onComplete: () => {
        // Step 4: Instantly and invisibly swap anchor to the RIGHT
        gsap.set(lineRef.current, { transformOrigin: "right" });
        
        // Step 5: Settle to 50% width by pulling away from the left edge
        gsap.to(lineRef.current, { scaleX: 0.5, duration: 0.38, ease: "power2.inOut" });
      }
    });
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
    if (isActive) return;

    gsap.killTweensOf(lineRef.current);
    
    // Safety check: ensure origin is right so it always correctly vanishes into the right side
    gsap.set(lineRef.current, { transformOrigin: "right" });
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.38, ease: "power3.out" });
  };

  const commonClasses = `relative inline-block w-max ${className}`;
  const thicknessClass = thickness === "large" ? "h-[1px] sm:h-[2px]" : "h-[1px]";

  const content = (
    <>
      {children}
      <div
        ref={lineRef}
        className={`absolute right-0 bottom-0 bg-white w-full origin-right ${thicknessClass}`}
        style={{ transform: isActive ? "scaleX(0.5)" : "scaleX(0)" }}
      />
    </>
  );

  if (isExternal && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={commonClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={`${commonClasses} cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {content}
    </span>
  );
}

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

  const activeImage = NAV_LINKS.find(l => l.href === (hoveredLink || pathname))?.image || NAV_LINKS[0].image;

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .to(".menu-overlay", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "expo.inOut",
      })
      .from(".menu-link-text", {
        yPercent: 100,
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.out",
      }, "-=0.6")
      .from(".menu-extras", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

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
        if (openRef.current) return;
        
        if (self.direction === 1 && window.scrollY > 50) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      }
    });
  }, { scope: container });

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
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`text-xl font-black tracking-tighter uppercase transition-colors duration-300 ${
              isOpen ? "text-white" : "text-black mix-blend-difference"
            }`}
          >
            REKCAL
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 focus:outline-none relative w-10 h-10 items-center justify-center cursor-pointer group z-[110]"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
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

      <div 
        className="menu-overlay fixed inset-0 bg-[#0a0a0a] z-[100] grid grid-cols-1 sm:grid-cols-2 h-screen w-full pointer-events-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className={`col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 h-full w-full ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          
          <div className="hidden sm:flex items-center justify-start p-6 sm:p-12 xl:p-24 xl:pl-32 relative h-full">
             <div className="relative w-full max-w-sm lg:max-w-md aspect-[3/4] overflow-hidden bg-white/5 rounded-sm shadow-2xl">
                <Image
                  ref={imageRef}
                  src={activeImage}
                  alt="Menu showcase image"
                  fill
                  sizes="(max-width: 640px) 0vw, 50vw"
                  className="object-cover"
                  priority
                />
             </div>
          </div>

          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 pt-[15vh] pb-[10vh] h-full relative">
            <div className="flex flex-col gap-2 sm:gap-4 mb-auto pt-20">
              {NAV_LINKS.map((link) => (
                <div key={link.id} className="overflow-hidden">
                  <div className="menu-link-text flex items-center">
                    <AnimatedLink
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      isActive={pathname === link.href}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      thickness="large"
                      className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-tight pb-0.5 sm:pb-1"
                    >
                      {link.label}
                    </AnimatedLink>
                  </div>
                </div>
              ))}
            </div>

            <div className="menu-extras flex flex-col sm:flex-row justify-between items-start sm:items-end w-full gap-8 border-t border-white/20 pt-8">
              <div className="flex flex-col gap-2">
                <span className="text-white/50 uppercase text-xs tracking-wider">Socials</span>
                <div className="flex flex-col gap-1 text-sm items-start">
                  <AnimatedLink isExternal href="https://behance.net" thickness="small" className="text-white pb-0.5">Behance</AnimatedLink>
                  <AnimatedLink isExternal href="https://dribbble.com" thickness="small" className="text-white pb-0.5">Dribbble</AnimatedLink>
                  <AnimatedLink isExternal href="https://linkedin.com" thickness="small" className="text-white pb-0.5">LinkedIn</AnimatedLink>
                  <AnimatedLink isExternal href="https://instagram.com" thickness="small" className="text-white pb-0.5">Instagram</AnimatedLink>
                </div>
              </div>

              <div className="flex gap-12 text-sm text-white/50">
                <AnimatedLink thickness="small" className="text-white pb-0.5">Play Reel</AnimatedLink>
                <AnimatedLink thickness="small" className="text-white pb-0.5">Our Story</AnimatedLink>
              </div>
            </div>

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

