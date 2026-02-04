"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
    MoveLeft,
    Home,
    MapPin,
    Building2,
    CheckCircle,
    Image as ImageIcon,
    Plus,
    X,
    IndianRupee,
    Users,
    Tag
} from "lucide-react";


export default function PropertyDetailsForm({
    errors,
    formData,
    handleChange,
    toggleOccupancy,
    toggleFacility,
    handleFileChange,
    removeImage,
    imagePreviews,
    next,
    back,
}) {


    const fileInputRef = useRef(null);
    const occupancyList = ["single", "double", "triple", "quad"]
    const facilitiesList = ["WiFi", "AC", "Laundry", "Gym", "Power Backup", "Food", "Parking", "Security", "Refrigerator"];

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)] md:p-6 bg-slate-50/50 font-Montserrat">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center size-14 bg-orange-100 rounded-2xl mb-4">
                        <Building2 className="size-8 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        Listing Details
                    </h2>
                    <p className="text-slate-500 font-medium mt-2">
                        Upload photos and set pricing for your PG.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Image Upload Section */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Upload Property Photos</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100">
                                    <img src={preview} className="w-full h-full object-cover" alt={`Preview ${index}`} />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-orange-500 hover:text-orange-500 transition-all bg-slate-50"
                            >
                                <Plus size={24} />
                                <span className="text-[10px] font-bold mt-1 uppercase">Add Photo</span>
                            </button>
                        </div>
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">PG Name</label>
                            <input
                                name="propertyName"
                                data-section="property"
                                value={formData.property.propertyName}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="e.g. Skyline Residency"
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                            />
                            {errors.propertyName && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.propertyName}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">City</label>
                            <input
                                name="city"
                                data-section="property"
                                value={formData.property.city}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="Mumbai"
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                            />
                            {errors.city && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.city}</p>}
                        </div>
                    </div>

                    {/* Pricing */}
                    {/* Occupancy Selection */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Occupancy Types</label>
                        <div className="flex flex-wrap gap-2">
                            {occupancyList.map(o => (
                                <button
                                    key={o}
                                    type="button"
                                    data-section="property"
                                    onClick={() => toggleOccupancy(o)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                                    ${formData.property.occupancy.includes(o)
                                            ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100"
                                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}
                                >
                                    {o.charAt(0).toUpperCase() + o.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Pricing based on Occupancy */}
                    {formData.property.occupancy.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in duration-300">
                            {formData.property.occupancy.map((type) => (
                                <div key={type} className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">
                                        {type} Rent (Monthly)
                                    </label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                        <input
                                            name={`price_${type}`}
                                            type="number"
                                            data-section="property"
                                            // Assuming your ViewModel stores prices in an object like formData.prices = { single: 8000 }
                                            value={formData.property.prices?.[type] || ""}
                                            onChange={(e) => handleChange(e, e.target.dataset.section, type)} // Pass type to helper
                                            placeholder="8500"
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Keep the Discount field as a general field or move it inside the loop if it's per occupancy */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">General Discount (Optional)</label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <input
                                name="discount"
                                type="number"
                                data-section="property"
                                value={formData.property.discount}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="500"
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Property Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Address</label>
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street, Building name..."
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                                />
                            </div> */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Building Number</label>
                            <input
                                name="houseNumber"
                                required
                                data-section="property"
                                value={formData.property.houseNumber}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="#999"
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                            />
                            {errors.houseNumber && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.houseNumber}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Street</label>
                            <input
                                name="street"
                                required
                                data-section="property"
                                value={formData.property.street}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="Street, Building name..."
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">LandMark</label>
                            <input
                                name="landmark"
                                data-section="property"
                                value={formData.property.landmark}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="Street, Building name..."
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">State</label>
                            <input
                                name="state"
                                required
                                data-section="property"
                                value={formData.property.state}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="Delhi NCR"
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                            />
                            {errors.state && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.state}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Zip Code</label>
                            <input
                                name="zip"
                                data-section="property"
                                value={formData.property.zip}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="11xxxxx"
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                            />
                            {errors.zip && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-2">{errors.zip}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Location Link</label>
                            <input
                                name="maplink"
                                data-section="property"
                                value={formData.property.maplink}
                                onChange={(e) => handleChange(e, e.target.dataset.section)}
                                placeholder="maps/dir..."
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Available Facilities</label>
                        <div className="flex flex-wrap gap-2">
                            {facilitiesList.map(f => (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => toggleFacility(f)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                                        ${formData.property.facilities.includes(f)
                                            ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100"
                                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Looking For */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Looking For</label>
                        <div className="flex gap-4">
                            {["Any", "Boys", "Girls"].map(type => (
                                <label key={type} className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        data-section="property"
                                        name="lookingFor"
                                        value={type}
                                        checked={formData.property.lookingFor === type}
                                        onChange={(e) => handleChange(e, e.target.dataset.section)}
                                        className="hidden"
                                    />
                                    <div className={`py-3 text-center rounded-2xl text-xs font-bold transition-all border
                                        ${formData.property.lookingFor === type
                                            ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}
                                    >
                                        {type}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Description */}

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-wider ml-1">Description</label>
                        <textarea
                            name="description"
                            data-section="property"
                            value={formData.property.description}
                            onChange={(e) => handleChange(e, e.target.dataset.section)}
                            rows="3"
                            placeholder="Tell users why they should choose your PG..."
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-orange-500 transition-all font-medium text-sm"
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                            type="button"
                            onClick={back}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
                        >
                            <MoveLeft className="size-5" />
                            Go Back
                        </button>
                        <button
                            onClick={next}
                            className="flex-[2] flex items-center justify-center gap-2 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 group"
                        >
                            Review Form
                            <CheckCircle className="size-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}