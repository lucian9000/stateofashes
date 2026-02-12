/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'inferno-orange': '#FF4500',
        'molten-gold': '#FFA500',
        'ember-glow': '#E67E22',
        'carbon-black': '#0F0F0F',
        'gunmetal-grey': '#2C3E50',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Microgramma', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
