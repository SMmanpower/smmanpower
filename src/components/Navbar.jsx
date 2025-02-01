import React, { useState } from 'react'
import logo from '../assets/logo.png'
import {FaTimes} from 'react-icons/fa'
import {CiMenuFries} from 'react-icons/ci'
function Navbar() {
    const [click,setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const content = <>
    <div className="xl:hidden block absolute w-full top-16 left-0 z-0 bg-white">
        <ul className="text-center p-10 ">
            <li className="my-4 py-4">
                <a href="" className="text-center">Home</a>
            </li>
            <li className="my-4 py-4">
                <a href="" className="text-center">About us</a>
            </li>
            <li className="my-4 py-4">
                <a href="" className="text-center">Apply</a>
            </li>
            <li className="my-4 py-4">
                <a href="" className="text-center">Booking</a>
            </li>
            <li className="my-4 py-4">
                <a href="" className="text-center">Contact us</a>
            </li>
        </ul>
    </div>
    </>
  return (
    <>
    <nav className="w-full h-14 flex justify-between bg-primary">
        <div className="flex">
            <img src={logo} alt="" className='h-14 w-14 m-auto mt-2' />
            <h2 className="wallpoet-regular text-2xl m-auto xl:text-4xl">
                SM Manpower
            </h2>
        </div>
        <div className="hidden lg:block">
            <ul className="h-full xl:flex justify-center items-center text-center gap-10 mx-2.5">
                <li className="my-4 py-4">
                    <a href="" className="text-center aldrich-regular xl:text-2xl">Home</a>
                </li>
                <li className="my-4 py-4">
                    <a href="" className="text-center aldrich-regular xl:text-2xl">About us</a>
                </li>
                <li className="my-4 py-4">
                    <a href="" className="text-center aldrich-regular xl:text-2xl">Apply</a>
                </li>
                <li className="my-4 py-4">
                    <a href="" className="text-center aldrich-regular xl:text-2xl">Booking</a>
                </li>
                <li className="my-4 py-4">
                    <a href="" className="text-center aldrich-regular xl:text-2xl">Contact us</a>
                </li>
            </ul>
        </div>
        <div className="">
            {click && content}
        </div>
        <button className=' block h-14 w-14 m-auto ml-10 xl:hidden' onClick={handleClick} >
            {click ? <FaTimes className='h-9 w-9'/> : <CiMenuFries className='h-9 w-9 '/>}
        </button>
    </nav>

    </>
  )
}

export default Navbar