import React from 'react'

function Aboutus() {
  return (
    <>
    <section className="aboutus container py-4 m-auto sm:m-auto" id='about'>
        <header className="px-2">
            <h2 className="text-center text-2xl sm:text-5xl aldrich-regular">
                About us
            </h2>
            <p className="text-sm sm:text-base inter text-justify sm:w-full m-auto px-2 py-2.5  indent-5 sm:indent-10">
            <span className="text-primary"> Welcome to SM Manpower</span>,At SM Manpower Services, we take pride in being one of the leading manpower solutions providers, dedicated to connecting businesses with skilled professionals and empowering individuals to achieve their career aspirations. With a strong foundation built on trust, quality, and excellence, we specialize in delivering reliable staffing solutions across a variety of industries.
            </p>
        </header>
        <main className="w-full sm:flex justify-center items-center text-4xl px-2.5 sm:gap-2.5">
            <aside className="mission sm:w-1/2 px-1 sm:p-2.5">
                <h2 className="aldrich-regular text-2xl text-center sm:text-4xl text-primary">Our Mission</h2>
                <p className="inter text-sm sm:text-sm text-justify sm:p-2.5">To bridge the gap between exceptional talent and thriving businesses by providing customized manpower solutions that drive success and create lasting value.</p>
            </aside>
            <aside className="vission sm:w-1/2 px-1 sm:p-2.5">
                <h2 className="aldrich-regular text-2xl text-center text-primary sm:text-4xl">Our Vision</h2>
                <p className="inter text-sm sm:text-sm text-justify sm:p-2.5">To become the most trusted and preferred manpower Services, recognized for our commitment to quality, innovation, and the growth of both organizations and individuals.</p>
            </aside>
        </main>
    </section>
    </>
  )
}

export default Aboutus