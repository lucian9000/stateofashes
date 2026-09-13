/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
 theme: { extend: { colors: { ember: '#F59E0B', burn: '#EA580C', ink: '#070709', slate: '#0F0F12' }, fontFamily: { sans: ['Manrope', 'sans-serif'], display: ['Barlow Condensed', 'sans-serif'], mono: ['IBM Plex Mono', 'monospace'] } } },
 plugins: [],
};
