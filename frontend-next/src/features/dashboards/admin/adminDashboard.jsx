"use client";
import {
  LogOut,
  MapPin,
  Phone,
  User,
  Users,
  Home,
  ClipboardList,
  BookCheck,
  Settings,
  ShieldAlert,
  KeyRound,
  Camera,
} from "lucide-react";
import { useContext, useEffect, useState, useMemo } from "react";
import { Listedproperties } from "./views/properties";
import { UserRequests } from "./views/requests";
import { NullData } from "../../../components/view/null-data";
import Mycontext from "../../../context/mycontext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const AdminDashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const u = localStorage.getItem("zibmate_users");
    if (u) setUser(JSON.parse(u));
  }, []);
  const [viewTab, setviewtab] = useState("Properties");
  const { setisLoggedIn } = useContext(Mycontext);
  const router = useRouter();

  const handlelogout = () => {
    localStorage.removeItem("zibmate_users");
    localStorage.removeItem("zibmate_token");
    setisLoggedIn(false);
    router.push("/login");
  };

  // Tab Configuration for cleaner rendering
  const tabs = [
    { id: "Properties", label: "My Listings", icon: <Home className="size-4" /> },
    { id: "Requests", label: "Inquiry Requests", icon: <ClipboardList className="size-4" /> },
    { id: "Bookings", label: "Final Bookings", icon: <BookCheck className="size-4" /> },
  ];

  const activeComponent = useMemo(() => {
    switch (viewTab) {
      case "Properties":
        return <Listedproperties />;
      case "Requests":
        return <UserRequests />;
      default:
        return <NullData viewTab={viewTab} />;
    }
  }, [viewTab]);

  return (
    <section className="min-h-screen bg-[#fcfcfd] p-4 lg:p-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Console</h1>
            <p className="text-sm text-slate-500 font-medium">Overview of your property ecosystem</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900 transition-colors border border-slate-100">
              <Settings className="size-5" />
            </button>
            <button
              onClick={handlelogout}
              className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 active:scale-95"
            >
              Logout <LogOut className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Profile & Management Sidebar */}
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-28 overflow-hidden">
              <div className="h-32 bg-slate-900 relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent" />
              </div>

              <div className="px-8 pb-8">
                <div className="relative -mt-16 flex justify-center mb-6">
                  <div className="relative group">
                    <div className="size-32 rounded-3xl border-4 border-white bg-slate-100 shadow-xl overflow-hidden">
                      <img src="/assets/User.svg" className="w-full h-full object-cover" alt="Admin" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera className="text-white size-6" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">{user.name}</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mt-3 border border-emerald-100">
                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Authorized Admin
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    { icon: <User className="size-4" />, label: user.email },
                    { icon: <Phone className="size-4" />, label: user.phone },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50/50 text-slate-600 text-sm font-medium border border-transparent hover:border-slate-100 transition-all"
                    >
                      <div className="size-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-2">
                  <button className="flex items-center justify-between p-3 text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group">
                    <span className="flex items-center gap-3">
                      <KeyRound className="size-4" /> Change Password
                    </span>
                    <div className="size-5 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-orange-100">
                      <span className="text-[10px]">→</span>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-3 text-sm font-bold text-rose-400 hover:text-rose-600 rounded-xl transition-all">
                    <ShieldAlert className="size-4" /> Deactivate Platform
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Dynamic Tab Workspace */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[700px] flex flex-col overflow-hidden">
              {/* Modern Tab Switcher */}
              <div className="flex items-center gap-1 p-3 bg-slate-50/50 border-b border-slate-100">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setviewtab(tab.id)}
                    className={`relative flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all
                                            ${
                                              viewTab === tab.id
                                                ? "bg-white text-orange-600 shadow-sm text-slate-900"
                                                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                                            }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {viewTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Workspace Content Area */}
              <div className="flex-1 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeComponent}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
