import React, { useState, useRef } from 'react';
import icon from '../assets/Circled_Right.png'
import axios from "axios";
import Swal from 'sweetalert2';
function BookingForm() {
    const [name, setName] = useState("");
    const [contact_number, setContactNo] = useState("");
    const [work, setWorkDetail] = useState("");
    const [place_of_event, setWorkPlace] = useState("");
    const [employees_required, setEmployeesNo] = useState("");
    const [salary, setSalary] = useState("");
    const [start_date, setStartdate] = useState("");
    const [end_date, setEndDate] = useState("");
    
    
    const fileInputRef = useRef(null);

    const handleFileUpload = async (file) => {
        try {
            console.log("Uploading File:", file);

            const response = await fetch("https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/Sm_serviceBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                }),
            });

            const data = await response.json();
            console.log("Pre-signed URL Response:", data);

            if (!data.uploadURL || !data.fileKey) {
                throw new Error("Failed to get upload URL");
            }

            const uploadResponse = await fetch(data.uploadURL, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type }, 
            });

            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
            }

            console.log("File successfully uploaded to S3:", data.fileKey);
            return data.fileKey; 

        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    };
           
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const file = fileInputRef.current.files[0];
        console.log("Selected File:", file);
        if (!file) {
            Swal.fire('Error', 'Please select a file!', 'error');
            return;
        }

        try {
            const fileUrl = await handleFileUpload(file);  

            if (!fileUrl) {
                Swal.fire('Error', 'File upload failed!', 'error');
                return;
            }

            const formData = {
                name,
                contact_number,
                work,
                place_of_event,
                salary,
                employees_required,
                start_date,
                end_date,
                proof_url: fileUrl,  
            };
            console.log("Form Data Before Submit:", formData);

            const bookingResponse = await axios.post("https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details", formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (bookingResponse.status === 200 || bookingResponse.status === 201) {
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
                    // Reset all input fields
                    setName('');
                    setWorkDetail('');
                    setContactNo('');
                    setWorkPlace('');
                    setStartdate('');
                    setEndDate('');
                    setSalary('');
                    setEmployeesNo('');
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ""; // Reset file input
                    }
                });
            } else {
                Swal.fire('Error', 'Booking failed: ' + (bookingResponse.data.message || bookingResponse.data), 'error');
            }
        } catch (error) {
            console.error("Error during Booking:", error);
            Swal.fire('Error', 'Failed to send booking request', 'error');
        }
    };

  return (
    <>
    <section className="continer m-auto lg:px-8" id='booking'>
        <h2 className="aldrich-regular text-3xl lg:text-5xl text-center lg:mb-4">
            Booking
        </h2>
        <form action="" onClick={handleSubmit} className=" grid grid-cols-1 grid-rows-12 lg:grid-cols-2 lg:grid-rows-6 grid-flow-col border-2 border-black rounded-lg lg:rounded-3xl m-auto  gap-0 lg:gap-0 items-center justify-center place-items-center">
            <div className="box w-4/5 h-fit text-left">
                <p className="text-sm lg:text-2xl aldrich-regular">Enter your name <span className=' text-red-600'>*</span></p>
                <input type="text" className="input lg:input-box" value={name} onChange={(e) => setName(e.target.value)}  required/>
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Contact no <span className=' text-red-600'>*</span></p>
                <input type="number" className="input lg:input-box" value={contact_number} onChange={(e) => setContactNo(e.target.value)} required />
            </div>
            
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Enter your Work Details <span className=' text-red-600'>*</span></p>
                <input type="text" className="input lg:input-box"  value={work} onChange={(e) => setWorkDetail(e.target.value)} required/>
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Place of the Event <span className=' text-red-600'>*</span></p>
                <input type="text" className="input lg:input-box" value={place_of_event} onChange={(e) => setWorkPlace(e.target.value)}  required/>
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular"> Enter your required employees no <span className=' text-red-600'>*</span> </p>
                <input type="number" className="input lg:input-box" value={employees_required} onChange={(e) => setEmployeesNo(e.target.value)} required />
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Enter Salary amount for employees <span className=' text-red-600'>*</span></p>
                <input type="number" className="input lg:input-box" min={500} value={salary} onChange={(e) => setSalary(e.target.value)}  required/>
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Event starting date <span className=' text-red-600'>*</span></p>
                <input type="datetime-local" className="input lg:input-box" value={start_date} onChange={(e) => setStartdate(e.target.value)} required/>
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Event Ending  date <span className='   text-red-600'>*</span></p>
                <input type="datetime-local" className="input lg:input-box" value={end_date} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="box text-left w-4/5 h-fit">
                <p className="text-sm lg:text-2xl aldrich-regular">Upload The Company Proof <span className='  text-red-600'>*</span></p>
                <input ref={fileInputRef} type='file' accept="image/*" name="proof" className="input lg:input-box file:p-1 lg:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end lg:file:p-2.5 file:m-0" required />
            </div>
            <div className="box row-span-3 w-250 m-auto lg:w-480 text-left">
                <label htmlFor="terms&conditions" className='aldrich-regular lg:leading-5 lg:w-480 lg:mt-2  text-base lg:text-xl flex items-stretch gap-2.5 m-auto '>
                    <input type="checkbox" name="termsandcondition" id="" className='lg:h-5 lg:w-5' required/>
                    Term & Conditions
                </label>
                <p className="inter text-xs lg:w-480 m-auto lg:mt-2 lg:text-base text-justify">
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