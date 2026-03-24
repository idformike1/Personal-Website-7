"use client";

import React from "react";
import { SERVICES } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Expertises() {
  return (
    <section id="prestations" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.85] text-zinc-950">
            LES EXPERTISES <br /> OROYA
          </h2>
          <p className="text-zinc-400 text-sm uppercase tracking-widest font-semibold ml-2">
            Des solutions numériques audacieuses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-zinc-100">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1 
              }}
              className="group relative p-12 border-r border-b border-zinc-100 transition-all duration-700 hover:bg-zinc-950"
            >
              <div className="flex flex-col h-full">
                <span className="block text-5xl mb-12 font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-white/0 group-hover:from-white/10 group-hover:to-white/0 transition-colors">
                  {String(service.id).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold uppercase mb-6 tracking-tighter group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-500 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
