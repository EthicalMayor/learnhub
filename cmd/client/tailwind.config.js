/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'light-blue': '#ADD8E6', // 
        'cream': '#FFFDD0', // Added color to tailwind.config.js
      },
    },
  },
  plugins: [],
}