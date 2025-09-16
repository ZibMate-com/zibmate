import { GiHouse, GiNestBirds } from "react-icons/gi";
import { NavLink } from "react-router"
export const NavBar = () => {
    return (
        <nav className="w-full bg-black/95 flex justify-between items-center text-white p-4">
            <div className="w-max flex justify-between items-center gap-10">
                <NavLink to="/">
                <div className="flex items-center gap-4 border p-2 rounded-2xl">
                    <GiHouse className="size-8"/>
                    <span className="text-4xl font-bold font-Syne">ZibMate</span>
                </div>
                </NavLink>
                <div >
                    <ul className="flex text-gray-400 text-xl font-semibold gap-8">
                       <a href="/about"> <li>About</li> </a>
                       <a href="/pglist"> <li>Find PG</li> </a>
                       <a href="/contact"> <li>Help</li> </a>
                       
                    </ul>
                </div>
            </div>
            <div className="flex gap-8">
                <button className="p-4 w-40 bg-orange-500 rounded-2xl text-xl font-semibold">Post Property</button>
                <button className="p-4 w-36 bg-orange-500 rounded-2xl text-xl font-semibold">Sign In</button>
            </div>
        </nav>
    )
}