import React from 'react'
import client from '../assets/Businessman.png'
import staffs from '../assets/user.png'
import talents from '../assets/User_Groups.png'
import empolyee from '../assets/Lawyer.png'
function Contactus() {
  return (
    <>
    <section className="contactus container m-auto p-4 sm:px-8 sm:py-4" id='contact'>
        <h2 className="sm:text-5xl text-3xl text-center aldrich-regular">
            Contact us
        </h2>
        <p className="inter text-sm sm:text-sm sm:mt-2.5 text-justify"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-primary">Welcome to SM Manpower</span>, At SM Manpower Services, we take pride in being one of the leading manpower solutions providers, dedicated to connecting businesses with skilled professionals and empowering individuals to achieve their career aspirations. With a strong foundation built on trust, quality, and excellence, we specialize in delivering reliable staffing solutions across a variety of industries.
        </p>

        {/* <main className="w-11/12 m-auto sm:w-full flex justify-center items-center flex-wrap sm:flex-nowrap mt-5">
            <div className="w-1/2 sm:w-1/4 flex gap-2.5 sm:gap-5 sm:justify-center items-center sm:border-r-black sm:border-r-4 sm:my-4">
                <img src={client} alt="" className='w-12 sm:w-24'/>
                <p className="aldrich-regular w-1/3 text-xl sm:w-fit sm:text-4xl sm:px-4">
                    Clients <br />
                    <span className="text-primary sm:text-4xl">200+</span>
                </p>
            </div>
            <div className="w-1/2 sm:w-1/4 flex gap-2.5 sm:gap-5 sm:justify-center items-center sm:px-4 sm:border-r-black sm:border-r-4 sm:my-4">
                <img src={staffs} alt="" className='w-12 sm:w-24'/>
                <p className="aldrich-regular w-1/3 text-xl sm:w-fit sm:text-4xl">
                    Staffs <br />
                    <span className="text-primary sm:text-4xl">100+</span>
                </p>
            </div>
            <div className="w-1/2 sm:w-1/4 flex gap-2.5 sm:gap-5 sm:justify-center items-center sm:px-4 sm:border-r-black sm:border-r-4 sm:my-4">
                <img src={talents} alt="" className='w-12 sm:w-24'/>
                <p className="aldrich-regular w-1/3 sm:w-fit sm:text-4xl text-xl">
                    Talents <br />
                    <span className="text-primary sm:text-4xl">10000+</span>
                </p>
            </div>
            <div className="w-1/2 sm:w-1/4 flex gap-2.5 sm:gap-5 sm:justify-center items-center sm:px-4 ">
                <img src={empolyee} alt="" className='w-12 sm:w-24'/>
                <p className="aldrich-regular w-1/3 text-xl sm:w-fit sm:text-4xl">
                    Employee <br />
                    <span className="text-primary text-xl sm:text-4xl">1000+</span>
                </p>
            </div>
        </main> */}
    </section>
    </>
  )
}

export default Contactus