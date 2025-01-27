import React, {useEffect, useState} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
function ApplyForm() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    
    useEffect(() => {
        setIsPopupOpen(true);
    }, []);

   
    const close = () => {
        setIsPopupOpen(false);
    };
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
  
    const handleSubmit = async (event) => {
     event.preventDefault();
      
      const RequestField = {
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
       
      console.log("Data Sending to the DB are:",RequestField);
    
   try {
    
    const ApplicationResponse = await axios.post(
        'link',
        RequestField,
        { headers:{'Content-Type':'appication/json'}}
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
        <section className="continer xl:my-5 m-auto xl:px-8 py-4">
            <h2 className="aldrich-regular text-3xl xl:text-5xl text-center xl:m-4">
                Apply as Talents
            </h2>
            <form action="" onClick={handleSubmit} className=" grid grid-cols-1 grid-rows-12 xl:grid-cols-2 xl:grid-rows-6 grid-flow-col border-2 border-black rounded-lg xl:rounded-3xl m-auto mx-5 p-5 xl:gap-2.5">
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Enter your name</p>
                    <input type="text" className="input xl:input-box"  value={name} onChange={(e) => setName(e.target.value)}  required/>
                </div>
                <div className="box text-left ">
                    <p className="text-sm xl:text-2xl aldrich-regular">Contact no</p>
                    <input type="number" className="input xl:input-box" value={contact_number} onChange={(e) => setContactNo(e.target.value)}  required />
                </div>
                <div className="box text-left ">
                    <p className="text-sm xl:text-2xl aldrich-regular">Enter your Age</p>
                    <input type="number" className="input xl:input-box" value={age} onChange={(e) => setAge(e.target.value)}  required />
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Enter your Work type</p>
                    <input type="text" className="input xl:input-box" value={work_type} onChange={(e) => setWorkType(e.target.value)}  required />
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Address</p>
                    <input type="text" className="input xl:input-box"  value={address} onChange={(e) => setAddress(e.target.value)}  required/>
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular"> Experience </p>
                    <input type="number" className="input xl:input-box" value={experience} onChange={(e) => setExperience(e.target.value)}  required/>
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Upi number</p>
                    <input type="date" className="input xl:input-box" value={upi_number} onChange={(e) => setUPINumber(e.target.value)}  required />
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Aadhar photo</p>
                    <input type="number" className="input xl:input-box" value={aadhar_proof} onChange={(e) => setAadharProof(e.target.value)}  required />
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Driving lisence</p>
                    <input type="date" className="input xl:input-box" value={drivinglisence} onChange={(e) => setDL_proof(e.target.value)}  required />
                </div>
                <div className="box text-left">
                    <p className="text-sm xl:text-2xl aldrich-regular">Photo</p>
                    <input type="date" className="input xl:input-box" value={photo} onChange={(e) => setPhoto(e.target.value)}  required />
                </div>
                <div className="box row-span-3 text-left">
                    <label htmlFor="terms&conditions" className='aldrich-regular'>
                        <input type="checkbox" name="termsandcondition" id="" className='mx-2'/>
                        Term & Conditions
                    </label>
                    <p className="inter text-xs xl:text-base text-justify">
                        Apply to a manpower agency online by meeting eligibility, submitting documents like CV and ID proof, and complying with terms. Teams must provide member details and experience.
                    </p>
                    <button type="Submit" className="btn iceberg-regular bg-primary mx-auto my-5 text-xl xl:text-4xl">
                        Apply now
                        <img src={icon} alt="" />
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default ApplyForm