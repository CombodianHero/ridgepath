import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#2563EB",
          indigo: "#4F46E5",
          purple: "#7C3AED",
          green: "#16A34A",
          orange: "#EA580C",
          red: "#DC2626",
        },
      },
    },
  },
  plugins: [],
};

export default config;
