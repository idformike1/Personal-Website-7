"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
}

interface CellularEngineProps {
  particleCount?: number;
  interactionRadius?: number;
  baseSpeed?: number;
  connectionDistance?: number;
}

const CellularEngine: React.FC<CellularEngineProps> = ({
  particleCount = 80,
  interactionRadius = 150,
  baseSpeed = 0.5,
  connectionDistance = 120,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      const { width, height } = canvas;
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const vx = (Math.random() - 0.5) * baseSpeed;
        const vy = (Math.random() - 0.5) * baseSpeed;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          targetOpacity: 0.2,
        });
      }
      particlesRef.current = particles;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Metabolic Combustion Logic (Interaction)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < interactionRadius) {
          // Accelerate (Metabolic Combustion)
          const accelFactor = 4;
          p.vx += (p.baseVx * accelFactor - p.vx) * 0.1;
          p.vy += (p.baseVy * accelFactor - p.vy) * 0.1;
          p.targetOpacity = 0.8;
        } else {
          // Slow drift (Idle State)
          p.vx += (p.baseVx - p.vx) * 0.05;
          p.vy += (p.baseVy - p.vy) * 0.05;
          p.targetOpacity = 0.2;
        }

        // Smooth opacity transition
        p.opacity += (p.targetOpacity - p.opacity) * 0.1;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Boundary handling
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        
        // Add soft glow
        ctx.shadowBlur = dist < interactionRadius ? 15 : 5;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset glow for lines

        // Draw Connecting Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < connectionDistance) {
            const lineOpacity = (1 - ldist / connectionDistance) * (p.opacity + p2.opacity) / 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestRef.current = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    handleResize();
    requestRef.current = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [particleCount, interactionRadius, baseSpeed, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

export default CellularEngine;
