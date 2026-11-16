/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      colors: {
        cream: '#FCF8F2',
        ivory: '#F6EEE3',
        sand: '#EADBC9',
        gold: { DEFAULT: '#A9814F', light: '#D8BC96', pale: '#EFE0CB', dark: '#8A6638' },
        bordeaux: { DEFAULT: '#4A1A22', soft: '#6B2A35', deep: '#2E0F15' },
        ink: '#2B1C1A',
        taupe: '#75625A',
      },
      letterSpacing: { luxe: '0.28em', wide2: '0.16em' },
      maxWidth: { site: '82rem' },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(74, 26, 34, 0.25)',
        card: '0 1px 0 rgba(169,129,79,.25), 0 30px 60px -40px rgba(74,26,34,.35)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        floaty: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-14px) rotate(2deg)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
