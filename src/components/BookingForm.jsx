import React, { useState, useRef } from 'react';
import icon from '../assets/Circled_Right.png';
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
            <section className="container m-auto lg:px-8">
                <h2 className="aldrich-regular text-3xl lg:text-5xl text-center lg:mb-4">
                    Booking
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 grid-rows-12 xl:grid-cols-2 xl:grid-rows-6 grid-flow-col border-2 border-black rounded-lg xl:rounded-3xl m-auto mx-5 p-5 gap-0 xl:gap-2.5">
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your name</p>
                        <input type="text" className="input xl:input-box" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="box text-left h-fit w-fit m-auto">
                        <p className="text-sm lg:text-2xl aldrich-regular">Contact no</p>
                        <input type="number" className="input lg:input-box" value={contact_number} onChange={(e) => setContactNo(e.target.value)} required />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Enter your Work Details</p>
                        <input type="text" className="input lg:input-box" value={work} onChange={(e) => setWorkDetail(e.target.value)} required />
                    </div>
                    <div className="box text-left h-fit w-fit m-auto">
                        <p className="text-sm lg:text-2xl aldrich-regular">Place of the Event</p>
                        <input type="text" className="input lg:input-box" value={place_of_event} onChange={(e) => setWorkPlace(e.target.value)} required />
                    </div>
                    <div className="box text-left h-fit w-fit m-auto">
                        <p className="text-sm lg:text-2xl aldrich-regular">Upload The Company Proof</p>
                        <input ref={fileInputRef} type='file' accept="image/*" name="proof" className="input lg:input-box file:p-1 lg:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end lg:file:p-2.5 file:m-0" required />
                    </div>
                    <div className="box row-span-3 text-left">
                        <label htmlFor="terms&conditions" className='aldrich-regular lg:mt-2 text-xl flex items-center gap-2.5 '>
                            <input type="checkbox" name="termsandcondition" className='h-5 w-5' required />
                            Term & Conditions
                        </label>
                        <button type="submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl lg:text-4xl">
                            Book now
                            <img src={icon} alt="" />
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default BookingForm;
