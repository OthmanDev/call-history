/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js}'],
  theme: {
    fontFamily: {
      main: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          100: '#321CA4',
        },
        white: {
          100: '#FFF',
        },
        heading: {
          100: '#111',
        },
        border: {
          100: '#E4E4E7',
        },
        danger: {
          100: '#FB323F',
        },
        info: {
          100: '#03A9F4',
        },
        warning: {
          100: '#FFAB00',
        },
        success: {
          100: '#00AB66',
        },
      },
    },
    screens: {
      '2xl': { max: '1450px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '992px' },
      sm: { max: '767px' },
      xs: { max: '640px' },
    },
  },
  plugins: [],
}
