import React from "react";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import About from "@/components/sections/About";
import Expertises from "@/components/sections/Expertises";
import Collaborations from "@/components/sections/Collaborations";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Philosophy />
      <About />
      <Expertises />
      <Collaborations />
      <Testimonials />
      <Contact />
    </main>
  );
}
