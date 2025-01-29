import React from 'react'
import assumed from '../assets/Checkmark.png'
import decline from '../assets/Multiply.png'

function AssumeEmploye() {
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
            {/* <tbody>
                <tr className='border-2 border-black'>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">hariharan</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">9445862130</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">Catering</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">Chennai</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">10</td>
                    <td className="aldrich-regular text-lg text-center border-r-2 border-black text-primary">500</td>
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
            </tbody> */}
        </table>
    </>
  )
}

export default AssumeEmploye