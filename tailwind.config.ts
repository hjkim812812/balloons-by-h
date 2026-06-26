import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF8F5",
          deep: "#F3EFE8",
        },
        blush: {
          DEFAULT: "#E8D5D0",
          light: "#F5EBE8",
        },
        champagne: {
          DEFAULT: "#C9A962",
          dark: "#A8894A",
          muted: "#D4C4A8",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          soft: "#5A5A5A",
          muted: "#8A8A8A",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.18em",
        wide: "0.12em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
