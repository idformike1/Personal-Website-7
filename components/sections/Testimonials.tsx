"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-20 leading-none text-zinc-950 text-center">
          LES TÉMOIGNAGES <br /> DE NOS CLIENTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col h-full bg-white p-10 border border-zinc-100 shadow-sm transition-transform hover:-translate-y-2 duration-500">
              <div className="text-zinc-300 text-6xl font-serif leading-none mb-6">“</div>
              <blockquote className="text-zinc-600 text-lg leading-relaxed italic flex-grow mb-8">
                {testimonial.quote}
              </blockquote>
              <div className="mt-auto">
                <p className="text-zinc-950 font-bold uppercase tracking-tighter text-sm">
                  {testimonial.name}
                </p>
                <p className="text-zinc-400 uppercase tracking-widest text-[10px] mt-1 font-medium">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
