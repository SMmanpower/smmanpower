import React, { useState } from 'react'
import whatsapp from '../assets/WhatsApp.png'
import facebook from '../assets/Facebook.png'
import instagram from '../assets/Instagram.png'
import x from '../assets/X.png'
import close from '../assets/Close.png'
import Login from './Login'
function Footer() {
        const [isPopupOpen,setIsPopupOpen] = useState(false);
    
        const togglePopup =()=>{
            setIsPopupOpen(!isPopupOpen);
        }

      
  return (
    <>
    <section className="w-full bg-footer text-center sm:text-left pt-4 sm:h-400 sm:py-5">
        <button onClick={togglePopup} className=" wallpoet-regular w-fit text-3xl text-center sm:text-5xl sm:text-left sm:ml-10 sm:mt-2.5">
            SM Manpower
        </button>
        
        <footer className=" sm:flex justify-center items-stretch p-2 sm:px-10 sm:py-4 gap-5">
            <div className="box sm:w-1/3 sm:p-4 sm:border-r-4 border-black">
                <p className="aldrich-regular text-2xl text-center sm:text-3xl sm:text-left w-60 sm:w-300 m-auto sm:mt-1.5">Email</p>
                <li className='w-60 sm:w-300 m-auto list-none '>
                    <a href="mailto:manpowerservicessm@gmail.com" className="inter text-wrap text-sm sm:text-xl w-200 sm:text-left text-center m-auto">manpowerservicessm @gmail.com</a>
                </li>
                <p className="aldrich-regular text-2xl sm:text-3xl text-center sm:text-left w-60 sm:w-300 m-auto sm:mt-1.5">Phone No</p>
                <li className="w-60 sm:w-300 m-auto list-none sm:text-left text-center">
                    <a href="tel:+91 936341661" className="inter text-sm sm:text-xl sm:text-left text-center sm:w-300 m-auto">+91 9363641661</a>
                </li>
                {/* <p className="aldrich-regular text-2xl sm:text-3xl sm:text-left text-center w-60 sm:w-300 m-auto mt-1.5">Adderss</p> */}
                {/* <p className="inter w-60 sm:w-300 m-auto text-sm sm:text-xl sm:text-left text-center">
                    ATR Complex Pudukkottai Main 
                    Road,Pudukkottai-613301 
                </p> */}
            </div>
            <div className="box hidden sm:block sm:w-1/3 border-r-4 border-black">
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="#home" className="aldrich-regular text-3xl text-center">Home</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="#about" className="aldrich-regular text-3xl text-center">About us</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-3xl text-center">Apply</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="#booking" className="aldrich-regular text-3xl text-center">Booking</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="#contact" className="aldrich-regular text-3xl text-center">Contact us</a>
                </li>
            </div>
            <div className="box w-fit border-t-2 border-white sm:border-t-0 sm:w-1/3 sm:h-200 m-auto">
                <p className="aldrich-regular text-2xl  sm:text-3xl text-center">
                    Follow as on social media
                </p>
                <div className="flex sm:justify-center justify-evenly items-center gap-5 sm:gap-9 sm:my-5">
                    <a href="http://">
                        <img src={whatsapp} alt="" className="h-10 sm:h-12" />
                    </a>
                    <a href="http://">
                        <img src={instagram} alt="" className="h-10 sm:h-12" />
                    </a>
                    <a href="http://">
                        <img src={facebook} alt="" className="h-10 sm:h-12" />
                    </a>
                    <a href="http://">
                        <img src={x} alt="" className="h-10 sm:h-12" />
                    </a>
                </div>
            </div>
        </footer>
        <li className="w-full list-none text-center bg-black">
                <a href="" className="iceberg-regular text-2xl text-white">
                    Designed by DesFlyer
                </a>
            </li>
       
    </section>
    {isPopupOpen && (
            <section className="w-11/12 p-2.5 sm:w-600 h-fit fixed sm:p-5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 border-2 rounded-3xl border-primary ">
                <h1 className="aldrich-regular text-center flex items-center justify-between sm:w-500 m-auto text-primary text-3xl">
                <div className="">  </div>
                    Welcome admin
                        <button onClick={togglePopup} className='w-8 h-18 sm:w-12 sm:h-12 items-end '>
                            <img src={close} alt="" />
                        </button>
                </h1>
                <Login closePopup={togglePopup} />
            </section>
        )}
    </>
  )
}

export default Footer