/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c0daff',
          300: '#93c5fe',
          400: '#609afa',
          500: '#3b76f5',
          600: '#2558e9',
          700: '#1d42d2',
          800: '#1e39ab',
          900: '#1f3388',
          950: '#172154',
        },
        orange: {
          50: '#fff6ed',
          100: '#ffebd4',
          200: '#ffd4a9',
          300: '#ffb772',
          400: '#ff9033',
          500: '#ff7410',
          600: '#ef5903',
          700: '#c73d05',
          800: '#9c310c',
          900: '#7e2a0d',
          950: '#441305',
        },
      },
      animation: {
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        ping: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        bounce: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-15px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
      },
    },
  },
  plugins: [],
};