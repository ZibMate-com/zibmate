import { FaWifi,FaRegSnowflake,FaDumbbell   } from "react-icons/fa6";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { LuIndianRupee } from "react-icons/lu";
import { TopPglist } from "../model/homepage";
// import {topPglist} from "./model/homepage.js"
export const Toplistsection = () => {
    return  <section className='w-full p-6 md:p-10 '>
        <h1 className='font-bold text-blue-9  00 text-2xl md:text-4xl'>Handpicked for your in loaction </h1>
        <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-3 mt-6'>
          {
            TopPglist.map((pg,index)=>{
              return (
                   <div className='md:w-xs md:h-[440px] h-[480px] shadow-lg   rounded-md transition-all'>
            <span className='w-full'>
              <img className='w-full md:h-[40%] h-[50%] object-cover rounded-md rounded-b-none' src={pg.image} alt="" />
            </span>
            <span className='w-full flex flex-col md:gap-3 gap-5 p-2'>
              <h2 className='text-xl font-bold'>Rs.{pg.price} onwards</h2>
              <p className='text-[15px]'>{pg.description}</p>
              <span className='flex items-center gap-4 text-md font-bold mt-2'>
                <h2>Facilities:</h2>
                <span className="flex gap-4 text-xl text-blue-700">
                    <FaWifi />
                    <FaRegSnowflake/>
                    <FaDumbbell/>
                    <CgSmartHomeRefrigerator/>
                       </span>
                   <p className='hover:underline'>and more...</p>
              </span>
              <button type='submit' className='bg-blue-700 hover:bg-blue-800 w-[70%] p-3 rounded-2xl text-white font-bold md:ml-10 ml-12 mt-3'>Get More Details</button>
            </span>
          </div>
              )
            })
          }
        </div>
      </section>
}