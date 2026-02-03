"use client";
import { useState, useEffect } from "react";

import { Users, MapPin } from "lucide-react";

export const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetching all PGs for now as "Saved" placeholder
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/pg`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading properties...</div>;

  if (properties.length === 0) return <div className="p-10 text-center text-slate-400">No properties found.</div>;

  return (
    <div className=" flex flex-col gap-10 mt-5">
      {properties.map((prop) => {
        return (
          <div
            key={prop.id}
            className="group flex flex-col md:flex-row gap-6 p-4 bg-white border border-stone-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-500"
          >
            {/* 1. Image Section - Fixed Aspect Ratio */}
            <div className="w-full md:w-72 h-56 shrink-0 overflow-hidden rounded-[1.5rem] relative">
              <img
                src={
                  prop.images?.[0] ||
                  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={prop.name}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-600">ID: {prop.id}</span>
              </div>
            </div>

            {/* 2. Content Section */}
            <div className="flex flex-col lg:flex-row justify-between w-full py-2 gap-6">
              {/* Left Info Block */}
              <div className="flex flex-col space-y-3 flex-1">
                <div>
                  <h3 className="text-2xl font-bold text-stone-900 tracking-tight">{prop.name}</h3>
                  <p className="text-sm text-stone-400 font-medium line-clamp-1">{prop.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-stone-600">
                  <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-100">
                    <Users className="size-4 text-orange-500" />
                    <span className="text-xs font-bold">{prop.occupancy} Residents</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-100">
                    <MapPin className="size-4 text-orange-500" />
                    <span className="text-xs font-bold">{prop.city}</span>
                  </div>
                </div>

                {/* Facilities as Chips */}
                <div className="pt-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2">
                    Top Facilities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {prop.facilities &&
                      prop.facilities.map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-md border border-orange-100"
                        >
                          {typeof f === "string" ? f.trim() : f}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* 3. Action & Price Block */}
              <div className="flex flex-row lg:flex-col justify-between items-end lg:w-48 border-t lg:border-t-0 lg:border-l border-stone-50 pt-4 lg:pt-0 lg:pl-6">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">
                    {prop.created_at ? new Date(prop.created_at).toLocaleDateString() : "Recently Added"}
                  </span>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-black text-stone-900 tracking-tighter">₹{prop.price}</span>
                    </div>
                    {prop.discount > 0 && (
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">
                        SAVE ₹{prop.discount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full max-w-[120px]">
                  <button className="w-full py-3 bg-stone-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-stone-200">
                    Manage
                  </button>
                  <div className="flex items-center justify-center gap-1.5">
                    <div
                      className={`size-1.5 rounded-full animate-pulse ${prop.status === "active" ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
                      {prop.status === "active" ? "Listing Active" : prop.status || "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
