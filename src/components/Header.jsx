import React, { useEffect, useState } from 'react'
import icon from '../assets/Circled_Right.png'
import close from '../assets/Close.png'
import vector from '../assets/shared_workspace.png'
import '../css/header.css'
function Header() {
    const [isPopupOpen,setIsPopupOpen] = useState(false);

    const togglePopup =()=>{
        setIsPopupOpen(!isPopupOpen);
    }
  return (
    <>
    <section className="header-main container flex flex-row flex-wrap xl:m-auto px-8 justify-center items-center xl:flex-nowrap" id='home'>
        <main className="condent w-full xl:w-2/3 p-1">
            <h2 className="heading text-center text-3xl leading-10 xl:w-3/4 xl:text-left xl:text-5xl xl:leading-head aldrich-regular">Connecting Opportunities with the
               <br /> <span className='text-primary'> Right People</span>
            </h2>
            <p className="context text-sm inter xl:text-base text-justify p-2">
                SM Manpower is a leading provider of workforce solutions, dedicated to bridging the gap between exceptional talent and thriving businesses. We specialize in offering tailored recruitment, staffing, and human resource services across various industries, ensuring that our clients achieve operational excellence with the right team.
            </p>
            <button onClick={togglePopup} className="btn h-12 text-center p-2 bg-primary iceberg-regular text-xl m-auto xl:m-0">
                Apply Now
                <img src={icon} alt="" />
            </button>
        </main>
        <aside className="right hidden xl:w-3/5 xl:block">
            <img src={vector} alt="" className="vector-img" />
        </aside>
    </section>
    {
        isPopupOpen && (
                <section className="w-4/5 xl:w-4/5 border-4 bg-white absolute top-4/5 xl:top-3/4 left-1/2 -translate-y-1/4 -translate-x-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 xl:my-5 m-auto border-primary xl:rounded-3xl" >
                    <h2 className="aldrich-regular text-3xl xl:text-4xl text-center text-primary xl:m-4">
                        Apply as Talents
                    <button onClick={togglePopup} className='w-12 h-12 float-end top-2.5'>
                        <img src={close} alt="" />
                    </button>
                    </h2>
                <form action="" className="grid grid-cols-1 grid-rows-12 xl:grid-cols-2 xl:grid-rows-7 grid-flow-col xl:rounded-3xl m-auto mx-5 p-5 xl:gap-2.5">
                    
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your name</p>
                        <input type="text" className="input xl:input-box" />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm xl:text-2xl aldrich-regular">Contact no</p>
                        <input type="number" className="input xl:input-box" />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your Age</p>
                        <input type="number" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your Address</p>
                        <input type="text" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your work type</p>
                        <input type="text" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular"> Experience of Work </p>
                        <input type="text" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your UPI Phone no </p>
                        <input type="number" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Upload your Full size photo</p>
                        <input type="file" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Adhara no & Adhara photo</p>
                        <input type="file" className="input xl:input-box" />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Upload your Driving licence</p>
                        <input type="file" className="input xl:input-box " />
                    </div>
                    <div className="box row-span-3 text-left">
                        <label htmlFor="terms&conditions" className='aldrich-regular'>
                            <input type="checkbox" name="termsandcondition" id="" className='mx-2'/>
                            Term & Conditions
                        </label>
                        <p className="inter text-xs xl:text-base px-10 text-justify">
                        1.Your payment will be processed and sent to you within 5 working days <br />
                        2.Any issues encountered during the work may result in a proportional deduction from the payment <br />
                        3.we will not be held responsible for any disputes or complications that may occur between you and the event organizers. <br />
                        4.Please ensure you arrived on time and are properly attiredz <br />
                        </p>
                        <button type="submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl xl:text-4xl">
                            Book now
                            <img src={icon} alt="" />
                        </button>
                    </div>
                </form>
            </section>)
    }
    </>
  )
}

export default Header