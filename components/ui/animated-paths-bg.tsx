"use client";

import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function FloatingPaths() {
    const paths = useMemo(() => Array.from({ length: 10 }, (_, i) => {
        // SVG Viewbox: "0 0 696 316"
        // Emergence from the left - Max 10 Lines
        // variety purely based on index 'i' to ensure purity for React lint rules
        const startX = 0;
        const startY = 40 + (i * 12);
        
        const centerX = 348; 
        const impactY = 230 + (i * 4);

        const endX = 348;
        const endY = 270;

        // Deterministic variety instead of Math.random
        const ctrlX1 = 120 + (i * 10);
        const ctrlY1 = startY;
        const ctrlX2 = centerX;
        const ctrlY2 = impactY - 40;

        return {
            id: i,
            d: `M ${startX} ${startY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${endX} ${endY}`,
            strokeWidth: 0.6 + i * 0.05,
            targetOpacity: 0.25 
        };
    }), []);

    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        if (!svgRef.current) return;

        const pathElements = svgRef.current.querySelectorAll("path");
        
        pathElements.forEach((path, index) => {
            const length = (path as SVGPathElement).getTotalLength();
            const { targetOpacity } = paths[index];

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0
            });

            const tl = gsap.timeline({
                repeat: -1,
                delay: index * 0.8, // Deterministic staggering
                repeatDelay: (index % 3) * 0.5
            });

            tl.to(path, {
                strokeDashoffset: length * 0.3,
                opacity: targetOpacity,
                duration: 5 + (index % 4),
                ease: "power1.out"
            });

            tl.to(path, {
                strokeDashoffset: -length,
                duration: 5 + (index % 3),
                ease: "power2.in"
            }, "-=" + 0.5);

            tl.to(path, {
                opacity: 0,
                duration: 4 + (index % 2),
                ease: "power2.in"
            }, ">-40%");
        });
    }, { scope: svgRef });

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 696 316"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
        >
            {paths.map((path) => (
                <path
                    key={path.id}
                    d={path.d}
                    stroke="black"
                    strokeWidth={path.strokeWidth}
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
}

export function AnimatedPathsBg() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[0]">
            <FloatingPaths />
        </div>
    );
}
