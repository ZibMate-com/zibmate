import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const Contact = () => {
  return (
   <section className='w-full p-6 md:p-10 md:flex justify-between'>
        <div>
            <h1 className='md:text-4xl text-2xl text-black font-bold'>
                FAQ's
            </h1>
            <ul className='flex flex-col gap-4 mt-4'>
                <li className='font-medium p-4 rounded-lg shadow-md shadow-blue-400 hover:bg-blue-300 hover:scale-105 transition-all'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex!</li>
                <li className='font-medium p-4 rounded-lg shadow-md shadow-blue-400 hover:bg-blue-300 hover:scale-105 transition-all'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex!</li>
                <li className='font-medium p-4 rounded-lg shadow-md shadow-blue-400 hover:bg-blue-300 hover:scale-105 transition-all'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex!</li>
                <li className='font-medium p-4 rounded-lg shadow-md shadow-blue-400 hover:bg-blue-300 hover:scale-105 transition-all'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex!</li>
                <li className='font-medium p-4 rounded-lg shadow-md shadow-blue-400 hover:bg-blue-300 hover:scale-105 transition-all'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex!</li>
               
             
            </ul>
        </div>
        <div>
            <h1 className='md:text-4xl text-2xl text-black font-bold'>Problem Not solved Yet? Don't Worry</h1>
            <div className='md:flex block justify-between'>
            <span className='flex flex-col  gap-5 mt-4'>
                <h1 className='md:text-3xl text-xl text-black font-bold'>Follow us on:</h1>
                <span className='flex gap-5'>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram className='text-blue-600 text-4xl shadow-lg hover:scale-105 transition-all '/></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin className='text-blue-600 text-4xl '/></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook className='text-blue-600 text-4xl '/></a>
                <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter className='text-blue-600 text-4xl '/></a>
                </span>
            </span>
            <span className='flex flex-col gap-5 mt-4'>
                <h1 className='md:text-3xl text-xl text-black font-bold'>Contact Us:</h1>
                <label htmlFor="" className='flex gap-3 items-center'><FaPhoneAlt className='text-blue-600 size-6'/> <a className='hover:text-black text-xl' href="tel:+919812467598"> +91 9xxxxxxxxx </a></label>
                <label htmlFor=""className='flex gap-3 items-center'><IoIosMail className='text-blue-600 size-6'/> <a className='hover:text-black text-xl' href="mailto:amanmonga.career@gmail.com"> homiessupport@gmail.com </a></label>
            </span>
            </div>
            <h3 className='md:text-2xl text-lg text-blue-800 font-bold ml-[30%] mt-9'>OR</h3>
            <span className='flex flex-col gap-3 mt-4'>
                <h2 className='md:text-2xl text-lg text-black font-bold'>Ask Your Question Here</h2>
                <input type="text" name='username' placeholder='username' className='border border-[#03690A] p-2 rounded-md' />
                <input type="text" name='email' placeholder='email' className='border border-[#03690A] p-2 rounded-md' />
               <textarea name="message" id="" placeholder='message' className='border border-[#03690A] p-2 rounded-md'></textarea>
            </span>
        </div>
        
   </section>
  )
}

export default Contact