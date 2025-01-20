import React from 'react'
import icon from '../assets/Circled_Right.png'
import vector from '../assets/shared_workspace.png'
import '../css/header.css'
function Header() {
  return (
    <>
    <section className="header-main container flex justify-center items-center">
        <main className="condent w-2/3 p-1">
            <h2 className="heading w-3/4 text-left text-5xl aldrich-regular">Connecting Opportunities with the
               <br /> <span className='text-primary'> Right People</span>
            </h2>
            <p className="context inter text-base text-justify p-2">
                SM Manpower is a leading provider of workforce solutions, dedicated to bridging the gap between exceptional talent and thriving businesses. We specialize in offering tailored recruitment, staffing, and human resource services across various industries, ensuring that our clients achieve operational excellence with the right team.
            </p>
            <a href="" className="btn h-12 text-center p-2 bg-primary iceberg-regular text-xl">
                Apply Now
                <img src={icon} alt="" />
            </a>
        </main>
        <aside className="right w-1/2">
            <img src={vector} alt="" className="vector-img" />
        </aside>
    </section>
    </>
  )
}

export default Header