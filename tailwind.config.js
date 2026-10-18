/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F17',
          forest: '#9F1239',
          emerald: '#E11D74',
          leaf: '#FD322C',
          coral: '#FD322C',
          orange: '#FF7A00',
          amber: '#FDAB0A',
          mint: '#FFF1F2',
          gold: '#FDAB0A',
          goldLight: '#FFC436',
          goldSubtle: '#FFF5E6',
          slate: '#0F172A',
          slateMuted: '#64748B',
          cream: '#FAF9F6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
        logo: ['var(--font-heading)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px rgba(253, 171, 10, 0.35)',
        'glow-coral': '0 0 25px rgba(253, 50, 44, 0.35)',
        'card-hover': '0 20px 40px -15px rgba(225, 29, 116, 0.15)',
      },
    },
  },
  plugins: [],
}
