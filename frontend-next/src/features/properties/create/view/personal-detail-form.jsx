"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Globe, CreditCard, ChevronRight, UserCircle } from "lucide-react";

export default function PersonalDetailsForm({ formData, handleChange, next, errors }) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] md:p-6 bg-slate-50/50 font-Montserrat">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-14 bg-orange-100 rounded-2xl mb-4">
            <UserCircle className="size-8 text-orange-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Personal Information</h2>
          <p className="text-slate-500 font-medium mt-2">Help us verify your identity to secure your account.</p>
        </div>

        <div className="space-y-6">
          {/* Name Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  name="firstname"
                  data-section="personal"
                  placeholder="e.g., John"
                  value={formData.personal.firstname || ""}
                  onChange={(e) => handleChange(e, e.target.dataset.section)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.firstname ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                />
              </div>
              {errors.firstname && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.firstname}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
              <input
                name="lastname"
                data-section="personal"
                placeholder="e.g., Doe"
                value={formData.personal.lastname}
                onChange={(e) => handleChange(e, e.target.dataset.section)}
                className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                    ${errors.lastname ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
              />
              {errors.lastname && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.lastname}</p>}
            </div>
          </div>

          {/* Contact Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* ---email--- */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  data-section="personal"
                  placeholder="john@example.com"
                  value={formData.personal.email}
                  onChange={(e) => handleChange(e, e.target.dataset.section)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.email ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                />
              </div>
              {/* {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.email}</p>} */}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  name="phone"
                  type="tel"
                  data-section="personal"
                  placeholder="10-digit mobile"
                  value={formData.personal.phone}
                  onChange={(e) => handleChange(e, e.target.dataset.section)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.phone ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                />
              </div>
              {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.phone}</p>}
            </div>
          </div>

          {/* Meta Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Gender</label>
              <select
                name="gender"
                data-section="personal"
                value={formData.personal.gender}
                onChange={(e) => handleChange(e, e.target.dataset.section)}
                className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer
                                    ${errors.gender ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.gender}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Nationality</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  name="nationality"
                  data-section="personal"
                  placeholder="Indian"
                  value={formData.personal.nationality}
                  onChange={(e) => handleChange(e, e.target.dataset.section)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.nationality ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                />
              </div>
              {errors.nationality && (
                <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.nationality}</p>
              )}
            </div>
          </div>

          {/* Full Width Aadhaar */}
          {/* <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Aadhaar Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <input
                                name="aadhar"
                                data-section="PersonalData"
                                placeholder="XXXX XXXX XXXX"
                                value={formData.PersonalData.aadhar}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                    ${errors.aadhar ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                            />
                        </div>
                        {errors.aadhar && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.aadhar}</p>}
                    </div> */}

          <button
            type="submit"
            onClick={next}
            className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl text-lg font-bold shadow-xl shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            Save & Continue
            <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
