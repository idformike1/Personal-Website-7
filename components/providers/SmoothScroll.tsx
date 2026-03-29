"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // 1. Force ScrollTrigger to update on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Bind Lenis to GSAP's internal ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis needs ms
    };
    gsap.ticker.add(tickerUpdate);

    // 3. Disable GSAP lag smoothing to prevent visual stutter on heavy loads
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
