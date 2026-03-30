"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Note: MorphSVGPlugin is a premium GSAP plugin. 
// If it is not loaded, this component will fallback to standard attribute interpolation 
// (which works here because the number of points in the paths are identical).
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"; 

const BiomarkerRadar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const polygonRef = useRef<SVGPathElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const labelsRef = useRef<SVGGElement>(null);

  const baseShape = "M250,210 L288,238 L273,283 L227,283 L212,238 Z";
  const optimizedShape = "M250,110 L383,190 L330,350 L170,350 L117,190 Z";
  const breatheStateA = "M250,115 L378,193 L325,345 L175,345 L122,193 Z";

  useEffect(() => {
    // Register plugin if it exists globally (as requested via <script> assumption)
    if (typeof window !== "undefined" && (window as any).MorphSVGPlugin) {
      gsap.registerPlugin((window as any).MorphSVGPlugin);
    }
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!polygonRef.current) return;

      const hasMorph = !!(gsap as any).plugins?.morphSVG;

      // 1. Setup Initial State
      if (hasMorph) {
        gsap.set(polygonRef.current, { morphSVG: baseShape, opacity: 0 });
      } else {
        gsap.set(polygonRef.current, { attr: { d: baseShape }, opacity: 0 });
      }

      gsap.set([gridRef.current, labelsRef.current], { opacity: 0 });

      // 2. The Reveal Timeline
      const revealTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => startBreathing(),
      });

      revealTL
        .to([gridRef.current, labelsRef.current], {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
        .to(polygonRef.current, {
          opacity: 1,
          duration: 0.5,
        }, "-=0.5")
        .to(polygonRef.current, {
          duration: 1.8,
          // Fallback to attr if MorphSVG is not registered
          ...(hasMorph ? { morphSVG: optimizedShape } : { attr: { d: optimizedShape } }),
          ease: "expo.out",
        });

      // 3. The "Breathing" Loop
      function startBreathing() {
        gsap.to(polygonRef.current, {
          duration: 3,
          ...(hasMorph ? { morphSVG: breatheStateA } : { attr: { d: breatheStateA } }),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-square max-w-[500px] mx-auto relative group">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {/* Radar Base Grid */}
        <g ref={gridRef} className="radar-grid">
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <path
              key={i}
              d={`M250,${(250 - 150 * scale).toFixed(2)} L${(250 + 142 * scale).toFixed(2)},${(250 - 46 * scale).toFixed(2)} L${(250 + 88 * scale).toFixed(2)},${(250 + 121 * scale).toFixed(2)} L${(250 - 88 * scale).toFixed(2)},${(250 + 121 * scale).toFixed(2)} L${(250 - 142 * scale).toFixed(2)},${(250 - 46 * scale).toFixed(2)} Z`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="0.5"
            />
          ))}
          {/* Axes Lines */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <line
              key={i}
              x1="250"
              y1="250"
              x2={(250 + 150 * Math.sin((angle * Math.PI) / 180)).toFixed(2)}
              y2={(250 - 150 * Math.cos((angle * Math.PI) / 180)).toFixed(2)}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Labels */}
        <g ref={labelsRef} className="radar-labels font-mono text-[10px] uppercase fill-white/40 tracking-widest">
            <text x="250" y="80" textAnchor="middle">Recovery</text>
            <text x="440" y="210" textAnchor="start">Hydration</text>
            <text x="360" y="420" textAnchor="start">Energy Output</text>
            <text x="140" y="420" textAnchor="end">Muscle Synthesis</text>
            <text x="60" y="210" textAnchor="end">Endurance</text>
        </g>

        {/* Data Polygon */}
        <path
          ref={polygonRef}
          className="data-polygon"
          fill="none"
          stroke="#00ffff"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))" }}
        />
        
        {/* Subtle Decorative Center Point */}
        <circle cx="250" cy="250" r="2" fill="white" opacity="0.2" />
      </svg>
      
      {/* Brutalist Label Overlay */}
      <div className="absolute top-0 left-0 p-4 border-l border-t border-white/5 pointer-events-none">
        <span className="text-[8px] uppercase tracking-[0.4em] text-cyan-500 font-bold">
            Biomarker.Telemetry_04
        </span>
      </div>
    </div>
  );
};

export default BiomarkerRadar;
