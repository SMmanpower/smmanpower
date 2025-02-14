import React from 'react'
import client from '../assets/Businessman.png'
import staffs from '../assets/user.png'
import talents from '../assets/User_Groups.png'
import empolyee from '../assets/Lawyer.png'
function Contactus() {
  return (
    <>
    <section className="contactus container m-auto p-4 lg:px-8 lg:py-4" id='contact'>
        <h2 className="lg:text-5xl text-3xl text-center aldrich-regular">
            Contact us
        </h2>
        <p className="inter text-sm lg:text-lg lg:mt-2.5 text-justify"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-primary">Welcome to SM Manpower</span>, At SM Manpower Services, we take pride in being one of the leading manpower solutions providers, dedicated to connecting businesses with skilled professionals and empowering individuals to achieve their career aspirations. With a strong foundation built on trust, quality, and excellence, we specialize in delivering reliable staffing solutions across a variety of industries.
        </p>

        <main className="w-fit m-auto lg:w-full flex justify-center items-center flex-wrap lg:flex-nowrap mt-5">
            <div className="w-1/2 lg:w-1/4 flex gap-2.5 lg:gap-5 justify-center items-center lg:border-r-black lg:border-r-4 lg:my-4">
                <img src={client} alt="" className='w-12 lg:w-24'/>
                <p className="aldrich-regular w-1/3 text-xl lg:w-fit lg:text-4xl lg:px-4">
                    Clients <br />
                    <span className="text-primary lg:text-4xl">200+</span>
                </p>
            </div>
            <div className="w-1/2 lg:w-1/4 flex gap-2.5 lg:gap-5 justify-center items-center lg:px-4 lg:border-r-black lg:border-r-4 lg:my-4">
                <img src={staffs} alt="" className='w-12 lg:w-24'/>
                <p className="aldrich-regular w-1/3 text-xl lg:w-fit lg:text-4xl">
                    Staffs <br />
                    <span className="text-primary lg:text-4xl">100+</span>
                </p>
            </div>
            <div className="w-1/2 lg:w-1/4 flex gap-2.5 lg:gap-5 justify-center items-center lg:px-4 lg:border-r-black lg:border-r-4 lg:my-4">
                <img src={talents} alt="" className='w-12 lg:w-24'/>
                <p className="aldrich-regular w-1/3 lg:w-fit lg:text-4xl text-xl">
                    Talents <br />
                    <span className="text-primary lg:text-4xl">10000+</span>
                </p>
            </div>
            <div className="w-1/2 lg:w-1/4 flex gap-2.5 lg:gap-5 justify-center items-center lg:px-4 ">
                <img src={empolyee} alt="" className='w-12 lg:w-24'/>
                <p className="aldrich-regular w-1/3 text-xl lg:w-fit lg:text-4xl">
                    Employee <br />
                    <span className="text-primary text-xl lg:text-4xl">1000+</span>
                </p>
            </div>
        </main>
    </section>
    </>
  )
}

export default Contactus