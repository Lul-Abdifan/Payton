/**
 * Tailwind CSS configuration.
 *
 * The content array includes the app and components directories so that
 * classes used in those files are picked up by Tailwind during the build.
 */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};