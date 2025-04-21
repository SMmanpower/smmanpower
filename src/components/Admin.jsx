import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import assumed from '../assets/Checkmark.png';
import decline from '../assets/Multiply.png';
import icon from '../assets/Circled_Right.png';
import filter from '../assets/Adjust.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { applyFilter } from '../utils/AddressFilter';
import { WhatsAppMessage } from '../utils/WhatsappAPI';


function Admin() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [assignedBookings, setAssignedBookings] = useState(new Set());
    const [employees_data, setEmployeesData] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [filterLevel, setFilterLevel] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [genderSortOrder, setGenderSortOrder] = useState("maleFirst");


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); 
        navigate('/'); 
      };
      

    const handleTalentClick = () => {
        navigate("/workers"); 
    };

// --------------------Fetch data ------------------------------------------------------------------------------------

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(
                    'https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details'
                );
                const BookingData = Array.isArray(response.data.data) ? response.data.data : [];
    
                const notAssigned = BookingData
                    .filter(b => b.status?.S !== 'Work Assigned')
                    .sort((a, b) => {
                        const aId = parseInt(a.booking_id?.N || "0");
                        const bId = parseInt(b.booking_id?.N || "0");
                        return aId - bId; 
                    });
    
                const assigned = BookingData.filter(b => b.status?.S === 'Work Assigned');
    
                const finalSorted = [...notAssigned, ...assigned];
    
    
                setBookings(finalSorted);
            } catch (error) {
                setError("Failed to fetch booking data");
            }
        };
    
        fetchBookings();
    }, []);
    

    
    const fetchEmployees = async (work) => {
        try {
            const response = await axios.get(
                `https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/Sm_serviceBooking?work=${work}`
            );
            const workerData = Array.isArray(response.data.data) ? response.data.data : [];
            setEmployeesData(workerData);
            setAllEmployees(workerData);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setError("Failed to fetch employee data");
        }
    };
    
    // ---------------------------search---------------------------------------------------------------------------
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };
    const displayedEmployees = employees_data.filter((employee) =>
        employee.name?.S.toLowerCase().includes(searchQuery) ||
        employee.address?.S.toLowerCase().includes(searchQuery) ||
        employee.contact_number?.S.includes(searchQuery)
    );
    // --------------------------------address filter------------------------------------------------------------------

    const handleApplyFilter = () => {
        if (!selectedBooking || !selectedBooking.place_of_event?.S) return;
    
        setFilterLevel(prevFilterLevel => {
            const nextFilterLevel = prevFilterLevel < 5 ? prevFilterLevel + 1 : 6;
            if (nextFilterLevel === 6) {
                setShowSearch(true);
            }
    
            let filteredData = applyFilter(allEmployees, selectedBooking.place_of_event?.S, nextFilterLevel, searchQuery);
            setEmployeesData(filteredData);
            return nextFilterLevel;
        });
    };

// =----------------------------appove in booking----------------------------------------------------------------------

    const handleApprove = async (booking) => {
        if (!booking.place_of_event?.S || !booking.work?.S) {
            return;
        }
        
        setSelectedBooking(booking);
        setFilterLevel(1); 
    
        await fetchEmployees(booking.work?.S);
    };
    
    useEffect(() => {
        if (selectedBooking && allEmployees.length > 0) {
            const initialFilteredData = applyFilter(allEmployees, selectedBooking.place_of_event?.S, 1);
            setEmployeesData(initialFilteredData);
          setAssignedBookings(prev => new Set([...prev, selectedBooking.booking_id?.N]));

        }
    }, [allEmployees, selectedBooking]);
    
// -----------------------------image zoom ----------------------------------------------------------------------------

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };


// ----------------------------- delete  booking---------------------------------------------------------------------
    const handleDelete = async (bookingId) => {
        if (!bookingId) {
            Swal.fire("Error!", "Invalid booking ID.", "error");
            return;
        }
    
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
    
        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details`, {
                    data: { booking_id: bookingId },
                    headers: { "Content-Type": "application/json" },
                });
    
                setBookings(prev => prev.filter(booking => booking.booking_id?.S !== bookingId));
                Swal.fire("Deleted!", "Booking has been removed.", "success");
            } catch (error) {
                console.error("Error deleting booking:", error);
                Swal.fire("Error!", "Failed to delete booking.", "error");
            }
        }
    };

    // -----------------------assign employee--------------------------------------------------------------------
    const handleAssignWork = async (apply, booking) => {
        const raw = apply.contact_number?.S || apply.contact_number;
        if (!raw) {
          alert("Contact number is missing!");
          return;
        }
      
        const phone = raw.toString().replace(/\D/g, "");
        const toPhoneNumber = `91${phone}`;
        const name = apply.name?.S || "N/A";
        const work = booking.work?.S || "Not specified";
        const startTime = booking.start_date?.S || "N/A";
        const endTime = booking.end_date?.S || "N/A";
        const place = booking.place_of_event?.S || "N/A";
      
        const messageRes = await WhatsAppMessage(toPhoneNumber, name, work, startTime, endTime, place);
      
        if (messageRes.success) {
         Swal.fire("Message sent ✅", "", "success");
      
          const bookingId = booking.booking_id?.N;
          if (bookingId) {
            const updateRes = await updateBookingStatus(bookingId);
            if (updateRes.success) {
              console.log("Booking status updated to 'Work Assigned'");
            } else {
              console.error("Failed to update booking status");
            }
          } else {
            console.warn("Booking ID is missing, cannot update status.");
          }
        } else {
          alert("❌ Failed to send WhatsApp message.");
          console.error(messageRes.error);
        }
      };
        

    // --------------------------Status of the booking------------------------------------------------------------------

const updateBookingStatus = async (bookingId) => {
  try {
    const res = await axios.put(`https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details`, {
      booking_id:bookingId,
      status: "Work Assigned",
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error };
  }
};
  
const handleRemoveEmployee = (applyId) => {   
            setEmployeesData(prev =>
                prev.filter(emp => emp.apply_id?.N !== applyId)
            );
    
};

// -----------------------------------------------Gender Filter---------------------------------------------------------

const sortEmployeesByGender = (employees) => {
    return [...employees].sort((a, b) => {
      const genderA = a.gender?.S || '';
      const genderB = b.gender?.S || '';
  
      if (genderSortOrder === "maleFirst") {
        return genderA === "Male" && genderB !== "Male" ? -1 : 1;
      } else {
        return genderA === "Female" && genderB !== "Female" ? -1 : 1;
      }
    });
  };
  


// -------------------------------------end---------------------------------------------------------------------
    return (
        <>
            <section className="w-full">
                <header className="w-full xl:p-5 m-auto">
                    <h2 className="text-center text-5xl">SM Manpower</h2>
                    <div className="">
                        <p className="aldrich-regular text-4xl text-center text-primary justify-center">
 ,                           Welcome admin
                        </p>
                        <div className="w-full flex justify-end gap-5">
                            <button className="btn h-12  bg-primary iceberg-regular xl:text-2xl" onClick={handleLogout}>Logout
                                <img src={icon} alt="" className='rotate-180' />
                            </button>
                            <button className="btn h-12 bg-primary iceberg-regular xl:text-2xl" onClick={handleTalentClick}>Talents
                                <img src={icon} alt="" className='' />
                            </button>
                        </div>
                        <p className="aldrich-regular text-4xl justify-self-center">
                            Costomer Booking details
                        </p>
                    </div>
                </header>
                <main className="p-5 m-auto">
                    <table className='w-full border-black border-2 border-collapse'>
                        <thead>
                            <tr>
                <th className="aldrich-regular border-r-2 border-black">Name</th>
                <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                <th className="aldrich-regular border-r-2 border-black">Work details</th>
                <th className="aldrich-regular border-r-2 border-black">Place of the Event</th>
                <th className="aldrich-regular border-r-2 border-black">No of Employees Male</th>
                <th className="aldrich-regular border-r-2 border-black">No of Employees Female</th>
                <th className="aldrich-regular border-r-2 border-black">Salary amount</th>
                <th className="aldrich-regular border-r-2 border-black">Event Starting date</th>
                <th className="aldrich-regular border-r-2 border-black">Event End date</th>
                <th className="aldrich-regular border-r-2 border-black">Proof</th>
                <th className="aldrich-regular border-r-2 border-black">Assume employee</th>
            </tr>
        </thead>
        {error ? (
            <p>{error}</p>
        ) : bookings.length === 0 ? (
            <p>No Bookings Found!</p>
        ) : (
            <tbody>
                {bookings.map((booking) => (

                        <React.Fragment key={booking.booking_id?.N || booking.contact_number?.S}>
                    <tr className={`border-2 border-black ${selectedBooking?.booking_id?.N === booking.booking_id?.N ? 'bg-gray-300' : ''}`}>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.name?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.contact_number?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.work?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.place_of_event?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.employees_required_male?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.employees_required_female?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.salary?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.start_date?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.end_date?.S}</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">
                        <img src={booking.proof_url?.S} className="w-16 h-16 rounded"  alt="" onClick={() => handleImageClick(booking.proof_url?.S)}  ></img></td>
                        <td className="flex items-center justify-center p-1 xl:gap-2.5 border-black">
                        {booking.status?.S === "Work Assigned" ? (
                                <span className="approve">Worker Assigned</span>
                            ) : booking.status?.S === "declined" ? (
                                <span className="decline">Declined</span>
                            ) : (
                                <div className="cheack-btns">
                                    <button onClick={() => handleDelete(booking.booking_id?.N)}>
                                        <img src={decline} alt="" className='w-10' />
                                    </button>
                                    <button onClick={() => handleApprove(booking)}>
                                        <img src={assumed} alt="" className='w-10' />
                                    </button>
                                </div>
                            )}

                        </td>
                </tr>

{/* ----------------------------Employee Table --------------------------------------------------------- */}
                    {selectedBooking?.booking_id?.N === booking.booking_id?.N && (
                        <tr>
                            <td colSpan="11">
                                <div className=" w-full bg-white border-2">
                                   
                        <>
            <table className='w-full border-black border-2 border-collapse mt-8'>
                <thead>
                    <tr>
                        <th className="aldrich-regular border-r-2 border-black">Name</th>
                        <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                        <th className="aldrich-regular border-r-2 border-black grid grid-cols-2 items-center justify-center flex-wrap">Address
                        <img src={filter}  onClick={handleApplyFilter} className='w-8 order-last' alt="" /> 
                        {showSearch && (
                        <input 
                            type="text"
                            name="search"
                            placeholder="Search your Talent"
                            className="border-none outline-none order-last text-lg col-span-2 px-5"
                            value={searchQuery}
                            onChange={handleSearch}
                        />)}
                        </th>
                        <th className="aldrich-regular border-r-2 border-black">Gender<img src={filter} 
                         onClick={() => {
                            setGenderSortOrder(prev => (prev === "maleFirst" ? "femaleFirst" : "maleFirst"));
                            const sorted = sortEmployeesByGender(employees_data);
                            setEmployeesData(sorted);
                          }}
                        className='w-8'   alt="Sort by Gender" /></th>
                        <th className="aldrich-regular border-r-2 border-black">Work details</th>
                        <th className="aldrich-regular border-r-2 border-black">Experience of Work</th>
                        <th className="aldrich-regular border-r-2 border-black">Photo</th>
                        <th className="aldrich-regular border-r-2 border-black flex items-center justify-center ">Assume employee
                            <button 
                                onClick={() => setSelectedBooking(null)} 
                                className=" text-white p-2 rounded">
                                <img src={decline} alt="" className='w-10' />
                            </button>
                        </th>
                    </tr>
                </thead>
                {error ? (
                    <p>{error}</p>
                ) : employees_data.length === 0 ? (
                    <p>Data Are Not Found !!</p>
                ) : (
                    <tbody>
                            {displayedEmployees.map((apply) => (
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
                                            <button onClick={()=> handleRemoveEmployee(apply.apply_id?.N)}>
                                                <img src={decline} alt="Decline" className='w-10' />
                                            </button>
                                            <button onClick={() => handleAssignWork(apply,booking)}>
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
            </div>
        </td>
    </tr>
)}

     </React.Fragment>
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

export default Admin;

