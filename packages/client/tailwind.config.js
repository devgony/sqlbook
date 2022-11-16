const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: _ => ({
        '5vh': '5vh',
        '95vh': '95vh',
      }),
      inset: _ => ({
        '5vh': '5vh',
        '95vh': '95vh',
      }),
      colors: {
        lime: colors.lime,
        orange: colors.orange,
        sky: colors.sky,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
