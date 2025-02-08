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
    <section className="w-full bg-footer text-center lg:text-left pt-4 lg:h-400 lg:py-5">
        <button onClick={togglePopup} className=" wallpoet-regular w-fit text-3xl text-center lg:text-5xl lg:text-left lg:ml-10 lg:mt-2.5">
            SM Manpower
        </button>
        
        <footer className="lg:flex justify-center items-center p-2 lg:px-10 lg:py-4 gap-5">
            <div className="box lg:w-1/3 lg:p-4 lg:border-r-4 border-black">
                <p className="aldrich-regular text-2xl text-center lg:text-3xl lg:text-left w-60 lg:w-300 m-auto lg:mt-1.5">Email</p>
                <li className='w-60 lg:w-300 m-auto list-none '>
                    <a href="mailto:manpowerservicessm@gmail.com" className="inter text-lg lg:text-xl w-200 lg:text-left text-center m-auto">manpowerservicessm@gmail.com</a>
                </li>
                <p className="aldrich-regular text-2xl lg:text-3xl text-center lg:text-left w-60 lg:w-300 m-auto lg:mt-1.5">Phone No</p>
                <li className="w-60 lg:w-300 m-auto list-none lg:text-left text-center">
                    <a href="tel:+917867993525" className="inter text-lg lg:text-xl lg:text-left text-center lg:w-300 m-auto">+91 7867993525</a>
                </li>
                <p className="aldrich-regular text-2xl lg:text-3xl lg:text-left text-center w-60 lg:w-300 m-auto mt-1.5">Adderss</p>
                <p className="inter w-60 lg:w-300 m-auto text-lg lg:text-xl lg:text-left text-center">
                    ATR Complex Pudukkottai Main 
                    Road,Pudukkottai-613301 
                </p>
            </div>
            <div className="box hidden lg:block lg:w-1/3 border-r-4 border-black">
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
            <div className="box w-fit border-t-2 border-white lg:border-t-0 lg:w-1/3 lg:h-200 m-auto">
                <p className="aldrich-regular text-2xl  lg:text-3xl text-center">
                    Follow as on social media
                </p>
                <div className="flex justify-center items-center gap-2.5 lg:gap-9 lg:my-5">
                    <img src={whatsapp} alt="" className="h-10 lg:h-12" />
                    <img src={instagram} alt="" className="h-10 lg:h-12" />
                    <img src={facebook} alt="" className="h-10 lg:h-12" />
                    <img src={x} alt="" className="h-10 lg:h-12" />
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
            <section className="w-4/5 p-2.5 lg:w-600 h-fit fixed lg:p-5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 border-2 rounded-3xl border-primary ">
                <h1 className="aldrich-regular text-center flex items-center justify-between lg:w-500 m-auto text-primary text-3xl">
                <div className="">  </div>
                    Welcome admin
                        <button onClick={togglePopup} className='w-8 h-18 lg:w-12 lg:h-12 items-end '>
                            <img src={close} alt="" />
                        </button>
                </h1>
                <form action="" className="m-auto my-2.5">
                    <div className="box text-left mt-2.5 w-480 m-auto">
                        <p className="text-sm lg:text-2xl aldrich-regular">Login ID</p>
                        <input type="text" className="input lg:input-box lg:min-w-450" />
                    </div>
                    <div className="box text-left mt-2.5 w-480 m-auto">
                        <p className="text-sm lg:text-2xl aldrich-regular">Password</p>
                        <input type="password" className="input lg:input-box" />
                    </div>
                        <button type="submit" className="btn lg:h-fit iceberg-regular bg-primary mx-auto my-5 text-xl lg:text-4xl">
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