import React, { useEffect, useState } from 'react';
import assumed from '../assets/Checkmark.png';
import decline from '../assets/Multiply.png';
import AssumeEmploye from './AssumeEmploye';
import icon from '../assets/Circled_Right.png';
import axios from 'axios';

function Admin() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://vdtwit6wib.execute-api.ap-south-1.amazonaws.com/prod/SM_booking_details');
                setBookings(response.data.bookings);

                console.log("API response data:", response.data);
                const BookingData = Array.isArray(response.data.data)
                  ? response.data.data
                  : [];
                setBookings(BookingData);

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch booking data");
            }
        };
        fetchBookings();
    }, []);

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
                            <button className="btn h-12 bg-primary iceberg-regular xl:text-2xl">Logout
                                <img src={icon} alt="" className='rotate-180' />
                            </button>
                            <button className="btn h-12 bg-primary iceberg-regular xl:text-2xl">Talents
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
                                <th className="aldrich-regular border-r-2 border-black">No of Employees</th>
                                <th className="aldrich-regular border-r-2 border-black">Salary amount</th>
                                <th className="aldrich-regular border-r-2 border-black">Event Starting date</th>
                                <th className="aldrich-regular border-r-2 border-black">Event End date</th>
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
                                    <tr key={booking.id} className='border-2 border-black'>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.name?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.contact_number?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.work?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.place_of_event?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.employees_required?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.salary?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.start_date?.S}</td>
                                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">{booking.end_date?.S}</td>
                                        <td className="flex items-center justify-center p-1 xl:gap-2.5 border-black">
                                            {booking.status === "approved" ? (
                                                <span className="approve">Approved</span>
                                            ) : booking.status === "declined" ? (
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
                                ))}
                            </tbody>
                        )}
                    </table>
                    <AssumeEmploye />
                </main>
            </section>
        </>
    );
}

export default Admin;
