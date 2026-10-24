/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swan: {
          dark: '#1A0E08',
          espresso: '#25150E',
          chocolate: '#382015',
          cocoa: '#553424',
          mocha: '#7B523B',
          caramel: '#C68B29',
          gold: '#DF9B35',
          amber: '#F3B250',
          cream: '#FDFBF7',
          parchment: '#F6EFE6',
          sand: '#EADDCB',
          pink: '#F28DA8',
          pinkLight: '#FDECEF',
          pinkDeep: '#E65D82',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(26, 14, 8, 0.15)',
        'luxury-hover': '0 30px 60px -12px rgba(26, 14, 8, 0.25)',
        'glow-gold': '0 0 25px -3px rgba(223, 155, 53, 0.35)',
        'glow-pink': '0 0 25px -3px rgba(242, 141, 168, 0.35)',
      }
    },
  },
  plugins: [],
}
