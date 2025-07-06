/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#FACC15',
        neutral: '#f9f9f9'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
