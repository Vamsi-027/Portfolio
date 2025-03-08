/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ["Pixelify Sans", "cursive"],
        silkscreen: ["Silkscreen", "sans-serif"],
      },
    },
  },
  plugins: [],
}

