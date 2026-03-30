"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ABOUT } from "@/lib/constants";

const MacronutrientMatrix = () => {
  // Extract stats from constants
  const METRICS = ABOUT.stats.map(stat => {
    const cleanValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
    const suffix = stat.value.replace(/[0-9.]/g, '');
    return {
      id: stat.label.split(' ').map(w => w[0]).join('').toUpperCase(),
      label: stat.label,
      base: cleanValue,
      unit: suffix,
      range: cleanValue * 0.05 // Subtle fluctuation for realism
    };
  });

  const [displayValues, setDisplayValues] = useState<string[]>(METRICS.map(m => m.base.toString()));
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
          // Determine if it's an integer or float based on base
          const isInt = Number.isInteger(METRICS[index].base);
          const randomVal = Math.random() * (METRICS[index].base * 1.5);
          next[index] = isInt ? Math.floor(randomVal).toString() : randomVal.toFixed(1);
          return next;
        });
      },
      onComplete: () => {
        setDisplayValues(prev => {
          const next = [...prev];
          next[index] = METRICS[index].base.toString();
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

  useEffect(() => {
    METRICS.forEach((_, i) => {
      setTimeout(() => scrambleValue(i), i * 150);
    });
  }, []);

  useEffect(() => {
    const intervals = METRICS.map((metric, i) => {
      return setInterval(() => {
        if (!isScrambling[i]) {
          const isInt = Number.isInteger(metric.base);
          const fluctuation = (Math.random() - 0.5) * metric.range;
          const newValue = (metric.base + fluctuation);
          setDisplayValues(prev => {
            const next = [...prev];
            next[i] = isInt ? Math.floor(newValue).toString() : newValue.toFixed(1);
            return next;
          });
        }
      }, 3000 + Math.random() * 2000);
    });

    return () => intervals.forEach(clearInterval);
  }, [isScrambling]);

  return (
    <div className="w-full font-mono bg-[#070707] border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 shadow-2xl">
        {METRICS.map((metric, i) => (
          <div 
            key={metric.id}
            onMouseEnter={() => scrambleValue(i, 400)}
            className="bg-[#070707] p-4 lg:p-6 group transition-colors duration-500 hover:bg-white/[0.02] flex flex-col justify-between h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] font-medium">
                [{metric.id}]
              </span>
              <span className="text-zinc-500 text-[8px] uppercase tracking-[0.1em] font-bold opacity-60">
                {metric.label}
              </span>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter transition-all duration-300 ${isScrambling[i] ? 'text-cyan-500' : 'text-white'}`}>
                {displayValues[i]}
              </span>
              <span className="text-zinc-700 text-xs lg:text-base font-black uppercase">
                {metric.unit}
              </span>
            </div>

            <div className="mt-6 flex gap-1 h-[1.5px] w-full bg-white/5 opacity-40 group-hover:opacity-100 transition-opacity overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-1000" 
                  style={{ width: `${(parseFloat(displayValues[i]) / (metric.base * 1.5)) * 100}%` }}
                />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacronutrientMatrix;
