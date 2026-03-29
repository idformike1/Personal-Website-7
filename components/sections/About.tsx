"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ABOUT } from "@/lib/constants";
import CellularEngine from "./CellularEngine";
import MacronutrientMatrix from "./MacronutrientMatrix";
import BiomarkerRadar from "./BiomarkerRadar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. GSAP Text Reveal: Line-by-line reveal
    if (paragraphRef.current) {
      const split = new SplitType(paragraphRef.current, {
        types: "lines",
        lineClass: "overflow-hidden"
      });

      split.lines?.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = "overflow-hidden py-1";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.from(split.lines, {
        yPercent: 100,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });
    }

    // 2. GSAP Number Counters
    const stats = statsContainerRef.current?.querySelectorAll(".stat-number");
    stats?.forEach((stat) => {
      const targetValue = parseInt(stat.getAttribute("data-target") || "0", 10);
      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 2.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 95%",
            toggleActions: "play none none reset",
          },
          onUpdate: function() {
            stat.textContent = Math.ceil(Number(this.targets()[0].innerText)).toLocaleString();
          }
        }
      );
    });

    if (headlineRef.current) {
        gsap.from(headlineRef.current, {
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 90%",
                toggleActions: "play none none reset",
            }
        });
    }

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="propos" 
      className="relative py-24 md:py-40 bg-[#070707] overflow-hidden text-white perspective-1000"
    >
      {/* Interactive Cellular Engine Background */}
      <CellularEngine 
        particleCount={100} 
        interactionRadius={180} 
        baseSpeed={0.4} 
        connectionDistance={140} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5">
            <div className="max-w-4xl">
              <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-zinc-600 mb-6 font-bold">
                 // Metabolic Philosophy
              </span>
              
              <h2 
                ref={headlineRef}
                className="text-6xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tighter mb-10 leading-[0.85] text-white"
              >
                {ABOUT.title}
              </h2>

              <p 
                ref={paragraphRef}
                className="text-lg md:text-xl font-normal leading-relaxed text-zinc-400 mb-16 max-w-4xl"
              >
                Born in India and trusted globally, REKCAL has been <br className="hidden lg:block" />
                supporting high-level athletes worldwide in their quest for <br className="hidden lg:block" />
                ultimate performance. Through a scientific, personalized <br className="hidden lg:block" />
                approach to nutrition, our mission is simple: transform <br className="hidden lg:block" />
                your diet into a decisive competitive advantage.
              </p>

              {/* Macronutrient Matrix - Technical Visualization */}
              <div className="mb-20">
                <MacronutrientMatrix />
              </div>

              <div 
                ref={statsContainerRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full pt-16 border-t border-zinc-900"
              >
                {ABOUT.stats.map((stat, i) => {
                    const cleanValue = stat.value.replace(/[^0-9]/g, '');
                    const suffix = stat.value.replace(/[0-9]/g, '');
                    return (
                        <div key={i} className="flex flex-col gap-1">
                            <span className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter">
                                <span className="stat-number" data-target={cleanValue}>0</span>
                                <span className="text-zinc-700 ml-0.5">{suffix}</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-zinc-600 leading-tight">
                                {stat.label}
                            </span>
                        </div>
                    );
                })}
              </div>
            </div>
          </div>

          {/* Right: Technical Visuals & Implementation Details */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center relative py-12 lg:py-0 border-l border-white/5 pl-12">
             {/* Biomarker Radar Chart Visual */}
             <div className="w-full">
                <BiomarkerRadar />
             </div>
          </div>
          
        </div>
      </div>
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} 
      />
    </section>
  );
}
