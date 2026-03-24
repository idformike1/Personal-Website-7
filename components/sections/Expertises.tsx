"use client";

import React from "react";
import { SERVICES } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Expertises() {
  return (
    <section id="prestations" className="py-24 md:py-32 bg-zinc-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.85] text-black">
            OUR PERFORMANCE <br /> EXPERTISE
          </h2>
          <p className="text-black text-sm uppercase tracking-widest font-bold ml-2">
            Advanced Nutritional Optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-zinc-200">
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
              className="group relative p-12 border-r border-b border-zinc-200 transition-all duration-700 hover:bg-zinc-950"
            >
              <div className="flex flex-col h-full">
                <span className="block text-5xl mb-12 font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-white/0 group-hover:from-white/10 group-hover:to-white/0 transition-colors">
                  {String(service.id).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-black uppercase mb-6 tracking-tighter group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-black text-sm leading-relaxed group-hover:text-white transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <button className="px-12 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors">
            Discover all our services
          </button>
        </motion.div>
      </div>
    </section>
  );
}
