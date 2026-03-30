"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { AnimatedPathsBg } from "@/components/ui/animated-paths-bg";

const WORDS = ["INTAKE", "UPTAKE", "OUTPUT"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRollRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  const kineticTweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollTlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
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

      if (splits.length > 0) {
        splits.forEach(s => s.chars && gsap.set(s.chars, { yPercent: -100, opacity: 0 }));
        
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
            yPercent: 100,
            opacity: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "expo.in",
          });
        });
      }

      kineticTweenRef.current = gsap.to(".circular-text", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Option 3: Liquid Scale Animation
      const scrollTl = gsap.timeline({ repeat: -1 });
      scrollTl.fromTo(".scroll-dot", 
        { scale: 0.8, opacity: 0.3 },
        { scale: 1.2, opacity: 0.6, duration: 1, yoyo: true, repeat: 1, ease: "sine.inOut" }
      );
      scrollTl.fromTo(".scroll-line",
        { scaleY: 0, transformOrigin: "top", opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
      scrollTl.to(".scroll-line", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      });
      scrollTlRef.current = scrollTl;

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleKineticHover = (hover: boolean) => {
    if (kineticTweenRef.current) {
      gsap.to(kineticTweenRef.current, { timeScale: hover ? 2 : 1, duration: 0.6, ease: "power3.out" });
    }
  };

  const handleScrollHover = (hover: boolean) => {
    if (scrollTlRef.current) {
      gsap.to(scrollTlRef.current, { timeScale: hover ? 2 : 1, duration: 0.6, ease: "power3.out" });
    }
  };

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
      className="relative min-h-[30vh] md:min-h-[45vh] w-full overflow-hidden flex items-start justify-center bg-white pt-[6vh] md:pt-[10vh]"
    >
      <AnimatedPathsBg />
      <div className="container mx-auto flex flex-col items-center text-center max-w-7xl relative z-10">
        
        {/* MAIN HEADLINE */}
        <h1 
          ref={headlineRef} 
          className="flex flex-col items-center leading-[0.7] gap-y-2 sm:gap-y-1.25 mb-10 md:mb-16"
        >
          {/* ROW 1: DICTATE the [WORDROLL] (Split into 2 lines on mobile, bottom-aligned on desktop) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-y-2 sm:gap-y-0 gap-x-2 sm:gap-x-6">
              <div className="flex items-end gap-x-2 sm:gap-x-6 pb-[2px] sm:pb-0">
                <span className="text-[38px] sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-bold tracking-tighter uppercase whitespace-nowrap leading-none">
                  {splitText("DICTATE")}
                </span>
                <span className="text-[34px] sm:text-3xl md:text-4xl lg:text-[50px] xl:text-[58px] font-normal lowercase leading-none">
                  {splitText("the")}
                </span>
              </div>
            
              <div className="relative inline-flex flex-col items-center min-w-[170px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-[280px] xl:min-w-[320px]">
                <div 
                  ref={wordRollRef}
                  className="h-[44px] sm:h-12 md:h-14 lg:h-18 xl:h-16 overflow-hidden relative w-full"
                >
                  {WORDS.map((word, i) => (
                    <div 
                      key={i} 
                      className="word-item absolute inset-0 h-full w-full flex items-end justify-center sm:justify-start text-[38px] sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] italic font-bold uppercase tracking-tight opacity-60 pr-2 leading-none"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
          </div>

          {/* ROW 2: DOSE & DEPLOY (Split into 'DOSE &' and 'DEPLOY' on mobile) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-y-2 sm:gap-y-0 gap-x-2 sm:gap-x-6">
            <div className="flex items-end gap-x-2 sm:gap-x-4 pb-[2px] sm:pb-0">
              <span className="text-[50px] sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[100px] font-bold uppercase py-1 leading-none">
                {splitText("DOSE")}
              </span>
              <span className="text-[32px] sm:text-3xl md:text-5xl lg:text-[68px] xl:text-[76px] font-medium py-1 tracking-[-0.05em] opacity-40 inline-block leading-none translate-y-[-10%] sm:translate-y-0">
                {splitText("&")}
              </span>
            </div>
            
            <span className="text-[50px] sm:text-5xl md:text-7xl lg:text-[88px] xl:text-[100px] font-bold tracking-tighter uppercase py-1 leading-none">
              {splitText("DEPLOY")}
            </span>
          </div>
        </h1>

        {/* SUB-TEXT - Centered for All Modes per User Request */}
        <div ref={subTextRef} className="relative flex flex-col items-center max-w-2xl mx-auto opacity-0 px-6">
          <p className="text-black text-sm md:text-base lg:text-lg font-semibold tracking-[0.05em] text-center mb-6 opacity-70">
             High-yield sports nutrition. Converting dietary payloads into kinetic energy.
          </p>

          <div className="w-10 h-[1px] bg-zinc-200 mb-6" />

          <p className="text-zinc-500 text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-center leading-relaxed font-bold">
             Human Performance Architecture
          </p>
        </div>

        {/* Circular Icon - Surgically placed below text, aligned left to headline axis */}
        <div 
          onMouseEnter={() => handleKineticHover(true)}
          onMouseLeave={() => handleKineticHover(false)}
          className="mt-4 sm:mt-8 md:mt-12 self-start ml-4 sm:ml-6 md:ml-12 lg:ml-20 z-40 opacity-40 scale-75 md:scale-100 transition-opacity duration-300 hover:opacity-100 cursor-default"
        >
          <div className="circular-text relative w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="text-[10px] uppercase tracking-[0.1em]" fill="black">
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
      </div>
      {/* SCROLL INDICATOR - Option 3: Liquid Scale (Reduced 25%) */}
      <button 
        onClick={() => document.getElementById('propos')?.scrollIntoView({ behavior: 'smooth' })}
        onMouseEnter={() => handleScrollHover(true)}
        onMouseLeave={() => handleScrollHover(false)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center group z-50 cursor-pointer"
      >
        <div className="flex flex-col items-center mb-1.5">
           <div className="scroll-dot w-1 h-1 bg-black rounded-full mb-1 opacity-40 group-hover:opacity-100 transition-opacity" />
           <div className="w-[1px] h-9 bg-black/5 relative overflow-hidden">
              <div className="scroll-line absolute top-0 left-0 w-full h-full bg-black/40 origin-top" />
           </div>
        </div>
        <span className="text-[7px] uppercase tracking-[0.6em] opacity-20 group-hover:opacity-60 transition-opacity font-bold mt-1 translate-x-[0.3em]">
          Scroll
        </span>
      </button>

    </section>
  );
}
