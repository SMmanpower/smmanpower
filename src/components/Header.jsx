import React, { useEffect, useState } from 'react'
import icon from '../assets/Circled_Right.png'
import close from '../assets/Close.png'
import vector from '../assets/shared_workspace.png'
import '../css/header.css'
function Header() {
    const [isPopupOpen,setIsPopupOpen] = useState(false);

    const togglePopup =()=>{
        setIsPopupOpen(!isPopupOpen);
    }
    // -----------------BACK END ----------//
    const [name,setName] = useState("");
        const [contact_number,setContactNo] = useState("");
        const [work_type,setWorkType] = useState("");
        const [age,setAge] = useState("");
        const [address,setAddress] = useState("");
        const [experience,setExperience] = useState("");
        const [upi_number,setUPINumber] = useState("");
        const [aadhar_proof,setAadharProof] = useState("");
        const [drivinglisence,setDL_proof] = useState("");
        const [photo,setPhoto] = useState("");

    const handleSubmit = async (event)=> {
        event.preventDefault();

        const requestdata ={
        name,
        contact_number,
        age,
        work_type,
        address,
        experience,
        upi_number,
        aadhar_proof,
        drivinglisence,
        photo,
        };
        console.log("Applied data are:",requestdata)
try{
        const ApplicationResponse = await axios.post(
            '',
            requestdata,
            {headers:{'content-type':'application/json'}}
        );

         console.log("Response From  Server:",ApplicationResponse);
        
        
            if (ApplicationResponse?.status === 200 || ApplicationResponse?.status === 201) {
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
                  setWorkType('');
                  setContactNo('');
                  setWorkPlace('');
                  setStartdate('');
                  setEndDate('');
                  setProof('');
                  setSalary(''); 
                  setEmployeesNo('')
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
    <section className="header-main container flex flex-row flex-wrap xl:m-auto justify-center items-center xl:flex-nowrap" id='home'>
        <main className="condent w-full xl:w-2/3 p-1">
            <h2 className="heading text-center text-3xl leading-10 xl:w-full xl:text-left xl:text-5xl xl:leading-head aldrich-regular">Connecting Opportunities with the  <br />
             <span className='text-primary'> Right People</span>
            </h2>
            <p className="context text-sm inter xl:text-base text-justify p-2">
                SM Manpower is a leading provider of workforce solutions, dedicated to bridging the gap between exceptional talent and thriving businesses. We specialize in offering tailored recruitment, staffing, and human resource services across various industries, ensuring that our clients achieve operational excellence with the right team.
            </p>
            <button onClick={togglePopup} className="btn h-12 text-center p-2 bg-primary iceberg-regular text-xl m-auto xl:m-0">
                Apply Now
                <img src={icon} alt="" />
            </button>
        </main>
        <aside className="right hidden xl:w-3/5 xl:block">
            <img src={vector} alt="" className="vector-img" />
        </aside>
    </section>
    {
        isPopupOpen && (
                <section className="w-4/5 xl:w-4/5 border-4 bg-white absolute top-4/5 xl:top-3/4 left-1/2 -translate-y-1/4 -translate-x-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 xl:my-5 m-auto border-primary xl:rounded-3xl py-2.5" >
                    <h2 className="aldrich-regular text-2xl xl:text-4xl text-center text-primary xl:m-4">
                        Apply as Talents
                    <button onClick={togglePopup} className='w-8 h-8 xl:w-12 xl:h-12 float-end top-2.5'>
                        <img src={close} alt="" />
                    </button>
                    </h2>
                <form action="" onClick={handleSubmit} className="grid grid-cols-1 grid-rows-13 xl:grid-cols-2 xl:grid-rows-7 xl:grid-flow-col xl:rounded-3xl m-auto mx-5 p-5 xl:gap-2.5">
                    
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your name</p>
                        <input type="text" className="input xl:input-box"  value={name} onChange={(e) => setName(e.target.value)}  required  />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm xl:text-2xl aldrich-regular">Contact no</p>
                        <input type="number" className="input xl:input-box"   value={contact_number} onChange={(e) => setContactNo(e.target.value)}  required />
                    </div>
                    <div className="box text-left ">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your Age</p>
                        <input type="number" className="input xl:input-box"  value={age} onChange={(e) => setAge(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your Address</p>
                        <input type="text" className="input xl:input-box"  value={address} onChange={(e) => setAddress(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your work type</p>
                        <input type="text" className="input xl:input-box"  value={work_type} onChange={(e) => setWorkType(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular"> Experience of Work </p>
                        <input type="text" className="input xl:input-box"  value={experience} onChange={(e) => setExperience(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Enter your UPI Phone no </p>
                        <input type="number" className="input xl:input-box"   value={upi_number} onChange={(e) => setUPINumber(e.target.value)}  required />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Upload your Full size photo</p>
                        <input type="file" className="input xl:input-box file:h-12 file:border-0 placeholder:text-center file:bg-slate-900 file:text-white file:right-0 file:float-end file:p-2.5 file:m-0" value={photo} onChange={(e) => setPhoto(e.target.value)}  required  />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Adhara no & Adhara photo</p>
                        <input type="file" className="input xl:input-box file:h-12 file:border-0 placeholder:text-center file:bg-slate-900 file:text-white file:right-0 file:float-end file:p-2.5 file:m-0"  value={aadhar_proof} onChange={(e) => setAadharProof(e.target.value)}  required />
                    </div>
                    <div className="box text-left">
                        <p className="text-sm xl:text-2xl aldrich-regular">Upload your Driving licence</p>
                        <input type="file" className="input xl:input-box file:h-12 file:border-0 placeholder:text-center file:bg-slate-900 file:text-white file:right-0 file:float-end file:p-2.5 file:m-0 "  value={drivinglisence} onChange={(e) => setDL_proof(e.target.value)}  required  />
                    </div>
                    <div className="box xl:row-span-3 text-left">
                        <label htmlFor="terms&conditions" className='aldrich-regular'>
                            <input type="checkbox" name="termsandcondition" id="" className='mx-2' required/>
                            Term & Conditions
                        </label>
                        <p className="inter text-xs xl:text-base text-justify">
                        1.Your payment will be processed and sent to you within 5 working days <br />
                        2.Any issues encountered during the work may result in a proportional deduction from the payment <br />
                        3.we will not be held responsible for any disputes or complications that may occur between you and the event organizers. <br />
                        4.Please ensure you arrived on time and are properly attiredz <br />
                        </p>
                        <button type="submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl xl:text-4xl">
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