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

        {/* HIGH-FIDELITY HORIZONTAL ACCORDION - REVERTED STABLE HOVER VERSION */}
        <div className="flex flex-col md:flex-row h-auto md:h-[600px] w-full gap-4 items-stretch">
          {EXPERTISES.map((exp, index) => (
            <div
              key={exp.id}
              className="group relative h-[450px] md:h-full w-full md:flex-[1] md:hover:flex-[5] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-[2rem] cursor-pointer shadow-xl border border-zinc-200"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-1000" />
              </div>

              {/* VERTICAL PIVOT TITLE (Responsive Rotation) */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div 
                  className="transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform
                             rotate-0 md:-rotate-90 md:group-hover:rotate-0 group-hover:scale-110"
                >
                  <h3 className="text-white font-black text-sm md:text-xl lg:text-3xl uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
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
