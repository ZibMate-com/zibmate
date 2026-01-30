"use client";
import React, { useContext } from "react";
import { useVerificationForm } from "../viewmodels/use-verification-form";
import Mycontext from "../../context/mycontext";
import { motion } from "framer-motion";
import { User, Building2, Edit3, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export const ReviewandSubmit = () => {
    const perosonalDetails = JSON.parse(sessionStorage.getItem("personal-details")) || {};
    const propertyDetaiils = JSON.parse(sessionStorage.getItem("property-details")) || {};
    const { setActiveStep } = useContext(Mycontext);
    const { handleFinalSubmit } = useVerificationForm();

    const SectionHeader = ({ icon: Icon, title, onEdit }) => (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Icon size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>
            </div>
            <button 
                onClick={onEdit}
                className="flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-full transition-colors"
            >
                <Edit3 size={14} />
                Edit
            </button>
        </div>
    );

    const DataField = ({ label, value }) => (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-slate-700 font-bold text-base leading-tight">{value || "—"}</p>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-8 font-Montserrat py-6 px-4"
        >
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 leading-tight">Final Review</h2>
                <p className="text-slate-500 font-medium">Almost there! Please verify your information below.</p>
            </div>

            {/* Personal Details Card */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <SectionHeader icon={User} title="Personal Identity" onEdit={() => setActiveStep(0)} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-4">
                    <DataField label="Full Name" value={`${perosonalDetails.firstname} ${perosonalDetails.lastname}`} />
                    <DataField label="Email Address" value={perosonalDetails.email} />
                    <DataField label="Contact Number" value={perosonalDetails.phone} />
                    <DataField label="Gender" value={perosonalDetails.gender} />
                    <DataField label="Identity (Aadhar)" value={perosonalDetails.aadhar} />
                    <DataField label="Nationality" value={perosonalDetails.nationality} />
                </div>
            </div>

            {/* Property Details Card */}
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/40 relative overflow-hidden">
                <SectionHeader icon={Building2} title="Property Assets" onEdit={() => setActiveStep(1)} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-4">
                    <DataField label="Property Name" value={propertyDetaiils.propertyName} />
                    <DataField label="Building / Flat" value={propertyDetaiils.houseNumber} />
                    <DataField label="Street Locality" value={propertyDetaiils.street} />
                    <DataField label="Landmark" value={propertyDetaiils.landmark} />
                    <DataField label="Location" value={`${propertyDetaiils.city}, ${propertyDetaiils.state}`} />
                    <DataField label="ZIP Code" value={propertyDetaiils.zip} />
                </div>
            </div>

            {/* Terms and Submission */}
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                        <input 
                            type="checkbox" 
                            className="peer appearance-none size-6 border-2 border-orange-300 rounded-lg checked:bg-orange-600 checked:border-orange-600 transition-all cursor-pointer" 
                        />
                        <CheckCircle2 className="absolute text-white size-4 opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-slate-700 font-semibold text-sm leading-relaxed">
                        I hereby declare that the information provided is true to the best of my knowledge and I agree to the <span className="text-orange-600 underline font-black">ZIBMATE Terms of Service.</span>
                    </span>
                </label>

                <button
                    type="submit"
                    onClick={handleFinalSubmit}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl md:text-lg text-xs font-black shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group"
                >
                    <ShieldCheck className="md:size-6 size-6 text-orange-400" />
                    Confirm & Complete Registration
                    <ArrowRight className="md:size-6 size-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};