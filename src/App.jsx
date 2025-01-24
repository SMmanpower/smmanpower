import './App.css'
import Aboutus from './components/Aboutus'
import BookingForm from './components/BookingForm'
import Contactus from './components/Contactus'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Header/>
      <Aboutus/>
      <BookingForm/>
      <Contactus/>
      <Footer/>
    </>
  )
}

export default App
