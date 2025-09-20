import React, { useState } from 'react'
import { FaTicketAlt } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Bs0CircleFill, BsCheck2Circle, BsFillCheckCircleFill, BsFillPatchCheckFill } from "react-icons/bs";
import { NavLink } from 'react-router';
const Connection = ({ handleCloseConnection }) => {
  const [data, setData] = useState({});
  const [requestsent, setrequestSent] = useState(false);
  const handleChange = (e) => {
    const title = e.target.name;
    const value = e.target.value;
    setData(prev => ({
      ...prev,
      [title]: [value]
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    setData({
      Username: "",
      Email: "",
      Phone: ""
    });
    setrequestSent(true);
  }

  return (
    <div className=''>
      {
        !requestsent ? <div className='w-xs h-max p-6 top-25 right-0 left-0 bottom-0 z-50 bg-white shadow-2xl rounded-2xl mx-auto my-10 flex flex-col gap-4 fixed'>
          <RxCross2 className='size-5 stroke-1 absolute right-2 top-2' onClick={handleCloseConnection} />
          <h1 className='font-bold text-xl mt-3'>Enter Your Contact Details</h1>
          <div className='flex flex-col gap-4'>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className='p-2 border rounded-lg'
              name='Username'
              value={data.Username}
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input type="email"
              placeholder="Enter your email"
              className='p-2 border rounded-lg'
              name='Email'
              value={data.Email}
              onChange={handleChange}
            />
            <label htmlFor="">Phone No.</label>
            <input type="tel"
              placeholder="Enter your phone number"
              className='p-2 border rounded-lg'
              name='Phone'
              value={data.Phone}
              onChange={handleChange}
            />
            <button className='p-2 bg-blue-500 text-white rounded-md' onClick={handleSubmit}>Submit</button>
          </div>
        </div> : <div className='w-xs h-max p-6 top-25 right-0 left-0 bottom-0 z-50 bg-white shadow-2xl rounded-2xl mx-auto my-10 flex flex-col justify-center items-center gap-6 fixed'>
          <RxCross2 className='size-5 stroke-1 absolute right-2 top-2' onClick={handleCloseConnection} />
          <h1 className='font-bold text-lg mt-3'>Your Contact Details are sent to Owner, They will get back to you <b>within 24 hours</b></h1>
          <BsFillCheckCircleFill className='size-15 animate-bounce transition-all text-green-500' />
          <h2 className='text-lg text-gray-500'>Book your pg from our website to avail exciting offers and services.</h2>
          <span className='flex gap-4'>
            <NavLink to="/pglist">
              <button className='w-max p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all'>Book Pg Now</button>
            </NavLink>
            <NavLink to="/pglist">
              <button className='w-max p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all'>Show More Results</button>
            </NavLink>
          </span>
        </div>
      }
    </div>
  )
}

export default Connection