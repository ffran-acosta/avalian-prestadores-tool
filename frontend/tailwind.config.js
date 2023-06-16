/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      tableStyles: {
        'border-collapse': 'collapse',
        'border': '1px solid #e5e7eb',
        'th': {
          'bg': '#edf2f7',
          'padding': '0.75rem',
        },
        'td': {
          'padding': '0.75rem',
        },
        'even': {
          'bg': '#f7fafc',
        },
        'odd': {
          'bg': '#ffffff',
        },
      },
    },
  },
  plugins: [],
}

