/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#F8743C",
        "footer":'#D9D9D9'
      },
      minWidth:{
        '450':'450px'
      },
      zIndex:{
        '1':'1'
      },
      height:{
        "100":"100px",
        "200":"200px",
        "300":"300px",
        "350":"350px",
        "400":"400px",
        "500":"500px",
        "600":"600px",
        "700":"700px"
      },
      width:{
        "100":"100px",
        "200":"200px",
        "300":"300px",
        "400":"400px",
        "500":"500px",
        "600":"600px",
        "700":"700px"
      },
      lineHeight:
      {
        "head":"64px"
      }
    },
  },
  plugins: [],
}

