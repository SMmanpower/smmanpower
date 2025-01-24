import React from 'react'
import whatsapp from '../assets/WhatsApp.png'
import facebook from '../assets/Facebook.png'
import instagram from '../assets/Instagram.png'
import x from '../assets/X.png'
function Footer() {
  return (
    <>
    <section className="w-full bg-footer h-400 py-5">
        <h2 className="agbalumo-regular text-5xl text-left">
            SM Manpower
        </h2>
        <footer className="flex justify-center items-center px-10 py-5 gap-5">
            <div className="box w-1/3 border-r-4 border-black">
                <p className="aldrich-regular text-3xl text-left w-200 m-auto">Email</p>
                <li className='w-200 m-auto list-none'>
                    <a href="" className="inter text-2xl w-200 m-auto">desflyer.tech@gmail.com</a>
                </li>
                <p className="aldrich-regular text-3xl text-left w-200 m-auto">Phone No</p>
                <li className="w-200 m-auto list-none">
                    <a href="" className="inter text-2xl text-left w-200 m-auto">+91 9092579460</a>
                </li>
                <p className="aldrich-regular text-3xl text-left w-200 m-auto">Adderss</p>
            </div>
            <div className="box w-1/3 border-r-4 border-black">
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-4xl text-center">Home</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-4xl text-center">About us</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-4xl text-center">Apply</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-4xl text-center">Booking</a>
                </li>
                <li className='list-none py-2 text-left w-200 m-auto'>
                    <a href="" className="aldrich-regular text-4xl text-center">Contact us</a>
                </li>
            </div>
            <div className="box w-1/3 h-200 m-auto">
                <p className="aldrich-regular text-3xl text-center">
                    Follow as on social media
                </p>
                <div className="flex justify-center items-center gap-2.5 my-5">
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
    </>
  )
}

export default Footer