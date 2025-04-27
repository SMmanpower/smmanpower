import React, { useRef, useState } from 'react'
import close from '../assets/Close.png'
import vector from '../assets/shared_workspace.png'
import '../css/header.css'
import icon from '../assets/Circled_Right.png'
import phone from '../assets/Phone.png'
import ApplyForm from './ApplyForm'
function Header() {
    const [isPopupOpen,setIsPopupOpen] = useState(false);

    const togglePopup =()=>{
        setIsPopupOpen(!isPopupOpen);
    }
          
  return (
    <>
    <section className="header-main container flex flex-row flex-wrap sm:m-auto justify-center items-center sm:flex-nowrap" id='home'>
        <main className="condent w-full sm:w-2/3 p-1">
            <h2 className="heading text-center text-3xl leading-10 sm:w-full sm:text-left sm:text-5xl sm:leading-head aldrich-regular">Connecting <br className="block sm:hidden" /> Opportunities <br/> with the  <br className='hidden sm:block' />
             <span className='text-primary'> Right People</span>
            </h2>
            <p className="context text-sm inter sm:text-base text-justify p-2.5">
                <lable className="sm:hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</lable>
                SM Manpower is a leading provider of workforce solutions, dedicated to bridging the gap between exceptional talent and thriving businesses. We specialize in offering tailored recruitment, staffing, and human resource services across various industries, ensuring that our clients achieve operational excellence with the right team.
            </p>
           <div className="flex items-center justify-center sm:justify-start gap-5">
           <button onClick={togglePopup} className="btn h-12 text-center p-2 bg-primary sm:text-2xl iceberg-regular text-xl sm:m-0">
                Apply Talents
                <img src={icon} alt="" />
            </button>
            <a href="tel:+91 9363641661" className="w-12 h-12">
                <img src={phone} alt="" />
            </a>
           </div>
        </main>
        <aside className="right hidden sm:w-3/5 sm:block">
            <img src={vector} alt="" className="vector-img" />
        </aside>
    </section>
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

export default Header
