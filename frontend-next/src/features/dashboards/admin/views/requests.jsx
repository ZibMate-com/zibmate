"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { User, Phone, Check, X, Clock } from "lucide-react";

export const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/bookings/owner-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      toast.success(`Booking ${status} successfully!`);
      fetchRequests();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading inquiry requests...</div>;

  if (requests.length === 0) return <div className="p-10 text-center text-slate-400">No inquiry requests yet.</div>;

  return (
    <div className="flex flex-col gap-8 mt-5">
      {requests.map((req) => {
        return (
          <div
            key={req.id}
            className="flex text-lg shadow-sm hover:shadow-md transition items-center rounded-[2rem] p-4 bg-white border border-slate-100"
          >
            <div className="size-16 p-4 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
              <User size={28} />
            </div>
            <div className="flex justify-between items-center p-3 w-full gap-6">
              <div className="flex flex-col text-slate-700">
                <span className="text-sm">
                  <b className="text-slate-900">{req.full_name}</b> is interested in
                  <b className="text-orange-600"> “{req.pg_name}”</b>.
                </span>
                <div className="flex gap-4 mt-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {new Date(req.created_at).toLocaleDateString()}
                  </span>
                  <span>Type: {req.room_type}</span>
                  <span
                    className={`uppercase font-black ${req.status === "confirmed" ? "text-emerald-500" : "text-orange-500"}`}
                  >
                    Status: {req.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-12 px-5 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-slate-100 hover:bg-slate-800 transition">
                  <Phone className="size-4" />
                  Call
                </button>
                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(req.id, "confirmed")}
                      className="size-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition shadow-lg shadow-emerald-100"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "cancelled")}
                      className="size-12 bg-rose-500 text-white rounded-xl flex items-center justify-center hover:bg-rose-600 transition shadow-lg shadow-rose-100"
                    >
                      <X size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
