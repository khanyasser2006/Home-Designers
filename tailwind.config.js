/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#eee7db',       // Warm Sand Base Canvas
          secondary: '#e5dfd2',     // Warm Limestone Surface
          tertiary: '#faf7f2',      // Elevated Alabaster Stone Panel
          elevated: '#ffffff',      // Pure Chalk Card
          graphite: '#1b1d1c',      // Deep Graphite Solid
          translucent: 'rgba(238, 231, 219, 0.92)',
          subtle: 'rgba(27, 29, 28, 0.04)',
        },
        border: {
          subtle: 'rgba(27, 29, 28, 0.10)',
          medium: 'rgba(27, 29, 28, 0.20)',
          accent: 'rgba(27, 29, 28, 0.40)',
          graphite: '#1b1d1c',
        },
        text: {
          primary: '#1b1d1c',       // Deep Graphite Core
          secondary: '#4a4843',     // Warm Charcoal Slate
          muted: '#7c776e',         // Sand Umber
          accent: '#8c6d48',        // Warm Ochre
          light: '#eee7db',         // Warm Sand on Dark Elements
        },
        accent: {
          graphite: '#1b1d1c',
          'graphite-hover': '#000000',
          sand: '#eee7db',
          ochre: '#8c6d48',
          gold: '#1b1d1c',
        },
      },
      fontFamily: {
        script: ['"Pinyon Script"', 'cursive'],
        display: ['"Cormorant Garamond"', '"Marcellus"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        heading: ['"Marcellus"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionTimingFunction: {
        'luxury-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
