import type { Metadata } from "next";
import { Inter, Tenor_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import FloatingAwards from "@/components/ui/FloatingAwards";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tenorSans = Tenor_Sans({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-tenor-sans"
});

const avenir = localFont({
  src: "./fonts/AvenirLTProMedium.woff",
  variable: "--font-avenir",
  weight: "500",
});

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
      <body className={`${inter.variable} ${tenorSans.variable} ${avenir.variable} antialiased bg-white text-black overflow-x-hidden font-sans`}>
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
