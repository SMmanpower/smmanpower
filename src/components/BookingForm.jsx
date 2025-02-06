import React, { useState } from 'react'
import icon from '../assets/Circled_Right.png'
import axios from "axios";
import Swal from 'sweetalert2';
function BookingForm() {
    const [name,setName] = useState("");
    const [contact_number,setContactNo] = useState("");
    const [work,setWorkDetail] = useState("");
    const [place_of_event,setWorkPlace] = useState("");
    const [employees_required,setEmployeesNo] = useState("");
    const [salary,setSalary] = useState("");
    const [start_date,setStartdate] = useState("");
    const [end_date,setEndDate] = useState("");
    const [proof,setProof] = useState("")
  
    const handleSubmit = async (event) => {
     event.preventDefault();

     const file = proof; 
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64Image = reader.result.split(",")[1];
      
      const RequestData = {
        name,
        contact_number,
         work,
        place_of_event,
        employees_required,
        salary,
        start_date,
        end_date,
        proofBase64: base64Image,
        proofName: file.name
      };
       
      console.log("Data :",RequestData);
    
   try {
    
    const bookingResponse = await axios.post(
        'https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details',
        RequestData,
        { headers:{'Content-Type':'appication/json'}}
    );
     
    console.log("Response From  Server:",bookingResponse);


    if (bookingResponse?.status === 200 || bookingResponse?.status === 201) {
        Swal.fire({
          title: "Your Booking Was Sent Successfully",
          icon: "success",
          customClass: {
            title: "popup-message",
            popup: "popup-container",
            confirmButton: "popup-close",
            actions: "popup-action",
          },
        }).then(() => {
          
          setName('');
          setWorkDetail('');
          setContactNo('');
          setWorkPlace('');
          setStartdate('');
          setEndDate('');
          setProof('');
          setSalary(''); 
          setEmployeesNo('')
        });
      } else {
        Swal.fire('Error', 'Booking failed: ' + (bookingResponse.data.message || bookingResponse.data), 'error');
      }

   } catch (error) {
    console.error("Error during Booking:",error);
   }
}
    }
  return (
    <>
    <section className="continer m-auto lg:px-8">
        <h2 className="aldrich-regular text-3xl lg:text-5xl text-center lg:mb-4">
            Booking
        </h2>
<<<<<<< HEAD
        <form action="" onClick={handleSubmit} className=" grid grid-cols-1 grid-rows-12 lg:grid-cols-2 lg:grid-rows-6 grid-flow-col border-2 border-black rounded-lg lg:rounded-3xl m-auto mx-5 p-5 gap-0 lg:gap-2.5">
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular">Enter your name</p>
                <input type="text" className="input lg:input-box" value={name} onChange={(e) => setName(e.target.value)}  required/>
=======
        <form action="" onSubmit={handleSubmit} className=" grid grid-cols-1 grid-rows-12 xl:grid-cols-2 xl:grid-rows-6 grid-flow-col border-2 border-black rounded-lg xl:rounded-3xl m-auto mx-5 p-5 gap-0 xl:gap-2.5">
            <div className="box text-left">
                <p className="text-sm xl:text-2xl aldrich-regular">Enter your name</p>
                <input type="text" className="input xl:input-box" value={name} onChange={(e) => setName(e.target.value)}  required/>
>>>>>>> e258faa (Talent details page completed)
            </div>
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular">Contact no</p>
                <input type="number" className="input lg:input-box" value={contact_number} onChange={(e) => setContactNo(e.target.value)} required />
            </div>
            
            <div className="box text-left">
                <p className="text-sm lg:text-2xl aldrich-regular">Enter your Work Details</p>
                <input type="text" className="input lg:input-box"  value={work} onChange={(e) => setWorkDetail(e.target.value)} required/>
            </div>
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular">Place of the Event</p>
                <input type="text" className="input lg:input-box" value={place_of_event} onChange={(e) => setWorkPlace(e.target.value)}  required/>
            </div>
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular"> Enter your required employees no </p>
                <input type="number" className="input lg:input-box" value={employees_required} onChange={(e) => setEmployeesNo(e.target.value)} required />
            </div>
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular">Enter Salary amount for employees</p>
                <input type="number" className="input lg:input-box" min={500} value={salary} onChange={(e) => setSalary(e.target.value)}  required/>
            </div>
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular">Event starting date</p>
                <input type="datetime-local" className="input-box" value={start_date} onChange={(e) => setStartdate(e.target.value)} required/>
            </div>
            <div className="box text-left h-fit w-fit m-auto">
                <p className="text-sm lg:text-2xl aldrich-regular">Event Ending  date</p>
                <input type="datetime-local" className="input-box" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="box text-left h-fit w-fit m-auto ">
                <p className="text-sm lg:text-2xl aldrich-regular">Upload The Company Proof</p>
                <input type="file" className="input lg:input-box file:p-1 lg:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end lg:file:p-2.5 file:m-0"  value={proof} onChange={(e) => setProof(e.target.value)} />
            </div>
            <div className="box row-span-3 text-left">
                <label htmlFor="terms&conditions" className='aldrich-regular lg:mt-2 text-xl flex items-center gap-2.5 '>
                    <input type="checkbox" name="termsandcondition" id="" className='h-5 w-5'/>
                    Term & Conditions
                </label>
                <p className="inter text-xs lg:mt-2 lg:text-base text-justify">
                1. Payment is expected within three working days. Failure to pay may result in legal proceedings. <br />
                2. We'll send over the employees but you'll need to handle the coordination and  supervision. <br />
                3. We will not be held responsible for any disputes or complications that may occur between you and the employees. <br />
                4.Advance payment is required prior to commencement of work.
                </p>
                <button type="submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl lg:text-4xl">
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