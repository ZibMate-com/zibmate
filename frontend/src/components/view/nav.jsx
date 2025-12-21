import { useContext, useState, useEffect } from "react";
import { UserCircleIcon, LayoutDashboard, PlusCircle, LogIn, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import Mycontext from "../../features/context/mycontext";
import logo from "../../assets/logoblack.png";

export const NavBar = () => {
    const { isLoggedIn } = useContext(Mycontext);
    const [isScrolled, setIsScrolled] = useState(false);
    const user = JSON.parse(localStorage.getItem("users"));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Find PG", path: "/findpg" },
        { name: "About", path: "/aboutus" },
        { name: "Help", path: "/contact" },
    ];

    return (
        <nav className={`w-full fixed top-0 left-0 z-50 bg-black transition-all duration-300 ${
            isScrolled 
            ? "bg-black backdrop-blur-md border-b border-slate-100 py-3" 
            : "bg-black py-5"
        }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                
                {/* Logo Section */}
                <div className="flex items-center gap-12">
                    <NavLink to="/" className="flex items-center">
                        <img src={logo} className="w-45 md:w-50 rounded-2xl object-contain" alt="Logo" />
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:block'> 
                        <ul className="flex items-center gap-10">
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.path}
                                    to={link.path} 
                                    className={({ isActive }) => `
                                        text-[17px] font-medium transition-all duration-200
                                        ${isActive ? "text-orange-500" : "text-slate-400 hover:text-orange-500"}
                                    `}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex gap-4 items-center">
                    
                    {/* Post Property Button - Casual/Pro Accent */}
                    <NavLink 
                        to={user ? "/postproperty" : "/login"} 
                        className='hidden sm:flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg  active:scale-95'
                    >
                        <PlusCircle className="size-4" />
                        Post Property
                    </NavLink>

                    <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

                    {user ? (
                        <NavLink to={`/profile/${user.role}`}>
                            <div className="flex items-center gap-3 p-1 pr-4 bg-slate-50 border border-slate-100 rounded-full hover:border-orange-200 transition-all group">
                                <div className="size-9 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                                    {user.name?.charAt(0) || "U"}
                                </div>
                                <div className="hidden md:flex flex-col">
                                    <span className="text-[10px] uppercase font-black text-slate-400 leading-none">Member</span>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors">
                                        {user.name?.split(' ')[0]}
                                    </span>
                                </div>
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink to="/login">
                            <button className="flex items-center gap-2 text-slate-700 font-bold text-sm hover:text-orange-500 transition-colors">
                                Sign In
                                <ChevronRight className="size-4" />
                            </button>
                        </NavLink>
                    )}

                    {/* Mobile Dashboard Icon */}
                    <button className="lg:hidden p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <LayoutDashboard className='size-5 text-slate-700'/>
                    </button>
                </div>
            </div>
        </nav>
    );
};