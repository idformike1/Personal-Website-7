"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function FloatingPaths() {
    const paths = Array.from({ length: 10 }, (_, i) => {
        // SVG Viewbox: "0 0 696 316"
        // Emergence from the left only - Max 10 Lines
        const startX = 0;
        const startY = 40 + (i * 12);
        
        const centerX = 348; // Exactly horizontal center
        const impactY = 230 + (i * 2);

        // Target exactly 2px ABOVE the top scroll dot (y=270 for precise vertical clarity)
        const endX = 348;
        const endY = 270;

        // Path logic (Left to synchronized scroll dot area)
        const ctrlX1 = 120 + (Math.random() * 60);
        const ctrlY1 = startY;
        const ctrlX2 = centerX;
        const ctrlY2 = impactY - 40;

        return {
            id: i,
            d: `M ${startX} ${startY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${endX} ${endY}`,
            strokeWidth: 0.6 + i * 0.05,
            targetOpacity: 0.25 // Subtle 25% peak opacity
        };
    });

    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        if (!svgRef.current) return;

        const pathElements = svgRef.current.querySelectorAll("path");
        
        pathElements.forEach((path, index) => {
            const length = (path as SVGPathElement).getTotalLength();
            const { targetOpacity } = paths[index];

            // Setup: Line is exactly length, but offset is 'length' (hidden)
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0
            });

            // Timeline for emergence from the left with convergence on scroll dot
            const tl = gsap.timeline({
                repeat: -1,
                delay: Math.random() * 8,
                repeatDelay: Math.random() * 2
            });

            // 1. Emerge and Reach Peak Opacity
            tl.to(path, {
                strokeDashoffset: length * 0.3, // Move 70% of the way
                opacity: targetOpacity,
                duration: 5 + Math.random() * 2,
                ease: "power1.out"
            });

            // 2. Start Progressive Fade as it reaches the scroll dot
            tl.to(path, {
                strokeDashoffset: -length, // Complete the full travel
                duration: 5 + Math.random() * 2,
                ease: "power2.in"
            }, "-=" + 0.5);

            // Layered Opacity Fade (Parallel to travel - conclude at impact)
            tl.to(path, {
                opacity: 0,
                duration: 4 + Math.random() * 2,
                ease: "power2.in"
            }, ">-40%"); // Ensure concluding fade as it hits the scroll dot
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
