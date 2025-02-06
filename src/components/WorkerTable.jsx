import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import photo from '../assets/Photo.png';
import download from '../assets/Download.png';
import icon from '../assets/Circled_Right.png';
import Delete from '../assets/Delete.png';
import search from '../assets/Search.png';

function WorkerTable() {
    const [workers, setWorkers] = useState([]);
    const [error, setError] = useState('');
    const [filteredData, setFilteredData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    // --------------------fetch the data-------------
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

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
    
            if (!searchTerm.trim()) {
                setFilteredData(workers); 
                return;
            }
    
            const filteredResults = workers.filter((worker) =>
                Object.values(worker).some((value) =>
                    value?.S?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
    
            setFilteredData(filteredResults.length ? filteredResults : []);
        }
    };

    
    const handleDelete = async (apply_id ) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        'https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_application_detail',
                        {
                            data: { apply_id: apply_id } 
                        }
                    );
    
                    setWorkers(workers.filter(worker => worker.apply_id?.N !== apply_id));
                    Swal.fire("Deleted!", "The record has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete the record.", "error");
                    console.log("Error deleting apply_id:", apply_id, error);
                }
            }
        });
    };

    const handleDownload = async (apply_id) => {
        if (!apply_id) {
            console.error("Error: apply_id is undefined.");
            return;
        }
    
        const worker = workers.find(w => w.apply_id?.N === apply_id);
        
        if (!worker) {
            console.error(`Error: No worker found with apply_id ${apply_id}`);
            return;
        }
    
        console.log("Selected Worker Data:", JSON.stringify(worker, null, 2)); 
    
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Worker Details", 20, 20);
    
        const workerDetails = [
            ["Name:", worker.name?.S || "N/A"],
            ["Contact No:", worker.contact_number?.S || "N/A"],
            ["Address:", worker.address?.S || "N/A"],
            ["Work Type:", worker.work?.S || "N/A"],
            ["Experience:", worker.experience?.S || "N/A"],
            ["Age:", worker.age?.S || "N/A"],
            ["UPI ID:", worker.upi_number?.S || "N/A"],
        ];
    
        doc.setFontSize(12);
        let yOffset = 40;
        workerDetails.forEach(([label, value]) => {
            console.log(`${label} ${value}`); 
            doc.text(`${label} ${value}`, 20, yOffset);
            yOffset += 10;
        });
    
        const convertImageToBase64 = async (imageUrl) => {
            if (!imageUrl) return null;
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.error("Error loading image:", imageUrl, error);
                return null;
            }
        };
    
        const photoUrl = worker.photo?.S || null;
        const aadharUrl = worker.aadhar_proof?.S || null;
        const drivingLicenseUrl = worker.driving_license?.S || null;
    
        console.log("Photo URL:", photoUrl);
        console.log("Aadhar URL:", aadharUrl);
        console.log("Driving License URL:", drivingLicenseUrl);
    
        const photoBase64 = await convertImageToBase64(photoUrl);
        const aadharBase64 = await convertImageToBase64(aadharUrl);
        const drivingLicenseBase64 = await convertImageToBase64(drivingLicenseUrl);
    
        if (photoBase64) {
            doc.addImage(photoBase64, "JPEG", 20, yOffset + 10, 50, 50);
            yOffset += 60;
        }
    
        if (aadharBase64) {
            doc.addImage(aadharBase64, "JPEG", 80, yOffset + 10, 50, 50);
            yOffset += 60;
        }
    
        if (drivingLicenseBase64) {
            doc.addImage(drivingLicenseBase64, "JPEG", 140, yOffset + 10, 50, 50);
            yOffset += 60;
        }
    
        doc.save(`${worker.name?.S || "worker"}_details.pdf`);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };
    
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch} 
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
                            <div>{error}</div>
                        ) : workers.length === 0 ? (
                            <div>No workers found.</div>
                        ) : (
                            <tbody>
                                {(filteredData.length > 0 ? filteredData : workers).map((worker) => (
                                    <tr key={worker.apply_id?.N} className="border-2 border-black">
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.name?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.contact_number?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.address?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.work?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.experience?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.age?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
                                        <img src={worker.aadhar_proof?.S||aadhar_proof } alt="" className="w-16 h-16 rounded"  onClick={() => handleImageClick(worker.aadhar_proof?.S)}/></td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
                                            <img src={worker.photo?.S|| photo} alt="" className="w-16 h-16 rounded" onClick={() => handleImageClick(worker.photo?.S)} /></td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.upi_number?.S}</td>
                                        <td className="text-center border-r-2 border-black">
                                        <button onClick={() => handleDownload(worker.apply_id?.N)}>
                                            <img src={download} alt="Download" />
                                        </button>
                                        </td>
                                        <td className="text-center border-r-2 border-black">
                                        <button onClick={() => worker.apply_id?.N && handleDelete(worker.apply_id?.N)}>
                                            <img src={Delete} alt="Delete" />
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </main>

                    {selectedImage && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                            <div className="relative">
                                <img src={selectedImage} alt="Zoomed" className="w-96 h-auto rounded-lg shadow-lg" />
                                <button 
                                    onClick={closeModal} 
                                    className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
            </section>
        </>
    );
}

export default WorkerTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import jsPDF from "jspdf";
// import photo from '../assets/Photo.png';
// import download from '../assets/Download.png';
// import icon from '../assets/Circled_Right.png';
// import Delete from '../assets/Delete.png';
// import search from '../assets/Search.png';

// function WorkerTable() {
//     const [workers, setWorkers] = useState([]);
//     const [error, setError] = useState('');
//     const [filteredData, setFilteredData] = useState([]); 
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//         const fetchWorkers = async () => {
//             try {
//                 const response = await axios.get('https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_application_detail');
//                 setWorkers(response.data.workers);
//                 console.log("API response data:", response.data);
//                 const workerData = Array.isArray(response.data.data) ? response.data.data : [];
//                 setWorkers(workerData);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setError("Failed to fetch data");
//             }
//         };
//         fetchWorkers();
//     }, []);

//     const handleImageClick = (imageUrl) => {
//         setSelectedImage(imageUrl);
//     };

//     const closeModal = () => {
//         setSelectedImage(null);
//     };

//     return (
//         <>
//             <section className="w-full">
//                 <header className="w-full xl:p-5 m-auto">
//                     <h2 className="text-center text-5xl">SM Manpower</h2>
//                     <div>
//                         <p className="aldrich-regular text-4xl text-center text-primary justify-center">
//                             Welcome admin
//                         </p>
//                         <div className="w-full flex justify-end gap-5">
//                             <button className="btn h-12 bg-primary iceberg-regular xl:text-2xl">
//                                 Logout <img src={icon} alt="" className="rotate-180" />
//                             </button>
//                         </div>
//                     </div>
//                     <p className="aldrich-regular text-4xl justify-self-center">Talents details</p>
//                 </header>
//                 <main className="p-5 m-auto">
//                     <div className="search-box w-fit h-10 text-2xl my-5 text-black">
//                         <button>
//                             <img src={search} alt="" />
//                         </button>
//                         <input 
//                             type="search"
//                             name="search"
//                             placeholder="Search your Talent"
//                             className="border-none outline-none"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <table className="w-full border-black border-2 border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="aldrich-regular border-r-2 border-black">Name</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Contact no</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Address</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Work type</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Experience</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Age</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Aadhar no</th>
//                                 <th className="aldrich-regular border-r-2 border-black">Photo</th>
//                                 <th className="aldrich-regular border-r-2 border-black">UPI ID</th>
//                                 <th className="aldrich-regular border-r-2 border-black">
//                                     <button>
//                                         <img src={download} alt="" />
//                                     </button>
//                                 </th>
//                                 <th className="aldrich-regular border-r-2 border-black">
//                                     <button>
//                                         <img src={Delete} alt="" />
//                                     </button>
//                                 </th>
//                             </tr>
//                         </thead>
//                         {error ? (
//                             <div>{error}</div>
//                         ) : workers.length === 0 ? (
//                             <div>No workers found.</div>
//                         ) : (
//                             <tbody>
//                                 {(filteredData.length > 0 ? filteredData : workers).map((worker) => (
//                                     <tr key={worker.apply_id?.N} className="border-2 border-black">
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.name?.S}</td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.contact_number?.S}</td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.address?.S}</td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.work?.S}</td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.experience?.S}</td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.age?.S}</td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
//                                             <img 
//                                                 src={worker.aadhar_proof?.S || photo} 
//                                                 alt="" 
//                                                 className="w-16 h-16 rounded cursor-pointer"
//                                                 onClick={() => handleImageClick(worker.aadhar_proof?.S)}
//                                             />
//                                         </td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
//                                             <img 
//                                                 src={worker.photo?.S || photo} 
//                                                 alt="" 
//                                                 className="w-16 h-16 rounded cursor-pointer"
//                                                 onClick={() => handleImageClick(worker.photo?.S)}
//                                             />
//                                         </td>
//                                         <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{worker.upi_number?.S}</td>
//                                         <td className="text-center border-r-2 border-black">
//                                             <button onClick={() => handleDownload(worker.apply_id?.N)}>
//                                                 <img src={download} alt="Download" />
//                                             </button>
//                                         </td>
//                                         <td className="text-center border-r-2 border-black">
//                                             <button onClick={() => worker.apply_id?.N && handleDelete(worker.apply_id?.N)}>
//                                                 <img src={Delete} alt="Delete" />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         )}
//                     </table>
//                 </main>

//                 {/* Image Zoom Modal */}
//                 {selectedImage && (
//                     <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
//                         <div className="relative">
//                             <img src={selectedImage} alt="Zoomed" className="w-96 h-auto rounded-lg shadow-lg" />
//                             <button 
//                                 onClick={closeModal} 
//                                 className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full"
//                             >
//                                 X
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </section>
//         </>
//     );
// }

// export default WorkerTable;
