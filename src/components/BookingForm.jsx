import React from 'react'
import icon from '../assets/Circled_Right.png'
function BookingForm() {
  return (
    <>
    <section className="continer xl:my-5 m-auto xl:px-8 py-4">
        <h2 className="aldrich-regular text-3xl xl:text-5xl text-center xl:m-4">
            Booking
        </h2>
        <form action="" className=" grid grid-cols-1 grid-rows-12 xl:grid-cols-2 xl:grid-rows-6 grid-flow-col border-2 border-black rounded-lg xl:rounded-3xl m-auto mx-5 p-5 xl:gap-2.5">
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Enter your name</p>
                <input type="text" className="input xl:input-box" />
            </div>
            <div className="box text-left ">
                <p className="text-sm xl:text-2xl aldrich-regular">Contact no</p>
                <input type="number" className="input xl:input-box" />
            </div>
            <div className="box text-left ">
                <p className="text-sm xl:text-2xl aldrich-regular">Email id</p>
                <input type="mail" className="input xl:input-box" />
            </div>
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Enter your Work Details</p>
                <input type="text" className="input xl:input-box" />
            </div>
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Place of the Event</p>
                <input type="text" className="input xl:input-box" />
            </div>
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular"> Enter your required employees no </p>
                <input type="number" className="input xl:input-box" />
            </div>
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Enter Salary amount for employees</p>
                <input type="number" className="input xl:input-box" />
            </div>
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Event starting date</p>
                <input type="date" className="input xl:input-box" />
            </div>
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Event Ending  date</p>
                <input type="date" className="input xl:input-box" />
            </div>
            <div className="box row-span-3 text-left">
                <label htmlFor="terms&conditions" className='aldrich-regular'>
                    <input type="checkbox" name="termsandcondition" id="" className='mx-2'/>
                    Term & Conditions
                </label>
                <p className="inter text-xs xl:text-base px-10 text-justify">
                1. Payment is expected within three working days. Failure to pay may result in legal proceedings <br /> 
                2. We'll send over the employees but you'll need to handle the coordination and  supervision <br />
                3. We will not be held responsible for any disputes or complications that may occur between you and the employees. <br />
                4.Advance payment is required prior to commencement of work
                </p>
                <button type="submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl xl:text-4xl">
                    Book now
                    <img src={icon} alt="" />
                </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default BookingForm