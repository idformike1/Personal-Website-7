"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted locally:", formData);
    alert("Merci pour votre message ! (Mock submission)");
    setFormData({ nom: "", email: "", telephone: "", message: "", consent: false });
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left Aspect: Call to Action */}
        <div className="flex flex-col justify-start">
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-zinc-950 mb-12">
              PRENONS <br /> RENDEZ-VOUS
            </h2>
            <p className="text-zinc-500 uppercase tracking-widest text-sm max-w-sm leading-loose">
              Un projet digital ? Une vision créative ? 
              Remplissez le formulaire et créons ensemble l'expérience de demain.
            </p>
          </div>
        </div>

        {/* Right Aspect: Minimalist Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 group">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Nom / Prénom *
            </label>
            <input
              required
              type="text"
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg"
              placeholder="Ex: Jean Dupont"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Email *
            </label>
            <input
              required
              type="email"
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg"
              placeholder="Ex: contact@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Téléphone
            </label>
            <input
              type="tel"
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg"
              placeholder="+33 0 00 00 00 00"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Votre Message
            </label>
            <textarea
              rows={4}
              className="bg-transparent border-b border-zinc-200 py-3 focus:outline-none focus:border-zinc-950 transition-colors text-lg resize-none"
              placeholder="Décrivez votre projet en quelques mots..."
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
              className="mt-1 accent-zinc-950"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <label htmlFor="consent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
              Je consens à l'exploitation de mes données personnelles dans le cadre de ma demande 
              de contact et de la relation commerciale qui peut en découler.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-fit bg-zinc-950 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all hover:px-16"
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
