import React, { useEffect, useState } from 'react'
import assumed from '../assets/Checkmark.png'
import decline from '../assets/Multiply.png'
import axios from 'axios';

function AssumeEmploye() {
    const [employees_data, setEmployeesData] = useState('');
    const [error,setError] = useState('');
 useEffect (()=>{
    const fetchemployess_data = async () =>{
 
        try {
            const response = await axios.get('link');
            setEmployeesData(response.employees_data);
        } catch (error) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data");
        }
    };
    fetchemployess_data();
  },[]);
    
  return (
    <>
        <table className='w-full border-black border-2 border-collapse mt-8'>
            <thead>
                <tr>
                    <th className="aldrich-regular border-r-2 border-black">Name</th>
                    <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                    <th className="aldrich-regular border-r-2 border-black">Address</th>
                    <th className="aldrich-regular border-r-2 border-black">Work details</th>
                    <th className="aldrich-regular border-r-2 border-black">Experience of Work</th>
                    <th className="aldrich-regular border-r-2 border-black">Photo</th>
                    <th className="aldrich-regular border-r-2 border-black">Assume employee</th>
                </tr>
            </thead>
            {error ?(
                <p>{error}</p>
            ): employees_data == 0 ? (
                <p>Data Are Not Found !!</p>
            ): (
            <tbody>
                {employees_data.map((apply) => (
                <tr key={apply_id} className='border-2 border-black'>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.name}</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.contact_no}</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.address}</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.work}</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.experience}</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.photo}</td>
                    <td className="flex items-center justify-center p-1 xl:gap-2.5 border-black">
                                {status === "approved" ? (
                                    <span className="approve">Approved</span>
                                ) : status === "declined" ? (
                                    <span className="decline">Declined</span>
                                ) : (
                                    <div className="cheack-btns">
                            <button>
                                <img src={decline} alt="" className='w-10' />
                            </button>
                            <button>
                                    <img src={assumed} alt="" className='w-10' />
                            </button>
                        </div>
                        )}
                    </td>
                </tr>
               ) )}
            </tbody>
 )} </table>
  
        </>

  )
}

export default AssumeEmploye