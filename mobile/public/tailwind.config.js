/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./public/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-dark': '#6B4C9A',      // Dark purple
        'primary-light': '#9B7EBD',     // Light purple
        'accent-pink': '#FFB3D9',       // Baby pink
        'accent-hot': '#FF69B4',        // Hot pink
        
        // Cycle phase colors
        'phase-menstrual': '#FFB3D9',
        'phase-follicular': '#9B7EBD',
        'phase-ovulation': '#FFB3D9',
        'phase-luteal': '#6B4C9A',
        
        // UI colors
        'bg-light': '#FAFAFA',
        'bg-surface': '#FFFFFF',
        'text-primary': '#1F1F1F',
        'text-secondary': '#757575',
        'border-color': '#EEEEEE',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6B4C9A 0%, #FFB3D9 100%)',
        'gradient-purple': 'linear-gradient(135deg, #6B4C9A 0%, #9B7EBD 100%)',
        'gradient-pink': 'linear-gradient(135deg, #FFB3D9 0%, #FF69B4 100%)',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'elevation': '0 0 40px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '12px',
        'button': '12px',
      },
      fontSize: {
        'h1': ['32px', { fontWeight: '700' }],
        'h2': ['24px', { fontWeight: '700' }],
        'h3': ['20px', { fontWeight: '700' }],
        'body': ['16px', { fontWeight: '400' }],
        'caption': ['12px', { fontWeight: '400' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'xxl': '32px',
      },
    },
  },
  plugins: [],
}
