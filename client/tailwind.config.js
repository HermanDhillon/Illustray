/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
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
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      pacifico: ['"Pacifico", "cursive"'],
    },
  },
}
