import React from 'react'
import assumed from '../assets/Checkmark.png'
import decline from '../assets/Multiply.png'
import AssumeEmploye from './AssumeEmploye'
function Admin() {
  return (
    <>
    <section className="w-full">
        <header className="w-full xl:p-5 m-auto">
            <h2 className="text-center text-5xl">
                SM Manpower
            </h2>
            <div className="">
                <p className="aldrich-regular text-4xl text-center text-primary justify-center">
                    Welcome admin
                </p>
                
                <div className="w-full flex justify-end gap-5">
                    <button className="btn h-12">Logout</button>
                    <button className="btn h-12 bg-primary">Talents</button>
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
                <tbody>
                    <tr className='border-2 border-black'>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">hariharan</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">9445862130</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">Catering</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">Chennai</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">10</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">500</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">25,01,2025</td>
                        <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">25,01,2025</td>
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
                </tbody>
            </table>
            <AssumeEmploye/>
        </main>
    </section>
    </>
  )
}

export default Admin