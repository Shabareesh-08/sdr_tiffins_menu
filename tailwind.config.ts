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
        saffron: "#E8722C",
        turmeric: "#F4A93A",
        marigold: "#F4D35E",
        forest: "#1F5C3F",
        leaf: "#58A55C",
        ink: "#2A1E14",
        teal: "#1A7A6E",
      },
      boxShadow: {
        soft: "0 16px 45px rgba(42, 30, 20, 0.10)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
