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
        "footer":'#D9D9D9',
        "navbar":'#FF8B3BBF'
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
        "700":"700px",
        "800":"800px",
        "900":"900px",
        "1000":"1000px",
        "1200":"1000px",
      },
      width:{
        "100":"100px",
        "200":"200px",
        "250":"250px",
        "300":"300px",
        "400":"400px",
        "500":"500px",
        "600":"600px",
        "700":"700px",
        "480":'480px',
        '85':'85%',
        "900":'900px',
      },
      top: {
        '4/5':'90%'
      },
      lineHeight:
      {
        "head":"64px"
      }
    },
  },
  plugins: [],
}

