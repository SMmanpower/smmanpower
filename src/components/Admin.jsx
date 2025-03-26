import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import assumed from '../assets/Checkmark.png';
import decline from '../assets/Multiply.png';
import icon from '../assets/Circled_Right.png';
import filter from '../assets/Adjust.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { applyFilter } from '../AddressFilter';

function Admin() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [assignedBookings, setAssignedBookings] = useState(new Set());

    const [employees_data, setEmployeesData] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [filterLevel, setFilterLevel] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate("/"); 
    };

    const handleTalentClick = () => {
        navigate("/workers"); 
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details');
                const BookingData = Array.isArray(response.data.data) ? response.data.data : [];
                setBookings(BookingData);
            } catch (error) {
                console.error("Error fetching data:", error);
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
     const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const displayedEmployees = employees_data.filter((employee) =>
        employee.name?.S.toLowerCase().includes(searchQuery) ||
        employee.address?.S.toLowerCase().includes(searchQuery) ||
        employee.contact_number?.S.includes(searchQuery)
    );
    
    const handleApplyFilter = () => {
        if (!selectedBooking || !selectedBooking.place_of_event?.S) return;
    
        setFilterLevel(prevFilterLevel => {
            const nextFilterLevel = prevFilterLevel < 5 ? prevFilterLevel + 1 : 6;
            if (nextFilterLevel === 6) {
                setShowSearch(true);
            }
    
            let filteredData = applyFilter(allEmployees, selectedBooking.place_of_event?.S, nextFilterLevel, searchQuery);
            setEmployeesData(filteredData);
    console.log(selectedBooking.place_of_event);
            return nextFilterLevel;
        });
    };
    
    const handleApprove = async (booking) => {
        if (!booking.place_of_event?.S || !booking.work?.S) {
            console.log("Missing place_of_event or work:", booking);
            return;
        }
    
        console.log("Filtering employees for:", booking.place_of_event?.S);
    
        await fetchEmployees(booking.work?.S);
        let initialFilteredData = applyFilter(allEmployees, booking.place_of_event?.S, 1);
    
        console.log("Filtered Data:", initialFilteredData);
    
        if (initialFilteredData.length === 0) {
            console.log("No matching employees found.");
        }
    
        setEmployeesData(initialFilteredData);
        setSelectedBooking(booking);
        setFilterLevel(1);
        setAssignedBookings(prev => new Set([...prev, booking.booking_id?.N]));
    };
    


const sortedBookings = [...bookings].sort((a, b) => {
    const aAssigned = assignedBookings.has(a.booking_id?.N);
    const bAssigned = assignedBookings.has(b.booking_id?.N);
    
    const idSort = Number(a.booking_id?.N) - Number(b.booking_id?.N);
    
    return aAssigned - bAssigned || idSort;
});

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
    
    return (
        <>
            <section className="w-full">
                <header className="w-full xl:p-5 m-auto">
                    <h2 className="text-center text-5xl">SM Manpower</h2>
                    <div className="">
                        <p className="aldrich-regular text-4xl text-center text-primary justify-center">
                            Welcome admin
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
                {sortedBookings.map((booking) => (

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
                        <img src={booking.proof_url?.S}  alt="" className="w-16 h-16 rounded" ></img></td>
                        <td className="flex items-center justify-center p-1 xl:gap-2.5 border-black">
                        {assignedBookings.has(booking.booking_id?.N) ? (
                                <span className="approve">Worker Assigned</span>
                            ) : booking.status === "declined" ? (
                                <span className="decline">Declined</span>
                            ) : (
                                <div className="cheack-btns">
                                    <button onClick={() => handleDelete(booking.booking_id?.N)}>
                                        <img src={decline} alt="" className='w-10' />
                                    </button>
                                    <button  onClick={() => handleApprove(booking)}>
                                        <img src={assumed} alt="" className='w-10' />
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                    {selectedBooking?.booking_id?.N === booking.booking_id?.N && (
                        <tr>
                            <td colSpan="11">
                                <div className="relative w-full bg-white border-2">
                                    <button 
                                        onClick={() => setSelectedBooking(null)} 
                                        className="absolute top-8 right-0 text-white p-2 rounded">
                                        <img src={decline} alt="" className='w-10' />
                    </button>
                        <>
            <table className='w-full border-black border-2 border-collapse mt-8'>
                <thead>
                    <tr>
                        <th className="aldrich-regular border-r-2 border-black">Name</th>
                        <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                        <th className="aldrich-regular border-r-2 border-black">Address
                        <img src={filter}  onClick={handleApplyFilter} className='w-8' alt="" /> 
                        {showSearch && (
                        <input 
                            type="text"
                            name="search"
                            placeholder="Search your Talent"
                            className="border-none outline-none"
                            value={searchQuery}
                            onChange={handleSearch}
                        />)}
                        </th>
                        <th className="aldrich-regular border-r-2 border-black">Gender<img src={filter}  className='w-8' alt="" /></th>
                        <th className="aldrich-regular border-r-2 border-black">Work details</th>
                        <th className="aldrich-regular border-r-2 border-black">Experience of Work</th>
                        <th className="aldrich-regular border-r-2 border-black">Photo</th>
                        <th className="aldrich-regular border-r-2 border-black">Assume employee  </th>
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
            </section>
        </>
    );
}

export default Admin;

