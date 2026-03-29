"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function useTextReveal(options: gsap.TweenVars = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    // Automatically split text for high-end editorial feel
    const text = new SplitType(containerRef.current, { types: 'lines,words' });

    gsap.from(text.words, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out',
      ...options // Allow overrides
    });

    // Strict cleanup rule enforced
    return () => {
      text.revert();
    };
  }, { scope: containerRef });

  return containerRef;
}
