/**
 * REKCAL FLOATING AWARDS - Architectural Refactor
 * Migration: framer-motion -> GSAP (Standardized Core Stack)
 */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function FloatingAwards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Standard high-end entrance stagger
    gsap.from(containerRef.current, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      delay: 2,
      ease: "power4.out",
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed right-0 top-1/3 z-50 pointer-events-none hidden md:flex items-center",
        "translate-x-0 opacity-100" // GSAP handles the initial/animate transition
      )}
    >
      <div className="bg-black text-white px-4 py-8 rounded-l-2xl shadow-2xl flex flex-col items-center gap-4 border border-white/10 pointer-events-auto hover:-translate-x-2 transition-transform duration-500 cursor-pointer group">
        <div className="flex flex-col gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-green-400 transition-colors" />
          <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-green-400 transition-colors" />
          <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-green-400 transition-colors" />
        </div>
        
        <p className="[writing-mode:vertical-lr] rotate-180 uppercase text-[10px] tracking-[0.4em] font-bold text-white/40 group-hover:text-white transition-colors">
          REKCAL ELITE
        </p>
        
        <div className="h-6 w-[1px] bg-white/20" />
        
        <span className="text-sm font-black tracking-tighter group-hover:scale-110 transition-transform">
          99%
        </span>
      </div>
    </div>
  );
}
