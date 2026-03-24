"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="accueil" className="relative h-screen w-full flex flex-col justify-center bg-white overflow-hidden pt-40 pb-40">
      {/* Editorial Aesthetic Accent - Circular Element */}
      <div className="absolute right-[-10%] top-[20%] w-[40vw] h-[40vw] bg-zinc-50 rounded-full -z-10 blur-3xl opacity-60" />
      <div className="absolute right-[5%] top-[25%] w-8 h-8 border border-zinc-200 rounded-full -z-10 animate-pulse" />

      {/* HERO CONTENT - MIXED TYPOGRAPHY */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-black font-black text-6xl md:text-8xl lg:text-[9rem] tracking-tighter uppercase leading-[0.8] mb-12 flex flex-col items-center">
            <span className="inline-block">NUTRITION</span>
            <span className="inline-block lowercase italic font-light tracking-normal text-6xl md:text-7xl lg:text-8xl py-4 opacity-40">
              expert &
            </span>
            <span className="inline-block">SPORTS</span>
            <span className="inline-block">PERFORMANCE</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center mt-12"
        >
          <p className="text-black/60 italic text-lg md:text-xl tracking-[0.2em] uppercase font-light">
            "Performance begins on the plate."
          </p>
          <span className="text-black/20 text-[10px] uppercase tracking-[0.5em] mt-8 font-bold">
            — REKCAL ELITE PERFORMANCE —
          </span>
        </motion.div>
      </div>

      {/* THE UPDATED WAVE (Shadow Effect Transitioning to #propos) */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1440 320" 
          className="relative block w-full h-[150px] md:h-[220px]" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#f9fafb" 
            d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,133.3C840,128,960,160,1080,170.7C1200,181,1320,171,1380,165.3L1440,160V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
