"use client";

import React from "react";
import { PORTFOLIO } from "@/lib/constants";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Collaborations() {
  return (
    <section id="realisations" className="py-32 bg-white">
      <div className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.75] text-zinc-950">
            NOS <br /> COLLABORATIONS <br /> CRÉATIVES
          </h2>
        </motion.div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {PORTFOLIO.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.1 
            }}
            className="group relative aspect-square overflow-hidden bg-zinc-100 cursor-pointer"
          >
            {/* Project Image */}
            <div className="w-full h-full relative transition-transform duration-1000 group-hover:scale-105">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] p-12 text-center pointer-events-none">
              <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-6">
                {project.category}
              </span>
              <h3 className="text-white text-4xl font-bold uppercase tracking-tighter leading-tight mb-8">
                {project.title}
              </h3>
              <div className="w-12 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
