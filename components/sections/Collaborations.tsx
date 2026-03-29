/**
 * REKCAL COLLABORATIONS - Architectural Refactor
 * Migration: framer-motion -> GSAP + useGSAP (Standardized Stack)
 */
"use client";

import { useRef } from "react";
import { PORTFOLIO } from "@/lib/constants";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Collaborations() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Headline Animation
    if (headlineRef.current) {
        gsap.from(headlineRef.current, {
            scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
        });
    }

    // 2. Grid Items Stagger
    const cards = containerRef.current.querySelectorAll(".project-card");
    if (cards.length) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            scale: 0.95,
            stagger: 0.1,
            duration: 1.2,
            ease: "expo.out",
        });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="realisations" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-24">
        <div ref={headlineRef}>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.75] text-zinc-950">
            OUR ATHLETIC <br /> SUCCESSES
          </h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {PORTFOLIO.map((project, index) => (
          <div
            key={project.id}
            className={cn(
                "project-card group relative aspect-square overflow-hidden bg-zinc-100 cursor-pointer"
            )}
          >
            {/* Project Image */}
            <div className="w-full h-full relative transition-transform duration-1000 group-hover:scale-105">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority={index < 3}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] p-12 text-center pointer-events-none">
              <span className="text-white text-[10px] uppercase tracking-[0.3em] mb-6 font-bold">
                {project.category}
              </span>
              <h3 className="text-white text-3xl font-bold uppercase tracking-tighter leading-tight mb-8">
                {project.title}
              </h3>
              <div className="w-12 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
