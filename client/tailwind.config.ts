import type { Config } from "tailwindcss";
<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: "class",
=======

const config: Config = {
>>>>>>> story_controller_1
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
