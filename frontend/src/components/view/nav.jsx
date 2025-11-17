import { GiHouse, GiNestBirds } from "react-icons/gi";
import { NavLink } from "react-router"
import Mycontext from "../../features/context/mycontext";
import { useContext } from "react";
import { UserCircleIcon,HomeIcon,LayoutDashboard } from "lucide-react";
export const NavBar = () => {
    const { isLoggedIn, loggedUser } = useContext(Mycontext);
    const user = JSON.parse(localStorage.getItem("users"));

    return (
        <nav className="w-full bg-zinc-950 flex justify-between items-center text-white p-4 md:p-5 shadow-lg sticky top-0 z-10">
            
            <div className="flex items-center gap-4 md:gap-12">
                <NavLink to="/" >
                <img src="assets/logonobg.png" className="w-52" alt="" />
                </NavLink>

                <div className='hidden md:block'> 
                    <ul className="flex text-gray-400 text-lg font-medium gap-8">
                        <a href="/findpg" className="transition-colors hover:text-white"><li>Find PG</li></a>
                        <a href="/aboutus" className="transition-colors hover:text-white"><li>About</li></a>
                        <a href="/contact" className="transition-colors hover:text-white"><li>Help</li></a>
                    </ul>
                </div>
            </div>
 
            <div className="flex gap-3 md:gap-4 items-center">

                <a href={`${user ? "/postproperty":"/login"}`} className='hidden sm:block'> 
                    <button className="px-4 py-2 bg-orange-500 rounded-lg text-sm md:text-lg font-semibold hover:bg-orange-600 transition-colors shadow-md">
                        Post Property
                    </button>
                </a>
                {user ? (
                    <NavLink to={`/profile/${user.role}`}>
                        <button className="px-3 py-2 bg-white text-orange-500 flex items-center gap-2 rounded-lg text-sm md:text-lg font-semibold border-2 border-orange-500 hover:bg-orange-50 transition-colors shadow-md">
                            <UserCircleIcon className="size-5 md:size-6"/>
                            <span className='hidden md:inline'>Welcome! {user.name || "User"}</span>
                        </button>
                    </NavLink>
                ) : (
                  
                    <a href="/login">
                        <button className="px-4 py-2 bg-white text-orange-500 rounded-lg text-sm md:text-lg font-semibold border-2 border-orange-500 hover:bg-orange-50 transition-colors shadow-md">
                            Sign In
                        </button>
                    </a>
                )}
                <LayoutDashboard className='md:hidden size-6 text-white cursor-pointer'/>
            </div>
        </nav>
    );
};