const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: defaultTheme.colors,
    },
  },
  plugins: [],
}
