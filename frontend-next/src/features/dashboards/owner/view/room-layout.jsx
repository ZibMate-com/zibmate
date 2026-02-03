"use client";
import React, { useState, useEffect } from "react";

import { Home, Users, Info, Wrench, CheckCircle2, XCircle, LayoutGrid, Layers, Filter, Search } from "lucide-react";

const RoomStructurePage = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/dashboard/owner/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch rooms");
        const data = await response.json();

        // Transform data
        const mappedRooms = data.map((r) => ({
          id: r.room_number || r.id,
          type: r.type ? r.type.charAt(0).toUpperCase() + r.type.slice(1) : "Standard",
          status: r.status,
          tenant: r.tenant_name,
          price: `₹${r.price}`,
        }));
        setRooms(mappedRooms);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
        // setRooms(staticRooms); // Optional fallback
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 lg:p-10 w-full font-sans">
      <div className=" mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Building <span className="text-orange-600">Blueprint</span>
            </h1>
            <p className="text-slate-500 font-medium">Real-time room occupancy and structural overview</p>
          </div>

          <div className="flex gap-4 bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100">
            <StatMini label="Vacant" count="08" color="text-emerald-500" />
            <div className="w-[1px] h-10 bg-slate-100"></div>
            <StatMini label="Occupied" count="16" color="text-rose-500" />
            <div className="w-[1px] h-10 bg-slate-100"></div>
            <StatMini label="Cleaning" count="02" color="text-amber-500" />
          </div>
        </div>
      </div>

      <div className=" mx-auto grid grid-cols-1  gap-8">
        <div className="lg:col-span-6 w-full flex justify-between gap-3  items-center space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Select Floor</p>
          {[4, 3, 2, 1, 0].map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all font-bold ${
                selectedFloor === floor
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                  : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span>{floor === 0 ? "Ground" : `Floor ${floor}`}</span>
              <Layers size={16} className={selectedFloor === floor ? "opacity-100" : "opacity-30"} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-10">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <LayoutGrid className="text-orange-500" />
                Level {selectedFloor} Layout
              </h3>
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl">
                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold">Grid View</button>
                <button className="px-4 py-1.5 text-xs font-bold text-slate-400">List View</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}

              <button className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-2 text-slate-300 hover:border-orange-300 hover:text-orange-400 transition-all hover:bg-orange-50/30">
                <div className="p-3 bg-slate-50 rounded-full group-hover:bg-white">
                  <Home size={24} />
                </div>
                <span className="text-xs font-bold">Add New Room</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatMini = ({ label, count, color }) => (
  <div className="px-4 py-1 flex flex-col items-center">
    <CheckCircle2 className={`${color}`} />
    <span className={`text-xl font-black ${color}`}>{count}</span>
    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{label}</span>
  </div>
);

const RoomCard = ({ room }) => {
  const styles = {
    booked: "bg-rose-50 border-rose-100 text-rose-700 icon-rose-500",
    available: "bg-emerald-50 border-emerald-100 text-emerald-700 icon-emerald-500",
    maintenance: "bg-amber-50 border-amber-100 text-amber-700 icon-amber-500",
  };

  return (
    <div
      className={`relative p-6 rounded-[2rem] border-2 transition-all cursor-pointer group hover:shadow-lg ${
        room.status === "booked"
          ? "bg-white border-slate-100"
          : styles[room.status].split(" ")[0] + " " + styles[room.status].split(" ")[1]
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-2 rounded-xl bg-white shadow-sm font-black text-sm ${room.status === "booked" ? "text-slate-900" : ""}`}
        >
          {room.id}
        </div>
        <StatusIcon status={room.status} />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{room.type}</p>
        <h4 className="font-bold text-slate-800">{room.status === "booked" ? room.tenant : "Vacant"}</h4>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs font-bold text-slate-500">{room.price}</span>
        <button className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:underline">
          Details
        </button>
      </div>
    </div>
  );
};

const StatusIcon = ({ status }) => {
  if (status === "booked") return <CheckCircle2 size={18} className="text-rose-500" />;
  if (status === "available") return <CheckCircle2 size={18} className="text-emerald-500" />;
  return <Wrench size={18} className="text-amber-500" />;
};

export default RoomStructurePage;
