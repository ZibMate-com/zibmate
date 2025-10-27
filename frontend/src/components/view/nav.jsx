import { GiHouse, GiNestBirds } from "react-icons/gi";
import { NavLink } from "react-router"
import Mycontext from "../../features/context/mycontext";
import { useContext } from "react";
import { UserCircleIcon } from "lucide-react";
export const NavBar = () => {
    const {isLoggedIn , loggedUser} = useContext(Mycontext);
    return (
        <nav className="w-full bg-black/95 flex justify-between items-center text-white p-4">
            <div className="w-max flex justify-between items-center gap-10">
                <NavLink to="/">
                <div className=" rounded-2xl w-50 border">
                    {/* <GiHouse className="size-6"/>
                    <span className="text-2xl font-bold font-Syne">ZibMate</span> */}
                    <img src="assets/logonobg.png" className="w-full h-full object-contain" alt="" />
                </div>
                </NavLink>
                <div >
                    <ul className="flex text-gray-400 text-xl font-semibold gap-8">
                       <NavLink to="/pglist"> <li>Find PG</li> </NavLink>
                       <NavLink to="/aboutus"> <li>About</li> </NavLink>
                       <NavLink to="/contact"> <li>Help</li> </NavLink>
                    </ul>
                </div>
            </div>
            <div className="flex gap-8">
                <NavLink to="/postproperty">
                <button className="px-4 py-3 w-40 bg-orange-500 rounded-2xl text-xl font-semibold">Post Property</button>
                </NavLink>
                {
                    isLoggedIn ? 
                    <NavLink to="/profile">
                    <button className="px-4 py-3 w-max bg-white outline-2 outline-orange-500 text-orange-500 flex items-center gap-2 rounded-2xl text-xl font-semibold">
                        <UserCircleIcon className="size-7"/>
                       Welcome! {loggedUser?.displayName || "Profile"}</button>
                    </NavLink> : 
                <NavLink to="/login">
                    <button className="px-4 py-3 w-36 bg-orange-500 rounded-2xl text-xl font-semibold">Sign In</button>
                </NavLink>
                }
              
            </div>
        </nav>
    )
}