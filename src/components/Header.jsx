import React, { useRef, useState } from 'react'
import icon from '../assets/Circled_Right.png'
import close from '../assets/Close.png'
import vector from '../assets/shared_workspace.png'
import '../css/header.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import phone from '../assets/Phone.png'
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
        const [gender,setGender] = useState("");
        const [address,setAddress] = useState("");
        const [experience,setExperience] = useState("");
        const [upi_number,setUPINumber] = useState("");
        const [driving_license,setDL_proof] = useState(null);
        const [photo,setPhoto] = useState(null);  
        const [termsAccepted, setTermsAccepted] = useState(false);
            const fileInputRef = useRef(null);
        
        const handleFileUpload = async (file) => {
            try {
                if (!file) {
                    throw new Error("No file selected for upload");
                }
        
        
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
        
                return data.fileUrl; 
            } catch (error) {
                console.error("Error uploading file:", error);
                Swal.fire("Error", error.message, "error");
                return null; 
            }
        };
        
        const handlePhotoUpload = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = await handleFileUpload(file);
                setPhoto(url);
            }
        };
        
        
        const handleDLUpload = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = await handleFileUpload(file);
                setDL_proof(url);
            }
        };
        
                  
        const photoInputRef = useRef(null);
        const dlInputRef = useRef(null);

        const handleSubmit = async (event) => {
            event.preventDefault();
        
            if (!termsAccepted) {
                Swal.fire("Error", "Please accept the Terms and Conditions", "error");
                return;
            }
        
            try {
                const uploadedPhotoUrl = photo && typeof photo === "string" && photo.startsWith("http") ? photo : await handleFileUpload(photo);
                const uploadedDLUrl = driving_license && typeof driving_license === "string" && driving_license.startsWith("http") ? driving_license : (driving_license ? await handleFileUpload(driving_license) : null);

                if (!uploadedPhotoUrl) {
                    Swal.fire("Error", "File upload failed", "error");
                    return;
                }
        
                const employeeFormData = {
                    name,
                    contact_number,
                    age,
                    work,
                    address,
                    experience,
                    gender,
                    upi_number,
                    driving_license: uploadedDLUrl,
                    photo: uploadedPhotoUrl,
                };
        
                const ApplicationResponse = await axios.post(
                    "https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_application_detail",
                    employeeFormData,
                    { headers: { "Content-Type": "application/json" } }
                );
        
                
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
                  setGender("");
                  setWorkType("");
                  setAddress("");
                  setExperience("");
                  setUPINumber("");
                  setPhoto(null);
                  setDL_proof(null);
                  setTermsAccepted(false);
                if (photoInputRef.current) photoInputRef.current.value = "";
                if (dlInputRef.current) dlInputRef.current.value = "";
                });
              } else {
                Swal.fire("Error", "Booking failed: " + (ApplicationResponse.data.message || ApplicationResponse.data), "error");
              }
            } catch (error) {
                console.error("Error submitting form:", error);
                Swal.fire("Error", "An error occurred while submitting the form.", "error");
            }
          };
          
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
            <a href="tel:+91 936341661" className="w-12 h-12">
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
                <form action="" onSubmit={handleSubmit} className="grid grid-cols-1 grid-rows-13 sm:grid-cols-2 sm:grid-rows-7 sm:grid-flow-col sm:rounded-3xl m-auto gap-1 px-5 sm:gap-2.5">
                    
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular">Enter your name
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input sm:input-box"  value={name} onChange={(e) => setName(e.target.value)}  required  />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm sm:text-2xl aldrich-regular">Contact no
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="number" className="input sm:input-box"   value={contact_number} onChange={(e) => setContactNo(e.target.value)}  required />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm sm:text-2xl aldrich-regular">Enter your Age
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="number" className="input sm:input-box"  value={age} onChange={(e) => setAge(e.target.value)}  required  />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm sm:text-2xl aldrich-regular">Select Your Gender
                            <span className='  text-red-600'>*</span>
                        </p>
                        <div className="w-full flex gap-5 sm:mt-5">
                    <div className="w-1/2 flex items-center gap-5">
                        <input type='radio'  className="h-5 w-5" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)}  required/>
                        <label htmlFor="" className='text-sm sm:text-2xl aldrich-regular'>Male</label>
                    </div>
                    <div className="w-1/2 flex items-center gap-5">
                        <input type="radio" className="h-5 w-5"   name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)}  required />
                        <label htmlFor="" className='text-sm sm:text-2xl aldrich-regular'>Female</label>
                    </div>
                </div>
                    </div>
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular">Enter your Address
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input sm:input-box"  value={address} onChange={(e) => setAddress(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular">Enter your work type
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input sm:input-box"  value={work} onChange={(e) => setWorkType(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular"> Experience of Work 
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input type="text" className="input sm:input-box"  value={experience} onChange={(e) => setExperience(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular">Enter your UPI Phone no
                            <span className='  text-red-600'>*</span> </p>
                        <input type="number" className="input sm:input-box"   value={upi_number} onChange={(e) => setUPINumber(e.target.value)}  required />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular">Upload your Full size photo
                            <span className='  text-red-600'>*</span>
                        </p>
                        <input ref={photoInputRef}  accept="image/*"  type="file" className=" file-input sm:file-input-box  rounded-sm bg-whit border-2  border-primary sm:rounded-xl file:p-1 sm:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end sm:file:px-2 sm:file:py-0  file:m-0" onChange={handlePhotoUpload}  required  />
                    </div>
                    
                    <div className="box text-left">
                        <p className="text-sm sm:text-2xl aldrich-regular">Upload your Driving licence</p>
                        <input type="file" ref={dlInputRef}  accept="image/*"  className=" file-input sm:file-input-box  rounded-sm bg-whit border-2  border-primary sm:rounded-xl file:p-1 sm:file:h-12 file:border-0 file:bg-slate-900 file:text-white file:right-0 file:float-end sm:file:px-2 sm:file:py-0  file:m-0 "  onChange={handleDLUpload}    />
                    </div>
                    <div className="box sm:row-span-3 sm:w-480 place-content-center text-left">
                    <label htmlFor="terms&conditions" className='aldrich-regular sm:leading-5 sm:w-full sm:mt-2  text-base sm:text-xl flex items-center justify-start gap-2.5 m-auto '>
                        <input type="checkbox" name="termsandcondition" id="" className='sm:h-5 sm:w-5' checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required/>
                        Term & Conditions
                    </label>
                        <p className="inter terms text-justify">
                        1.Your payment will be processed and sent to you within 5 working days <br />
                        2.Any issues encountered during the work may result in a proportional deduction from the payment <br />
                        3.we will not be held responsible for any disputes or complications that may occur between you and the event organizers. <br />
                        4.Please ensure you arrived on time and are properly attired<br />
                        </p>
                        <button type="submit" className="btn h-10 sm:h-auto iceberg-regular bg-primary mx-auto my-5 text-xl sm:text-4xl">
                            Apply  now
                            <img src={icon} alt="" className='h-9 sm:h-12' />
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