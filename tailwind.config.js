/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './pages/*',
    './js/*',
    './**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      letterSpacing: {
        'custom': '7px',
      },
      borderRadius: {
        'custom': '20px',
      },
      colors: {
        customBg: '#eeeee6',
      },
      dropShadow: {
        'custom': '0 50px 20px rgba(0, 0, 0, 0.6)',
      }, 
      backgroundImage: {
      'custom-image': "url('/path/to/your/image.jpg')",
    },
  },
  },
  plugins: [],
};
