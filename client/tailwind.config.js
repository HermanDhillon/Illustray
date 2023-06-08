/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('tailwindcss-3d'),
  ],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: 'light',
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
