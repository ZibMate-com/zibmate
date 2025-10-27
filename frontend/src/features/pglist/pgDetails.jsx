import { NavLink, useParams } from "react-router";
import { PgData } from "./models/pgdata";
import { useState } from "react";
import { FaParking, FaWifi } from "react-icons/fa";
import Connection from "../../components/connection";

export const PgDetails = () => {
    const { id } = useParams();
    const [detail, setdetails] = useState({});
    const [connected,setConnected] = useState(false);
    console.log(id);
    if (PgData.find(pg => pg.id == id) && Object.keys(detail).length === 0) {
        setdetails(PgData.find(pg => pg.id == id));
    }
    // console.log(PgData.find(pg => pg.id == id)?.images[0]);
    console.log(detail);
    const handleConnection =()=>{
        setConnected(prev => !prev)
    }
    const handleCloseConnection = ()=>{
        setConnected(false);
    }
    return (
        <section className={`w-full h-max p-10 relative`}>
            <div className={` ${connected ? "opacity-20":""} transition-all`}>
            <div className={`w-10/12 h-max mx-auto mt-30 p-4 shadow-2xl rounded-2xl `}>
                <div className="flex">
                    <div className=" w-1/2 h-50 ">
                        {/* {detail.images && detail.images.map((image, index) => (
                            <div key={index} className="w-full h-30">
                                <img className="w-full h-full object-cover" src={image} alt="" />
                            </div>
                        ))} */}
                        {
                            detail.images &&
                            <img className="w-full h-full object-contain" src="/pg data/WhatsApp Image 2025-07-09 at 19.49.37_fd32ef0a.jpg" alt="" />
                        }
                    </div>
                    <div className=" w-1/2 ">
                        <iframe title="Google Map" className=" w-full h-full rounded-lg" src={PgData.find(pg => pg.id == id)?.locationLink} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>
                <div className="grid grid-cols-3 my-5">
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Room rent</h1>
                        <span className=" font-bold text-blue-500">{detail.price}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Name</h1>
                        <span className=" font-bold text-blue-500">{detail.name}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Description</h1>
                        <span className=" font-bold text-blue-500">{detail.description}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Notice Period</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.noticePeriod}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Ac Rooms</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.acRooms}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Food</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.food}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Parking</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.parking}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Gate Closing Time</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.gateClosingTime}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Tenants Preferred</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.tenantsPreferred}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Available For</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.availableFor}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Total No. of Beds</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.totalBeds}</span>
                    </div>
                    <div className="h-20 font-semibold flex flex-col justify-center items-center text-center border border-l-0 border-r-0 border-gray-300">
                        <h1 className="font-Montserrat text-lg">Furnished Status</h1>
                        <span className="text-xl font-bold text-blue-500">{detail.furnishedStatus}</span>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-10">
                    <button className="p-4 w-38 font-bold bg-blue-500 text-white rounded-xl" onClick={handleConnection}>Contact Owner</button>
                    <NavLink to={`/pgdetails/${id}/booking`}>
                    <button className="p-4 w-36 font-bold bg-blue-500 text-white rounded-xl">Book Pg</button>
                    </NavLink>
                </div>
            </div>
            <div className="w-10/12 h-max mx-auto mt-10 bg-white p-10 flex flex-col gap-5 shadow-2xl rounded-2xl">
                <h1 className="font-Montserrat text-2xl font-bold"> Ammenities</h1>
                <div className="flex gap-3">
                    <FaWifi className="size-6" />
                    <FaParking className="size-6" />
                </div>
            </div>
            <div className="w-10/12 h-max mx-auto mt-10 bg-white p-10 flex flex-col gap-5 shadow-2xl rounded-2xl">
                <h1 className="font-Montserrat text-2xl font-bold"> Other Charges</h1>
                <div className="flex gap-3">
                    <FaWifi className="size-6" />
                    <FaParking className="size-6" />
                </div>
            </div>
            <div className="w-10/12 h-max mx-auto mt-10 bg-white p-10 flex flex-col gap-5 shadow-2xl rounded-2xl">
                <h1 className="font-Montserrat text-2xl font-bold"> House Rules</h1>
                <div className="flex gap-3">
                    <FaWifi className="size-6" />
                    <FaParking className="size-6" />
                </div>
            </div>
                </div>
            {
                connected &&  <Connection handleCloseConnection={handleCloseConnection}/>
            }
        </section>
    );
};
