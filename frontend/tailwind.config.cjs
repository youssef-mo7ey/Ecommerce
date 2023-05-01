/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: { max: "640px" },
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        img0: "url(/assets/slider images/blog_01.jpg)",
        img1: "url(/assets/slider images/blog_02.jpg)",
        img2: "url(/assets/slider images/blog_03.jpg)",
      },
    },
  },
  plugins: [],
};
