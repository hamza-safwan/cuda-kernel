import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "grid":
          "radial-gradient(circle at center, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;

