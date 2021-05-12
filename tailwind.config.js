const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
        brand: ["Poppins", "Inter", "Roboto", "sans-serif"]
      },
      colors: {
        orange: colors.orange,
      }
    },
  },
  variants: {},
  plugins: [],
}
