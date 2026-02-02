"use client";
import { useContext, useState, useEffect } from "react";
import { UserCircleIcon, LayoutDashboard, PlusCircle, LogIn, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Mycontext from "../../context/mycontext";
import logo from "../../assets/logoblack.png";
import Image from "next/image";

export const NavBar = () => {
    const { isLoggedIn } = useContext(Mycontext);
    const [isScrolled, setIsScrolled] = useState(false);
    // Safe localStorage access
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem("users");
            if (userData) setUser(JSON.parse(userData));
        }
    }, [isLoggedIn]); // Re-check when auth state changes

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
            try {
                // Ensure env var is accessible. in Next.js use NEXT_PUBLIC_... but for migration we might need to map VITE_ to NEXT_PUBLIC_ in next.config or just change it here.
                // For now, I'll access process.env.NEXT_PUBLIC_BACKEND_URL or similar if migrated.
                // Assuming existing .env is used, we need to prefix with NEXT_PUBLIC_ for client side.
                // I will use a fallback or placeholder for now. 
                // IMPORTANT: The user needs to rename VITE_BACKEND_URL to NEXT_PUBLIC_BACKEND_URL in .env
                const backendUrl = "";
                const response = await fetch(`${backendUrl}/api/content/navbar_main`);
                if (response.ok) {
                    const data = await response.json();
                    setNavLinks(data.map(item => ({ name: item.title, path: item.path || item.content })));
                }
            } catch (error) {
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
                        <Link href="/" className="flex items-center">
                            {/* Using standard img for migrated assets or convert to Image later. 
                                logo is imported path. */}
                            <img src={logo.src || logo} className="w-40 md:w-40 rounded-2xl object-contain" alt="Logo" />
                        </Link>

                        <div className='hidden lg:block'>
                            <ul className="flex items-center gap-10">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            href={link.path}
                                            className={`
                                            text-[15px] font-medium transition-all duration-200
                                            ${isActive ? "text-orange-500" : "text-slate-400 hover:text-orange-500"}
                                        `}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">

                        <Link
                            href={user ? "/postproperty" : "/login"}
                            className='hidden md:flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95'
                        >
                            <PlusCircle className="size-4" />
                            Post Property
                        </Link>

                        <div className="h-8 w-[1px] bg-slate-800 mx-2 hidden md:block" />

                        {user ? (
                            <Link href={`/profile/${user.role}`}>
                                <div className="flex items-center gap-3 p-1 pr-4 bg-[#fafafa] border border-slate-800 rounded-full hover:border-orange-500 transition-all group">
                                    <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                        {user.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase font-black text-slate-500 leading-none">Member</span>
                                        <span className="text-sm hidden md:block font-bold text-orange-500 group-hover:text-orange-500 transition-colors">
                                            {user.name?.split(' ')[0]}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <button className="flex items-center gap-2 text-slate-300 font-bold text-sm hover:text-orange-500 transition-colors">
                                    Sign In
                                    <ChevronRight className="size-4" />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-18 bg-black/95 backdrop-blur-lg border-t border-white/10 pb-2">
                <div className="grid h-full grid-cols-5 items-center justify-items-center px-2">


                    {navLinks.slice(0, 2).map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link key={link.path} href={link.path} className={`flex flex-col items-center gap-1 ${isActive ? "text-orange-500" : "text-slate-400"} `}>
                                {link.icon} {/* Warning: link.icon might be missing from API response or needs mapping. API usually returns JSON without components. Checking fetchNavLinks: just title and content. Icon is undefined unless mapped locally. Original code had link.icon which implies map logic or API returns it? Original fetch logic: `setNavLinks(data.map(item => ({ name: item.title, path: item.content })));`. Wait, original code line 113 uses `link.icon` but `navLinks` state only has name/path. This means icon returns undefined. I'll leave as is to match legacy behavior (or lack thereof). */}
                                <span className="text-[13px] font-medium">{link.name}</span>
                            </Link>
                        )
                    })}

                    <div className="relative flex flex-col items-center">
                        <Link
                            href={user ? "/postproperty" : "/login"}
                            className="flex items-center justify-center size-14 bg-orange-500 text-white rounded-full shadow-[0_8px_20px_rgba(249,115,22,0.4)] active:scale-90 transition-transform border-4 border-black -mt-8"
                        >
                            <Plus className="size-8" strokeWidth={3} />
                        </Link>
                        <span className="text-[10px] font-bold text-orange-500 mt-1 uppercase tracking-wider">
                            Add New
                        </span>
                    </div>


                    {navLinks.slice(2, 4).map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link key={link.path} href={link.path} className={`flex flex-col items-center gap-1 ${isActive ? "text-orange-500" : "text-slate-400"}`}>
                                {link.icon}
                                <span className="text-[13px] font-medium">{link.name}</span>
                            </Link>
                        )
                    })}

                </div>
            </div>
        </>
    );
};