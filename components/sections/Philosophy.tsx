"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative min-h-[100vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Atmosphere (Simulating Video Peek) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black z-10" />
        <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
             {/* Large Atmospheric Background Overlay */}
             <div className="absolute w-[150%] h-[150%] opacity-20 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale blur-sm scale-110 animate-pulse duration-[10s]" />
             
             <div className="relative z-10 text-white/[0.03] text-[20vw] font-black uppercase tracking-[0.2em] select-none leading-none rotate-[-5deg]">
                REKCAL
             </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white/40 mb-8 block">
            Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-12">
            Peak performance <br />
            starts in the <span className="italic text-white/20">[GUT]</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed tracking-wide">
            We don't just count calories. We engineer metabolic pathways.
            Precision fueling for elite genetic potential.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
