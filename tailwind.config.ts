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
        cream: "#FDF8F0",
        "cream-dark": "#F5EDDF",
        saffron: "#E8722C",
        "saffron-light": "rgba(232, 114, 44, 0.08)",
        turmeric: "#F4A93A",
        marigold: "#F4D35E",
        forest: "#1F5C3F",
        "forest-light": "rgba(31, 92, 63, 0.08)",
        leaf: "#58A55C",
        ink: "#2A1E14",
        teal: "#1A7A6E",
      },
      boxShadow: {
        soft: "0 16px 45px rgba(42, 30, 20, 0.10)",
        card: "0 1px 4px rgba(42, 30, 20, 0.06), 0 4px 16px rgba(42, 30, 20, 0.04)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
