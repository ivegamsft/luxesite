import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "aurora-dark": "#0a0a0f",
        "aurora-darker": "#050508",
        "aurora-cyan": "#00e5ff",
        "aurora-purple": "#8b5cf6",
        "aurora-magenta": "#d946ef",
        "aurora-gold": "#fbbf24",
        "aurora-white": "#f0f0f5",
        "aurora-glass": "rgba(255,255,255,0.05)",
        "aurora-glass-border": "rgba(255,255,255,0.1)",
      },
      backgroundImage: {
        "gradient-aurora": "linear-gradient(135deg, #00e5ff, #8b5cf6, #d946ef)",
        "gradient-aurora-subtle":
          "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(139,92,246,0.15), rgba(217,70,239,0.15))",
      },
      backdropBlur: {
        glass: "16px",
        "glass-lg": "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        glow: "0 0 20px rgba(0,229,255,0.3)",
        "glow-purple": "0 0 20px rgba(139,92,246,0.3)",
      },
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '2560px',
      },
      keyframes: {
        "aurora-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "aurora-pulse": "aurora-pulse 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
