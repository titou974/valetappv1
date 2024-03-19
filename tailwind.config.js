import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: "450px",
      },

    },
  },
  plugins: [nextui(
    {
      themes: {
        light: {
          colors: {
            primary: {
              50: '#f0f8ff',
              100: '#e1f0fd',
              200: '#bbe1fc',
              300: '#80c9f9',
              400: '#3caef4',
              500: '#24a0ed',
              600: '#0675c3',
              700: '#065d9e',
              800: '#0a4f82',
              900: '#0e426c',
              DEFAULT: '#0675c3',
              foreground: '#ffffff'
            },
            secondary: '#ffffff',
            background: '#E7E7E7',
            foreground: '#000000'
          }
        },
        dark: {
          colors: {
            primary: {
              50: '#f0fdf5',
              100: '#dcfce8',
              200: '#bbf7d1',
              300: '#86efad',
              400: '#4ade80',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
              800: '#166534',
              900: '#052e14',
              DEFAULT: '#e7fe55',
              foreground: '#000000'
            },
            secondary: '#ffffff',
            background: '#000000',
            foreground: '#ffffff'
          }
        },
      },
    }
  )],
}
