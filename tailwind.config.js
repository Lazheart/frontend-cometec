import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e66414",
        secondary: "#ff914d",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
});
