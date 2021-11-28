module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#111111',
          800: '#222222',
          750: '#2B2B2B',
          700: '#333333',
          650: '#3B3B3B',
          600: '#444444',
          500: '#555555',
          400: '#666666',
          300: '#777777',
          250: '#888888',
          200: '#999999',
          150: '#aaaaaa',
          100: '#bbbbbb',
          50: '#cccccc'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
