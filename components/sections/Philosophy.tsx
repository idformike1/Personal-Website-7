"use client";
import React, { useRef, useEffect } from "react";

export default function Philosophy() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay blocked by browser:", error);
      });
    }
  }, []);

  return (
    <section 
      id="philosophy" 
      className="relative w-full aspect-video bg-white overflow-hidden -mt-[1px]"
    >
      {/* Full-bleed background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="https://static.vecteezy.com/system/resources/previews/039/634/776/mp4/a-variety-of-nuts-fall-on-the-table-filmed-on-a-high-speed-camera-at-1000-fps-high-quality-fullhd-footage-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 
        White curve overlay — 4 equidistant points: 
        A(0, 0)  B(360, 60)  C(720, 20)  D(1080, 40)
      */}
      <div className="absolute top-0 left-0 w-full h-[100px] z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,0 H1440 V20 C1320,20 1200,40 1080,40 C960,40 840,20 720,20 C600,20 480,60 360,60 C240,60 120,0 0,0 Z"
          />
        </svg>
      </div>
    </section>
  );
}
