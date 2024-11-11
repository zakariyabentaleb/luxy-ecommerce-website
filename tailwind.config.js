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
      backgroundImage: {
      'custom-image': "url('/path/to/your/image.jpg')",
    },
  },
  },
  plugins: [],
};
