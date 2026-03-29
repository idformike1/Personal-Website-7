/**
 * KINETIC ENGINE: Global Smooth Scrolling Provider
 * Mandate: Lenis synced to GSAP Ticker via useGSAP
 */
"use client";

import React from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register core animation plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  
  useGSAP(() => {
    // 1. Initialize Lenis for "Snellenberg" professional easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1.1, // Premium weight
      touchMultiplier: 2,
    });

    // 2. Synchronize ScrollTrigger with Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Connect Lenis to the GSAP Ticker for frame-perfect parity
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // 4. Critical: Disable lag smoothing to prevent bounce/stutter on heavy LCP components
    gsap.ticker.lagSmoothing(0);

    // Cleanup logic handled by useGSAP's automatic revert context
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, { dependencies: [] });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
