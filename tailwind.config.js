/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        /* FIFA 26 palette */
        fifa: {
          red:    '#E8003D',
          purple: '#6B21C8',
          cyan:   '#00C2E0',
          yellow: '#FFE000',
          green:  '#00A859',
          orange: '#FF5C00',
        },
        dark: {
          base: '#080808',
          card: '#111111',
          border: '#1E1E1E',
        },
        /* keep brand for dashboard */
        brand: {
          400: '#FFE000',
          500: '#FFE000',
        },
        field: {
          dark: '#080808',
        }
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease forwards',
        'slide-up':  'slideUp 0.4s ease forwards',
        'marquee':   'marquee 20s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
