import { LogOut, User, Mail, Phone, ShieldCheck, Heart, Send, BookOpen, Edit3, Lock, Trash2, Camera } from "lucide-react"
import { useEffect, useState, useContext, useMemo } from "react"
import { SavedProperties } from "./view/properties"
import { SentRequests } from "./view/requests"
import { NullData } from "../../../components/view/null-data"
import Mycontext from "../../../context/mycontext"
import { useNavigate } from "react-router"
import { motion, AnimatePresence } from "framer-motion"

export const UserDashBoard = () => {
    const user = JSON.parse(localStorage.getItem("users")) || {};
    const [viewTab, setviewtab] = useState("Saved Properties");
    const { setisLoggedIn } = useContext(Mycontext)
    const navigate = useNavigate();

    const handlelogout = () => {
        localStorage.removeItem("users");
        localStorage.removeItem("token")
        setisLoggedIn(false)
        navigate("/login")
    }

    // Mapping tabs to components for cleaner code
    const tabContent = {
        "Saved Properties": <SavedProperties />,
        "Sent Requests": <SentRequests />,
        "Bookings": null
    };

    const tabs = [
        { id: "Saved Properties", icon: <Heart className="size-4" /> },
        { id: "Sent Requests", icon: <Send className="size-4" /> },
        { id: "Bookings", icon: <BookOpen className="size-4" /> },
    ];

    return (
        <section className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your activity and profile settings</p>
                    </div>
                    <button
                        onClick={handlelogout}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-rose-600 border border-rose-100 rounded-xl font-bold text-sm hover:bg-rose-50 transition-all shadow-sm active:scale-95"
                    >
                        <span>Logout</span>
                        <LogOut className="size-4" />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT COLUMN: Profile Card */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                            {/* Profile Cover/Header Accent */}
                            <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600" />

                            <div className="px-6 pb-8">
                                <div className="relative -mt-12 mb-4 flex justify-center">
                                    <div className="relative group">
                                        <div className="size-32 rounded-[2rem] border-4 border-white bg-slate-100 overflow-hidden shadow-lg">
                                            <img src="/assets/User.svg" className="w-full h-full object-cover" alt="Avatar" />
                                        </div>
                                        <button className="absolute bottom-1 right-1 p-2 bg-white rounded-xl shadow-md border border-slate-100 text-slate-600 hover:text-orange-500 transition-colors">
                                            <Camera className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-wider mt-2 border border-orange-100">
                                        <ShieldCheck className="size-3" />
                                        Verified {user.role}
                                    </span>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                                            <Mail className="size-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Email Address</span>
                                            <span className="text-sm font-semibold text-slate-700">{user.email}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                                            <Phone className="size-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Phone Number</span>
                                            <span className="text-sm font-semibold text-slate-700">{user.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Links */}
                            <div className="border-t border-slate-50 p-4 bg-slate-50/50 flex flex-col gap-2">
                                <button className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-white rounded-xl transition-all w-full text-left group">
                                    <Edit3 className="size-4 group-hover:scale-110 transition-transform" /> Edit Profile
                                </button>
                                <button className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-white rounded-xl transition-all w-full text-left group">
                                    <Lock className="size-4 group-hover:scale-110 transition-transform" /> Security Settings
                                </button>
                                <button className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full text-left mt-2">
                                    <Trash2 className="size-4" /> Deactivate
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Content Tabs */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[600px] flex flex-col overflow-hidden">

                            {/* Tab Switcher */}
                            <div className="flex items-center gap-2 p-4 bg-slate-50/50 border-b border-slate-100 overflow-x-auto no-scrollbar">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setviewtab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap
                                            ${viewTab === tab.id
                                                ? "bg-white text-orange-600 shadow-sm border border-slate-200 translate-y-0"
                                                : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
                                            }`}
                                    >
                                        {tab.icon}
                                        {tab.id}
                                    </button>
                                ))}
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={viewTab}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {tabContent[viewTab] ? tabContent[viewTab] : <NullData viewTab={viewTab} />}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}