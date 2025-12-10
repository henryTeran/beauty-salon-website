/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      colors: {
        luxury: {
          black: '#0A0A0A',
          'black-soft': '#1A1A1A',
          gold: '#D4AF37',
          'gold-light': '#F4E5C2',
          'gold-dark': '#B8941F',
          white: '#FAFAFA',
          cream: '#F8F6F0',
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#fefce8",
          100: "#F4E5C2",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#D4AF37",
          600: "#ca8a04",
          700: "#B8941F",
          800: "#854d0e",
          900: "#713f12",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#1A1A1A",
          900: "#0A0A0A",
        },
        light: "#FAFAFA",
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out',
        'fade-in-up': 'fadeInUp 1.2s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'lotus-pulse': 'lotusPulse 10s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        lotusPulse: {
          '0%, 100%': { opacity: '0.03', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.08', transform: 'scale(1.05) rotate(2deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 4px 15px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 8px 25px rgba(212, 175, 55, 0.4)',
        'luxury': '0 10px 40px rgba(212, 175, 55, 0.15)',
        'luxury-hover': '0 15px 60px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};