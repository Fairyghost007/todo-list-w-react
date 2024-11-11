/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#141124',
        lightPurple: '#2F2B43',
        palePurple: '#393351',
        purplle:'#524A7B',
        darkRose:'#A868A0',
        paleRose: {
          DEFAULT: '#D4CEE3',
          50: 'rgba(212, 206, 227, 0.5)',
          75: 'rgba(212, 206, 227, 0.75)',
          90: 'rgba(212, 206, 227, 0.9)',
        },
      },
    },
  },
  plugins: [],
};
