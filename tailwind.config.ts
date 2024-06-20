import daisyui from "daisyui";
import flowbite from "flowbite/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [daisyui, flowbite],
};

export default config;
