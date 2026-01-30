import React, { useState } from "react";
import {
  Phone, Search, Filter, Calendar, MapPin,
  CheckCircle2, Clock, PhoneCall, ArrowUpRight,
  User, Building, LayoutDashboard, Settings,
  LogOut, Bell, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminDashboard } from "./viewmodels/useadminDashboard";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("tenant"); 
  const { tenentRequest,handleLogout } = useAdminDashboard();


  const tenantRequests = [
    { id: 1, name: "Rahul Sharma", phone: "+91 98XXXX432", property: "Sai PG, HSR Layout", date: "28 Jan 2026", status: "Pending" },
    { id: 2, name: "Ananya Verma", phone: "+91 97XXXX112", property: "Green View PG, Whitefield", date: "27 Jan 2026", status: "Called" },
  ];

  const ownerRequests = [
    { id: 1, name: "Mr. Kapoor", phone: "+91 99XXXX888", property: "Kapoor Residency", date: "29 Jan 2026", status: "Pending", type: "Partnership" },
    { id: 2, name: "Suresh Raina", phone: "+91 91XXXX000", property: "Skyline PG", date: "25 Jan 2026", status: "Called", type: "Billing Inquiry" },
  ];

  const currentRequests = activeTab === "tenant" ? tenentRequest : ownerRequests;

  return (
    <div className="flex min-h-screen bg-[#fafafa]">

      <main className="flex-1  p-8 lg:p-12">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
              Callback <span className="text-orange-600">Requests</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Currently viewing <span className="text-slate-900 font-bold">{activeTab}</span> inquiries
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-orange-200">
              <Clock size={14} /> {currentRequests.length} Pending {activeTab}s
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 active:scale-95"
          >
            Logout <LogOut className="size-4" />
          </button>
        </header>

        {/* Tab Switcher (Mobile/Tablet Visibility) */}
        <div className="flex p-1 bg-slate-200/50 rounded-2xl w-fit mb-8">
          <button
            onClick={() => setActiveTab("tenant")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'tenant' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Tenents
          </button>
          <button
            onClick={() => setActiveTab("owner")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'owner' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Owners
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 bg-white p-3 rounded-[2rem] shadow-sm border border-slate-100 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
            <input
              placeholder={`Search by ${activeTab} name...`}
              className="w-full pl-12 h-12 border-none bg-slate-50/50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
            />
          </div>
          <button className="h-12 px-6 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* Requests List */}
        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            {currentRequests.map((req, index) => (
              <motion.div
                key={`${activeTab}-${req.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <RequestCard data={req} type={activeTab} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}


function RequestCard({ data, type }) {
  return (
    <section className="group rounded-[2.5rem] border border-slate-100 hover:border-orange-200 transition-all hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          <div className="flex items-start gap-6">
            <div className={`size-16 rounded-3xl flex items-center justify-center transition-all duration-500 ${type === 'owner' ? 'bg-blue-50 text-blue-500 group-hover:bg-blue-500' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-500'
              } group-hover:text-white`}>
              <PhoneCall size={28} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">{data.full_name}</h4>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${data.status === 'inActive' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                  {data.status}
                </span>
                {data.type && (
                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold">
                    {data.type}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Phone size={16} className="text-slate-400" /> {data.phone}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <MapPin size={16} className="text-slate-400" /> {data.property}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <Calendar size={16} /> Requested {data.created_at.slice(0, 10)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button className="flex-1 lg:flex-none bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl h-14 px-8 flex items-center gap-2 active:scale-95 transition-all shadow-xl shadow-slate-200">
              Send Owner Details <ArrowUpRight size={18} />
            </button>
            <button className="flex-1 lg:flex-none border-2 border-slate-100 text-slate-600 font-bold rounded-2xl h-14 px-6 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95">
              <CheckCircle2 size={18} /> Done
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}