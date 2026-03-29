"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";

const METRICS = [
  { id: "ENG", label: "Energy Load", base: 45.2, unit: "%", range: 0.8 },
  { id: "MSY", label: "Muscle Synthesis", base: 32.7, unit: "%", range: 0.5 },
  { id: "SFU", label: "Sustained Fuel", base: 22.1, unit: "%", range: 0.4 },
  { id: "REC", label: "Recovery Index", base: 98.4, unit: "kCAL", range: 1.2 },
];

const MacronutrientMatrix = () => {
  const [displayValues, setDisplayValues] = useState<string[]>(METRICS.map(() => "00.0"));
  const [isScrambling, setIsScrambling] = useState<boolean[]>(METRICS.map(() => false));

  const scrambleValue = (index: number, duration: number = 800) => {
    setIsScrambling(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 1,
      duration: duration / 1000,
      ease: "power2.inOut",
      onUpdate: () => {
        setDisplayValues(prev => {
          const next = [...prev];
          // Scramble through realistic decimal biometrics (e.g., 12.4 -> 45.8)
          next[index] = (Math.random() * 100).toFixed(1);
          return next;
        });
      },
      onComplete: () => {
        setDisplayValues(prev => {
          const next = [...prev];
          next[index] = METRICS[index].base.toFixed(1);
          return next;
        });
        setIsScrambling(prev => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
      }
    });
  };

  // Initial Scramble
  useEffect(() => {
    METRICS.forEach((_, i) => {
      setTimeout(() => scrambleValue(i), i * 150);
    });
  }, []);

  // Continuous Ticking
  useEffect(() => {
    const intervals = METRICS.map((metric, i) => {
      return setInterval(() => {
        if (!isScrambling[i]) {
          const fluctuation = (Math.random() - 0.5) * metric.range;
          const newValue = (metric.base + fluctuation).toFixed(1);
          setDisplayValues(prev => {
            const next = [...prev];
            next[i] = newValue;
            return next;
          });
        }
      }, 2000 + Math.random() * 3000);
    });

    return () => intervals.forEach(clearInterval);
  }, [isScrambling]);

  return (
    <div className="w-full font-mono bg-[#070707] border border-white/10">
      <div className="grid grid-cols-2 gap-[1px] bg-white/10">
        {METRICS.map((metric, i) => (
          <div 
            key={metric.id}
            onMouseEnter={() => scrambleValue(i, 400)}
            className="bg-[#070707] p-8 md:p-12 group transition-colors duration-500 hover:bg-white/[0.02]"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                [{metric.id}]
              </span>
              <span className="text-zinc-700 text-[10px] uppercase tracking-[0.1em]">
                {metric.label}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter transition-all duration-300 ${isScrambling[i] ? 'text-zinc-500' : 'text-white'}`}>
                {displayValues[i]}
              </span>
              <span className="text-zinc-600 text-sm md:text-xl font-bold">
                {metric.unit}
              </span>
            </div>

            <div className="mt-8 flex gap-1 h-[2px] w-full bg-white/5 opacity-40 group-hover:opacity-100 transition-opacity overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-1000" 
                  style={{ width: `${(parseFloat(displayValues[i]) / (metric.id === 'ATP' ? 120 : 100)) * 100}%` }}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacronutrientMatrix;
