import { FaWifi, FaRegSnowflake, FaDumbbell } from "react-icons/fa6";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { LuIndianRupee } from "react-icons/lu";
import { TopPglist } from "../model/homepage";
import MotionSection from "../../../components/view/motionComponents";
// import {topPglist} from "./model/homepage.js"
export const Toplistsection = () => {
  return <MotionSection className='w-full p-4'>
    <h1 className='font-bold text-blue-9  00 text-2xl md:text-4xl'>Handpicked for your in loaction </h1>
    <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-3 mt-6'>
      {
        TopPglist.map((pg, index) => {
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
                  <span className="flex gap-4 text-xl text-orange-500">
                    <FaWifi />
                    <FaRegSnowflake />
                    <FaDumbbell />
                    <CgSmartHomeRefrigerator />
                  </span>
                  <p className='hover:underline'>and more...</p>
                </span>
                <button type='submit' className='bg-orange-500 hover:bg-orange-700 w-full p-3 rounded-2xl text-white font-bold '>Get More Details</button>
              </span>
            </div>
          )
        })
      }
    </div>
    <div className="w-full text-center">
    <button className="p-4 w-40 bg-orange-500 rounded-2xl text-white text-md font-semibold mt-10">Load more</button>
    </div>
  </MotionSection>
}