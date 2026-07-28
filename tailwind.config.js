/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1614',
        cream: '#f7f3ee',
        'cream-dark': '#ede7dc',
        gold: {
          DEFAULT: '#b8995a',
          light: '#d4b87a',
          dark: '#9a7d44',
        },
        stone: {
          50: '#faf8f5',
          100: '#f5f1ea',
          200: '#ece7dc',
          300: '#ddd5c6',
          400: '#c4b89e',
          500: '#a89e88',
          600: '#8a8270',
          700: '#6b6557',
          800: '#4a463c',
          900: '#2d2a24',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
