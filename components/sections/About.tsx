"use client";

import React from "react";
import { motion } from "framer-motion";
import { ABOUT } from "@/lib/constants";

export default function About() {
  return (
    <section id="propos" className="py-24 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Text Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none text-white">
                {ABOUT.title}
              </h2>
              <p className="text-xl font-bold uppercase tracking-wider text-white mb-8">
                {ABOUT.subtitle}
              </p>
              <div className="h-1 w-20 bg-white mb-8" />
              <p className="text-lg text-white leading-relaxed mb-12">
                {ABOUT.description}
              </p>

              <div className="grid grid-cols-2 gap-8">
                {ABOUT.stats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-widest text-white/50 font-bold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Modern Aesthetic Element */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square w-full max-w-md mx-auto"
            >
              {/* Geometric Background - Bold White Circle */}
              <div className="absolute inset-0 bg-white rounded-full shadow-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-black/5 rounded-full" />
              
              {/* Floating Content Mimicking REKCAL's Style */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-12 text-center"
              >
                <span className="text-8xl font-black text-black select-none leading-none uppercase">
                  REK<br />CAL
                </span>
              </motion.div>
              
              {/* Accents */}
              <div className="absolute top-0 right-10 w-4 h-4 bg-white" />
              <div className="absolute bottom-10 left-0 w-8 h-[1px] bg-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
