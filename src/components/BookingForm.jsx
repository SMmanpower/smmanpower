import React from 'react'

function BookingForm() {
  return (
    <>
    <section className="continer my-5 p-2.5">
        <h2 className="aldrich-regular text-5xl text-center m-4">
            Booking
        </h2>
        <form action="" className=" grid grid-cols-2 grid-rows-6 grid-flow-col border-2 border-black rounded-3xl m-auto px-5 py-5 gap-2.5">
            <div className="box text-left">
                <p className="text-2xl aldrich-regular">Enter your name</p>
                <input type="text" className="input-box" />
            </div>
            <div className="box text-left ">
                <p className="text-2xl aldrich-regular">Contact no</p>
                <input type="number" className="input-box" />
            </div>
            <div className="box text-left ">
                <p className="text-2xl aldrich-regular">Email id</p>
                <input type="mail" className="input-box" />
            </div>
            <div className="box text-left">
                <p className="text-2xl aldrich-regular">Enter your Work Details</p>
                <input type="text" className="input-box" />
            </div>
            <div className="box text-left">
                <p className="text-2xl aldrich-regular">Place of the Event</p>
                <input type="text" className="input-box" />
            </div>
            <div className="box text-left">
                <p className="text-2xl aldrich-regular"> Enter your required employees no </p>
                <input type="number" className="input-box" />
            </div>
            <div className="box text-left">
                <p className="text-2xl aldrich-regular">Enter Salary amount for employees</p>
                <input type="number" className="input-box" />
            </div>
            <div className="box text-left">
                <p className="text-2xl aldrich-regular">Event starting date</p>
                <input type="date" className="input-box" />
            </div>
            <div className="box text-left">
                <p className="text-2xl aldrich-regular">Event Ending  date</p>
                <input type="date" className="input-box" />
            </div>
            <div className="box row-span-3">

            </div>
        </form>
    </section>
    </>
  )
}

export default BookingForm