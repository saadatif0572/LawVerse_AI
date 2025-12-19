/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'law-dark': '#051b3d', /* very dark blue background */
        'law-darker': '#0d2a52', /* dark blue */
        'law-card': '#0d47a1', /* primary blue cards */
        'law-accent': '#00d4ff', /* cyan accent */
        'law-light': '#64b5f6', /* light blue text */
        'law-muted': '#42a5f5', /* muted blue */
        'law-primary': '#0d47a1', /* primary */
        'law-secondary': '#00d4ff', /* cyan accent */
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
