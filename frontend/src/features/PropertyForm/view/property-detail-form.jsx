import React from "react";
import { useVerificationForm } from "../viewmodels/use-verification-form";
import { motion } from "framer-motion";
import { 
    MoveLeft, 
    Home, 
    Hash, 
    MapPin, 
    Navigation, 
    Building2, 
    CheckCircle, 
    Map 
} from "lucide-react";

export default function PropertyDetailsForm() {
    const { formData, handlePropertySubmit, handleChange, errors, handleBack } = useVerificationForm();

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)] md:p-6 bg-slate-50/50 font-Montserrat">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center size-14 bg-orange-100 rounded-2xl mb-4">
                        <Building2 className="size-8 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        Property Details
                    </h2>
                    <p className="text-slate-500 font-medium mt-2">
                        Tell us about the space you're listing.
                    </p>
                </div>

                <form onSubmit={handlePropertySubmit} className="space-y-6">
                    {/* Primary Property Info */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Property Name</label>
                        <div className="relative">
                            <Home className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <input
                                name="propertyName"
                                data-section="PropertyData"
                                placeholder="e.g., Sunset Luxury Apartments"
                                value={formData.PropertyData.propertyName}
                                onChange={handleChange}
                                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                    ${errors.propertyName ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                            />
                        </div>
                        {errors.propertyName && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2 uppercase">{errors.propertyName}</p>}
                    </div>

                    {/* Address Line 1: House & Street */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">House / Flat No.</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input
                                    name="houseNumber"
                                    data-section="PropertyData"
                                    placeholder="e.g., A-402"
                                    value={formData.PropertyData.houseNumber}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.houseNumber ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                                />
                            </div>
                            {errors.houseNumber && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2 uppercase">{errors.houseNumber}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Street / Locality</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input
                                    name="street"
                                    data-section="PropertyData"
                                    placeholder="e.g., Palm Beach Road"
                                    value={formData.PropertyData.street}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.street ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                                />
                            </div>
                            {errors.street && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2 uppercase">{errors.street}</p>}
                        </div>
                    </div>

                    {/* Landmark & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-wider ml-1">Landmark (Optional)</label>
                            <div className="relative">
                                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input
                                    name="landmark"
                                    data-section="PropertyData"
                                    placeholder="e.g., Near Central Mall"
                                    value={formData.PropertyData.landmark}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium text-slate-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">City</label>
                            <input
                                name="city"
                                data-section="PropertyData"
                                placeholder="e.g., Mumbai"
                                value={formData.PropertyData.city}
                                onChange={handleChange}
                                className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                    ${errors.city ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                            />
                            {errors.city && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2 uppercase">{errors.city}</p>}
                        </div>
                    </div>

                    {/* State & Zip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">State</label>
                            <input
                                name="state"
                                data-section="PropertyData"
                                placeholder="e.g., Maharashtra"
                                value={formData.PropertyData.state}
                                onChange={handleChange}
                                className={`w-full px-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                    ${errors.state ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                            />
                            {errors.state && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2 uppercase">{errors.state}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">ZIP Code</label>
                            <div className="relative">
                                <Map className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input
                                    name="zip"
                                    data-section="PropertyData"
                                    placeholder="6-digit code"
                                    value={formData.PropertyData.zip}
                                    onChange={handleChange}
                                    className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700
                                        ${errors.zip ? "border-rose-400 ring-4 ring-rose-500/10" : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"}`}
                                />
                            </div>
                            {errors.zip && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2 uppercase">{errors.zip}</p>}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                        >
                            <MoveLeft className="size-5" />
                            Go Back
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] flex items-center justify-center gap-2 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 group"
                        >
                            Complete Registration
                            <CheckCircle className="size-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}