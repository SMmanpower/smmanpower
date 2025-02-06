import React from 'react'
import photo from '../assets/Photo.png'
import download from '../assets/Download.png'
import icon from '../assets/Circled_Right.png'
import Delete from '../assets/Delete.png'
import search from '../assets/Search.png'
function WorkerTable() {
  return (
    <>
    <section className="w-full">
        <header className="w-full lg:p-5 m-auto">
            <h2 className="text-center text-5xl">
                SM Manpower
            </h2>
            <div className="">
                <p className="aldrich-regular text-4xl text-center text-primary justify-center">
                    Welcome admin
                </p>
                
                <div className="w-full flex justify-end gap-5">
                    <button className="btn h-12 bg-primary iceberg-regular lg:text-2xl">Logout
                        <img src={icon} alt="" className=' rotate-180' />
                    </button>
                </div>
            </div>
                    <p className="aldrich-regular text-4xl justify-self-center">
                        Talents details
                    </p>
        </header>
        <main className="p-5 m-auto">
            <div className="search-box w-fit h-10 text-2xl my-5 text-black">
                <button>
                    <img src={search} alt="" />
                </button>
                <input type="search" name="search" id="" placeholder='Search your Talent'  className='border-none outline-none' />
            </div>
            <table className='w-full border-black border-2 border-collapse'>
                <thead>
                    <tr>
                        <th className="aldrich-regular border-r-2 border-black">Name</th>
                        <th className="aldrich-regular border-r-2 border-black">Contact no</th>
                        <th className="aldrich-regular border-r-2 border-black">Address</th>
                        <th className="aldrich-regular border-r-2 border-black">Work type</th>
                        <th className="aldrich-regular border-r-2 border-black">Experience of Work</th>
                        <th className="aldrich-regular border-r-2 border-black">Age</th>
                        <th className="aldrich-regular border-r-2 border-black">aadhar no</th>
                        <th className="aldrich-regular border-r-2 border-black">Photo</th>
                        <th className="aldrich-regular border-r-2 border-black">UP ID</th>
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
                <tbody>
                    <tr className='border-2 border-black'>
                       
                    </tr>
                </tbody>
            </table>
        </main>
    </section>
    </>
  )
}

export default WorkerTable