/**
 * REFERENCE COMPONENT: "Technical Aesthetic" Parallax Section
 * Use this exact pattern for complex GSAP ScrollTrigger animations, About sections, or Footer reveals.
 * Rules Demonstrated: @gsap/react scope, ScrollTrigger cleanup, early returns, Tailwind v4.
 */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

// Register plugins once outside the component lifecycle
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxAboutProps {
  heading: string;
  subheading?: string;
  imageUrl: string;
}

export default function ParallaxAbout({ heading, subheading, imageUrl }: ParallaxAboutProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Pattern: Strict useGSAP with dependencies and scope for memory safety
  useGSAP(() => {
    // Defensive check: Ensure DOM elements exist before animating
    if (!textWrapperRef.current || !imageRef.current) return;

    // 1. Staggered Text Reveal
    const chars = textWrapperRef.current.querySelectorAll(".char");
    if (chars.length) {
      gsap.from(chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: "100%",
        opacity: 0,
        rotate: 5,
        stagger: 0.02,
        duration: 1.2,
        ease: "power4.out",
      });
    }

    // 2. Technical Parallax Image Effect
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef, dependencies: [heading] });

  // Pattern: Early return
  if (!heading || !imageUrl) return null;

  return (
    <section 
      ref={containerRef} 
      className={cn(
        "relative flex min-h-screen w-full items-center justify-between overflow-hidden bg-background px-8 py-24",
        "border-t border-border/50" // Technical separator
      )}
    >
      {/* Content Side */}
      <div ref={textWrapperRef} className="z-10 flex w-1/2 flex-col gap-6 mix-blend-difference">
        {subheading && (
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
            {subheading}
          </span>
        )}
        <h2 className="text-balance text-6xl font-medium tracking-tight md:text-8xl flex flex-wrap clip-path-polygon-[0_0_100%_0_100%_100%_0_100%]">
          {/* Split text manually or use SplitText plugin in reality */}
          {heading.split("").map((char, i) => (
            <span key={i} className="char inline-block translate-y-0">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </div>

      {/* Image Parallax Side */}
      <div className="absolute right-0 top-0 h-[120%] w-[45%] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={imageUrl}
          alt={heading}
          className="h-full w-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
    </section>
  );
}
