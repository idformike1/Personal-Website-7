/**
 * REKCAL COOKIE BANNER - Architectural Refactor
 * Migration: framer-motion (AnimatePresence) -> GSAP
 */
"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const isExiting = useRef(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    let timer: NodeJS.Timeout | undefined;
    
    if (!hasConsented) {
      timer = setTimeout(() => setShow(true), 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useGSAP(() => {
    if (show && bannerRef.current && !isExiting.current) {
      gsap.fromTo(bannerRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
    }
  }, [show]);

  const handleExitingState = (callback: () => void) => {
    if (!bannerRef.current) return;
    isExiting.current = true;
    gsap.to(bannerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power4.in",
      onComplete: () => {
        isExiting.current = false;
        callback();
      }
    });
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    handleExitingState(() => setShow(false));
  };

  const handleClose = () => {
    handleExitingState(() => setShow(false));
  };

  if (!show) return null;

  return (
    <div
      ref={bannerRef}
      className={cn(
        "fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[100]",
        "opacity-0 translate-y-[100px]" // Initial hide before GSAP takes over
      )}
    >
      <div className="bg-white border border-black/10 shadow-2xl p-8 rounded-2xl flex flex-col gap-6">
        <h4 className="font-black uppercase tracking-tighter text-lg leading-none">
          Respect for your privacy
        </h4>
        <p className="text-sm text-zinc-500 leading-relaxed uppercase tracking-wide">
          We use cookies to optimize your experience and analyze our traffic.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="flex-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:bg-zinc-800 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleClose}
            className="flex-1 border border-black/10 text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:bg-zinc-50 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
