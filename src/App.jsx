import './App.css'
import Aboutus from './components/Aboutus'
import Admin from './components/Admin'
import BookingForm from './components/BookingForm'
import Contactus from './components/Contactus'
import Footer from './components/Footer'
import Header from './components/Header'
import OffcanvasExample from './components/Navbar'
// import Navbar from './components/Navbar'
import WorkerTable from './components/WorkerTable'

function App() {

  return (
    <>
      {/* <OffcanvasExample/> */}
      <Header/>
      <Aboutus/>
      <BookingForm/>
      <Contactus/>
      <Footer/>
      {/* <Admin/> */}
      {/* <WorkerTable/> */}
    </>
  )
}

export default App
