import React, { useEffect, useState } from 'react'
import icon from '../assets/Circled_Right.png'
import close from '../assets/Close.png'
import vector from '../assets/shared_workspace.png'
import '../css/header.css'
import axios from 'axios'
import Swal from 'sweetalert2'
function Header() {
    const [isPopupOpen,setIsPopupOpen] = useState(false);

    const togglePopup =()=>{
        setIsPopupOpen(!isPopupOpen);
    }
    // -----------------BACK END ----------//
    const [name,setName] = useState("");
        const [contact_number,setContactNo] = useState("");
        const [work,setWorkType] = useState("");
        const [age,setAge] = useState("");
        const [address,setAddress] = useState("");
        const [experience,setExperience] = useState("");
        const [upi_number,setUPINumber] = useState("");
        const [aadhar_proof,setAadharProof] = useState(null);
        const [drivinglisence,setDL_proof] = useState(null);
        const [photo,setPhoto] = useState(null);
       
        const handleFileUpload = async (file, setFileUrl) => {
            if (!file) return;
        
            try {
                console.log("Uploading File:", file.name);
        
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
                setFileUrl(data.fileKey); 
        
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        };
        
        const handlePhotoUpload = (e) => handleFileUpload(e.target.files[0], setPhoto);
        const handleAadharUpload = (e) => handleFileUpload(e.target.files[0], setAadharProof);
        const handleDLUpload = (e) => handleFileUpload(e.target.files[0], setDL_proof);
        
        const handleSubmit = async (event) => {
            event.preventDefault();
        
            const requestData = {
                name,
                contact_number,
                age,
                work,
                address,
                experience,
                upi_number,
                photo,         
                aadhar_proof,  
                drivinglisence,
            };
        
            console.log("Applied data:", requestData);
        
            try {
                const ApplicationResponse = await axios.post(
                    'https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_application_detail',
                    requestData,
                    { headers: { 'Content-Type': 'application/json' } }
                );
        
                console.log("Server Response:", ApplicationResponse);
        
        if (ApplicationResponse?.status === 200 || ApplicationResponse?.status === 201) {
                Swal.fire({
                  title: "Your Application Was Sent Successfully",
                  icon: "success",
                  customClass: {
                    title: "popup-message",
                    popup: "popup-container",
                    confirmButton: "popup-close",
                    actions: "popup-action",
                  },
                }).then(() => {
                  
                    setName("");
                    setContactNo("");
                    setAge("");
                    setWorkType("");
                    setAddress("");
                    setExperience("");
                    setUPINumber("");
                    setPhoto(null);
                    setAadharProof(null);
                    setDL_proof(null);
                });
              } else {
                Swal.fire('Error', 'Booking failed: ' + (ApplicationResponse.data.message || ApplicationResponse.data), 'error');
              }
        
           } catch (error) {
            console.error("Error during Booking:",error);
           }
    }
  return (
    <>
    <section className="header-main container flex flex-row flex-wrap lg:m-auto justify-center items-center lg:flex-nowrap" id='home'>
        <main className="condent w-full lg:w-2/3 p-1">
            <h2 className="heading text-center text-3xl leading-10 lg:w-full lg:text-left lg:text-5xl lg:leading-head aldrich-regular">Connecting <br className="block lg:hidden" /> Opportunities <br/> with the  <br className='hidden lg:block' />
             <span className='text-primary'> Right People</span>
            </h2>
            <p className="context text-sm inter lg:text-base text-justify p-2">
                <lable className="lg:hidden">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</lable>
                SM Manpower is a leading provider of workforce solutions, dedicated to bridging the gap between exceptional talent and thriving businesses. We specialize in offering tailored recruitment, staffing, and human resource services across various industries, ensuring that our clients achieve operational excellence with the right team.
            </p>
            <button onClick={togglePopup} className="btn h-12 text-center p-2 bg-primary lg:text-2xl iceberg-regular text-xl m-auto lg:m-0">
                Apply Now
                <img src={icon} alt="" />
            </button>
        </main>
        <aside className="right hidden lg:w-3/5 lg:block">
            <img src={vector} alt="" className="vector-img" />
        </aside>
    </section>
    {
        isPopupOpen && (
                <section className="w-4/5 lg:w-4/5rounde rounded-lg lg:rounded-3xl border-4 bg-white absolute top-4/5 lg:top-3/4 left-1/2 -translate-y-1/4 -translate-x-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:my-5 m-auto border-primary lg:rounded-3xl py-2.5" >
                    <h2 className="aldrich-regular text-2xl lg:text-4xl text-center text-primary lg:m-4">
                        Apply as Talents
                    <button onClick={togglePopup} className='w-8 h-8 lg:w-12 lg:h-12 float-end top-2.5'>
                        <img src={close} alt="" />
                    </button>
                    </h2>
                <form action="" onSubmit={handleSubmit} className="grid grid-cols-1 grid-rows-13 lg:grid-cols-2 lg:grid-rows-7 lg:grid-flow-col lg:rounded-3xl m-auto gap-1 p-5 lg:gap-2.5">
                    
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Enter your name
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input lg:input-box"  value={name} onChange={(e) => setName(e.target.value)}  required  />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm lg:text-2xl aldrich-regular">Contact no
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="number" className="input lg:input-box"   value={contact_number} onChange={(e) => setContactNo(e.target.value)}  required />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm lg:text-2xl aldrich-regular">Enter your Age
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="number" className="input lg:input-box"  value={age} onChange={(e) => setAge(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Enter your Address
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input lg:input-box"  value={address} onChange={(e) => setAddress(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Enter your work type
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input lg:input-box"  value={work} onChange={(e) => setWorkType(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular"> Experience of Work 
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input lg:input-box"  value={experience} onChange={(e) => setExperience(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Enter your UPI Phone no
                            <span className='  text-red-600'>*</span> </p>
                        <input type="number" className="input lg:input-box"   value={upi_number} onChange={(e) => setUPINumber(e.target.value)}  required />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Upload your Full size photo
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="file" className=" file-input lg:file-input-box  rounded-lg bg-whit border-2  border-primary lg:rounded-xl file:p-1 lg:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end lg:file:px-2 lg:file:py-0  file:m-0" onChange={handlePhotoUpload}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Adhara photo
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="file" className=" file-input lg:file-input-box  rounded-lg bg-whit border-2  border-primary lg:rounded-xl file:p-1 lg:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end lg:file:px-2 lg:file:py-0  file:m-0"  onChange={handleAadharUpload} required />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm lg:text-2xl aldrich-regular">Upload your Driving licence</p>
                        <input type="file" className=" file-input lg:file-input-box  rounded-lg bg-whit border-2  border-primary lg:rounded-xl file:p-1 lg:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end lg:file:px-2 lg:file:py-0  file:m-0 "  onChange={handleDLUpload}  required  />
                    </div>
                    <div className="box lg:row-span-4 lg:w-480 place-content-center text-left">
                    <label htmlFor="terms&conditions" className='aldrich-regular lg:mt-2 text-xl flex items-center gap-2.5 '>
                    <input type="checkbox" name="termsandcondition" id="" className='h-5 w-5'/>
                    Term & Conditions
                </label>
                        <p className="inter text-xs lg:text-base text-justify">
                        1.Your payment will be processed and sent to you within 5 working days <br />
                        2.Any issues encountered during the work may result in a proportional deduction from the payment <br />
                        3.we will not be held responsible for any disputes or complications that may occur between you and the event organizers. <br />
                        4.Please ensure you arrived on time and are properly attiredz <br />
                        </p>
                        <button type="submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl lg:text-4xl">
                            Apply  now
                            <img src={icon} alt="" />
                        </button>
                    </div>
                </form>
            </section>
            )
    }
    </>
  )
}

export default Header