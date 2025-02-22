import React, { useEffect, useState } from 'react';
import assumed from '../assets/Checkmark.png';
import decline from '../assets/Multiply.png';
import axios from 'axios';

function AssumeEmploye() {
    const [employees_data, setEmployeesData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchemployess_data = async () => {
            try {
                const response = await axios.get('https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/Sm_serviceBooking'); 
                setEmployeesData(response.data.employees_data);

                console.log("API response data:", response.data);
                const workerData = Array.isArray(response.data.data)
                  ? response.data.data
                  : [];
                setEmployeesData(workerData);

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            }
        };
        fetchemployess_data();
    }, []);

    return (
        <>
            <table className='w-full border-black border-2 border-collapse mt-8'>
                <thead>
                    <tr>
                        <th className="aldrich-regular border-r-2 border-black">Name</th>
                        <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                        <th className="aldrich-regular border-r-2 border-black">Address
                            <img src={decline}  className='w-8' alt="" />
                        </th>
                        <th className="aldrich-regular border-r-2 border-black">Gender  <img src={decline}  className='w-8' alt="" /></th>
                        <th className="aldrich-regular border-r-2 border-black">Work details</th>
                        <th className="aldrich-regular border-r-2 border-black">Experience of Work</th>
                        <th className="aldrich-regular border-r-2 border-black">Photo</th>
                        <th className="aldrich-regular border-r-2 border-black">Assume employee <img src={decline}  className='w-8' alt="" /> <img src={assumed}  className='w-10' alt="" /></th>
                    </tr>
                </thead>
                {error ? (
                    <p>{error}</p>
                ) : employees_data.length === 0 ? (
                    <p>Data Are Not Found !!</p>
                ) : (
                    <tbody>
                        {employees_data.map((apply) => (
                            <tr key={apply.apply_id?.N} className='border-2 border-black'> 
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.name?.S}</td>
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.contact_number?.S}</td>
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.address?.S}</td>
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.gender?.S}</td>
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.work?.S}</td>
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{apply.experience?.S}</td>
                                <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
                                    <img src={apply.photo_url?.S} alt="" className="w-16 h-16 rounded" />
                                </td>
                                <td className="flex items-center justify-center p-1 xl:gap-2.5 border-black">
                                    {apply.status === "approved" ? ( 
                                        <span className="approve">Approved</span>
                                    ) : apply.status === "declined" ? (
                                        <span className="decline">Declined</span>
                                    ) : (
                                        <div className="cheack-btns">
                                            <button>
                                                <img src={decline} alt="Decline" className='w-10' />
                                            </button>
                                            <button>
                                                <img src={assumed} alt="Assume" className='w-10' />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </>
    );
}

export default AssumeEmploye;
