import React, { useState } from "react";
import { useVerificationForm } from "../viewmodels/use-verification-form";

export default function PersonalDetailsForm() {
    const {
        errors,
        formData,
        handleChange,
        handleNext,
    } = useVerificationForm()

    return (
        <div className="flex justify-center items-center max-h-screen p-4 sm:p-6">
            <div
                className="w-full max-w-xl bg-zinc-50 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4"
            >
                <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
                    Personal Details Registration
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input
                            name="firstname"
                            data-section="PersonalData"
                            placeholder="Enter first name"
                            value={formData.PersonalData.firstname}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.firstname && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.firstname}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="lastname"
                            data-section="PersonalData"
                            placeholder="Enter last name"
                            value={formData.PersonalData.lastname}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.lastname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.lastname && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.lastname}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input
                            name="email"
                            type="email"
                            data-section="PersonalData"
                            placeholder="type@email.com"
                            value={formData.PersonalData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="phone"
                            type="tel"
                            data-section="PersonalData"
                            placeholder="10-digit phone number"
                            value={formData.PersonalData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <select
                            name="gender"
                            data-section="PersonalData"
                            value={formData.PersonalData.gender}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.gender}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="nationality"
                            data-section="PersonalData"
                            placeholder="e.g., Indian"
                            value={formData.PersonalData.nationality}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.nationality ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.nationality && (
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.nationality}</p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        name="aadhar"
                        data-section="PersonalData"
                        placeholder="12-digit Aadhaar number"
                        value={formData.PersonalData.aadhar}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                            ${errors.aadhar ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.aadhar && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.aadhar}</p>
                    )}
                </div>

                <button
                    type="submit"
                    onClick={handleNext}
                    className="w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-bold shadow-md
                        hover:bg-orange-600 transition duration-200 focus:ring-4 focus:ring-orange-300"
                >
                    Save & Next
                </button>
            </div>
        </div>
    );
}
