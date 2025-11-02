/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-maroon': '#8C1D18',
        'brand-yellow': '#FDF4D9',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
        'times': ['Times New Roman', 'serif'],
      },
      animation: {
        'marquee-rtl': 'marquee-rtl 25s linear infinite',
      },
      keyframes: {
        'marquee-rtl': {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
