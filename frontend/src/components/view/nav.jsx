import { GiNestBirds } from "react-icons/gi";
import { navBar } from "../model/navbar"
import { NavLink } from "react-router"
import { BiSupport } from "react-icons/bi";
export const NavBar = () => {
    return (
        <nav className=" fixed right-0 left-0 w-full  flex justify-center mt-6 z-50">
            <div className="gap-20 top-0 z-50   bg-white/80 backdrop-blur-xs  rounded-3xl w-7xl flex justify-between items-center md:p-6 p-4 shadow-md relative">
                <div className="flex justify-center items-center gap-2">

                    <h1 className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent md:text-3xl font-Montserrat font-bold text-xl">Homies Nest</h1>

                    <GiNestBirds className="size-8 fill-white bg-purple-600 rounded-sm" />
                </div>

                <div>
                    <ul className="flex md:gap-8 gap-4 md:text-xl font-Raleway text-sm font-bold ">
                        {
                            navBar.map((elemet, index) => {
                                return (
                                    <NavLink to={elemet.path}>
                                        <li className=" hover:scale-105 text-blue-700 transition-all hover:text-blue-800">
                                            {elemet.name}
                                        </li>
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="flex gap-5">
                    <span className="flex justify-center items-center text-purple-600 hover:scale-105 hover:text-purple-700 text-xl font-bold font-Raleway transition-all">
                        Support
                        <BiSupport />
                    </span>
                    <button className="text-white text-xl font-bold font-Raleway bg-purple-600 hover:bg-purple-700   px-6 py-2 rounded-3xl transition-all">
                        Login
                    </button>
                </div>
            </div>
            {/* <div className="z-10 absolute bottom-0 translate-y-15">
            <Search/>
            </div> */}
        </nav>
    )
}