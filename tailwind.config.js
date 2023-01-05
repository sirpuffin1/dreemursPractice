/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sleepy-purple': '#9f22f2',
        'nightly-purple': '#2f0047',
        'main-purple': '#070b34'
      },
      backgroundImage: {
        'auth-pattern': "url('/stacked-waves-haikei.png')"
      }
    },
  },
  plugins: [require("daisyui")],
}