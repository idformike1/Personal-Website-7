"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Replace Video */}
      <Image
        src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1920&q=80"
        alt="Nutrition & Sports Performance"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none scale-105"
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Content Foreground */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="text-white font-black text-5xl md:text-8xl lg:text-9xl tracking-tighter uppercase max-w-7xl mx-auto leading-[0.8] mb-12">
            EXPERT NUTRITION & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              SPORTS PERFORMANCE
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <blockquote className="text-gray-200 italic text-xl md:text-2xl font-light tracking-wide max-w-2xl px-4">
            "La performance commence dans l'assiette."
          </blockquote>
          <cite className="text-white/40 not-italic text-[10px] uppercase tracking-[0.3em] mt-8">
            — Elite Nutrition Coach
          </cite>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-20" />
      </motion.div>
    </section>
  );
}
