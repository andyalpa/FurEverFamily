/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            accent: {
                1: "hsl(288 68% 50%)",
                2: "hsl(180 62% 55%)",
            },
        },
    },
  },
  plugins: [],
}