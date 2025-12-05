import React, { useState } from "react";
import { useVerificationForm } from "../viewmodels/use-verification-form";
import {MoveLeft} from "lucide-react"
export default function PropertyDetailsForm() {
    const {formData, handlePropertySubmit,handleChange,errors, handleBack} = useVerificationForm()

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <form
                onSubmit={handlePropertySubmit}
                className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl space-y-4"
            >
                  <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
                    Property Details Registration
                </h2>

                <div>
                    <input
                        name="propertyName"
                        data-section="PropertyData"
                        placeholder="Name of the Property"
                        value={formData.PropertyData.propertyName}
                        onChange={handleChange}
                       className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.propertyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.propertyName}</p>
                    )}
                </div>

              
                <div>
                    <input
                        name="houseNumber"
                        data-section="PropertyData"
                        placeholder="House / Flat No."
                        value={formData.PropertyData.houseNumber}
                        onChange={handleChange}
                       className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.houseNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.houseNumber}</p>
                    )}
                </div>

                <div>
                    <input
                        name="street"
                        data-section="PropertyData"
                        placeholder="Street / Locality"
                        value={formData.PropertyData.street}
                        onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.street && (
                        <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                    )}
                </div>

             
                <div>
                    <input
                        name="landmark"
                        data-section="PropertyData"
                        placeholder="Landmark (optional)"
                        value={formData.PropertyData.landmark}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg border-gray-300"
                    />
                </div>

            
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input
                            name="city"
                            data-section="PropertyData"
                            placeholder="City"
                            value={formData.PropertyData.city}
                            onChange={handleChange}
                           className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="state"
                            data-section="PropertyData"
                            placeholder="State"
                            value={formData.PropertyData.state}
                            onChange={handleChange}
                           className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                    </div>
                </div>

               
                <div>
                    <input
                        name="zip"
                        data-section="PropertyData"
                        placeholder="ZIP Code (6 digits)"
                        value={formData.PropertyData.zip}
                        onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                                ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.zip && (
                        <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                    )}
                </div>
                <div className="flex justify-between">
                <button
                    onClick={handleBack}
                    className="w-max flex items-center gap-3 bg-white border-2 border-orange-500 text-orange-500 py-3 px-4 rounded-lg text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all"
                >
                    <MoveLeft/>
                    back
                </button>
                <button
                    type="submit"
                    className="w-max bg-orange-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-orange-600"
                >
                    Submit Property Details
                </button>
                </div>
            </form>
        </div>
    );
}
