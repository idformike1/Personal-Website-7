"use client";
import React from "react";
import Image from "next/image";

const EXPERTISES = [
  { 
    id: "01", 
    title: "Metabolic Analysis", 
    desc: "Advanced physiological testing to determine your exact substrate utilization and VO2 max.",
    image: "/images/expertises/metabolic_analysis.png",
  },
  { 
    id: "02", 
    title: "Performance Diet", 
    desc: "Periodized nutrition plans synchronized with your training blocks for maximum power output.",
    image: "/images/expertises/performance_diet.png",
  },
  { 
    id: "03", 
    title: "Recovery Strategy", 
    desc: "Evidence-based protocols including sleep optimization and inflammation management.",
    image: "/images/expertises/recovery_strategy.png",
  },
  { 
    id: "04", 
    title: "Supplementation", 
    desc: "Third-party tested ergogenic aid protocols to bridge the gap in elite performance.",
    image: "/images/expertises/supplementation.png",
  },
  { 
    id: "05", 
    title: "Game Day Fueling", 
    desc: "Intra-event carbohydrate and electrolyte strategies to prevent hitting the wall.",
    image: "/images/expertises/game_day_fueling.png",
  }
];

export default function Expertises() {
  return (
    <section id="prestations" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-4">
            OUR PERFORMANCE<br />EXPERTISE
          </h2>
          <div className="w-20 h-1 bg-black" />
        </div>

        {/* HIGH-FIDELITY HORIZONTAL ACCORDION */}
        <div className="flex flex-col md:flex-row h-[600px] w-full gap-4 items-stretch">
          {EXPERTISES.map((exp, index) => (
            <div
              key={exp.id}
              className="group relative flex-[1] hover:flex-[5] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-[2rem] cursor-pointer shadow-xl border border-zinc-200"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority={index < 3} // Prioritize first row for LCP
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                {/* Visual Overlay for Readability */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-1000" />
              </div>

              {/* Floating Title Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 flex justify-center">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-white/20 transform group-hover:scale-110 transition-transform duration-700">
                  <h3 className="text-black font-black text-xs md:text-sm uppercase tracking-[0.2em] whitespace-nowrap">
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Description (Reveals on Hover) */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 delay-100">
                <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {exp.desc}
                  </p>
                </div>
              </div>

              {/* ID Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="text-white/40 font-black text-2xl tracking-tighter italic">
                  {exp.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
