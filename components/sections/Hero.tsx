"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const WORDS = ["INTAKE", "UPTAKE", "OUTPUT"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRollRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      const wordElements = wordRollRef.current?.querySelectorAll(".word-item");
      const splits = wordElements ? Array.from(wordElements).map(el => new SplitType(el as HTMLElement, { types: "chars" })) : [];
      const headlineLetters = headlineRef.current?.querySelectorAll(".letter");

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        headlineLetters || [],
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.015, duration: 1.2, delay: 0.4 }
      );

      tl.fromTo(subTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      );

      tl.fromTo(scrollIconRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.5"
      );

      if (splits.length > 0) {
        splits.forEach(s => s.chars && gsap.set(s.chars, { yPercent: 100, opacity: 0 }));
        
        const rollTl = gsap.timeline({ repeat: -1 });
        splits.forEach((split, index) => {
          const chars = split.chars;
          if (!chars) return;

          rollTl.to(chars, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.7,
            ease: "expo.out",
          }, index === 0 ? "+=0.1" : ">-0.1");

          rollTl.to({}, { duration: 2 });

          rollTl.to(chars, {
            yPercent: -100,
            opacity: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "expo.in",
          });
        });
      }

      gsap.to(".circular-text", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".scroll-line", {
        y: 10,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut"
      });

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (char === " " ? (
      <span key={i} className="mr-[0.2em]" />
    ) : (
      <span key={i} className="letter inline-block">
        {char}
      </span>
    )));
  };

  return (
    <section 
      ref={containerRef}
      id="accueil" 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-white"
    >
      <div className="container mx-auto flex flex-col items-center text-center max-w-7xl relative pb-20 md:pb-32">
        
        {/* MAIN HEADLINE */}
        <h1 
          ref={headlineRef} 
          className="flex flex-col items-center leading-[0.7] gap-y-1.5 sm:gap-y-5 md:mb-5"
        >
          {/* LINE 1 & 2 (Mobile Cluster) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-1.5 sm:gap-y-0 sm:gap-x-3">
              <div className="flex items-center gap-x-3">
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-bold tracking-tighter uppercase whitespace-nowrap">
                  {splitText("DICTATE")}
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-bold lowercase">
                  {splitText("the")}
                </span>
              </div>
            
              <div className="relative inline-flex flex-col items-center min-w-[140px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-[280px] xl:min-w-[320px]">
                <div 
                  ref={wordRollRef}
                  className="h-10 sm:h-12 md:h-14 lg:h-18 xl:h-20 overflow-hidden relative w-full"
                >
                  {WORDS.map((word, i) => (
                    <div 
                      key={i} 
                      className="word-item absolute inset-0 h-full w-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] italic font-bold uppercase tracking-tight opacity-60 pr-2"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
          </div>

          {/* LINE 3 & 4 (Mobile Cluster) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-1.5 sm:gap-y-0 sm:gap-x-3">
             <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[100px] font-bold uppercase py-1">
              {splitText("DOSE")}
            </span>
            
            <div className="flex items-center gap-x-3">
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[100px] font-bold py-1 tracking-[-0.05em]">
                {splitText("&")}
              </span>
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[100px] font-bold tracking-tighter uppercase py-1">
                {splitText("DEPLOY")}
              </span>
            </div>
          </div>
        </h1>

        {/* SUB-TEXT */}
        <div ref={subTextRef} className="relative mt-8 md:mt-12 flex flex-col items-center max-w-3xl opacity-0">
          <p className="text-black text-sm md:text-base lg:text-lg tracking-[0.05em] text-center mb-6 max-w-lg px-4 opacity-70">
             High-yield sports nutrition. Converting exact dietary payloads into kinetic energy.
          </p>

          <div className="w-10 h-[1px] bg-zinc-100 mb-6" />

          <p className="text-zinc-400 text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-center leading-loose font-bold">
             Human Performance Architecture
          </p>
        </div>
      </div>

      {/* CLASSY SCROLL ICON (ANCHOR) */}
      <div 
        ref={scrollIconRef}
        onClick={() => document.getElementById('propos')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-24 md:bottom-36 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 opacity-0 cursor-pointer"
      >
        <div className="relative w-6 h-10 md:w-7 md:h-12 border border-black/10 rounded-full flex justify-center py-2">
          <div className="scroll-line w-[1px] h-3 bg-black rounded-full" />
        </div>
        <span className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-20">Scroll</span>
      </div>

      {/* CIRCULAR "DISCOVER" TEXT (BOTTOM LEFT) */}
      <div className="absolute bottom-20 left-10 md:bottom-28 md:left-24 z-30 opacity-40 scale-75 md:scale-100">
        <div className="circular-text relative w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="text-[10px] font-bold uppercase tracking-[0.1em]">
                <textPath xlinkHref="#circlePath">
                  • BIO-KINETIC • EST. 1989 • ELITE PERFORMANCE •
                </textPath>
              </text>
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <div className="w-[1px] h-full bg-black/40" />
              <div className="absolute w-full h-[1px] bg-black/40" />
            </div>
        </div>
      </div>

      {/* SHALLOW S-CURVE BOTTOM TRANSITION (FLATTER) */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1440 100" 
          className="relative block w-full h-[60px] md:h-[80px]" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#000000" 
            d="M0,40 C360,90 1080,0 1440,50 V100 H0 Z"
          ></path>
        </svg>
      </div>

    </section>
  );
}
