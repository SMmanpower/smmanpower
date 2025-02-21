import React, { useState, useRef } from 'react';
import icon from '../assets/Circled_Right.png'
import axios from "axios";
import Swal from 'sweetalert2';
function BookingForm() {
    const [name, setName] = useState("");
    const [contact_number, setContactNo] = useState("");
    const [work, setWorkDetail] = useState("");
    const [place_of_event, setWorkPlace] = useState("");
    const [employees_required_female, setEmployeesNoFemale] = useState("");
    const [employees_required_male, setEmployeesNoMale] = useState("");
    const [salary, setSalary] = useState("");
    const [start_date, setStartdate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);

    const fileInputRef = useRef(null);

    const handleFileUpload = async (file) => {
      try {
        if (!file) throw new Error("No file selected for upload");
    
        console.log("Uploading File:", file);
    
        const response = await fetch(
          "https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/Sm_serviceBooking",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileType: file.type,
            }),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to get pre-signed URL: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("Pre-signed URL Response:", data);
    
        if (!data.uploadURL || !data.fileUrl) {
          throw new Error("Invalid pre-signed URL response");
        }
    
        const uploadResponse = await fetch(data.uploadURL, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
    
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
        }
    
        console.log("File successfully uploaded to S3:", data.fileUrl);
    
        return data.fileUrl;  
      } catch (error) {
        console.error("Error uploading file:", error);
        Swal.fire("Error", error.message, "error");
        return null;
      }
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();

      const now = new Date();
      const startDateTime = new Date(start_date);
      const endDateTime = new Date(end_date);
    
      if (startDateTime < now) {
        Swal.fire("Error", "Event start date must be not be today .", "error");
        return;
      }
    
      if (startDateTime.toDateString() === endDateTime.toDateString()) {
        if (endDateTime <= startDateTime) {
          Swal.fire(
            "Error",
            "When the start and end date are the same, the end time must be after the start time.",
            "error"
          );
          return;
        }
      } else if (endDateTime < startDateTime) {
        Swal.fire("Error", "End date must be after the start date.", "error");
        return;
      }
    
      
      if (!termsAccepted) {
        Swal.fire("Error", "Please accept the Terms and Conditions", "error");
        return;
      }
  
    
      const file = fileInputRef.current.files[0];
    
      if (!file) {
        Swal.fire("Error", "Please select a file to upload", "error");
        return;
      }
    
      console.log("Selected File:", file);
    
      try {
        const uploadedFileUrl = await handleFileUpload(file);
    
        if (!uploadedFileUrl) {
          Swal.fire("Error", "File upload failed", "error");
          return;
        }
    
        const formData = {
          name,
          contact_number,
          work,
          place_of_event,
          salary,
          employees_required_male,
          employees_required_female,
          start_date,
          end_date,
          proof_url: uploadedFileUrl,  
        };
    
        // console.log("Form Data Before Submit:", formData);
    
        const bookingResponse = await axios.post(
          "https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      
  if (bookingResponse.status === 200 || bookingResponse.status === 201) {
        Swal.fire("Your Booking Was Sent Successfully", "", "success").then(
          () => {
            setName("");
            setWorkDetail("");
            setContactNo("");
            setWorkPlace("");
            setStartdate("");
            setEndDate("");
            setSalary("");
            setEmployeesNoMale("");
            setEmployeesNoFemale(""); 
            setTermsAccepted(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
          }
        );
      } else {
        Swal.fire(
          "Error",
          `Booking failed: ${bookingResponse.data.message || bookingResponse.data}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error during Booking:", error);
      Swal.fire("Error", "Failed to send booking request", "error");
    }
  };

  return (
    <>
    <section className="container w-full m-auto sm:px-8" id='booking'>
        <h2 className="aldrich-regular text-3xl sm:text-5xl text-center sm:mb-4">
            Booking
        </h2>
        <form action="" onSubmit={handleSubmit} className="w-85 h-1200 pb-5 sm:pl-5 sm:h-auto sm:w-auto grid grid-cols-1 grid-rows-12 sm:grid-cols-2 sm:grid-rows-6 grid-flow-col border-2 border-black rounded-2xl sm:rounded-3xl m-auto  sm:gap-0 items-end justify-center place-items-center">
            <div className="box w-11/12 sm:w-4/5 h-fit text-left">
                <p className="text-sm sm:text-2xl aldrich-regular">Enter your name <span className=' text-red-600'>*</span></p>
                <input type="text" className="input sm:input-box" value={name} onChange={(e) => setName(e.target.value)}  required/>
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Contact no <span className=' text-red-600'>*</span></p>
                <input type="number" className="input sm:input-box" value={contact_number} onChange={(e) => setContactNo(e.target.value)} required />
            </div>
            
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Enter your Work Details <span className=' text-red-600'>*</span></p>
                <input type="text" className="input sm:input-box"  value={work} onChange={(e) => setWorkDetail(e.target.value)} required/>
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Place of the Event <span className=' text-red-600'>*</span></p>
                <input type="text" className="input sm:input-box" value={place_of_event} onChange={(e) => setWorkPlace(e.target.value)}  required/>
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular"> Enter your required employees no <span className=' text-red-600'>*</span> </p>
                <div className="w-full flex gap-5">
                    <div className="w-1/2">
                        <label htmlFor="" className='text-sm sm:text-2xl aldrich-regular'>Male:</label>
                        <input type="number" className="input sm:input-box" value={employees_required_male} onBlur={(e) => {
                                    if (e.target.value === "") setEmployeesNoMale("0");
                                  }}  onChange={(e) => setEmployeesNoMale(e.target.value)} required />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="" className='text-sm sm:text-2xl aldrich-regular'>Female:</label>
                        <input type="number" className="input sm:input-box" value={employees_required_female}onBlur={(e) => {
                                  if (e.target.value === "") setEmployeesNoFemale("0");
                                }}  onChange={(e) => setEmployeesNoFemale(e.target.value)} required />
                    </div>
                </div>
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Enter Salary amount for employees <span className=' text-red-600'>*</span></p>
                <input type="number" className="input sm:input-box" min={500} value={salary} onChange={(e) => setSalary(e.target.value)}  required/>
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Event starting date <span className=' text-red-600'>*</span></p>
                <input type="datetime-local" className="input sm:input-box" value={start_date} onChange={(e) => setStartdate(e.target.value)} required/>
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Event Ending  date <span className='   text-red-600'>*</span></p>
                <input type="datetime-local" className="input sm:input-box" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="box text-left w-11/12 sm:w-4/5 h-fit">
                <p className="text-sm sm:text-2xl aldrich-regular">Upload The Company Proof <span className='  text-red-600'>*</span></p>
                <input ref={fileInputRef} type='file' accept="image/*" name="proof" className=" file-input sm:file-input-box  rounded-sm bg-whit border-2  border-primary sm:rounded-xl file:p-1 sm:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end sm:file:px-2 sm:file:py-0  file:m-0"  required />
            </div>
            <div className="box row-span-3 w-11/12 m-auto  sm: mt-2 sm:w-4/5 text-left">
                <label htmlFor="terms&conditions" className='aldrich-regular sm:leading-5 sm:w-full sm:mt-2  text-base sm:text-xl flex items-stretch gap-2.5 m-auto '>
                    <input type="checkbox" name="termsandcondition" id="" className='sm:h-5 sm:w-5' checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required/>
                    Term & Conditions
                </label>
                <p className="inter text-xs sm:w-4/5 sm:mt-2 sm:text-base text-justify">
                1. Payment is expected within three working days. Failure to pay may result in legal proceedings. <br />
                2. We'll send over the employees but you'll need to handle the coordination and  supervision. <br />
                3. We will not be held responsible for any disputes or complications that may occur between you and the employees. <br />
                4.Advance payment is required prior to commencement of work.
                </p>
                <button type="submit" className="btn iceberg-regular h-10 sm:h-auto bg-primary mx-auto my-5 text-xl sm:text-4xl">
                    Book now
                    <img src={icon} alt="" className='h-9 sm:h-12 ' />
                </button>
            </div>
        </form>
    </section>
    </>
  )
}

export default BookingForm