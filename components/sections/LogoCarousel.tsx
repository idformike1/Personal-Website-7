"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const LOGOS = [
  "NEXT GEN PERFORMANCE",
  "APEX NUTRITION",
  "ELITE KINETICS",
  "BIOMECH LABS",
  "VITALITY SYSTEMS",
  "QUANTUM METABOLICS",
  "PRO ATHLÈTE",
];

export default function LogoCarousel() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-16 md:py-20 bg-zinc-100 overflow-hidden border-t border-zinc-200"
    >
      <div className="container mx-auto px-6 mb-12">
        <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-zinc-400 text-center">
          Trusted By Global Partners
        </h3>
      </div>
      
      {/* Infinite Marquee Track */}
      <div 
        className="w-full overflow-hidden whitespace-nowrap"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div ref={trackRef} className="flex flex-nowrap items-center w-max">
          {/* Double the logos to ensure seamless continuous looping */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 select-none grayscale cursor-default pr-16 md:pr-32"
            >
              <span className="text-xl md:text-3xl font-black uppercase tracking-tighter text-zinc-800">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
