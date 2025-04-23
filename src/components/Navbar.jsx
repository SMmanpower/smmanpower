import React, { useState } from 'react'
import logo from '../assets/logo.png'
import {FaTimes} from 'react-icons/fa'
import {CiMenuFries} from 'react-icons/ci'
import ApplyForm from './ApplyForm'
import close from '../assets/Close.png'

function Navbar() {
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    
        const togglePopup =()=>{
            setIsPopupOpen(!isPopupOpen);
        }
    const [click,setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const content = <>
    <div className="sm:hidden block absolute w-1/2 h-full top-14 left-0 z-0 bg-white">
        <ul className="text-center p-10 ">
            <li className="my-4 py-4">
                <a href="#home" className="text-center">Home</a>
            </li>
            <li className="my-4 py-4">
                <a href="#about" className="text-center">About us</a>
            </li>
            <li className="my-4 py-4">
                <button className="text-center border-none outline-none">
                    Apply
                </button>
            </li>
            <li className="my-4 py-4">
                <a href="#booking" className="text-center">Booking</a>
            </li>
            <li className="my-4 py-4">
                <a href="#contact" className="text-center">Contact us</a>
            </li>
        </ul>
    </div>
    </>
  return (
    <>
    {/* <section className="fixed top-0 left-0 w-full"> */}
        <nav className="w-full h-14 flex justify-between bg-navbar">
            <div className="flex">
                <img src={logo} alt="" className='h-14 w-14 m-auto mt-2' />
                <h2 className="wallpoet-regular text-2xl m-auto sm:text-4xl">
                    SM Manpower
                </h2>
            </div>
            <div className="hidden sm:block sm:order-3">
                <ul className="h-full sm:flex justify-center items-center text-center gap-10 mx-2.5">
                    <li className="my-4 py-4">
                        <a href="#home" className="text-center aldrich-regular sm:text-2xl">Home</a>
                    </li>
                    <li className="my-4 py-4">
                        <a href="#about" className="text-center aldrich-regular sm:text-2xl">About us</a>
                    </li>
                    <li className="my-4 py-4">
                        <button className="text-center border-none outline-none aldrich-regular sm:text-2xl" onClick={togglePopup}>
                            Apply
                        </button>
                    </li>
                    <li className="my-4 py-4">
                        <a href="#booking" className="text-center aldrich-regular sm:text-2xl">Booking</a>
                    </li>
                    <li className="my-4 py-4">
                        <a href="#contact" className="text-center aldrich-regular sm:text-2xl">Contact us</a>
                    </li>
                </ul>
            </div>
            <div className="">
                {click && content}
            </div>
            <button className=' ml-2.5 sm:hidden' onClick={handleClick} >
                {click ? <FaTimes className='h-9 w-9 float-end'/> : <CiMenuFries className='h-9 w-9 '/>}
            </button>
        </nav>
        {
        
        isPopupOpen && (
            <section className="w-11/12 sm:w-4/5 rounded-xl sm:rounded-3xl border-4 bg-white absolute top-1/2 sm:top-3/4 left-1/2 -translate-y-1/4 -translate-x-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:my-5 m-auto border-primary py-2.5" >
                    <h2 className="aldrich-regular text-2xl sm:text-4xl text-center text-primary sm:m-4">
                        Apply as Talents
                    <button onClick={togglePopup} className='w-8 h-8 sm:w-12 sm:h-12 float-end top-2.5'>
                        <img src={close} alt="" />
                    </button>
                    </h2>
               <ApplyForm closePopup={togglePopup}/>
               </section>
            )
    }
    </>
  )
}

export default Navbar