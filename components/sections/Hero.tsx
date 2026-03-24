"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none scale-105"
      >
        <source
          src="https://cdn.pixabay.com/video/2021/08/04/83901-584742468_large.mp4"
          type="video/mp4"
        />
        <div className="absolute inset-0 bg-zinc-900" />
      </video>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Content Foreground */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="text-white font-bold text-4xl md:text-7xl lg:text-9xl tracking-tighter uppercase max-w-7xl mx-auto leading-[0.8] mb-12">
            AGENCE de COMMUNICATION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              CRÉATIVE & HUMAINE
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
            "L'élégance dépasse le temps."
          </blockquote>
          <cite className="text-white/40 not-italic text-[10px] uppercase tracking-[0.3em] mt-8">
            — Armani
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
