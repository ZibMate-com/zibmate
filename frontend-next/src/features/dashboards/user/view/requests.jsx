"use client";
import { useState, useEffect } from "react";

import { User, Phone, Clock, ShieldCheck } from "lucide-react";

export const SentRequests = () => {
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
                const response = await fetch(`${baseUrl}/api/bookings/my-bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch bookings');
                const data = await response.json();
                setMyBookings(data);
            } catch (error) {
                console.error('Failed to fetch my bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyBookings();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading your requests...</div>;

    if (myBookings.length === 0) return <div className="p-10 text-center text-slate-400">You haven't sent any booking requests yet.</div>;

    return (
        <div className="flex flex-col gap-8 mt-5">
            {
                myBookings.map((req) => {
                    return (
                        <div key={req.id} className="flex text-lg items-center rounded-3xl p-6 bg-white border border-slate-100 shadow-sm hover:shadow-md transition">
                            <div className="size-16 p-4 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                                <ShieldCheck size={28} />
                            </div>
                            <div className="flex justify-between items-center w-full ml-6">
                                <div className="flex flex-col text-slate-700">
                                    <span className="leading-relaxed">
                                        We've shared your request for <b className="text-orange-600">“{req.pg_name}”</b> with the owner.
                                        {req.status === 'confirmed' ? " Your stay is confirmed!" : " Expect to hear from them shortly."}
                                    </span>
                                    <div className="flex gap-4 mt-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(req.created_at).toLocaleDateString()}</span>
                                        <span className={`px-2 py-0.5 rounded-md ${req.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end gap-3">
                                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-slate-100 hover:bg-slate-800 transition">
                                        <Phone className="size-4" />
                                        Contact Owner
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}