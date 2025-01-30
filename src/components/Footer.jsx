import React, { useState } from 'react'
import whatsapp from '../assets/WhatsApp.png'
import facebook from '../assets/Facebook.png'
import instagram from '../assets/Instagram.png'
import x from '../assets/X.png'
import icon from '../assets/Circled_Right.png'
import close from '../assets/Close.png'
function Footer() {
        const [isPopupOpen,setIsPopupOpen] = useState(false);
    
        const togglePopup =()=>{
            setIsPopupOpen(!isPopupOpen);
        }
  return (
    <>
    <section className="w-full bg-footer pt-4 xl:h-400 xl:py-5">
        <button onClick={togglePopup} className=" wallpoet-regular text-3xl text-center xl:text-5xl xl:text-left ml-10">
            SM Manpower
        </button>
        
        <footer className="xl:flex justify-center items-center p-2 xl:px-10 xl:py-5 gap-5">
            <div className="box xl:w-1/3 xl:p-4 xl:border-r-4 border-black">
                <p className="aldrich-regular text-2xl xl:text-3xl text-left w-60 xl:w-300 m-auto">Email</p>
                <li className='w-60 xl:w-300 m-auto list-none'>
                    <a href="mailto:manpowerservicessm@gmail.com" className="inter text-lg xl:text-xl w-200 m-auto">manpowerservicessm@gmail.com</a>
                </li>
                <p className="aldrich-regular text-2xl xl:text-3xl text-left w-60 xl:w-300 m-auto">Phone No</p>
                <li className="w-60 xl:w-300 m-auto list-none">
                    <a href="tel:+917867993525" className="inter text-lg xl:text-xl text-left xl:w-300 m-auto">+91 7867993525</a>
                </li>
                <p className="aldrich-regular text-2xl xl:text-3xl text-left w-60 xl:w-300 m-auto">Adderss</p>
                <p className="inter w-60 xl:w-300 m-auto text-xl text-left">
                    ATR Complex Pudukkottai Main 
                    Road,Pudukkottai-613301 
                </p>
            </div>
            <div className="box hidden xl:block xl:w-1/3 border-r-4 border-black">
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-3xl text-center">Home</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-3xl text-center">About us</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-3xl text-center">Apply</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-3xl text-center">Booking</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-3xl text-center">Contact us</a>
                </li>
            </div>
            <div className="box xl:w-1/3 xl:h-200 m-auto">
                <p className="aldrich-regular text-2xl xl:text-3xl text-center">
                    Follow as on social media
                </p>
                <div className="flex justify-center items-center gap-2.5 xl:gap-9 xl:my-5">
                    <img src={whatsapp} alt="" className="h-12" />
                    <img src={instagram} alt="" className="h-12" />
                    <img src={facebook} alt="" className="h-12" />
                    <img src={x} alt="" className="h-12" />
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
            <section className="w-4/5 p-2.5 xl:w-600 h-fit fixed xl:p-10 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 border-2 rounded-3xl border-primary ">
                <h2 className="aldrich-regular text-center text-primary text-3xl">
                    Welcome admin
                        <button onClick={togglePopup} className='w-8 h-18 xl:w-12 xl:h-12 float-end xl:top-2.5'>
                            <img src={close} alt="" />
                        </button>
                </h2>
                <form action="" className="m-auto my-2.5">
                    <div className="box text-left mt-2.5">
                        <p className="text-sm xl:text-2xl aldrich-regular">Login ID</p>
                        <input type="text" className="input xl:input-box" />
                    </div>
                    <div className="box text-left mt-2.5">
                        <p className="text-sm xl:text-2xl aldrich-regular">Password</p>
                        <input type="password" className="input xl:input-box" />
                    </div>
                        <button type="submit" className="btn xl:h-fit iceberg-regular bg-primary mx-auto my-5 text-xl xl:text-4xl">
                            Login
                            <img src={icon} alt="" className='h-8 w-8' />
                        </button>
                </form>
            </section>
        )}
    </>
  )
}

export default Footer