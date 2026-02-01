import { useContext, useState, useEffect } from "react";
import { UserCircleIcon, LayoutDashboard, PlusCircle, LogIn, ChevronRight,Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import Mycontext from "../../context/mycontext";
import logo from "../../assets/logoblack.png";

export const NavBar = () => {
    const { isLoggedIn  , setloading } = useContext(Mycontext);
    const [isScrolled, setIsScrolled] = useState(false);
    const user = JSON.parse(localStorage.getItem("users"));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [navLinks, setNavLinks] = useState([]);

    useEffect(() => {
        const fetchNavLinks = async () => {
            setloading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content/navbar_main`);
                if (response.ok) {
                    const data = await response.json();
                    setNavLinks(data.map(item => ({ name: item.title, path: item.content })));
                    setloading(false)
                }
            } catch (error) {
                setloading(false)
                console.error("Failed to fetch nav links", error);
            }
        };
        fetchNavLinks();
    }, []);

    return (
       <>
            
            <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black backdrop-blur-md border-b border-white/10 py-3"
                    : "bg-black py-5"
                }`}>
                <div className="max-w-7xl mx-auto px-3 md:px-10 flex justify-between items-center">

                    <div className="flex items-center gap-12">
                        <NavLink to="/" className="flex items-center">
                            <img src={logo} className="w-40 md:w-40 rounded-2xl object-contain" alt="Logo" />
                        </NavLink>

                        <div className='hidden lg:block'>
                            <ul className="flex items-center gap-10">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({ isActive }) => `
                                            text-[15px] font-medium transition-all duration-200
                                            ${isActive ? "text-orange-500" : "text-slate-400 hover:text-orange-500"}
                                        `}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      {
                        user &&  <NavLink
                            to={user.role === 'admin' ? "/postproperty" : "/claimyourpg"}
                            className='hidden md:flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95'
                        >
                            <PlusCircle className="size-4" />
                           {user.role === 'admin' && "Post Property"} 
                           {user.role === 'owner' && "Claim your PG"} 

                        </NavLink>
                      }
                       
                    
                        <div className="h-8 w-[1px] bg-slate-800 mx-2 hidden md:block" />

                        {user ? (
                            <NavLink to={`${user.role === 'admin' ? '/admin-dashboard' : `/profile/${user.role}`}`}>
                                <div className="flex items-center gap-3 p-1 pr-4 bg-[#fafafa] border border-slate-800 rounded-full hover:border-orange-500 transition-all group">
                                    <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                        {user.firstName?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase font-black text-slate-500 leading-none"> {user.firstName?.split(' ')[0]}</span>
                                            <span className="text-sm hidden md:block font-bold text-orange-500 group-hover:text-orange-500 transition-colors">
                                                {user.role?.split(' ')[0]}
                                            </span>
                                    </div>
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink to="/login">
                                <button className="flex items-center gap-2 text-slate-300 font-bold text-sm hover:text-orange-500 transition-colors">
                                    Sign In
                                    <ChevronRight className="size-4" />
                                </button>
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>

            <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-18 md:h-25 bg-black/95 backdrop-blur-lg border-t border-white/10 pb-2">
                <div className="grid h-full grid-cols-5 items-center justify-items-center px-2">


                    {navLinks.slice(0, 2).map((link) => (
                        <NavLink key={link.path} to={link.path} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-orange-500" : "text-slate-400"} `}>
                            {link.icon}
                            <span className="text-[13px] font-medium">{link.name}</span>
                        </NavLink>
                    ))}

                    <div className="relative flex flex-col items-center">
                        <NavLink
                            to={user ? "/postproperty" : "/login"}
                            className="flex items-center justify-center size-14 bg-orange-500 text-white rounded-full shadow-[0_8px_20px_rgba(249,115,22,0.4)] active:scale-90 transition-transform border-4 border-black -mt-8"
                        >
                            <Plus className="size-8" strokeWidth={3} />
                        </NavLink>
                        <span className="text-[10px] font-bold text-orange-500 mt-1 uppercase tracking-wider">
                            Add New
                        </span>
                    </div>

                    
                    {navLinks.slice(2, 4).map((link) => (
                        <NavLink key={link.path} to={link.path} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? "text-orange-500" : "text-slate-400"}`}>
                            {link.icon}
                            <span className="text-[13px] font-medium">{link.name}</span>
                        </NavLink>
                    ))}

                </div>
            </div>
        </>
    );
};