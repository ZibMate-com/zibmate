"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ShieldCheck,
  MapPin,
  User,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const BookingPage = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    checkIn: "",
    roomType: "double",
    note: "",
    aadharNumber: "",
  });

  const [bookingPropertydetails, setbookingPropertyDetails] = useState({});
  useEffect(() => {
    const getPropertyDetails = () => {
      const data = JSON.parse(localStorage.getItem("BookingDetails"));
      setbookingPropertyDetails(data);
    };
    getPropertyDetails();
  }, []);

  const handleBooked = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("zibmate_token");
      const payload = {
        pgId: bookingPropertydetails.id,
        fullName: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        profession: bookingData.profession,
        aadharNumber: bookingData.aadharNumber, // Added mapping for aadhar
        checkInDate: bookingData.checkIn,
        roomType: bookingData.roomType,
        totalAmount: bookingPropertydetails.price - (bookingPropertydetails.discount || 0),
      };

      const response = await fetch(`/api/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.bookingId) {
        toast.success("Booking request sent successfully!");
        localStorage.removeItem("BookingDetails");
        router.push("/tenent-dashboard");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <section className="min-h-screen w-full relative flex justify-center items-center p-4 md:p-8 font-sans bg-stone-950">
      {/* Background with intelligent masking */}
      <div className="fixed inset-0 z-0">
        <img className="w-full h-full object-cover opacity-40" src="/assets/bookingpagebg2.jpg" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: The Form (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-4xl font-light text-white tracking-tight">
                Complete <span className="font-serif italic text-orange-500">Reservation</span>
              </h2>
              <p className="text-stone-400 mt-1 flex items-center gap-2 text-sm">Fill the form to confirm your stay</p>
            </div>
            <div className=" p-2 rounded-2xl">
              <h2 className="text-4xl font-light text-white tracking-tight">{bookingPropertydetails.name}</h2>
              <p className="text-stone-400 mt-1 flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-orange-500" /> {bookingPropertydetails.address},
                {bookingPropertydetails.city}
              </p>
            </div>
          </div>

          {/* Bento Grid Form Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Card */}
            <div className="bg-white p-8 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <User size={20} />
                </div>
                <h3 className="font-bold text-stone-800">Identity Details</h3>
              </div>
              <InputField
                label="Full Name"
                icon={<User size={16} />}
                placeholder="John Doe"
                onChange={(v) => setBookingData({ ...bookingData, fullName: v })}
              />
              <InputField
                label="Email"
                icon={<Mail size={16} />}
                placeholder="john@example.com"
                onChange={(v) => setBookingData({ ...bookingData, email: v })}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Phone"
                  icon={<Phone size={16} />}
                  placeholder="+91..."
                  onChange={(v) => setBookingData({ ...bookingData, phone: v })}
                />
                <InputField
                  label="Profession"
                  icon={<Briefcase size={16} />}
                  placeholder="Profession"
                  onChange={(v) => setBookingData({ ...bookingData, profession: v })}
                />
              </div>
              <InputField
                label="Aadhar Number"
                icon={<IdCard size={16} />}
                placeholder="xxxxxxxxxxxx"
                onChange={(v) => setBookingData({ ...bookingData, aadharNumber: v })}
              />
            </div>

            {/* Room Selection & Date Card */}
            <div className="bg-white p-8 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <Calendar size={20} />
                </div>
                <h3 className="font-bold text-stone-800">Stay Timeline</h3>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                  Arrival Date
                </label>
                <input
                  type="date"
                  className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl p-4 focus:border-orange-500 focus:bg-white outline-none transition-all"
                  onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">
                  Room Preference
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <RoomOption
                    id="single"
                    label="Single Sharing"
                    price="5,500"
                    active={bookingData.roomType === "single"}
                    onClick={() => setBookingData({ ...bookingData, roomType: "single" })}
                  />
                  <RoomOption
                    id="double"
                    label="Double Sharing"
                    price="4,054"
                    active={bookingData.roomType === "double"}
                    onClick={() => setBookingData({ ...bookingData, roomType: "double" })}
                  />
                  <RoomOption
                    id="triple"
                    label="Triple Sharing"
                    price="4,054"
                    active={bookingData.roomType === "triple"}
                    onClick={() => setBookingData({ ...bookingData, roomType: "triple" })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] flex items-start gap-4">
            <div className="p-3 bg-orange-500/20 text-orange-500 rounded-xl">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Instant Confirmation</p>
              <p className="text-stone-400 text-xs mt-1">
                Your spot is held for 20 minutes while you complete the payment. No extra hidden charges.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Summary (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-max ">
          <div className="bg-orange-600 h-max rounded-[3rem] p-10 text-white shadow-2xl shadow-orange-900/40 relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <h3 className="text-2xl font-bold mb-10 pb-6 border-b border-white/20">Payment Summary</h3>

            <div className="space-y-6 mb-12">
              <PriceRow label="Monthly Base" val={bookingPropertydetails.price} />
              {/* <PriceRow label="Security Deposit" val="240.09" /> */}
              <PriceRow label="Discount Applied" val={bookingPropertydetails.discount} isDiscount />

              <div className="pt-6 border-t border-white/20 mt-10">
                <p className="text-[10px] uppercase font-black text-orange-200 tracking-[0.2em] mb-2">
                  Amount Due Today
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter">
                    {bookingPropertydetails.price - bookingPropertydetails.discount}
                  </span>
                  <span className="text-xl font-bold opacity-70">TKN</span>
                </div>
                <p className="text-xs text-orange-100/60 mt-2 italic">*Balance to be paid at check-in</p>
              </div>
            </div>

            <div className="space-y-4">
              <Link href="/test">
                <button
                  className="w-full bg-white text-orange-600 py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                  onClick={handleBooked}
                >
                  Confirm & Pay <ArrowRight size={18} />
                </button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-orange-100/50">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Form Helpers ---

const InputField = ({ label, icon, placeholder, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-orange-500 transition-colors">
        {icon}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-stone-50 border-2 border-stone-50 rounded-2xl p-4 pl-12 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-medium"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

const RoomOption = ({ id, label, price, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
      active ? "border-orange-500 bg-orange-50/50" : "border-stone-100 hover:border-stone-200"
    }`}
  >
    <div className="text-left">
      <p className={`text-xs font-bold ${active ? "text-orange-600" : "text-stone-800"}`}>{label}</p>
      <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mt-0.5">{price} TKN / Mo</p>
    </div>
    {active && <CheckCircle2 size={18} className="text-orange-600" />}
  </button>
);

const PriceRow = ({ label, val, isDiscount }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${isDiscount ? "text-orange-200 italic" : "text-orange-100"}`}>{label} token</span>
    <span className={`font-bold ${isDiscount ? "text-white" : ""}`}>{val} token</span>
  </div>
);

const Step = ({ num, active }) => (
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
      active ? "bg-orange-500 text-white" : "bg-white/10 text-stone-500"
    }`}
  >
    {num}
  </div>
);
