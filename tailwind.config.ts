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
      },
      fontFamily: {
        tenor: ["var(--font-tenor-sans)"],
        sans: ["var(--font-inter)"],
        avenir: ["var(--font-avenir)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
