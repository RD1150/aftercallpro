/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0b1524",
        cyan: "#22d3ee",
        graylight: "#f8fafc",
        graydark: "#1e293b",
      },
    },
  },
  plugins: [],
};
