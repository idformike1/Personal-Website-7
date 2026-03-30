/**
 * REKCAL METABOLIC ABOUT - Phase 4 Architectural Refactor
 * Standard: PERFECT_COMPONENT.tsx (Enterprise Guardrails)
 * Transitions: GSAP ScrollTrigger + Lenis Ticker
 */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import CellularEngine from "./CellularEngine";
import MacronutrientMatrix from "./MacronutrientMatrix";

// Register core plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    // 1. Defensive Early Return
    if (!containerRef.current || !headlineRef.current || !paragraphRef.current) return;

    // 2. Character Reveal
    const chars = headlineRef.current.querySelectorAll(".char");
    if (chars.length) {
      gsap.from(chars, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: "100%",
        opacity: 0,
        stagger: 0.012,
        duration: 1.2,
        ease: "power4.out",
      });
    }

    // 3. Narrative Stagger
    const words = paragraphRef.current.querySelectorAll(".word");
    if (words.length) {
      gsap.from(words, {
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        stagger: 0.008,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, { scope: containerRef, dependencies: [ABOUT] });

  // Safety Return
  if (!ABOUT) return null;

  return (
    <section 
      ref={containerRef}
      id="propos" 
      className="relative py-24 md:py-48 bg-[#070707] overflow-hidden text-white"
    >
      {/* Kinetic Background Engine */}
      <CellularEngine 
        particleCount={100} 
        interactionRadius={180} 
        baseSpeed={0.4} 
        connectionDistance={140} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start justify-between">
          
          {/* Narrative Column (60%) */}
          <div className="w-full lg:w-3/5">
            <div className="max-w-4xl">
              <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-zinc-600 mb-8 font-bold font-mono">
                 {"// Metabolic Philosophy"}
              </span>
              
              <h2 
                ref={headlineRef}
                className={cn(
                  "text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-tighter mb-12 leading-[0.85] flex flex-wrap",
                  "clip-path-polygon-[0_0_100%_0_100%_100%_0_100%]"
                )}
              >
                {ABOUT.title.split("").map((char, i) => (
                  <span key={i} className="char inline-block translate-y-0">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>

              <p 
                ref={paragraphRef}
                className="text-lg md:text-2xl font-normal leading-relaxed text-zinc-400 mb-16 max-w-3xl flex flex-wrap gap-x-[0.3em]"
              >
                {ABOUT.description.split(" ").map((word, i) => (
                  <span key={i} className="word inline-block opacity-100 translate-y-0">
                    {word}
                  </span>
                ))}
              </p>

              <div className="mb-24 w-full">
                <MacronutrientMatrix />
              </div>
            </div>
          </div>

          {/* Visual Asset Column (40%) */}
          <div className="w-full lg:w-2/5 mt-12 lg:mt-32 relative">
             <div className="relative aspect-[4/5] overflow-hidden group">
                {/* Technical Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-40 mix-blend-overlay"
                     style={{ backgroundImage: "linear-gradient(#070707 1px, transparent 1px), linear-gradient(90deg, #070707 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                
                {/* Photo with GSAP Reveal */}
                <div className="absolute inset-0 bg-[#070707] z-10 animate-reveal-down" />
                <img 
                  src="/images/about/team_nano_banana.png"
                  alt="REKCAL Nano Banana Elite Performance Team"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                />

                {/* Aesthetic Border/Frame */}
                <div className="absolute -inset-4 border border-white/5 pointer-events-none -z-10" />
                <div className="absolute top-0 right-0 p-4 z-30">
                   <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/40">
                      [IMG_PROD_NANO_BANANA]
                   </span>
                </div>
             </div>
             
             {/* Dynamic Accent */}
             <div className="absolute -bottom-8 -left-8 w-24 h-24 border-l border-b border-white/20 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Architectural Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} 
      />
    </section>
  );
}
