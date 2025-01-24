import React from 'react'
import client from '../assets/Businessman.png'
import staffs from '../assets/user.png'
import talents from '../assets/User_Groups.png'
import empolyee from '../assets/Lawyer.png'
function Contactus() {
  return (
    <>
    <section className="contactus container m-auto p-4 xl:px-8 xl:py-4" id='contactus'>
        <h2 className="xl:text-5xl text-3xl text-center aldrich-regular">
            Contact us
        </h2>
        <p className="inter text-sm xl:text-lg text-justify">
        <span className="text-primary">Welcome to SM Manpower</span>, At SM Manpower Services, we take pride in being one of the leading manpower solutions providers, dedicated to connecting businesses with skilled professionals and empowering individuals to achieve their career aspirations. With a strong foundation built on trust, quality, and excellence, we specialize in delivering reliable staffing solutions across a variety of industries.
        </p>

        <main className="w-full flex justify-center items-center flex-wrap xl:flex-nowrap">
            <div className="w-1/2 xl:w-1/4 flex gap-5 justify-center items-center xl:border-r-black xl:border-r-4 xl:my-4">
                <img src={client} alt="" className='w-12 xl:w-24'/>
                <p className="aldrich-regular text-xl xl:text-4xl xl:px-4">
                    Clients <br />
                    <span className="text-primary xl:text-4xl">200+</span>
                </p>
            </div>
            <div className="w-1/2 xl:w-1/4 flex gap-5 justify-center items-center xl:px-4 xl:border-r-black xl:border-r-4 xl:my-4">
                <img src={staffs} alt="" className='w-12 xl:w-24'/>
                <p className="aldrich-regular text-xl xl:text-4xl">
                    Staffs <br />
                    <span className="text-primary xl:text-4xl">100+</span>
                </p>
            </div>
            <div className="w-1/2 xl:w-1/4 flex gap-5 justify-center items-center xl:px-4 xl:border-r-black xl:border-r-4 xl:my-4">
                <img src={talents} alt="" className='w-12 xl:w-24'/>
                <p className="aldrich-regular xl:text-4xl text-xl">
                    Talents <br />
                    <span className="text-primary xl:text-4xl">10000+</span>
                </p>
            </div>
            <div className="w-1/2 xl:w-1/4 flex gap-5 justify-center items-center xl:px-4 ">
                <img src={empolyee} alt="" className='w-12 xl:w-24'/>
                <p className="aldrich-regular text-xl xl:text-4xl">
                    Employee <br />
                    <span className="text-primary text-xl xl:text-4xl">1000+</span>
                </p>
            </div>
        </main>
    </section>
    </>
  )
}

export default Contactus