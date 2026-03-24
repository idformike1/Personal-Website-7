"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[100]"
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
                onClick={() => setShow(false)}
                className="flex-1 border border-black/10 text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:bg-zinc-50 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
