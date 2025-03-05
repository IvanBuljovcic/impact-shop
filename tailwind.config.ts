import type { Config } from "tailwindcss";
// import tailwindAnimate from "tailwindcss-animate"

export default {
  // darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // plugins: [tailwindAnimate],
} satisfies Config;
