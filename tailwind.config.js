/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1a6b3a',
          50: '#eff7f1',
          100: '#d8eee0',
          200: '#b2dcc2',
          500: '#1a6b3a',
          600: '#155a30',
          700: '#104626',
        },
        cream: {
          DEFAULT: '#faf7f0',
          50: '#fefdfb',
          100: '#faf7f0',
          200: '#f3ede0',
        },
        festive: {
          DEFAULT: '#b91c1c',
          50: '#fef2f2',
          500: '#b91c1c',
          600: '#991b1b',
        },
        gold: '#c9a227',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
