/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: 'var(--accent-color)',
        'card-bg': 'var(--card-bg)',
        'text-primary': 'var(--text-color)',
        'border-color': 'var(--border-color)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%)',
      },
      backdropBlur: {
        'glassmorphism': '20px',
      },
    },
  },
  plugins: [],
} 