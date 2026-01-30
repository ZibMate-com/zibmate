import React from 'react';
import { Calendar, Users, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from 'next/link';

export const BookingButton = ({ handleBooking }) => {

    return (
        <div className="lg:sticky w-full lg:top-24 bg-white overflow-hidden rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-orange-100/50">
            {/* Top Highlight Strip */}
            <div className="bg-orange-500 h-1.5 w-full"></div>

            <div className="p-8 space-y-8">
                {/* Price & Status Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] mb-1">Total Membership</p>
                        <h3 className="text-4xl font-light text-gray-900 tracking-tighter italic">
                            3,804<span className="text-lg font-bold not-italic text-gray-400 ml-1">.35</span>
                        </h3>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                            <Zap size={10} fill="currentColor" /> Available Now
                        </span>
                        <p className="text-[10px] text-gray-400 mt-2 font-medium tracking-tight italic">Tokens per cycle</p>
                    </div>
                </div>

                {/* Quick Selection Summary (Read-Only Feel) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 flex flex-col gap-1">
                        <Calendar size={14} className="text-orange-500 mb-1" />
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Arrival</span>
                        <span className="text-xs font-semibold text-gray-800 tracking-tight">Select Date</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 flex flex-col gap-1">
                        <Users size={14} className="text-orange-500 mb-1" />
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Sharing</span>
                        <span className="text-xs font-semibold text-gray-800 tracking-tight">Executive Single</span>
                    </div>
                </div>

                {/* The Prime Action */}
                <div className="space-y-4">
                    <button
                        className="w-full group relative bg-gray-900 hover:bg-orange-600 p-5 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-orange-200"
                        onClick={() => console.log("Finalizing Booking...")}
                    >
                        <Link href="/booking">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start" onClick={handleBooking}>
                                    <span className="text-white font-bold uppercase tracking-widest text-[10px]">Instant Booking</span>
                                    <span className="text-orange-400 text-xs font-medium group-hover:text-white transition-colors">Pay 300 Tokens</span>
                                </div>
                                <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white transition-all">
                                    <ArrowRight className="text-white group-hover:text-orange-600 -rotate-45 group-hover:rotate-0 transition-transform" size={20} />
                                </div>
                            </div>
                        </Link>
                    </button>

                    {/* Trust Indicator */}
                    <div className="flex items-start gap-3 px-2">
                        <ShieldCheck size={18} className="text-orange-500 shrink-0" />
                        <p className="text-[10px] text-gray-400 leading-relaxed">
                            <span className="text-gray-900 font-bold uppercase tracking-tight mr-1 italic">God-Tier Protection:</span>
                            Booking fee is 100% credited to your first month rent automatically.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Urgency */}
            <div className="bg-stone-50 p-4 border-t border-stone-100 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Only 2 suites remaining at this price</p>
            </div>
        </div>
    );
};