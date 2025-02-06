import React, { useEffect, useState } from 'react';
import axios from 'axios';
import photo from '../assets/Photo.png';
import download from '../assets/Download.png';
import icon from '../assets/Circled_Right.png';
import Delete from '../assets/Delete.png';
import search from '../assets/Search.png';

function WorkerTable() {
    const [workers, setWorkers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get('https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_application_detail'); 
                setWorkers(response.data.workers);

                console.log("API response data:", response.data);
                const workerData = Array.isArray(response.data.data)
                  ? response.data.data
                  : [];
                setWorkers(workerData);

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            }
        };
        fetchWorkers();
    }, []);

    return (
        <>
            <section className="w-full">
                <header className="w-full xl:p-5 m-auto">
                    <h2 className="text-center text-5xl">SM Manpower</h2>
                    <div>
                        <p className="aldrich-regular text-4xl text-center text-primary justify-center">
                            Welcome admin
                        </p>
                        <div className="w-full flex justify-end gap-5">
                            <button className="btn h-12 bg-primary iceberg-regular xl:text-2xl">
                                Logout <img src={icon} alt="" className="rotate-180" />
                            </button>
                        </div>
                    </div>
                    <p className="aldrich-regular text-4xl justify-self-center">Talents details</p>
                </header>
                <main className="p-5 m-auto">
                    <div className="search-box w-fit h-10 text-2xl my-5 text-black">
                        <button>
                            <img src={search} alt="" />
                        </button>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search your Talent"
                            className="border-none outline-none"
                        />
                    </div>
                    <table className="w-full border-black border-2 border-collapse">
                        <thead>
                            <tr>
                                <th className="aldrich-regular border-r-2 border-black">Name</th>
                                <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                                <th className="aldrich-regular border-r-2 border-black">Address</th>
                                <th className="aldrich-regular border-r-2 border-black">Work type</th>
                                <th className="aldrich-regular border-r-2 border-black">Experience</th>
                                <th className="aldrich-regular border-r-2 border-black">Age</th>
                                <th className="aldrich-regular border-r-2 border-black">Aadhar no</th>
                                <th className="aldrich-regular border-r-2 border-black">Photo</th>
                                <th className="aldrich-regular border-r-2 border-black">UPI ID</th>
                                <th className="aldrich-regular border-r-2 border-black">
                                    <button>
                                        <img src={download} alt="" />
                                    </button>
                                </th>
                                <th className="aldrich-regular border-r-2 border-black">
                                    <button>
                                        <img src={Delete} alt="" />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        {error ? (
                            <p>{error}</p>
                        ) : workers.length === 0 ? (
                            <p>No workers found.</p>
                        ) : (
                            <tbody>
                                {workers.map((worker) => (
                                    <tr key={worker.apply_id?.N} className="border-2 border-black">
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.name?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.contact_number?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.address?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.work?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.experience?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.age?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.aadhar_proof?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
                                            <img src={worker.photo?.S|| photo} alt="Worker" className="w-16 h-16 rounded" /></td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.upi_number?.S}</td>
                                        <td className="text-center border-r-2 border-black">
                                            <button>
                                                <img src={download} alt="Download" />
                                            </button>
                                        </td>
                                        <td className="text-center border-r-2 border-black">
                                            <button>
                                                <img src={Delete} alt="Delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </main>
            </section>
        </>
    );
}

export default WorkerTable;
