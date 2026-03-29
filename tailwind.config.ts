import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rekcal: {
          dark: "#070707",
          cyan: {
            DEFAULT: "#00ffff",
            muted: "rgba(0, 255, 255, 0.4)",
          }
        }
      },
      fontFamily: {
        tenor: ["var(--font-tenor-sans)"],
        sans: ["var(--font-inter)"],
        avenir: ["var(--font-avenir)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        'telemetry': '0.3em',
        'super-wide': '0.5em',
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 255, 255, 0.3)',
        'cyan-hyper': '0 0 25px rgba(0, 255, 255, 0.6)',
      },
      dropShadow: {
        'cyan-svg': '0 0 8px rgba(0, 255, 255, 0.5)',
      }
    },
  },
  plugins: [],
};

export default config;
