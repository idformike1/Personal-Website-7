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
  const statsContainerRef = useRef<HTMLDivElement>(null);

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

    // 4. Stat Counters
    const stats = statsContainerRef.current?.querySelectorAll(".stat-number");
    stats?.forEach((stat) => {
      const targetValue = parseInt(stat.getAttribute("data-target") || "0", 10);
      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 95%",
          },
          onUpdate: function() {
            stat.textContent = Math.ceil(Number(this.targets()[0].innerText)).toLocaleString();
          }
        }
      );
    });

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
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
          
          {/* Layout Partition: Narrative (Full Width now) */}
          <div className="w-full">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-zinc-600 mb-8 font-bold font-mono">
                 // Metabolic Philosophy
              </span>
              
              <h2 
                ref={headlineRef}
                className={cn(
                  "text-6xl md:text-8xl lg:text-[112px] font-black uppercase tracking-tighter mb-12 leading-[0.85] flex flex-wrap",
                  "clip-path-polygon-[0_0_100%_0_100%_100%_0_100%]" // Mandated technical aesthetic
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

              <div className="mb-24">
                <MacronutrientMatrix />
              </div>

              <div 
                ref={statsContainerRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-16 border-t border-zinc-900"
              >
                {ABOUT.stats.map((stat, i) => {
                    const cleanValue = stat.value.replace(/[^0-9]/g, '');
                    const suffix = stat.value.replace(/[0-9]/g, '');
                    return (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="text-4xl md:text-6xl font-black tracking-tighter">
                                <span className="stat-number" data-target={cleanValue}>0</span>
                                <span className="text-zinc-700 ml-1">{suffix}</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">
                                {stat.label}
                            </span>
                        </div>
                    );
                })}
              </div>
            </div>
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
