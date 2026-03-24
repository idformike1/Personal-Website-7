import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScroll";
import FloatingAwards from "@/components/ui/FloatingAwards";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REKCAL | Elite Sports Nutrition & Performance",
  description: "India's premier sports nutrition experts supporting 10,000+ high-level athletes worldwide with metabolic analysis and performance dieting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-black overflow-x-hidden`}>
        <SmoothScrollProvider>
          <Header />
          <FloatingAwards />
          <CookieBanner />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
