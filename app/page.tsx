import React from "react";
import Hero from "@/components/sections/Hero";
import Expertises from "@/components/sections/Expertises";
import Collaborations from "@/components/sections/Collaborations";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Expertises />
      <Collaborations />
      <Testimonials />
      <Contact />
    </main>
  );
}
