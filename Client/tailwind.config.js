/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#9c8cd8",
        
"secondary": "#a3e835",
        
"accent": "#2e689b",
        
"neutral": "#131221",
        
"base-100": "#E8E9F3",
        
"info": "#4F93F3",
        
"success": "#32CD80",
        
"warning": "#F1C709",
        
"error": "#F96A4E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
