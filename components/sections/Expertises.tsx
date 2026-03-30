"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Initial check for mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const isExpanded = activeIndex === index;
      const desc = card.querySelector(".expertise-desc");
      const titleWrapper = card.querySelector(".expertise-title-wrapper");
      const image = card.querySelector(".expertise-img");
      const overlay = card.querySelector(".expertise-overlay");

      // KILL existing animations on these elements to prevent fighting
      gsap.killTweensOf([card, desc, titleWrapper, image, overlay]);

      // 1. MOBILE ANIMATION (Height-based)
      if (isMobile) {
        gsap.set(card, { flexGrow: 0, flexBasis: "auto" });
        gsap.to(card, {
          height: isExpanded ? 240 : 100,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      } 
      // 2. DESKTOP ANIMATION (Flex-based expansion)
      else {
        gsap.set(card, { height: "100%" }); // Ensure full height on desktop
        gsap.to(card, {
          flexGrow: isExpanded ? 5 : 1,
          flexBasis: "0%",
          duration: 0.8,
          ease: "expo.out",
          overwrite: "auto"
        });
      }

      // 3. TITLE ROTATION & SCALE (Common)
      if (titleWrapper) {
        gsap.to(titleWrapper, {
          rotate: isExpanded ? 0 : (isMobile ? 0 : -90),
          scale: isExpanded ? 1.05 : 1,
          duration: 0.7,
          ease: "power3.inOut"
        });
      }

      // 4. DESCRIPTION REVEAL (Common)
      if (desc) {
        gsap.to(desc, {
          y: isExpanded ? 0 : "120%",
          autoAlpha: isExpanded ? 1 : 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }

      // 5. IMAGE VISUALS (Common)
      if (image) {
        gsap.to(image, {
          filter: isExpanded ? "grayscale(0%)" : "grayscale(100%)",
          scale: isExpanded ? 1.1 : 1,
          duration: 1,
          ease: "power2.out"
        });
      }

      // 6. OVERLAY TINT (Common)
      if (overlay) {
        gsap.to(overlay, {
          backgroundColor: isExpanded ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)",
          duration: 0.5
        });
      }
    });
  }, [activeIndex, isMobile]);

  const handleInteraction = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="prestations" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none mb-4">
            OUR PERFORMANCE<br />EXPERTISE
          </h2>
          <div className="w-20 h-1 bg-black" />
        </div>

        {/* CARDS WRAPPER */}
        <div className="flex flex-col md:flex-row h-auto md:h-[600px] w-full gap-4 items-stretch">
          {EXPERTISES.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              onClick={() => handleInteraction(index)}
              onMouseEnter={() => !isMobile && setActiveIndex(index)}
              onMouseLeave={() => !isMobile && setActiveIndex(null)}
              className="relative w-full overflow-hidden rounded-2xl md:rounded-[2rem] 
                         cursor-pointer shadow-xl border border-zinc-200 bg-zinc-900 overflow-hidden"
              style={{ 
                height: isMobile ? "100px" : "100%", 
                flexGrow: 1,
                flexBasis: isMobile ? "auto" : "0%"
              }}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="expertise-img object-cover"
                />
                <div className="expertise-overlay absolute inset-0" />
              </div>

              {/* Title Section */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none p-4">
                <div className="expertise-title-wrapper">
                  <h3 className="text-white font-black text-lg md:text-2xl lg:text-4xl uppercase tracking-[0.1em] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] max-w-[80vw] md:max-w-none">
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Description Section */}
              <div className="expertise-desc absolute bottom-0 left-0 w-full p-6 z-20">
                <p className="text-white text-xs md:text-lg lg:text-xl leading-relaxed font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {exp.desc}
                </p>
              </div>

              {/* ID Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-white/40 font-black text-sm md:text-2xl tracking-tighter italic">
                  {exp.id}
                </span>
              </div>

              {/* Click Hover Feedback */}
              <div className="absolute inset-0 z-30 bg-white/0 hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
