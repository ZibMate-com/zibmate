import { LogOut, MapPin, Phone, Pin, User, Users } from "lucide-react"
import { Properties } from "./models/properties"
import { useContext, useEffect, useState } from "react"
import { Requests } from "./models/requests"
import { Listedproperties } from "./views/properties"
import { UserRequests } from "./views/requests"
import { NullData } from "../../../components/view/null-data"
import Mycontext from "../../context/mycontext"
import { Navigate, useNavigate } from "react-router"

export const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const [viewTab, setviewtab] = useState("Properties");
    const [activeTab, setactiveTab] = useState();
    const {setisLoggedIn} = useContext(Mycontext)
    const navigate = useNavigate();
    const renderTab = () => {
        switch (viewTab) {
            case "Properties":
                return setactiveTab(<Listedproperties />);
            case "Requests":
                return setactiveTab(<UserRequests/>);
            case "Bookings":
                return setactiveTab();
            default:
                return setactiveTab(<Listedproperties />);
        }
    };
    useEffect(() => {
        renderTab()
    }, [viewTab])
    console.log(viewTab);

    const handlelogout =()=>{
        localStorage.removeItem("users");
        setisLoggedIn(false)
       navigate("/login")
    }

    return (
        <section className="">
            <div className="flex p-4 justify-between">
            <h1 className="text-3xl text-black font-Montserrat font-bold  underline">My Profile</h1>
            <span className="flex items-center gap-2 text-xl px-4 py-2 bg-orange-500 text-white rounded-2xl justify-center hover:bg-orange-600 transition-all font-semibold font-Montserrat" onClick={handlelogout}>
                Logout
                <LogOut/>
            </span>
            </div>
            <div className="p-4 flex gap-5">
                <div className="flex  flex-col gap-4 w-1/3 h-max justify-between shadow-xl rounded-2xl  ">
                    <div className="flex flex-col items-center gap-6 ">
                        <div className="flex justify-center items-center bg-gradient-to-b  from-gray-100 to-gray-200 rounded-2xl w-full h-1/2 p-4  ">
                            <div className="rounded-full w-max h-max border">
                                <img src="/assets/User.svg" className="w-40 h-40" alt="" />
                            </div>
                        </div>
                        <div className=" w-full h-1/2  flex text-center flex-col gap-2 p-4">
                            <span className="text-4xl text-zinc-700 font-semibold"> {user.name}</span>
                            <span className="text-xl font-semibold text-zinc-500"> {user.email}</span>
                            <span className="text-xl font-semibold text-zinc-500"> {user.phone}</span>
                            <span className="text-lg  font-semibold text-zinc-600">Registered As : {user.role}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between cursor-pointer text-sm gap-5 text-orange-700 underline p-4">
                        <span>Edit Profile Details</span>
                        <span>Change Password</span>
                        <span>Deactivate Account</span>
                    </div>
                    
                </div>
                <div className="p-4 w-10/12 shadow-xl rounded-2xl ">
                    <div className="w-full flex justify-between text-2xl mb-4 cursor-pointer">
                        <span onClick={() => setviewtab("Properties")} className={`${viewTab === 'Properties' ? "bg-orange-500 text-white border-orange-500 translate-x-0" : "translate-x-2"} px-4 py-2 rounded-3xl transition-all`}>Properties</span>
                        <span onClick={() => setviewtab("Requests")} className={`${viewTab === 'Requests' ? "bg-orange-500 text-white border-orange-500 translate-x-0" : "translate-x-2"} px-4 py-2 rounded-3xl transition-all`}>Requests</span>
                        <span onClick={() => setviewtab("Bookings")} className={`${viewTab === 'Bookings' ? "bg-orange-500 text-white border-orange-500 translate-x-0" : "translate-x-2"} px-4 py-2 rounded-3xl transition-all`}>Bookings</span>
                    </div>
                    <hr />
                    {
                        activeTab ? activeTab : <NullData viewTab = {viewTab}/>
                    }
                </div>
            </div>
        </section>
    )
}