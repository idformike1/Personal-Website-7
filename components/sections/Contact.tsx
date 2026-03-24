"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    honeypot: "", // Bot trap
  });

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check for bot submission
    if (formData.honeypot) {
      console.warn("Bot detected via honeypot.");
      return; 
    }

    setIsSending(true);

    // Mock API Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert("Thank you! Your performance inquiry has been sent to the REKCAL team.");
    
    setFormData({ name: "", email: "", phone: "", message: "", consent: false, honeypot: "" });
    setIsSending(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left Aspect: Call to Action */}
        <div className="flex flex-col justify-start">
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-black mb-12">
              PREPARE YOUR <br /> PERFORMANCE
            </h2>
            <p className="text-black/80 uppercase tracking-widest text-sm max-w-sm leading-loose font-medium">
              An athletic goal? Need nutritional support? 
              Fill out the form and let's optimize your metabolism.
            </p>
          </div>
        </div>

        {/* Right Aspect: Minimalist Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 group">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Full Name *
            </label>
            <input
              required
              type="text"
              disabled={isSending}
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg disabled:opacity-50"
              placeholder="Ex: John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Email *
            </label>
            <input
              required
              type="email"
              disabled={isSending}
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg disabled:opacity-50"
              placeholder="Ex: contact@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Phone
            </label>
            <input
              type="tel"
              disabled={isSending}
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg disabled:opacity-50"
              placeholder="+91 000 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Your Message
            </label>
            <textarea
              rows={4}
              disabled={isSending}
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg resize-none disabled:opacity-50"
              placeholder="Describe your goals in a few words..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* GDPR Consent */}
          <div className="flex items-start gap-4">
            <input
              id="consent"
              required
              type="checkbox"
              disabled={isSending}
              className="mt-1 accent-zinc-950 disabled:opacity-50"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <label htmlFor="consent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
              I consent to the use of my personal data specifically for my contact request 
              and the resulting professional relationship with REKCAL.
            </label>
          </div>

          {/* Honeypot Field */}
          <div className="hidden pointer-events-none opacity-0 h-0 w-0">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className="w-fit bg-black text-white px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-zinc-800 transition-all hover:px-16 disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
