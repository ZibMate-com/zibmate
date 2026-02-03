"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  Globe,
  Hash,
  Layout,
  Users,
  PlusCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export const AddTenantModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    nationality: "",
    floorNo: "",
    roomNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  // Helper for input styling to keep JSX clean
  const inputBase =
    "w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 text-black placeholder-black font-medium";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] overflow-hidden"
          >
            {/* Top Glow Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

            <form onSubmit={handleSubmit}>
              {/* Header Section */}
              <div className="px-10 pt-10 pb-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles size={12} /> New Resident
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    Onboard <span className="text-orange-500">Tenant</span>
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Fill in the details to generate the digital agreement.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-10 pb-10 space-y-8">
                {/* Section 1: Personal Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-6 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Contact Identity</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        required
                        name="name"
                        onChange={handleChange}
                        placeholder="Full Legal Name"
                        className={inputBase}
                      />
                    </div>

                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        required
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={inputBase}
                      />
                    </div>

                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        required
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={inputBase}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Details & Allocation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Sub-section: Demographics */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-6 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                        2
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Profile</h4>
                    </div>

                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <select
                        name="gender"
                        onChange={handleChange}
                        className={`${inputBase} appearance-none cursor-pointer`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        name="nationality"
                        onChange={handleChange}
                        placeholder="Nationality"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Sub-section: Assignment */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="size-6 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                        3
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Room Assignment</h4>
                    </div>

                    <div className="flex gap-3">
                      <div className="relative group flex-1">
                        <Layout className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          required
                          type="number"
                          name="floorNo"
                          onChange={handleChange}
                          placeholder="Floor"
                          className={inputBase}
                        />
                      </div>
                      <div className="relative group flex-1">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          required
                          type="text"
                          name="roomNo"
                          onChange={handleChange}
                          placeholder="Room"
                          className={inputBase}
                        />
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-2 items-start">
                      <CheckCircle2 size={14} className="text-blue-500 mt-0.5" />
                      <p className="text-[11px] text-blue-700 leading-tight">
                        System will automatically check for room availability upon submission.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                  >
                    Finish Onboarding <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
