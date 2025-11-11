/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: {
        50: '#ffffff',
        100: '#efeae9',
        200: '#dfd4d2',
        300: '#cfbfbc',
        400: '#bfaaa5',
        500: '#b0958f',
        600: '#a07f78',
        700: '#906a62',
        800: '#80554b',
        900: '#703f35',
        950: '#602a1e',
      },
      secondary: {
        50:  '#d91604',
        100: '#c31404',
        200: '#ae1203',
        300: '#980f03',
        400: '#820d02',
        500: '#6d0b02',
        600: '#570902',
        700: '#410701',
        800: '#2b0401',
        900: '#160200',
        950: '#000000',
      },
      gray: '#e5e7eb',
      white: '#FFFFFF',
      black: '#000000',
      green: '#A6F1E0',
      lightred: '#F7CFD8',
      error:'#FF0000',
      success:'#008000',
      warning:'#E69500',
    },
    },
  },
  plugins: [],
}

